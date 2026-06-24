import React from 'react';

const SONG_COUNT_THRESHOLD = 5; // 歌单中有5首以上显示🔥

export default function ArtistActivitySummary({ concerts, userArtists }) {
  // 按歌手合并
  const artistMap = {};
  concerts.forEach(c => {
    if (!artistMap[c.artistName]) {
      artistMap[c.artistName] = {
        name: c.artistName,
        shows: [],
        cities: new Set(),
        earliestDate: c.date,
      };
    }
    artistMap[c.artistName].shows.push(c);
    artistMap[c.artistName].cities.add(c.city);
    if (c.date < artistMap[c.artistName].earliestDate) {
      artistMap[c.artistName].earliestDate = c.date;
    }
  });

  const artists = Object.values(artistMap)
    .map(a => ({
      ...a,
      cityList: [...a.cities],
      count: a.shows.length,
    }))
    .sort((a, b) => new Date(a.earliestDate) - new Date(b.earliestDate));

  if (artists.length === 0) return null;

  // 从 userArtists 获取歌曲数量
  const userSongCount = {};
  if (userArtists && userArtists.length > 0) {
    userArtists.forEach(a => {
      const name = a.name.trim();
      // 存储单名
      userSongCount[name] = (userSongCount[name] || 0) + a.songCount;
      // 存储斜杠名
      if (name.includes('/')) {
        name.split('/').map(n => n.trim()).filter(Boolean).forEach(n => {
          userSongCount[n] = (userSongCount[n] || 0) + a.songCount;
        });
      }
      // 存储括号名
      const bracketMatch = name.match(/\(([^)]+)\)/);
      if (bracketMatch) {
        userSongCount[bracketMatch[1].trim()] = (userSongCount[bracketMatch[1].trim()] || 0) + a.songCount;
      }
    });
  }

  return (
    <div className="artist-summary">
      <div className="artist-summary-header">
        <h3>🎧 你有 <strong>{artists.length}</strong> 位歌单歌手近期有演出</h3>
      </div>
      <div className="artist-summary-grid">
        {artists.map(entry => {
          const songCount = userSongCount[entry.name] || 0;
          const isHot = songCount >= SONG_COUNT_THRESHOLD;
          return (
            <div key={entry.name} className={`artist-summary-card ${isHot ? 'artist-hot' : ''}`}>
              <div className="asc-header">
                <span className="asc-artist-name">
                  {isHot && <span className="asc-fire">🔥 </span>}
                  {entry.name}
                </span>
                {songCount > 0 && (
                  <span className="asc-song-count" title="歌单中歌曲数">
                    🎵{songCount}首
                  </span>
                )}
              </div>
              <div className="asc-meta">
                <span className="asc-shows">{entry.count} 场演出</span>
                <span className="asc-cities">{entry.cityList.join(' · ')}</span>
              </div>
              <div className="asc-dates">
                {entry.shows.map(s => (
                  <span key={s.date + s.city} className="asc-date-chip">
                    {s.date.slice(5)} {s.city}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
