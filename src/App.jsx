import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import RegionBlock from './components/RegionBlock';
import ArtistPanel from './components/ArtistPanel';
import ArtistActivitySummary from './components/ArtistActivitySummary';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { getAllUserArtists, resolveUserId } from './api/netease';
import concerts, { groupByRegion, matchConcertsForArtists } from './data/concerts';
import embeddedUserArtists from './data/user-artists.json';

// 预置用户：每天都在冬眠- (UID: 468462180)
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
  const autoLoaded = useRef(false);

  // 启动时自动加载预置用户 "每天都在冬眠-" 的数据
  useEffect(() => {
    if (autoLoaded.current) return;
    autoLoaded.current = true;

    const embeddedArtists = DEFAULT_USER.artists.map(a => ({
      id: a.name,
      name: a.name,
      alias: [],
      songCount: a.songCount,
      songs: a.topSongs || [],
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
        const allGrouped = groupByRegion(concerts);
        setGroupedConcerts(allGrouped);
        setMatchedConcerts(concerts);
      } else {
        const matched = matchConcertsForArtists(concerts, userArtists);
        setMatchedConcerts(matched);
        setGroupedConcerts(groupByRegion(matched));
      }
    } catch (err) {
      console.error('获取歌单失败:', err);

      const msg = err.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('CORS')) {
        setError(
          '⚠️ 浏览器安全策略阻止了跨域请求。\n' +
          '因为你在上海，网站已预置你的歌单数据，无需搜索即可查看。'
        );
      } else {
        setError(`获取失败: ${msg}`);
      }
      // 失败时回退到预置数据
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
    const allGrouped = groupByRegion(concerts);
    setGroupedConcerts(allGrouped);
    setMatchedConcerts(concerts);
  }, []);

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
        <div className="results-header">
          <h2>
            {hasSearched && artists.length > 0
              ? `🎤 ${displayName || '你'}歌单中歌手的演出 (${matchedConcerts.length} 场)`
              : `🎤 全部演出信息 (${matchedConcerts.length} 场)`}
          </h2>
          <p className="results-subtitle">
            数据来源：秀动/大麦官方售票 · 艺人工作室官宣 · 小红书@不止live · ⚠️ 均为已确认的真实演出
          </p>
        </div>

        {!loading && groupedConcerts.length === 0 && hasSearched && (
          <EmptyState neteaseId={displayName} onReset={handleReset} />
        )}

        {/* 歌手活动摘要：一眼看到有哪些喜欢的歌手有演出 */}
        {!loading && matchedConcerts.length > 0 && hasSearched && (
          <ArtistActivitySummary
            concerts={matchedConcerts.filter(c => c.status !== '已结束')}
            userArtists={artists}
          />
        )}

        {/* 按地区展示，上海在最前面 */}
        {!loading && groupedConcerts.map(group => (
          <RegionBlock
            key={group.region}
            region={group.region}
            concerts={group.concerts}
            userArtists={artists}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}
