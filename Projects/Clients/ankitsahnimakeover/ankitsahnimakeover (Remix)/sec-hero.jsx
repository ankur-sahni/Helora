// Hero + Marquee + Stats
function Hero(){
  return (
    <section id="home" className="hero container">
      <div className="hero-decor">
        <Asterisk size={24} className="hero-deco-1"/>
        <MiniSpark size={12} className="hero-deco-2"/>
        <Asterisk size={16} className="hero-deco-3"/>
        <MiniSpark size={10} className="hero-deco-4"/>
      </div>
      <div className="hero-grid">
        <div>
          <div className="eyebrow">Est. 1994 · Lahar, MP · Bridal Artistry</div>
          <h1>
            <span className="line"><span className="inner it">Ankit</span></span>
            <span className="line"><span className="inner">Sahni</span></span>
            <span className="line"><span className="inner sc">Makeover</span></span>
          </h1>
          <p className="hero-lede reveal">
            Bridal beauty, editorial polish. Three decades of crafting the
            <span className="gold"> most talked-about looks </span>
            in Lahar — now with a hand-curated lehenga rental atelier for your wedding day.
          </p>
          <div className="hero-rule"/>
          <div className="hero-cta">
            <a href="#packages" className="btn solid lg" onClick={e => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({behavior:'smooth'}); }}>
              Book Your Bridal Look →
            </a>
            <a href="#gallery" className="btn lg" onClick={e => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({behavior:'smooth'}); }}>
              View Portfolio
            </a>
          </div>
        </div>
        <div className="hero-portraits">
          <div className="p1 reveal-oval"><Ph label="Bridal Portrait · Hero" shape="oval" category="bride" src="images/bride-hero-main.webp" objectPosition="top"/></div>
          <div className="p2 reveal-oval"><Ph label="Mehendi · Detail" shape="arch" category="bride" src="images/bride-red-dramatic.webp" objectPosition="top"/></div>
          <div className="p3 reveal-oval"><Ph label="Reception" shape="oval" category="woman" src="images/bride-red-smiling.webp" objectPosition="top"/></div>
          <Asterisk size={18} className="hero-portrait-deco"/>
        </div>
      </div>
    </section>
  );
}

function Stats(){
  return (
    <div className="container">
      <div className="stats reveal">
        <div className="stat">
          <div className="v"><span className="it" data-count="30" data-suffix="+">0</span></div>
          <div className="l">Years in Craft</div>
        </div>
        <div className="stat">
          <div className="v"><span data-count="4.8">0</span> <span className="star">✦</span></div>
          <div className="l">169 Reviews</div>
        </div>
        <div className="stat">
          <div className="v"><span data-count="39000">0</span></div>
          <div className="l">Instagram</div>
        </div>
        <div className="stat">
          <div className="v"><span className="it" data-count="1200" data-suffix="+">0</span></div>
          <div className="l">Brides Styled</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Hero, Stats, Marquee });
