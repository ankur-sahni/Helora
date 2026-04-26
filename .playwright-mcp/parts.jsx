// Shared parts
const WA_NUMBER = '919098888134';
const WA_LINK = (msg = '') => `https://wa.me/${WA_NUMBER}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
function Spark({ size = 14, color, className }){
  return (
    <span className={'spark' + (className ? ' ' + className : '')} style={{ color: color || 'var(--ink-gold-2)' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0 L13.2 9.2 L22 10 L13.4 12 L12 24 L10.6 12 L2 10 L10.8 9.2 Z"/>
      </svg>
    </span>
  );
}
function MiniSpark({ size=8, color, className }){
  return (
    <span className={'spark' + (className ? ' ' + className : '')} style={{ color: color || 'var(--ink-gold-deep)' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
      </svg>
    </span>
  );
}
function Asterisk({ size=16, color, className }){
  return (
    <span className={'spark' + (className ? ' ' + className : '')} style={{ color: color || 'var(--ink-gold-2)' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1.4"/>
      </svg>
    </span>
  );
}
function WaIcon({ size = 28 }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.78 14.01c-.24.67-1.4 1.28-1.93 1.35-.49.07-1.11.1-1.78-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.16-1.54-1.16-2.93 0-1.4.73-2.08.99-2.37.26-.29.57-.36.76-.36l.54.01c.18.01.42-.07.66.5.24.58.83 2 .9 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.67.79 1.96.93.29.14.48.22.55.33.07.12.07.69-.18 1.36z"/>
    </svg>
  );
}
function Ph({ label, shape='rect', category, src: directSrc, objectPosition='center' }){
  const cls = shape === 'oval' ? 'oval' : shape === 'arch' ? 'arch' : 'rect';
  const sig = label.split('').reduce((a,c) => a + c.charCodeAt(0), 0);

  // Direct Unsplash CDN photo IDs — no redirect, no auth
  const pools = {
    bride: [
      '1519741497674-611481863552',
      '1583939003579-730e3918a45a',
      '1522337360788-8b13dee7a37e',
      '1508214751196-bcfd4ca60f91',
      '1511285560929-80b5a1efdb4b',
      '1515934751635-ebcfd5b21e8f',
    ],
    makeup: [
      '1519741497674-611481863552',
      '1494790108377-be9c29b29330',
      '1521577352947-9bb58764b69a',
      '1534528741775-53994a69daeb',
      '1522337360788-8b13dee7a37e',
      '1583939003579-730e3918a45a',
    ],
    woman: [
      '1494790108377-be9c29b29330',
      '1534528741775-53994a69daeb',
      '1438761681033-6461ffad8d80',
      '1524504388940-b1c1722653e1',
      '1488426862026-3ee34a7d66df',
      '1531746020798-e6953c6e8e04',
    ],
    man: [
      '1507003211169-0a1dd7228f2d',
      '1472099645785-5658abf4ff4e',
      '1500648767791-00dcc994a43e',
      '1506794778202-cad84cf45f1d',
    ],
  };

  const pool = pools[category];
  const src = directSrc
    ? directSrc
    : pool
      ? `https://images.unsplash.com/photo-${pool[sig % pool.length]}?w=600&h=800&fit=crop&q=80`
      : `https://picsum.photos/seed/${label.replace(/[^a-zA-Z0-9]/g,'-').toLowerCase()}/600/800`;

  return (
    <div className={cls}>
      <img src={src} alt={label} className="ph-img" style={{ objectPosition }}/>
    </div>
  );
}

function Nav({ onGo }){
  const [active, setActive] = React.useState('home');
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const ids = ['home','craft','makeups','featured','packages','about','awards','gallery','testimonials','contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  };
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          Ankit Sahni
          <small>Makeover · Est. 1994</small>
        </div>
        <div className={`nav-center ${menuOpen ? 'open' : ''}`}>
          <a href="#craft" onClick={go('craft')} className={active==='craft'?'active':''}>Our Craft</a>
          <a href="#makeups" onClick={go('makeups')} className={active==='makeups'?'active':''}>Makeup</a>
          <a href="#featured" onClick={go('featured')} className={active==='featured'?'active':''}>Lehenga</a>
          <a href="#packages" onClick={go('packages')} className={active==='packages'?'active':''}>Packages</a>
          <a href="#about" onClick={go('about')} className={active==='about'?'active':''}>Our Story</a>
          <a href="#awards" onClick={go('awards')} className={active==='awards'?'active':''}>Awards</a>
          <a href="#gallery" onClick={go('gallery')} className={active==='gallery'?'active':''}>Portfolio</a>
          <a href="#contact" onClick={go('contact')} className={active==='contact'?'active':''}>Contact</a>
        </div>
        <div className="nav-right">
          <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
          <a className="btn sm solid" href="#contact" onClick={go('contact')}>Book Now</a>
        </div>
      </div>
    </nav>
  );
}

function WaFab(){
  return (
    <a className="wa-fab" href={WA_LINK('Hi, I found you on ankitsahnimakeover.com and would like to enquire.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <WaIcon size={30}/>
    </a>
  );
}

function Marquee(){
  const items = ['Bridal Makeup', 'Hair Artistry', 'Pre-Bridal Skin', 'Lehenga Rentals', 'Editorial Styling', 'Since 1994'];
  const row = (
    <div className="marquee-track">
      {items.concat(items).map((t,i) => (
        <span className="marquee-item" key={i}>
          {t}<Asterisk size={14} className="marquee-ast"/>
        </span>
      ))}
    </div>
  );
  return <div className="marquee">{row}</div>;
}

Object.assign(window, { Spark, MiniSpark, Asterisk, WaIcon, Ph, Nav, WaFab, Marquee });
