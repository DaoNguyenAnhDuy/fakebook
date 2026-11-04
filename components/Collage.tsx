// components/Collage.tsx
import React from 'react';

export default function Collage() {
  return (
    <div className="collage">

      {/* ── Floating emoji badge – top centre ── */}
      <div className="badge-float badge-emoji">😆</div>

      {/* ── Card B – craft / knot (back left) ── */}
      <div className="sc sc-b">
        <div className="ph">
          <span className="big-emoji">🧶</span>
        </div>
        <div className="card-foot">
          <span className="label">🌟 Nổi bật</span>
          <span className="bk">🔖</span>
        </div>
      </div>

      {/* ── Card D – story pill (right side) ── */}
      <div className="sc sc-d">
        <div className="ph">
          <span className="live-pill">128 lượt xem</span>
          <div className="play">▶</div>
          <div className="vid-title">Chiều muộn</div>
          <div className="vid-sub">Hà My</div>
        </div>
      </div>

      {/* ── Card A – main portrait (centre) ── */}
      <div className="sc sc-a">
        <div className="ph">
          <span className="big-emoji">🛹</span>
          <span className="time-pill">⏰ 16:45</span>
          <div className="bar"><span /></div>
        </div>
        <div className="info">
          <div className="name">Lan Anh</div>
          <div className="sub">2 phút trước · Đà Lạt</div>
          <div className="stats">
            <span>❤️ 1,2K</span>
            <span>💬 86</span>
          </div>
        </div>
      </div>

      {/* ── Mini stats card (bottom right) ── */}
      <div className="sc sc-e">
        <span className="stat-icon">📊</span>
        <div className="stat-info">
          <div className="val">Đà Nẵng</div>
          <div className="lbl">Chiều Muộn · Hà My</div>
        </div>
      </div>

      {/* ── Card C – comment card (bottom left) ── */}
      <div className="sc sc-c">
        <div className="user-row">
          <div className="av" style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>🧑</div>
          <div className="user-info">
            <div className="name">Minh Khoa</div>
            <div className="time">vừa xong</div>
          </div>
        </div>
        <div className="msg">Chỗ này đẹp quá, cuối tuần đi cùng nhau thôi! 😍</div>
        <div className="react-row">
          <span className="rpill">❤️ 24</span>
          <span className="rpill">😊 12</span>
          <span className="rpill">🔥 8</span>
        </div>
      </div>

      {/* ── Heart badge floating ── */}
      <div className="badge-float badge-heart">❤️</div>

      {/* ── Avatar stack – bottom left ── */}
      <div className="av-stack">
        <div className="av-item">😊</div>
        <div className="av-item">🧑</div>
        <div className="av-item">👩</div>
        <div className="av-more">+99</div>
      </div>

    </div>
  );
}
