import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h4>📊 数据来源</h4>
          <ul>
            <li>各省市文化和旅游局官网 - 营业性演出准予许可公示</li>
            <li>大麦网、秀动、正在现场等票务平台</li>
            <li>小红书 @不止live 等演出资讯博主</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>⚠️ 免责声明</h4>
          <p>演出信息仅供参考，具体以官方公告和票务平台为准。</p>
          <p>本网站与网易云音乐、大麦、秀动等平台无关。</p>
        </div>
        <div className="footer-bottom">
          <p>🎵 Concert Tracker v2 · 演唱会追踪 · 数据更新 2026.06.25 · Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
