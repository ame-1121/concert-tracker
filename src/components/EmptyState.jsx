import React from 'react';

export default function EmptyState({ neteaseId, onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>你的歌单中暂无歌手有近期演出信息</h3>
      <p>
        用户 <strong>{neteaseId}</strong> 的歌单中的歌手暂未匹配到演出数据。
      </p>
      <p className="empty-hint">
        可能原因：数据库中暂无这些歌手的演出、歌手名匹配差异、或演出已过期。
      </p>
      <button onClick={onReset} className="btn-primary">
        👀 查看全部演出信息
      </button>
    </div>
  );
}
