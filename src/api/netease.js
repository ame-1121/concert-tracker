/**
 * NetEase Cloud Music API 模块
 *
 * 使用两层策略：
 * 1. 直接调用 music.163.com API（国内可用）
 * 2. 使用 api.injahow.cn Meting API 获取歌曲（有 CORS 支持）
 *
 * CORS: music.163.com 的 user/playlist 接口在中国大陆
 * 部分网络环境下浏览器可直连。如不行则引导用户。
 */

const NETEASE_API = 'https://music.163.com/api';
const METING_API = 'https://api.injahow.cn/meting';

/**
 * 获取用户歌单列表
 * 直接调 music.163.com，因为国内可直接访问
 * 部分浏览器环境可能因 CORS 被拦，需要用户允许第三方Cookie或使用插件
 */
export async function getUserPlaylists(uid) {
  const url = `${NETEASE_API}/user/playlist?uid=${uid}&limit=30`;
  const res = await fetch(url, {
    mode: 'cors',
    credentials: 'omit',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.code !== 200) throw new Error(data.message || 'API Error');
  return data.playlist || [];
}

/**
 * 通过 Meting API 获取歌单歌曲（有 CORS 头，浏览器友好）
 */
export async function getPlaylistTracks(playlistId) {
  const url = `${METING_API}/?server=netease&type=playlist&id=${playlistId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid response');
  return data;
}

/**
 * 从歌曲列表提取歌手
 */
export function extractArtistsFromMetingsongs(songs) {
  const artistMap = new Map();
  songs.forEach(song => {
    const name = song.artist || 'Unknown';
    // 处理斜杠分隔的多个歌手
    const names = name.split('/').map(n => n.trim()).filter(Boolean);
    names.forEach(n => {
      if (!artistMap.has(n)) {
        artistMap.set(n, { id: n, name: n, alias: [], songCount: 0, songs: [] });
      }
      const entry = artistMap.get(n);
      entry.songCount++;
      if (entry.songs.length < 5) {
        entry.songs.push(song.name);
      }
    });
  });
  return Array.from(artistMap.values())
    .sort((a, b) => b.songCount - a.songCount);
}

/**
 * 获取用户所有歌单中的所有歌手
 */
export async function getAllUserArtists(uid) {
  const playlists = await getUserPlaylists(uid);

  // 取前15个歌单
  const targetPlaylists = playlists.slice(0, 15);

  const allArtists = new Map();

  const results = await Promise.allSettled(
    targetPlaylists.map(p =>
      getPlaylistTracks(p.id).then(songs => extractArtistsFromMetingsongs(songs))
    )
  );

  results.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      result.value.forEach(artist => {
        if (allArtists.has(artist.name)) {
          const existing = allArtists.get(artist.name);
          existing.songCount += artist.songCount;
          existing.songs = [...new Set([...existing.songs, ...artist.songs])].slice(0, 5);
        } else {
          allArtists.set(artist.name, artist);
        }
      });
    } else {
      console.warn(`Failed: ${targetPlaylists[idx]?.name}`);
    }
  });

  return Array.from(allArtists.values())
    .sort((a, b) => b.songCount - a.songCount);
}

/**
 * 解析用户输入：支持数字UID / 昵称 / 主页URL
 *
 * 昵称搜索需要调用 search API，在国内可能需要 CORS 代理。
 * 如果失败，提示用户直接使用数字UID。
 */
export async function resolveUserId(input) {
  const trimmed = input.trim();

  // 尝试从URL中提取ID
  const urlMatch = trimmed.match(/home\?id=(\d+)/);
  if (urlMatch) return { uid: urlMatch[1], isNumeric: true };

  // 纯数字 → 直接作为UID
  if (/^\d+$/.test(trimmed)) {
    return { uid: trimmed, isNumeric: true };
  }

  // 非数字 → 作为昵称
  // 尝试通过搜索接口反查 UID
  const searchUrl = `${NETEASE_API}/search/get?s=${encodeURIComponent(trimmed)}&type=1002&limit=5`;
  const res = await fetch(searchUrl, { mode: 'cors', credentials: 'omit' });
  if (!res.ok) throw new Error('搜索失败，请使用数字UID');
  const data = await res.json();
  const users = data.result?.userprofiles || [];
  if (users.length === 0) throw new Error(`未找到用户: ${trimmed}`);

  // 优先精确昵称匹配
  const exact = users.find(u => u.nickname === trimmed);
  return { uid: String((exact || users[0]).userId), isNumeric: false };
}
