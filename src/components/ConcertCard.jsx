import React from 'react';

const typeConfig = {
  '演唱会': { bg: '#FF6B6B', icon: '🎤' },
  'Livehouse': { bg: '#4ECDC4', icon: '🎸' },
  '音乐节': { bg: '#A29BFE', icon: '🎪' },
};

const statusConfig = {
  '已开票': { cls: 'status-onsale', label: '已开票' },
  '即将开票': { cls: 'status-upcoming', label: '即将开票' },
  '已售罄': { cls: 'status-soldout', label: '已售罄' },
  '待定': { cls: 'status-tbd', label: '待定' },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const wd = weekDays[d.getDay()];

  // 计算距今天数
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));

  let relative = '';
  if (diffDays === 0) relative = '今天';
  else if (diffDays === 1) relative = '明天';
  else if (diffDays > 1 && diffDays <= 7) relative = `${diffDays}天后`;
  else if (diffDays > 7 && diffDays <= 30) relative = `${Math.ceil(diffDays / 7)}周后`;
  else relative = '';

  return { full: `${m}月${day}日`, weekDay: wd, relative };
}

export default function ConcertCard({ concert, isInPlaylist }) {
  const c = concert;
  const typeInfo = typeConfig[c.type] || typeConfig['演唱会'];
  const statusInfo = statusConfig[c.status] || statusConfig['待定'];
  const dateInfo = formatDate(c.date);

  return (
    <div className={`concert-card ${isInPlaylist ? 'card-matched' : ''}`}>
      {isInPlaylist && <div className="card-badge">🎧 你的歌单</div>}

      <div className="card-type" style={{ background: typeInfo.bg }}>
        {typeInfo.icon} {c.type}
      </div>

      <div className="card-body">
        <h4 className="card-artist">
          {c.artistName}
          {c.artistAliases?.[0] && (
            <span className="card-alias"> ({c.artistAliases[0]})</span>
          )}
        </h4>
        <h3 className="card-name">{c.concertName}</h3>

        <div className="card-meta">
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span className="meta-value">
              {dateInfo.full} {dateInfo.weekDay}
              {dateInfo.relative && (
                <span className="meta-relative"> · {dateInfo.relative}</span>
              )}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏰</span>
            <span className="meta-value">{c.time}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="meta-value">{c.city} · {c.venue}</span>
          </div>
        </div>

        <div className="card-footer">
          <span className={`status-tag ${statusInfo.cls}`}>{statusInfo.label}</span>
          <span className="source-tag" title={c.source}>📋 {c.source}</span>
        </div>
      </div>

      {c.ticketUrl && c.status === '已开票' && (
        <a href={c.ticketUrl} target="_blank" rel="noopener noreferrer" className="card-action">
          🎫 购票
        </a>
      )}
      {c.status === '即将开票' && (
        <div className="card-action card-action-info">
          🔔 即将开票
        </div>
      )}
      {c.status === '已售罄' && (
        <div className="card-action card-action-soldout">
          😢 已售罄
        </div>
      )}
    </div>
  );
}
