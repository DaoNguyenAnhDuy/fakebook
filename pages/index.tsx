// pages/index.tsx
import Head from 'next/head';
import Collage from '../components/Collage';
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fakebook – Khám phá những điều bạn yêu thích</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">

        {/* ── LEFT 60% ── */}
        <div className="left">

          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-icon">f</div>
            <span className="logo-text">Fakebook</span>
          </div>

          {/* Collage */}
          <Collage />

          {/* Slogan */}
          <div className="slogan">
            <span className="ln">Khám phá</span>
            <span className="ln">những điều</span>
            <span className="lna">bạn yêu thích.</span>
          </div>

        </div>

        {/* ── RIGHT 40% ── */}
        <div className="right">
          <AuthForm />
        </div>

      </div>
    </>
  );
}
