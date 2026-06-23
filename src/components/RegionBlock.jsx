import React from 'react';
import ConcertCard from './ConcertCard';

const regionMeta = {
  '华东': { icon: '🌊', color: '#4ECDC4', cities: '上海·杭州·南京·苏州·合肥·厦门' },
  '华北': { icon: '🏛️', color: '#FF6B6B', cities: '北京·天津·石家庄·太原' },
  '华南': { icon: '🌴', color: '#45B7D1', cities: '广州·深圳·南宁·海口' },
  '华中': { icon: '🏯', color: '#F7DC6F', cities: '武汉·长沙·郑州·南昌' },
  '西南': { icon: '🏔️', color: '#A29BFE', cities: '成都·重庆·昆明·贵阳' },
  '西北': { icon: '🏜️', color: '#FD8A5E', cities: '西安·兰州·银川·西宁' },
  '东北': { icon: '❄️', color: '#74B9FF', cities: '沈阳·大连·长春·哈尔滨' },
};

export default function RegionBlock({ region, concerts, userArtists = [] }) {
  const meta = regionMeta[region] || { icon: '📍', color: '#999', cities: '' };
  const userArtistNames = new Set(userArtists.map(a => a.name));

  return (
    <section className="region-block">
      <div className="region-header" style={{ borderLeftColor: meta.color }}>
        <div className="region-title">
          <span className="region-icon">{meta.icon}</span>
          <h3>{region}地区</h3>
          <span className="region-cities">{meta.cities}</span>
        </div>
        <div className="region-count">
          <span>{concerts.length} 场演出</span>
        </div>
      </div>

      <div className="concert-grid">
        {concerts.map((concert, idx) => (
          <ConcertCard
            key={`${concert.artistName}-${concert.date}-${idx}`}
            concert={concert}
            isInPlaylist={userArtistNames.has(concert.artistName)}
          />
        ))}
      </div>
    </section>
  );
}
