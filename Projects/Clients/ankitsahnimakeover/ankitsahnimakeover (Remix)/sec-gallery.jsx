// Gallery + Before/After + Testimonials
function Gallery(){
  const filters = [
    { id:'all', label:'All Work' },
    { id:'bridal', label:'Bridal' },
    { id:'hair', label:'Hair' },
    { id:'skin', label:'Skin' },
    { id:'rentals', label:'Lehenga Rentals' },
  ];
  const [f, setF] = React.useState('all');
  const items = [
    { c:'bridal', l:'Riya · Sangeet',     src:'images/8d185173-7dbc-4f02-a0c4-77ab29a14c42.webp' },
    { c:'bridal', l:'Priyanka · Phere',   src:'images/a88efb12-402b-4cac-a38c-4b3b6d9a627c.webp' },
    { c:'skin',   l:'Glow Ritual',        src:'images/3AA4BC7A-216C-4B80-B3F1-1EE6A60060D4.webp' },
    { c:'rentals',l:'Maroon Couture',     src:'images/5A4DE80C-1F99-4624-82E8-6D2148D77CFF.webp' },
    { c:'bridal', l:'Ayesha · Haldi',     src:'images/2D8739FF-C55F-4D95-B04A-E29B3AC8C8E0.webp' },
    { c:'hair',   l:'Editorial Up-do',    src:'images/bride-red-dramatic.webp' },
    { c:'rentals',l:'Ivory Sabyasachi',   src:'images/5178A46F-65D1-48D1-BE98-D1C9DEF32798.webp' },
    { c:'bridal', l:'Simran · Reception', src:'images/A4B5BD18-40A6-4EF6-973A-DAD35885BAB9.webp' },
    { c:'bridal', l:'Neha · Mehendi',     src:'images/626BE2E0-A66D-4C58-8734-DC276FAAB916.webp' },
    { c:'rentals',l:'Blush Gold',         src:'images/8C40A53F-C748-45CE-8B42-E42E5594BECC.webp' },
  ];
  const filtered = items.filter(i => f === 'all' || i.c === f);
  return (
    <section id="gallery" className="gallery container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Our Work · Real Brides</div>
          <h2 className="serif">
            The <span className="it">Portfolio</span>
          </h2>
        </div>
        <p className="mute">
          Four hundred brides, three decades of reels. A live archive — before, after, and the moments in between.
        </p>
      </div>
      <div className="gallery-filters">
        {filters.map(fl => (
          <button key={fl.id} className={'chip' + (f === fl.id ? ' active' : '')} onClick={() => setF(fl.id)}>
            {fl.label}
          </button>
        ))}
      </div>
      <div className="gallery-grid reveal-stagger" key={f}>
        {filtered.map((it, i) => (
          <div className="gallery-item" key={it.l}>
            <div className="img"><Ph label={it.l} shape={i % 3 === 0 ? 'oval' : i % 3 === 1 ? 'arch' : 'rect'} category="bride" src={it.src}/></div>
            <div className="meta">
              <div className="t">{it.l}</div>
              <div className="c">{it.c}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BASlider({ label }){
  const [split, setSplit] = React.useState(50);
  const ref = React.useRef(null);
  const drag = React.useRef(false);
  const onMove = (e) => {
    if (!drag.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    setSplit(Math.max(0, Math.min(100, (x / r.width) * 100)));
  };
  React.useEffect(() => {
    const up = () => drag.current = false;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', up);
    };
  }, []);
  return (
    <div className="ba" ref={ref} style={{ '--split': split + '%' }}>
      <div className="before ph"><span>Before</span></div>
      <div className="after ph" style={{ clipPath: `inset(0 0 0 ${split}%)` }}><span className="ba-after-label">After · {label}</span></div>
      <div className="handle"
        onMouseDown={() => drag.current = true}
        onTouchStart={() => drag.current = true}
      />
      <span className="tag l">Before</span>
      <span className="tag r">After</span>
    </div>
  );
}

function BeforeAfter(){
  return null; // Hidden until real before/after photos are available
}

function Testimonials(){
  const list = [
    { n:'Riya Tomar', d:'Bridal · Lahar', q:'Booked Ankit sir for my sangeet and shaadi — everyone kept asking who did my look.', s:5 },
    { n:'Priyanka Singh', d:'Reception · Bhind', q:'The lehenga rental collection is unreal. I wore a piece that felt like runway couture.', s:5 },
    { n:'Ayesha K.', d:'Engagement · Gwalior', q:'Worth the drive from Gwalior. My skin glowed for three days straight — my family is still talking about it.', s:5 },
  ];
  return (
    <section id="testimonials" className="testimonials container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Voices · 163 Reviews · ★ 4.8</div>
          <h2 className="serif fs-88">
            What the brides<br/>
            <span className="it">said after.</span>
          </h2>
        </div>
      </div>
      <div className="test-grid reveal-stagger">
        {list.map((t, i) => (
          <div className="test-card" key={i}>
            <div className="stars">
              {Array.from({length:5}).map((_,j) => (
                <MiniSpark key={j} size={12} color={j < t.s ? 'var(--ink-gold-2)' : 'rgba(212,175,122,0.25)'}/>
              ))}
            </div>
            <div className="q">"{t.q}"</div>
            <div className="n">{t.n} · <span className="d">{t.d}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Gallery, BeforeAfter, Testimonials });
