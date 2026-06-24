import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import RegionBlock from './components/RegionBlock';
import ArtistPanel from './components/ArtistPanel';
import ArtistActivitySummary from './components/ArtistActivitySummary';
import SourceCollector from './components/SourceCollector';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { getAllUserArtists, resolveUserId } from './api/netease';
import concerts, { groupByRegion, matchConcertsForArtists } from './data/concerts';
import embeddedUserArtists from './data/user-artists.json';

const DEFAULT_USER = {
  uid: '468462180',
  displayName: '每天都在冬眠-',
  artists: embeddedUserArtists,
};

export default function App() {
  const [neteaseId, setNeteaseId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [artists, setArtists] = useState([]);
  const [matchedConcerts, setMatchedConcerts] = useState([]);
  const [groupedConcerts, setGroupedConcerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showOnlyPlaylist, setShowOnlyPlaylist] = useState(true);
  const autoLoaded = useRef(false);

  // 启动时自动加载预置用户数据，默认只看歌单里的歌手
  useEffect(() => {
    if (autoLoaded.current) return;
    autoLoaded.current = true;

    const embeddedArtists = DEFAULT_USER.artists.map(a => ({
      id: a.name, name: a.name, alias: [],
      songCount: a.songCount, songs: a.topSongs || [],
    }));

    const matched = matchConcertsForArtists(concerts, embeddedArtists);
    setArtists(embeddedArtists);
    setNeteaseId(DEFAULT_USER.uid);
    setDisplayName(DEFAULT_USER.displayName);
    setMatchedConcerts(matched);
    setGroupedConcerts(groupByRegion(matched));
    setHasSearched(true);
  }, []);

  const handleSearch = useCallback(async (input) => {
    if (!input || !input.trim()) {
      setError('请输入网易云用户 ID、昵称或主页链接');
      return;
    }
    setLoading(true);
    setError('');
    setHasSearched(true);
    setDisplayName(input.trim());

    try {
      const resolved = await resolveUserId(input.trim());
      setNeteaseId(resolved.uid);
      const userArtists = await getAllUserArtists(resolved.uid);
      setArtists(userArtists);

      if (userArtists.length === 0) {
        setError('该用户歌单为空或无法读取');
        setGroupedConcerts(groupByRegion(concerts));
        setMatchedConcerts(concerts);
      } else {
        const matched = matchConcertsForArtists(concerts, userArtists);
        setMatchedConcerts(matched);
        setGroupedConcerts(groupByRegion(matched));
        setShowOnlyPlaylist(true); // 搜索后默认只看歌单
      }
    } catch (err) {
      console.error('获取歌单失败:', err);
      const msg = err.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('CORS')) {
        setError('⚠️ 浏览器安全策略阻止了跨域请求。已使用预置歌单数据。');
      } else {
        setError(`获取失败: ${msg}`);
      }
      const embeddedArtists = DEFAULT_USER.artists.map(a => ({
        id: a.name, name: a.name, alias: [],
        songCount: a.songCount, songs: a.topSongs || [],
      }));
      const matched = matchConcertsForArtists(concerts, embeddedArtists);
      setArtists(embeddedArtists);
      setNeteaseId(DEFAULT_USER.uid);
      setDisplayName(DEFAULT_USER.displayName);
      setMatchedConcerts(matched);
      setGroupedConcerts(groupByRegion(matched));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setNeteaseId('');
    setDisplayName('');
    setArtists([]);
    setHasSearched(false);
    setError('');
    setShowOnlyPlaylist(false);
    const allGrouped = groupByRegion(concerts);
    setGroupedConcerts(allGrouped);
    setMatchedConcerts(concerts);
  }, []);

  // 根据开关决定显示哪些演出
  const displayedConcerts = showOnlyPlaylist ? matchedConcerts : concerts;
  const displayedGrouped = showOnlyPlaylist
    ? groupedConcerts
    : groupByRegion(concerts);

  const upcomingMatched = matchedConcerts.filter(c => c.status !== '已结束');

  return (
    <div className="app">
      <Header
        neteaseId={neteaseId}
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && <LoadingSpinner />}

      {error && !loading && (
        <div className="error-banner">
          <span style={{ whiteSpace: 'pre-line' }}>{error}</span>
          <button onClick={handleReset} className="btn-reset">查看全部演出</button>
        </div>
      )}

      {artists.length > 0 && !loading && (
        <ArtistPanel
          artists={artists}
          matchedCount={matchedConcerts.length}
          displayName={displayName}
        />
      )}

      <main className="main-content">
        {/* 筛选开关 + 标题 */}
        <div className="results-header">
          <h2>
            {showOnlyPlaylist
              ? `🎧 ${displayName || '你'}歌单里 ${upcomingMatched.length} 场即将到来的演出`
              : `🌐 全部 ${displayedConcerts.length} 场演出`}
          </h2>
          <p className="results-subtitle">
            秀动/大麦 · 工作室官宣 · 小红书@不止live · ✅ 已确认真实演出
          </p>

          {/* 筛选开关 */}
          {hasSearched && artists.length > 0 && (
            <div className="filter-toggle-row">
              <button
                className={`filter-btn ${showOnlyPlaylist ? 'filter-active' : ''}`}
                onClick={() => {
                  setShowOnlyPlaylist(true);
                  setGroupedConcerts(groupByRegion(matchedConcerts));
                }}
              >
                🎧 只看我歌单里的歌手
                <span className="filter-count">{matchedConcerts.length}</span>
              </button>
              <button
                className={`filter-btn ${!showOnlyPlaylist ? 'filter-active' : ''}`}
                onClick={() => {
                  setShowOnlyPlaylist(false);
                  setGroupedConcerts(groupByRegion(concerts));
                }}
              >
                🌐 浏览所有演出
                <span className="filter-count">{concerts.length}</span>
              </button>
            </div>
          )}
        </div>

        {!loading && displayedGrouped.length === 0 && hasSearched && (
          <EmptyState neteaseId={displayName} onReset={handleReset} />
        )}

        {/* 歌手活动摘要 */}
        {!loading && upcomingMatched.length > 0 && hasSearched && (
          <ArtistActivitySummary
            concerts={upcomingMatched}
            userArtists={artists}
          />
        )}

        {/* 非歌单模式时提醒有多少场不在歌单中 */}
        {!loading && !showOnlyPlaylist && hasSearched && artists.length > 0 && (
          <div className="all-shows-notice">
            🎧 其中 <strong>{matchedConcerts.length}</strong> 场来自你歌单里的歌手，
            其余 {concerts.length - matchedConcerts.length} 场可能不是你喜欢的歌手。
            <button
              onClick={() => { setShowOnlyPlaylist(true); setGroupedConcerts(groupByRegion(matchedConcerts)); }}
              className="link-btn"
            >
              只看歌单歌手 →
            </button>
          </div>
        )}

        {/* 地区展示 */}
        {!loading && displayedGrouped.map(group => (
          <RegionBlock
            key={group.region}
            region={group.region}
            concerts={group.concerts}
            userArtists={artists}
            showOnlyPlaylist={showOnlyPlaylist}
          />
        ))}
      </main>

      <SourceCollector />
      <Footer />
    </div>
  );
}
