import React from 'react';
import ConcertCard from './ConcertCard';

const regionMeta = {
  '上海': { icon: '🏙️', color: '#FFD700', cities: '瓦肆·育音堂·ModernSkyLAB·MAO·Encore' },
  '华东': { icon: '🌊', color: '#4ECDC4', cities: '杭州·南京·苏州·合肥·厦门' },
  '华北': { icon: '🏛️', color: '#FF6B6B', cities: '北京·天津·石家庄·太原' },
  '华南': { icon: '🌴', color: '#45B7D1', cities: '广州·深圳·南宁·海口' },
  '华中': { icon: '🏯', color: '#F7DC6F', cities: '武汉·长沙·郑州·南昌' },
  '西南': { icon: '🏔️', color: '#A29BFE', cities: '成都·重庆·昆明·贵阳' },
  '西北': { icon: '🏜️', color: '#FD8A5E', cities: '西安·兰州·银川·西宁' },
  '东北': { icon: '❄️', color: '#74B9FF', cities: '沈阳·大连·长春·哈尔滨' },
};

/** 检查某个演出是否在用户歌单中（含别名、斜杠名、括号名匹配） */
function isConcertInPlaylist(concert, userArtists) {
  const concertNames = new Set([
    concert.artistName.toLowerCase(),
    ...(concert.artistAliases || []).map(a => a.toLowerCase()),
  ]);

  for (const artist of userArtists) {
    const name = (artist.name || '').trim().toLowerCase();
    if (!name) continue;

    // 直接匹配
    if (concertNames.has(name)) return true;

    // 斜杠分割
    if (name.includes('/')) {
      for (const part of name.split('/').map(n => n.trim()).filter(Boolean)) {
        if (concertNames.has(part)) return true;
      }
    }

    // 括号别名
    const bracketMatch = name.match(/\(([^)]+)\)/);
    if (bracketMatch && concertNames.has(bracketMatch[1].trim().toLowerCase())) return true;
    if (bracketMatch && concertNames.has(name.replace(/\s*\([^)]+\)/, '').trim())) return true;

    // 别名
    if (artist.alias) {
      for (const al of artist.alias) {
        if (concertNames.has(al.toLowerCase())) return true;
      }
    }
  }
  return false;
}

export default function RegionBlock({ region, concerts, userArtists = [], showOnlyPlaylist }) {
  const meta = regionMeta[region] || { icon: '📍', color: '#999', cities: '' };

  return (
    <section className="region-block">
      <div className="region-header" style={{ borderLeftColor: meta.color }}>
        <div className="region-title">
          <span className="region-icon">{meta.icon}</span>
          <h3>{region === '上海' ? '📍 上海' : `${region}地区`}</h3>
          <span className="region-cities">{meta.cities}</span>
        </div>
        <div className="region-count">
          <span>{concerts.length} 场演出</span>
        </div>
      </div>

      <div className="concert-grid">
        {concerts.map((concert, idx) => {
          const inPlaylist = isConcertInPlaylist(concert, userArtists);
          // 在浏览全部模式下，非歌单歌手的卡片降低视觉权重
          const dimmed = !showOnlyPlaylist && userArtists.length > 0 && !inPlaylist;
          return (
            <ConcertCard
              key={`${concert.artistName}-${concert.date}-${idx}`}
              concert={concert}
              isInPlaylist={inPlaylist}
              dimmed={dimmed}
            />
          );
        })}
      </div>
    </section>
  );
}
