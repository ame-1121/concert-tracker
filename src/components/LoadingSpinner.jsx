import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle spinner-circle-2"></div>
        <div className="spinner-circle spinner-circle-3"></div>
      </div>
      <p className="loading-text">正在从网易云获取你的歌单数据...</p>
      <p className="loading-sub">解析歌单 → 提取歌手 → 匹对演出信息</p>
    </div>
  );
}
