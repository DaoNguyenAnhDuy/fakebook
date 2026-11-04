// pages/feed.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
          {/* Left: logo + search */}
          <div className="fb-nav-left">
            <div className="fb-logo-circle">f</div>
            <div className="fb-search-box">
              <span className="fb-search-icon">🔍</span>
              <input type="text" placeholder="Tìm kiếm trên Fakebook" readOnly />
            </div>
          </div>

          {/* Center: nav icons */}
          <div className="fb-nav-center">
            <button className="fb-nav-btn active" title="Trang chủ">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <div className="fb-nav-underline" />
            </button>
            <button className="fb-nav-btn" title="Video">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </button>
            <button className="fb-nav-btn" title="Bạn bè">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </button>
            <button className="fb-nav-btn" title="Marketplace">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M20 4H4v2l8 5 8-5V4zm0 4.236l-8 5-8-5V20h16V8.236z"/>
              </svg>
            </button>
            <button className="fb-nav-btn" title="Gaming">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
              </svg>
            </button>
          </div>

          {/* Right: user actions */}
          <div className="fb-nav-right">
            <div className="fb-nav-avatar" onClick={handleLogout} title="Đăng xuất">
              {userName ? userName[0].toUpperCase() : 'U'}
            </div>
            <div className="fb-nav-name">{userName}</div>
            <button className="fb-icon-btn" title="Menu">⋯</button>
            <button className="fb-icon-btn" title="Messenger">💬</button>
            <button className="fb-icon-btn" title="Thông báo">🔔</button>
          </div>
        </nav>

        {/* ══ BODY ══ */}
        <div className="fb-body">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="fb-sidebar">
            <div className="fb-sidebar-user">
              <div className="fb-sav">{userName ? userName[0].toUpperCase() : 'U'}</div>
              <span>{userName}</span>
            </div>
            <div className="fb-divider" />
            {[
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
            ].map(({ icon, label }) => (
              <div key={label} className="fb-sidebar-item">
                <span className="fb-sidebar-icon">{icon}</span>
                <span className="fb-sidebar-label">{label}</span>
              </div>
            ))}
            <div className="fb-divider" />
            <div className="fb-sidebar-footer">
              Quyền riêng tư · Điều khoản · Quảng cáo · Cookie · Xem thêm<br />
              © 2026 Fakebook
            </div>
          </aside>

          {/* ── CENTER FEED ── */}
          <main className="fb-feed">

            {/* Story bar */}
            <div className="fb-story-bar">
              <div className="fb-story-create">
                <div className="fb-story-av create">{userName ? userName[0].toUpperCase() : 'U'}</div>
                <span>Tạo tin</span>
              </div>
              {['😊', '🌅', '🎉', '🐱'].map((em, i) => (
                <div key={i} className="fb-story-item">
                  <div className="fb-story-av story">{em}</div>
                  <span>Người {i + 1}</span>
                </div>
              ))}
            </div>

            {/* Post composer */}
            <div className="fb-composer">
              <div className="fb-sav small">{userName ? userName[0].toUpperCase() : 'U'}</div>
              <div className="fb-composer-input">{userName ? `${userName} ơi, bạn đang nghĩ gì thế?` : 'Bạn đang nghĩ gì thế?'}</div>
            </div>

            {/* ━━━ THE MAIN POST ━━━ */}
            <article className="fb-post">
              {/* Post header */}
              <div className="fb-post-header">
                <div className="fb-post-av">🎭</div>
                <div className="fb-post-meta">
                  <div className="fb-post-name">Xem cái này không phí tiền mạng đi</div>
                  <div className="fb-post-time">Vừa xong · 🌐</div>
                </div>
                <div className="fb-post-more">···</div>
              </div>

              {/* Post text */}
              <div className="fb-post-text">
                Nó hồi hộp mà nó nôn nao 😂
              </div>

              {/* BIG TITLE hiển thị trên video – giống ảnh mẫu */}
              <div className="fb-post-big-title">
                Chúc mừng bạn đã bị lừa
              </div>

              {/* VIDEO PLACEHOLDER – thay thế bằng video thật sau */}
              <div className="fb-video-slot">
                {/* ===== DÁN THẺ VIDEO VÀO ĐÂY ===== */}
                {/*
                  Ví dụ YouTube:
                  <iframe
                    width="100%" height="400"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  Ví dụ video tự host:
                  <video controls width="100%">
                    <source src="/ten-video.mp4" type="video/mp4" />
                  </video>
                */}
                <div className="fb-video-placeholder">
                  <div className="fb-video-play-icon">▶</div>
                  <p>Video sẽ hiện ở đây</p>
                </div>
              </div>

              {/* Post stats */}
              <div className="fb-post-stats">
                <span>❤️😂👍 1,2K</span>
                <span>86 bình luận · 234 lượt chia sẻ</span>
              </div>
              <div className="fb-post-divider" />

              {/* Post actions */}
              <div className="fb-post-actions">
                <button className="fb-action-btn">👍 Thích</button>
                <button className="fb-action-btn">💬 Bình luận</button>
                <button className="fb-action-btn">↗ Chia sẻ</button>
              </div>
            </article>

          </main>

        </div>
      </div>

      <style jsx>{`
        /* ══════════════════════════════
           GLOBAL RESET
        ══════════════════════════════ */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #18191a; color: #e4e6eb; font-family: 'Inter', sans-serif; }

        /* ══════════════════════════════
           LAYOUT WRAPPER
        ══════════════════════════════ */
        .fb-wrap { min-height: 100vh; background: #18191a; }

        /* ══════════════════════════════
           TOP NAVBAR
        ══════════════════════════════ */
        .fb-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 56px;
          background: #242526;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 12px;
          box-shadow: 0 1px 0 rgba(0,0,0,0.5);
        }
        .fb-nav-left { display: flex; align-items: center; gap: 8px; min-width: 220px; }
        .fb-logo-circle {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1877f2;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 1.5rem; font-weight: 900;
          flex-shrink: 0;
        }
        .fb-search-box {
          display: flex; align-items: center; gap: 6px;
          background: #3a3b3c; border-radius: 999px;
          padding: 6px 12px; min-width: 220px;
        }
        .fb-search-box input {
          background: none; border: none; outline: none;
          color: #e4e6eb; font-size: 0.875rem; width: 100%;
        }
        .fb-search-icon { font-size: 0.85rem; color: #b0b3b8; }

        .fb-nav-center { display: flex; align-items: center; gap: 4px; }
        .fb-nav-btn {
          position: relative;
          background: none; border: none; cursor: pointer;
          color: #b0b3b8; border-radius: 10px;
          padding: 8px 28px;
          transition: background 0.15s, color 0.15s;
          display: flex; flex-direction: column; align-items: center;
        }
        .fb-nav-btn:hover { background: #3a3b3c; color: #e4e6eb; }
        .fb-nav-btn.active { color: #1877f2; }
        .fb-nav-underline {
          position: absolute; bottom: -2px; left: 0; right: 0; height: 3px;
          background: #1877f2; border-radius: 999px;
        }

        .fb-nav-right { display: flex; align-items: center; gap: 8px; min-width: 220px; justify-content: flex-end; }
        .fb-nav-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 700; cursor: pointer; font-size: 0.95rem;
        }
        .fb-nav-name { font-size: 0.82rem; font-weight: 600; color: #e4e6eb; }
        .fb-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: #3a3b3c; border: none; cursor: pointer;
          color: #e4e6eb; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .fb-icon-btn:hover { background: #4e4f50; }

        /* ══════════════════════════════
           BODY
        ══════════════════════════════ */
        .fb-body {
          padding-top: 56px;
          display: flex;
          min-height: 100vh;
        }

        /* ══════════════════════════════
           LEFT SIDEBAR
        ══════════════════════════════ */
        .fb-sidebar {
          width: 280px; min-width: 280px;
          position: fixed; top: 56px; left: 0; bottom: 0;
          overflow-y: auto; padding: 12px 8px 24px;
          scrollbar-width: thin; scrollbar-color: #3a3b3c transparent;
        }
        .fb-sidebar-user {
          display: flex; align-items: center; gap: 10px;
          padding: 8px; border-radius: 10px; cursor: pointer;
          transition: background 0.15s;
        }
        .fb-sidebar-user:hover { background: #3a3b3c; }
        .fb-sav {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 700; font-size: 0.95rem; flex-shrink: 0;
        }
        .fb-sav.small { width: 40px; height: 40px; font-size: 1rem; }
        .fb-sidebar-user span { font-weight: 600; font-size: 0.95rem; }

        .fb-divider { height: 1px; background: #3a3b3c; margin: 10px 8px; }

        .fb-sidebar-item {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 10px; border-radius: 10px; cursor: pointer;
          transition: background 0.15s;
        }
        .fb-sidebar-item:hover { background: #3a3b3c; }
        .fb-sidebar-icon { font-size: 1.3rem; width: 28px; text-align: center; }
        .fb-sidebar-label { font-size: 0.93rem; font-weight: 500; }

        .fb-sidebar-footer {
          font-size: 0.7rem; color: #6b6b6b; padding: 0 10px;
          line-height: 1.6;
        }

        /* ══════════════════════════════
           CENTER FEED
        ══════════════════════════════ */
        .fb-feed {
          flex: 1;
          margin-left: 280px;
          padding: 24px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 100%;
        }

        /* ── Story bar ── */
        .fb-story-bar {
          display: flex; gap: 10px;
          width: 100%; max-width: 600px;
          background: #242526; border-radius: 14px; padding: 12px;
          overflow-x: auto; scrollbar-width: none;
        }
        .fb-story-create, .fb-story-item {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; cursor: pointer; min-width: 90px;
          border-radius: 12px; overflow: hidden; background: #3a3b3c;
          padding: 10px 6px; transition: background 0.15s;
        }
        .fb-story-create:hover, .fb-story-item:hover { background: #4e4f50; }
        .fb-story-av {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
        }
        .fb-story-av.create {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white; font-weight: 700; font-size: 1.1rem;
        }
        .fb-story-av.story { background: #18191a; }
        .fb-story-bar span { font-size: 0.72rem; font-weight: 600; color: #b0b3b8; text-align: center; }

        /* ── Composer ── */
        .fb-composer {
          display: flex; align-items: center; gap: 10px;
          width: 100%; max-width: 600px;
          background: #242526; border-radius: 14px; padding: 12px 16px;
        }
        .fb-composer-input {
          flex: 1; background: #3a3b3c; border-radius: 999px;
          padding: 10px 16px; color: #b0b3b8;
          font-size: 0.95rem; cursor: pointer;
        }

        /* ── Post ── */
        .fb-post {
          width: 100%; max-width: 600px;
          background: #242526; border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .fb-post-header {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px 8px;
        }
        .fb-post-av {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; flex-shrink: 0;
        }
        .fb-post-meta { flex: 1; }
        .fb-post-name { font-weight: 700; font-size: 0.95rem; color: #e4e6eb; }
        .fb-post-time { font-size: 0.75rem; color: #b0b3b8; margin-top: 2px; }
        .fb-post-more { color: #b0b3b8; font-size: 1.3rem; cursor: pointer; padding: 4px 8px; border-radius: 6px; }
        .fb-post-more:hover { background: #3a3b3c; }

        .fb-post-text { padding: 4px 16px 12px; font-size: 0.95rem; color: #e4e6eb; line-height: 1.5; }

        /* ── VIDEO SLOT ── */
        .fb-video-slot { width: 100%; background: #000; }
        .fb-post-big-title {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
          font-size: 1.5rem;
          font-weight: 800;
          text-align: center;
          padding: 20px 16px;
          line-height: 1.4;
          letter-spacing: 0.01em;
        }
        .fb-video-slot iframe,
        .fb-video-slot video {
          width: 100%; display: block; max-height: 500px;
        }
        .fb-video-placeholder {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 360px; background: #111;
          gap: 12px; color: #6b6b6b;
        }
        .fb-video-play-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; color: #b0b3b8;
        }
        .fb-video-placeholder p { font-size: 0.85rem; color: #6b6b6b; }

        .fb-post-stats {
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 16px; font-size: 0.82rem; color: #b0b3b8;
        }
        .fb-post-divider { height: 1px; background: #3a3b3c; margin: 0 16px; }
        .fb-post-actions {
          display: flex; gap: 4px; padding: 4px 8px 8px;
        }
        .fb-action-btn {
          flex: 1; background: none; border: none; border-radius: 8px;
          color: #b0b3b8; font-size: 0.9rem; font-weight: 600;
          padding: 8px; cursor: pointer; transition: background 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .fb-action-btn:hover { background: #3a3b3c; color: #e4e6eb; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media (max-width: 900px) {
          .fb-sidebar { display: none; }
          .fb-feed { margin-left: 0; padding: 16px 8px; }
          .fb-nav-center { display: none; }
          .fb-nav-name { display: none; }
        }
      `}</style>
    </>
  );
}
