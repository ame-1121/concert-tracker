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
  const [inputContent, setInputContent] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { saveSources(sources); }, [sources]);

  const handleAdd = () => {
    const url = inputUrl.trim();
    const content = inputContent.trim();
    if (!url && !content) return;

    // 去重
    if (url && sources.find(s => s.url === url)) {
      setInputUrl(''); setInputNote(''); setInputContent('');
      return;
    }

    const now = new Date().toISOString().slice(0, 10);
    setSources(prev => [{
      id: Date.now(),
      url: url || '(纯文本无链接)',
      note: inputNote.trim() || '小红书演出资讯',
      content: content || '',   // ← 帖子里粘贴的文本内容
      addedAt: now,
      status: 'pending',
    }, ...prev]);
    setInputUrl(''); setInputNote(''); setInputContent('');
    setExpanded(true);
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
          placeholder="粘贴小红书 / 微博 / 票务链接..."
          className="source-url-input"
        />
        <input
          type="text"
          value={inputNote}
          onChange={e => setInputNote(e.target.value)}
          placeholder="备注（如：不止live 6.25更新）"
          className="source-note-input"
        />
        <button
          onClick={handleAdd}
          disabled={!inputUrl.trim() && !inputContent.trim()}
          className="source-add-btn"
        >
          ➕ 添加
        </button>
      </div>

      {/* 小红书防爬解决方案：直接粘贴文本内容 */}
      <div className="source-paste-toggle" onClick={() => setShowPasteArea(!showPasteArea)}>
        <span>
          📋 {showPasteArea ? '收起' : '展开'}文本粘贴区
          <span className="source-paste-hint">
            {' '}— 小红书有反爬机制，请把帖子里的演出信息文字复制粘贴到这里
          </span>
        </span>
        <span className="source-toggle">{showPasteArea ? '▲' : '▼'}</span>
      </div>

      {showPasteArea && (
        <textarea
          value={inputContent}
          onChange={e => setInputContent(e.target.value)}
          placeholder={`把帖子里的演出信息复制粘贴到这里，例如：

6/28 瓦肆 VAS｜XXX乐队「巡演名」上海站
预售￥198 / 全价￥268
7/5 MAO Livehouse｜YYY 2026巡演...
...
（文本会被保存到浏览器，用于后续录入数据库）`}
          className="source-content-textarea"
          rows={6}
        />
      )}

      {/* 已有来源列表 */}
      {sources.length > 0 && (
        <div className="source-list-container">
          <div className="source-list-header" onClick={() => setExpanded(!expanded)}>
            <span>
              📥 已保存来源 ({pending.length} 待处理 · {processed.length} 已收录)
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
                        <div className="source-item-main">
                          {s.url !== '(纯文本无链接)' ? (
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
                              {s.note}
                            </a>
                          ) : (
                            <span className="source-link-text">{s.note}</span>
                          )}
                          {s.content && <span className="source-has-content" title="已附带文本内容">📝</span>}
                          <span className="source-date">{s.addedAt}</span>
                        </div>
                      </div>
                      <div className="source-item-actions">
                        <button onClick={() => handleMarkProcessed(s.id)} title="标记已处理">✅</button>
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
                        <div className="source-item-main">
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">
                            {s.note}
                          </a>
                          <span className="source-date">{s.addedAt}</span>
                        </div>
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
              最近：{pending.slice(0, 3).map(s => s.note + (s.content ? '📝' : '')).join(' · ')}
            </p>
          )}
        </div>
      )}

      <p className="source-hint">
        💡 <strong>解决小红书无法读取</strong>：把帖子的演出信息文字复制粘贴到文本框中。
        链接 + 文本一起保存后，我在后台读取并更新到演出数据库。数据存浏览器本地，只有你能看到。
      </p>
    </div>
  );
}
