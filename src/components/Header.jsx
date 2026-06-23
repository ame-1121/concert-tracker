import React, { useState } from 'react';

export default function Header({ neteaseId, onSearch, loading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-icon">🎵</div>
          <div className="brand-text">
            <h1>演唱会追踪</h1>
            <span className="brand-sub">Concert Tracker</span>
          </div>
        </div>

        <form className="header-search" onSubmit={handleSubmit}>
          <div className="search-box">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="输入网易云昵称 / 数字ID / 主页链接..."
              disabled={loading}
              className="search-input"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="search-btn"
            >
              {loading ? (
                <span className="btn-loading">⏳</span>
              ) : (
                <span>🔍 搜索</span>
              )}
            </button>
          </div>
          <p className="search-hint">
            支持网易云昵称、数字UID、或个人主页链接
          </p>
        </form>
      </div>
    </header>
  );
}
