// pages/feed.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/* ── Default avatar SVG (Facebook-style gray silhouette) ── */
const DefaultAvatar = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="50" fill="#D8DADF"/>
    <ellipse cx="50" cy="37" rx="18" ry="20" fill="#8A8D91"/>
    <ellipse cx="50" cy="85" rx="32" ry="22" fill="#8A8D91"/>
  </svg>
);

/* ── SVG Icons ── */
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-10 9l-5-3.5v7l5-3.5zm5 0l-5 3.5V8.5L16 12z"/>
  </svg>
);
const IconFriends = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);
const IconMarket = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M19 6H17.82C17.4 4.84 16.3 4 15 4H9C7.7 4 6.6 4.84 6.18 6H5C3.9 6 3 6.9 3 8v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7 11l-4-4h2.5V9h3v4H16l-4 4z"/>
  </svg>
);
const IconGaming = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
  </svg>
);

/* ── Sidebar nav items ── */
const NAV_ITEMS = [
  { icon: '🧠', label: 'Meta AI' },
  { icon: '👥', label: 'Bạn bè' },
  { icon: '🕐', label: 'Kỷ niệm' },
  { icon: '🔖', label: 'Đã lưu' },
  { icon: '👫', label: 'Nhóm' },
  { icon: '🎬', label: 'Thước phim' },
  { icon: '🏪', label: 'Marketplace' },
  { icon: '📰', label: 'Bảng feed' },
  { icon: '❤️', label: 'Hẹn hò' },
  { icon: '📅', label: 'Sự kiện' },
  { icon: '⬇️', label: 'Xem thêm' },
];

/* ── Story data ── */
const STORIES = [
  { emoji: '😊', name: 'Người 1', color: '#1877f2' },
  { emoji: '🌅', name: 'Người 2', color: '#e91e63' },
  { emoji: '🎉', name: 'Người 3', color: '#ff9800' },
  { emoji: '🐱', name: 'Người 4', color: '#4caf50' },
];

export default function Feed() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('fb_name') || '';
    const userId = localStorage.getItem('fb_userId');
    if (!userId) {
      router.replace('/');
    } else {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fb_name');
    localStorage.removeItem('fb_userId');
    router.replace('/');
  };

  return (
    <>
      <Head>
        <title>Fakebook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="fb-wrap">

        {/* ══ TOP NAVBAR ══ */}
        <nav className="fb-nav">
          {/* Left */}
          <div className="fb-nav-left">
            <div className="fb-logo-circle">f</div>
            <div className="fb-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="#606770" strokeWidth="2" width="16" height="16">
                <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
              </svg>
              <input type="text" placeholder="Tìm kiếm trên Fakebook" readOnly />
            </div>
          </div>

          {/* Center icons */}
          <div className="fb-nav-center">
            <button className="fb-nav-btn active" title="Trang chủ">
              <IconHome />
              <div className="fb-nav-underline" />
            </button>
            <button className="fb-nav-btn" title="Video"><IconVideo /></button>
            <button className="fb-nav-btn" title="Bạn bè"><IconFriends /></button>
            <button className="fb-nav-btn" title="Marketplace"><IconMarket /></button>
            <button className="fb-nav-btn" title="Gaming"><IconGaming /></button>
          </div>

          {/* Right */}
          <div className="fb-nav-right">
            <div className="fb-nav-user" onClick={handleLogout} title="Đăng xuất">
              <DefaultAvatar size={36} />
              <span className="fb-nav-name">{userName}</span>
            </div>
            <button className="fb-icon-btn" title="Menu">
              <svg viewBox="0 0 24 24" fill="#050505" width="18" height="18">
                <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
              </svg>
            </button>
            <button className="fb-icon-btn" title="Messenger">
              <svg viewBox="0 0 24 24" fill="#050505" width="18" height="18">
                <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.34.27.56l.05 1.73c.04.47.52.77.95.59l1.93-.85c.16-.07.34-.09.51-.05.63.17 1.29.26 1.97.26C16.52 21.11 22 16.84 22 11.7S17.64 2 12 2zM18 9.5l-2.78 4.4c-.45.71-1.44.9-2.1.4l-2.21-1.66a.6.6 0 00-.72 0L7.6 14.1c-.38.29-.88-.17-.63-.59l2.78-4.4c.45-.71 1.44-.9 2.1-.4l2.21 1.66a.6.6 0 00.72 0l2.59-1.96c.38-.29.88.17.63.59z"/>
              </svg>
            </button>
            <button className="fb-icon-btn" title="Thông báo">
              <svg viewBox="0 0 24 24" fill="#050505" width="18" height="18">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10.5 3.17 10.5 4v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* ══ BODY ══ */}
        <div className="fb-body">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="fb-sidebar">
            {/* User row */}
            <div className="fb-sidebar-user" onClick={handleLogout}>
              <DefaultAvatar size={36} />
              <span>{userName}</span>
            </div>

            <div className="fb-divider" />

            {NAV_ITEMS.map(({ icon, label }) => (
              <div key={label} className="fb-sidebar-item">
                <span className="fb-sidebar-icon">{icon}</span>
                <span className="fb-sidebar-label">{label}</span>
              </div>
            ))}

            <div className="fb-divider" />
            <div className="fb-sidebar-footer">
              Quyền riêng tư · Điều khoản · Quảng cáo<br />
              Cookie · Xem thêm<br />
              © 2026 Fakebook
            </div>
          </aside>

          {/* ── CENTER FEED ── */}
          <main className="fb-feed">

            {/* ━━━ STORY BAR ━━━ */}
            <div className="fb-story-bar">
              {/* Tạo tin */}
              <div className="fb-story-create">
                <div className="fb-story-bg">
                  <DefaultAvatar size={56} />
                  <div className="fb-story-plus">+</div>
                </div>
                <span>Tạo tin</span>
              </div>

              {STORIES.map((s, i) => (
                <div key={i} className="fb-story-item">
                  <div className="fb-story-bg" style={{ background: `linear-gradient(160deg, ${s.color}99 0%, ${s.color} 100%)` }}>
                    <div className="fb-story-emoji">{s.emoji}</div>
                    <div className="fb-story-av-ring" style={{ borderColor: s.color }}>
                      <DefaultAvatar size={30} />
                    </div>
                  </div>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>

            {/* ━━━ POST COMPOSER ━━━ */}
            <div className="fb-composer">
              <DefaultAvatar size={42} />
              <div className="fb-composer-input">
                {userName ? `${userName} ơi, bạn đang nghĩ gì thế?` : 'Bạn đang nghĩ gì thế?'}
              </div>
            </div>

            {/* ━━━ THE MAIN POST ━━━ */}
            <article className="fb-post">

              {/* Post header */}
              <div className="fb-post-header">
                <div className="fb-post-av-wrap">
                  <div className="fb-post-av-emoji">🎭</div>
                </div>
                <div className="fb-post-meta">
                  <div className="fb-post-name">Chúc mừng bạn đã bị lừa</div>
                  <div className="fb-post-time">Vừa xong · 🌐</div>
                </div>
                <button className="fb-post-more">
                  <svg viewBox="0 0 24 24" fill="#65676B" width="20" height="20">
                    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
              </div>

              {/* Post text */}
              <div className="fb-post-text">
                sản phẩm này là sản phẩm hư cấu phục vụ cho mục đích học tập
              </div>

              {/* VIDEO SLOT */}
              <div className="fb-video-slot">
                {/* ===== DÁN THẺ VIDEO VÀO ĐÂY ===== */}
                {/*
                  YouTube: <iframe width="100%" height="420" src="https://www.youtube.com/embed/VIDEO_ID" frameBorder="0" allowFullScreen />
                  MP4:     <video controls width="100%"><source src="/ten-video.mp4" type="video/mp4" /></video>
                */}
                <div className="fb-video-placeholder">
                  <div className="fb-video-play-icon">
                    <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p>Video sẽ hiện ở đây</p>
                </div>
              </div>

              {/* Post stats */}
              <div className="fb-post-stats">
                <span className="fb-stat-reactions">
                  <span className="fb-react-icon">👍</span>
                  <span className="fb-react-icon">😂</span>
                  <span className="fb-react-icon">❤️</span>
                  <span>1,2K</span>
                </span>
                <span className="fb-stat-right">86 bình luận · 234 lượt chia sẻ</span>
              </div>

              <div className="fb-post-divider" />

              {/* Post actions */}
              <div className="fb-post-actions">
                <button className="fb-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.8" width="20" height="20">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                  <span>Thích</span>
                </button>
                <button className="fb-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.8" width="20" height="20">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>Bình luận</span>
                </button>
                <button className="fb-action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#65676B" strokeWidth="1.8" width="20" height="20">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </article>

          </main>

        </div>
      </div>

      <style jsx>{`
        /* ══════════════════════════════
           LIGHT MODE RESET
        ══════════════════════════════ */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #f0f2f5;
          color: #050505;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        /* ══════════════════════════════
           WRAPPER
        ══════════════════════════════ */
        .fb-wrap { min-height: 100vh; background: #f0f2f5; }

        /* ══════════════════════════════
           TOP NAVBAR – white
        ══════════════════════════════ */
        .fb-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 56px;
          background: #fff;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 12px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.12);
        }

        .fb-nav-left { display: flex; align-items: center; gap: 8px; min-width: 240px; }
        .fb-logo-circle {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1877f2;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.5rem; font-weight: 900;
          flex-shrink: 0;
        }
        .fb-search-box {
          display: flex; align-items: center; gap: 8px;
          background: #f0f2f5; border-radius: 999px;
          padding: 7px 14px; min-width: 220px;
        }
        .fb-search-box input {
          background: none; border: none; outline: none;
          color: #050505; font-size: 0.875rem; width: 100%;
        }

        .fb-nav-center { display: flex; align-items: center; gap: 8px; }
        .fb-nav-btn {
          position: relative;
          background: none; border: none; cursor: pointer;
          color: #65676B; border-radius: 10px;
          padding: 8px 48px;
          transition: background 0.15s, color 0.15s;
          display: flex; flex-direction: column; align-items: center;
          min-width: 120px;
        }
        .fb-nav-btn:hover { background: #f0f2f5; color: #1877f2; }
        .fb-nav-btn.active { color: #1877f2; }
        .fb-nav-underline {
          position: absolute; bottom: -2px; left: 0; right: 0; height: 3px;
          background: #1877f2; border-radius: 999px;
        }

        .fb-nav-right {
          display: flex; align-items: center; gap: 8px;
          min-width: 240px; justify-content: flex-end;
        }
        .fb-nav-user {
          display: flex; align-items: center; gap: 6px;
          cursor: pointer; border-radius: 999px;
          padding: 4px 8px; transition: background 0.15s;
        }
        .fb-nav-user:hover { background: #f0f2f5; }
        .fb-nav-name { font-size: 0.85rem; font-weight: 600; color: #050505; }
        .fb-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: #e4e6eb; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .fb-icon-btn:hover { background: #d8dadf; }

        /* ══════════════════════════════
           BODY
        ══════════════════════════════ */
        .fb-body {
          padding-top: 56px;
          display: flex;
          min-height: 100vh;
        }

        /* ══════════════════════════════
           LEFT SIDEBAR – white, light
        ══════════════════════════════ */
        .fb-sidebar {
          width: 280px; min-width: 280px;
          position: fixed; top: 56px; left: 0; bottom: 0;
          overflow-y: auto; padding: 12px 8px 24px;
          background: transparent;
          scrollbar-width: thin;
        }
        .fb-sidebar-user {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 10px; cursor: pointer;
          transition: background 0.15s;
        }
        .fb-sidebar-user:hover { background: #e4e6eb; }
        .fb-sidebar-user span { font-weight: 600; font-size: 0.95rem; color: #050505; }

        .fb-divider { height: 1px; background: #d8dadf; margin: 10px 8px; }

        .fb-sidebar-item {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 10px; border-radius: 10px; cursor: pointer;
          transition: background 0.15s;
        }
        .fb-sidebar-item:hover { background: #e4e6eb; }
        .fb-sidebar-icon { font-size: 1.3rem; width: 28px; text-align: center; }
        .fb-sidebar-label { font-size: 0.93rem; font-weight: 500; color: #050505; }

        .fb-sidebar-footer {
          font-size: 0.7rem; color: #8a8d91; padding: 0 10px;
          line-height: 1.8;
        }

        /* ══════════════════════════════
           CENTER FEED
        ══════════════════════════════ */
        .fb-feed {
          flex: 1;
          margin-left: 280px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 100%;
        }

        /* ━━ STORY BAR ━━ */
        .fb-story-bar {
          display: flex; gap: 10px;
          width: 100%; max-width: 680px;
          background: #fff; border-radius: 12px; padding: 14px 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          overflow-x: auto; scrollbar-width: none;
        }
        .fb-story-create,
        .fb-story-item {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; cursor: pointer; min-width: 110px;
          border-radius: 12px; overflow: hidden;
          transition: transform 0.15s;
          flex-shrink: 0;
        }
        .fb-story-create:hover,
        .fb-story-item:hover { transform: scale(1.03); }
        .fb-story-bg {
          width: 110px; height: 180px; border-radius: 12px;
          background: #e4e6eb;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .fb-story-plus {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          width: 28px; height: 28px; border-radius: 50%;
          background: #1877f2; color: white; font-size: 1.3rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff;
        }
        .fb-story-emoji {
          font-size: 3.5rem; position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -60%);
        }
        .fb-story-av-ring {
          position: absolute; top: 10px; left: 10px;
          border: 3px solid #1877f2; border-radius: 50%;
          padding: 1px;
        }
        .fb-story-bar span {
          font-size: 0.75rem; font-weight: 600; color: #050505;
          text-align: center; padding-bottom: 4px;
        }

        /* ━━ COMPOSER ━━ */
        .fb-composer {
          display: flex; align-items: center; gap: 10px;
          width: 100%; max-width: 680px;
          background: #fff; border-radius: 12px; padding: 12px 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .fb-composer-input {
          flex: 1; background: #f0f2f5; border-radius: 999px;
          padding: 10px 18px; color: #65676B;
          font-size: 0.95rem; cursor: pointer;
          transition: background 0.15s;
        }
        .fb-composer-input:hover { background: #e4e6eb; }

        /* ━━ POST ━━ */
        .fb-post {
          width: 100%; max-width: 680px;
          background: #fff; border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .fb-post-header {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px 10px;
        }
        .fb-post-av-wrap { flex-shrink: 0; }
        .fb-post-av-emoji {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
        }
        .fb-post-meta { flex: 1; }
        .fb-post-name { font-weight: 700; font-size: 0.95rem; color: #050505; }
        .fb-post-time { font-size: 0.75rem; color: #65676B; margin-top: 1px; }
        .fb-post-more {
          background: none; border: none; cursor: pointer;
          padding: 6px 8px; border-radius: 50%;
          transition: background 0.15s; display: flex;
        }
        .fb-post-more:hover { background: #f0f2f5; }

        .fb-post-text {
          padding: 4px 16px 12px;
          font-size: 0.95rem; color: #050505; line-height: 1.5;
        }

        /* BIG TITLE */
        .fb-post-big-title {
          background: linear-gradient(135deg, #1877f2 0%, #0d5bbf 100%);
          color: #fff;
          font-size: 1.6rem;
          font-weight: 800;
          text-align: center;
          padding: 22px 20px;
          line-height: 1.4;
          letter-spacing: 0.01em;
        }

        /* VIDEO SLOT */
        .fb-video-slot { width: 100%; background: #000; }
        .fb-video-slot iframe,
        .fb-video-slot video {
          width: 100%; display: block; max-height: 500px;
        }
        .fb-video-placeholder {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 380px; background: #18191a;
          gap: 12px; color: #8a8d91;
        }
        .fb-video-play-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
        }
        .fb-video-placeholder p { font-size: 0.85rem; color: #8a8d91; }

        /* Post stats */
        .fb-post-stats {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 16px; font-size: 0.82rem; color: #65676B;
        }
        .fb-stat-reactions { display: flex; align-items: center; gap: 2px; }
        .fb-react-icon { font-size: 1rem; }
        .fb-stat-right { font-size: 0.82rem; color: #65676B; }

        .fb-post-divider { height: 1px; background: #e4e6eb; margin: 0 16px; }

        /* Post actions */
        .fb-post-actions { display: flex; gap: 2px; padding: 4px 8px 8px; }
        .fb-action-btn {
          flex: 1; background: none; border: none; border-radius: 8px;
          color: #65676B; font-size: 0.88rem; font-weight: 600;
          padding: 8px 4px; cursor: pointer; transition: background 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-family: inherit;
        }
        .fb-action-btn:hover { background: #f0f2f5; color: #050505; }
        .fb-action-btn:hover svg { stroke: #050505; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media (max-width: 1000px) {
          .fb-sidebar { display: none; }
          .fb-feed { margin-left: 0; padding: 16px 8px; }
          .fb-nav-center { display: none; }
          .fb-nav-name { display: none; }
          .fb-story-bar, .fb-composer, .fb-post { max-width: 100%; }
        }
      `}</style>
    </>
  );
}
