import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'concert-tracker-sources';

function loadSources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSources(sources) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sources));
}

export default function SourceCollector() {
  const [sources, setSources] = useState(loadSources);
  const [inputUrl, setInputUrl] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { saveSources(sources); }, [sources]);

  const handleAdd = () => {
    const url = inputUrl.trim();
    if (!url) return;

    // 简单校验是否是链接
    if (!url.startsWith('http') && !url.includes('xhslink.com') && !url.includes('xiaohongshu.com')) {
      // 也接受纯文本（如帖子ID）
    }

    // 去重
    if (sources.find(s => s.url === url)) {
      setInputUrl('');
      setInputNote('');
      return;
    }

    const now = new Date().toISOString().slice(0, 10);
    setSources(prev => [{
      id: Date.now(),
      url,
      note: inputNote.trim() || '小红书演出资讯',
      addedAt: now,
      status: 'pending', // pending | processed
    }, ...prev]);
    setInputUrl('');
    setInputNote('');
    setExpanded(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleDelete = (id) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  const handleMarkProcessed = (id) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: 'processed' } : s));
  };

  const pending = sources.filter(s => s.status === 'pending');
  const processed = sources.filter(s => s.status === 'processed');

  return (
    <div className="source-collector">
      <div className="source-input-row">
        <input
          type="text"
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="粘贴小红书帖子链接 / 博主主页 / 任何演出信息来源..."
          className="source-url-input"
        />
        <input
          type="text"
          value={inputNote}
          onChange={e => setInputNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="备注（可选）"
          className="source-note-input"
        />
        <button
          onClick={handleAdd}
          disabled={!inputUrl.trim()}
          className="source-add-btn"
        >
          ➕ 添加来源
        </button>
      </div>

      {sources.length > 0 && (
        <div className="source-list-container">
          <div className="source-list-header" onClick={() => setExpanded(!expanded)}>
            <span>
              📥 演出信息来源 ({pending.length} 待处理 · {processed.length} 已收录)
            </span>
            <span className="source-toggle">{expanded ? '▲' : '▼'}</span>
          </div>

          {expanded && (
            <div className="source-list">
              {pending.length > 0 && (
                <div className="source-group">
                  <h5>⏳ 待处理 ({pending.length})</h5>
                  {pending.map(s => (
                    <div key={s.id} className="source-item pending">
                      <div className="source-item-info">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
                          {s.note}
                        </a>
                        <span className="source-date">{s.addedAt}</span>
                      </div>
                      <div className="source-item-actions">
                        <button onClick={() => handleMarkProcessed(s.id)} title="标记为已处理">✅</button>
                        <button onClick={() => handleDelete(s.id)} title="删除">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {processed.length > 0 && (
                <div className="source-group">
                  <h5>✅ 已收录 ({processed.length})</h5>
                  {processed.map(s => (
                    <div key={s.id} className="source-item processed">
                      <div className="source-item-info">
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
                          {s.note}
                        </a>
                        <span className="source-date">{s.addedAt}</span>
                      </div>
                      <div className="source-item-actions">
                        <button onClick={() => handleDelete(s.id)} title="删除">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!expanded && pending.length > 0 && (
            <p className="source-hint-collapsed">
              最近添加：{pending.slice(0, 2).map(s => s.note).join('、')}
            </p>
          )}
        </div>
      )}

      <p className="source-hint">
        💡 粘贴链接后，网站会保存记录。数据更新由后台处理并自动部署到演出数据库。
      </p>
    </div>
  );
}
