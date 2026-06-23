/**
 * NetEase Cloud Music API 模块
 * 通过公开代理获取用户歌单、歌曲、歌手信息
 */

const API_BASES = [
  'https://netease-cloud-music-api-opal-psi.vercel.app',
  'https://netease-cloud-music-api-seven-rose.vercel.app',
  'https://music-api.xiaomei.me',
];

let currentBaseIdx = 0;

async function request(path, params = {}, retryCount = 0) {
  const API_BASE = API_BASES[currentBaseIdx];
  const url = new URL(path, API_BASE);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.code !== 200) throw new Error(data.message || 'API Error');
    return data;
  } catch (err) {
    console.error(`[NeteaseAPI] ${path}:`, err.message);
    // 尝试切换备用API
    if (retryCount < API_BASES.length - 1) {
      currentBaseIdx = (currentBaseIdx + 1) % API_BASES.length;
      console.log(`[NeteaseAPI] 切换API: ${API_BASES[currentBaseIdx]}`);
      return request(path, params, retryCount + 1);
    }
    throw err;
  }
}

/** 通过用户名搜索用户UID */
export async function searchUserByNickname(nickname) {
  const data = await request('/search', {
    keywords: nickname,
    type: 1002,  // 用户搜索
    limit: 5
  });
  const users = data.result?.userprofiles || [];
  if (users.length === 0) throw new Error(`未找到用户: ${nickname}`);
  // 尝试精确匹配
  const exact = users.find(u => u.nickname === nickname);
  return (exact || users[0]).userId;
}

/** 获取用户详情 */
export async function getUserDetail(uid) {
  const data = await request('/user/detail', { uid });
  return data.profile || data;
}

/** 解析用户输入：支持数字UID / 昵称 / 主页URL */
export async function resolveUserId(input) {
  const trimmed = input.trim();

  // 尝试从URL中提取ID
  const urlMatch = trimmed.match(/home\?id=(\d+)/);
  if (urlMatch) return { uid: urlMatch[1], isNumeric: true };

  // 纯数字 → 直接作为UID
  if (/^\d+$/.test(trimmed)) {
    return { uid: trimmed, isNumeric: true };
  }

  // 非数字 → 作为昵称搜索
  const uid = await searchUserByNickname(trimmed);
  return { uid: String(uid), isNumeric: false };
}

/** 获取用户歌单列表 */
export async function getUserPlaylists(uid) {
  const data = await request('/user/playlist', { uid });
  return data.playlist || [];
}

/** 获取歌单详情（包含歌曲列表） */
export async function getPlaylistDetail(id) {
  const data = await request('/playlist/detail', { id });
  return data.playlist || null;
}

/** 获取歌单所有歌曲 */
export async function getPlaylistTracks(id, limit = 500) {
  const data = await request('/playlist/track/all', { id, limit });
  return data.songs || [];
}

/** 从歌曲列表提取所有歌手 */
export function extractArtistsFromSongs(songs) {
  const artistMap = new Map();
  songs.forEach(song => {
    (song.ar || []).forEach(ar => {
      if (!artistMap.has(ar.id)) {
        artistMap.set(ar.id, {
          id: ar.id,
          name: ar.name,
          alias: ar.alias || [],
          songCount: 0,
          songs: []
        });
      }
      const entry = artistMap.get(ar.id);
      entry.songCount++;
      if (entry.songs.length < 5) {
        entry.songs.push(song.name);
      }
    });
  });
  return Array.from(artistMap.values())
    .sort((a, b) => b.songCount - a.songCount);
}

/** 获取用户所有歌单中的所有歌手 */
export async function getAllUserArtists(uid) {
  const playlists = await getUserPlaylists(uid);
  const allArtists = new Map();

  // 只取前10个歌单，避免请求过多
  const targetPlaylists = playlists.slice(0, 10);

  const tracksResults = await Promise.allSettled(
    targetPlaylists.map(p => getPlaylistTracks(p.id, 200))
  );

  tracksResults.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      const artists = extractArtistsFromSongs(result.value);
      artists.forEach(artist => {
        if (allArtists.has(artist.id)) {
          const existing = allArtists.get(artist.id);
          existing.songCount += artist.songCount;
          existing.songs = [...new Set([...existing.songs, ...artist.songs])].slice(0, 5);
        } else {
          allArtists.set(artist.id, artist);
        }
      });
    } else {
      console.warn(`Failed to fetch playlist: ${targetPlaylists[idx]?.name}`);
    }
  });

  return Array.from(allArtists.values())
    .sort((a, b) => b.songCount - a.songCount);
}

/** 获取歌手热门歌曲 */
export async function getArtistHotSongs(artistId) {
  const data = await request('/artists', { id: artistId });
  return data;
}
