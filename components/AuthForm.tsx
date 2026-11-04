// components/AuthForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

type Mode = 'login' | 'register';

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    identifier: '',
    email: '',
    phone: '',
    name: '',
    age: '',
    address: '',
    cccd: '',
    password: '',
    password2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg(null);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setMsg(null);
    setShowPass(false);
    setShowPass2(false);
    setForm({
      identifier: '', email: '', phone: '', name: '',
      age: '', address: '', cccd: '', password: '', password2: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: form.identifier, password: form.password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('fb_name', data.name);
          localStorage.setItem('fb_userId', String(data.userId));
          router.push('/feed');
        } else {
          setMsg({ type: 'error', text: data.error || 'Email/SĐT hoặc mật khẩu không đúng.' });
        }
      } else {
        if (form.password !== form.password2) {
          setMsg({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
          setLoading(false);
          return;
        }
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            phone: form.phone,
            name: form.name,
            age: Number(form.age),
            address: form.address,
            cccd: form.cccd,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setMsg({ type: 'success', text: `Tài khoản được tạo thành công!` });
          setTimeout(() => switchMode('login'), 1500);
        } else {
          setMsg({ type: 'error', text: data.error || 'Đăng ký thất bại. Vui lòng thử lại.' });
        }
      }
    } catch {
      setMsg({ type: 'error', text: 'Lỗi kết nối, vui lòng thử lại.' });
    }
    setLoading(false);
  };

  return (
    <div className="card-auth">
      <h2>{mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h2>
      <p className="subtitle">
        {mode === 'login'
          ? 'Đăng nhập để xem những gì bạn bè vừa chia sẻ.'
          : 'Nhanh chóng và dễ dàng.'}
      </p>

      {/* Tabs */}
      <div className="tab-row">
        <button
          type="button"
          className={`tab-btn${mode === 'login' ? ' active' : ''}`}
          onClick={() => switchMode('login')}
        >
          Đăng nhập
        </button>
        <button
          type="button"
          className={`tab-btn${mode === 'register' ? ' active' : ''}`}
          onClick={() => switchMode('register')}
        >
          Tạo tài khoản
        </button>
      </div>

      {/* Toast */}
      {msg && <div className={`toast ${msg.type}`}>{msg.text}</div>}

      <form onSubmit={handleSubmit}>
        {mode === 'login' ? (
          <>
            {/* Email / Phone */}
            <div className="field">
              <label htmlFor="identifier">Email hoặc số điện thoại</label>
              <div className="input-wrap">
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="Email hoặc số điện thoại"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-wrap has-eye">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                  aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPass ? (
                    /* eye-off */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    /* eye */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="extras">
              <label className="remember">
                <input type="checkbox" checked={remember} onChange={() => setRemember(v => !v)} />
                Ghi nhớ đăng nhập
              </label>
              <a className="forgot">Quên mật khẩu?</a>
            </div>
          </>
        ) : (
          <>
            {/* Email */}
            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <input type="email" id="email" name="email" placeholder="ban@example.com"
                  value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Phone + Age */}
            <div className="row-inline">
              <div className="field">
                <label htmlFor="phone">Số điện thoại</label>
                <div className="input-wrap">
                  <input type="tel" id="phone" name="phone" placeholder="0912345678"
                    value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="age">Tuổi</label>
                <div className="input-wrap">
                  <input type="number" id="age" name="age" placeholder="25"
                    value={form.age} onChange={handleChange} min={1} max={120} required />
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="field">
              <label htmlFor="name">Họ và tên</label>
              <div className="input-wrap">
                <input type="text" id="name" name="name" placeholder="Nguyễn Văn A"
                  value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Address */}
            <div className="field">
              <label htmlFor="address">Địa chỉ</label>
              <div className="input-wrap">
                <input type="text" id="address" name="address" placeholder="123 Đường ABC, TP.HCM"
                  value={form.address} onChange={handleChange} required />
              </div>
            </div>

            {/* CCCD */}
            <div className="field">
              <label htmlFor="cccd">Số CCCD</label>
              <div className="input-wrap">
                <input type="text" id="cccd" name="cccd" placeholder="012345678901"
                  value={form.cccd} onChange={handleChange} maxLength={12} required />
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-wrap has-eye">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="password" name="password"
                  placeholder="Tối thiểu 8 ký tự"
                  value={form.password} onChange={handleChange}
                  minLength={8} required autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                  {showPass ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="field">
              <label htmlFor="password2">Xác nhận mật khẩu</label>
              <div className="input-wrap has-eye">
                <input
                  type={showPass2 ? 'text' : 'password'}
                  id="password2" name="password2"
                  placeholder="Nhập lại mật khẩu"
                  value={form.password2} onChange={handleChange}
                  minLength={8} required autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass2(v => !v)} tabIndex={-1}>
                  {showPass2 ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </button>
      </form>

      {mode === 'login' && (
        <>
          <hr className="divider" />
          <div className="auth-footer">
            Chưa có tài khoản?{' '}
            <a onClick={() => switchMode('register')}>Tạo tài khoản mới</a>
          </div>
        </>
      )}

      {mode === 'register' && (
        <div className="auth-footer" style={{ marginTop: '0.8rem' }}>
          Đã có tài khoản?{' '}
          <a onClick={() => switchMode('login')}>Đăng nhập</a>
        </div>
      )}
    </div>
  );
}
