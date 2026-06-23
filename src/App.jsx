import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import RegionBlock from './components/RegionBlock';
import ArtistPanel from './components/ArtistPanel';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { getAllUserArtists, resolveUserId } from './api/netease';
import concerts, { groupByRegion, matchConcertsForArtists } from './data/concerts';

export default function App() {
  const [neteaseId, setNeteaseId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [artists, setArtists] = useState([]);
  const [matchedConcerts, setMatchedConcerts] = useState([]);
  const [groupedConcerts, setGroupedConcerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // 加载演示数据（用户未搜索时展示全部演出）
  useEffect(() => {
    const allGrouped = groupByRegion(concerts);
    setGroupedConcerts(allGrouped);
    setMatchedConcerts(concerts);
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
      // 解析用户输入 → 获取数字UID
      const resolved = await resolveUserId(input.trim());
      setNeteaseId(resolved.uid);
      const userArtists = await getAllUserArtists(resolved.uid);
      setArtists(userArtists);

      if (userArtists.length === 0) {
        setError('未找到歌单或歌单为空，请检查用户信息是否正确');
        setGroupedConcerts(groupByRegion(concerts));
        setMatchedConcerts(concerts);
      } else {
        const matched = matchConcertsForArtists(concerts, userArtists);
        setMatchedConcerts(matched);
        setGroupedConcerts(groupByRegion(matched));
      }
    } catch (err) {
      console.error('获取歌单失败:', err);
      setError(`获取歌单失败: ${err.message}。请确认昵称/ID正确，或使用演示数据`);
      // 显示全部演出作为后备
      setGroupedConcerts(groupByRegion(concerts));
      setMatchedConcerts(concerts);
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
          <span>⚠️ {error}</span>
          <button onClick={handleReset} className="btn-reset">查看全部演出</button>
        </div>
      )}

      {artists.length > 0 && !loading && (
        <ArtistPanel artists={artists} matchedCount={matchedConcerts.length} />
      )}

      <main className="main-content">
        <div className="results-header">
          <h2>
            {hasSearched && artists.length > 0
              ? `🎤 你歌单中歌手的演出 (${matchedConcerts.length} 场)`
              : `🎤 全部演出信息 (${matchedConcerts.length} 场)`}
          </h2>
          <p className="results-subtitle">
            数据来源：各地文旅局营业性演出许可、大麦/秀动票务平台
          </p>
        </div>

        {!loading && groupedConcerts.length === 0 && hasSearched && (
          <EmptyState neteaseId={neteaseId} onReset={handleReset} />
        )}

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
