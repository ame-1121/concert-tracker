import React from 'react';

export default function ArtistPanel({ artists, matchedCount, displayName }) {
  const topArtists = artists.slice(0, 20);

  return (
    <div className="artist-panel">
      <div className="artist-panel-header">
        <h3>🎧 {displayName ? `${displayName} 的歌单` : '你的歌单'}中共有 <strong>{artists.length}</strong> 位歌手</h3>
        <span className="artist-panel-sub">其中 <strong>{matchedCount}</strong> 位歌手近期有演出</span>
      </div>
      <div className="artist-tags">
        {topArtists.map(a => (
          <span key={a.id} className="artist-tag">
            {a.name}
            <span className="artist-tag-count">{a.songCount}首</span>
          </span>
        ))}
        {artists.length > 20 && (
          <span className="artist-tag artist-tag-more">...等 {artists.length} 位</span>
        )}
      </div>
    </div>
  );
}
