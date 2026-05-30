// Craft + Featured Lehenga sections
function Craft(){
  const items = [
    { n:'I',   t:'Bridal', it:'Makeup',   c:'HDLV airbrush, bespoke contouring. Engineered for 12-hour wear under mandap lights.',    img:'images/bride-studio-portrait.webp', op:'center 30%', os:{ transform:'scale(1.25) translateY(-8%)' } },
    { n:'II',  t:'Hair',   it:'Artistry', c:'Editorial up-dos, textured braids, extensions. Styled for photographs that age well.',      img:'images/bride-red-dramatic.webp' },
    { n:'III', t:'Skin &', it:'Glow',     c:'Pre-bridal 30-day glow rituals, facial threading, brow architecture.',                      img:'images/bride-hero-main.webp' },
    { n:'IV',  t:'Nail',   it:'Couture',  c:'Bridal gel, chrome, embellished artistry — matched to your palette.',                       img:'images/5051DD0C-FC68-4DAD-8A72-41DDC8F90B20.webp' },
  ];
  return (
    <section id="craft" className="craft container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Services · The Four Crafts</div>
          <h2 className="serif">
            Four disciplines,<br/>
            <span className="it">one signature.</span>
          </h2>
        </div>
        <p className="mute">
          Every bride briefed, every look pre-rehearsed, every brush hand-picked. Nothing on the chair that hasn't earned its place.
        </p>
      </div>
      <div className="craft-grid reveal-stagger">
        {items.map((s, i) => (
          <a key={i} href="#contact" className="craft-card" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>
            <div className="img"><Ph label={s.t + ' ' + s.it} shape={i % 2 === 0 ? 'oval' : 'arch'} category="makeup" src={s.img} objectPosition={s.op} imgStyle={s.os}/></div>
            <span className="n">№ {s.n}</span>
            <h3>{s.t} <span className="it">{s.it}</span></h3>
            <p>{s.c}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Featured(){
  return (
    <section id="featured" className="featured">
      <div className="container">
        <div className="featured-grid">
          <div className="featured-imgs">
            <div className="a reveal-oval"><Ph label="Lehenga · Maroon Couture" shape="arch" category="bride" src="images/Red Lehnga.webp"/></div>
            <div className="b reveal-oval"><Ph label="Lehenga · Designer Pieced" shape="oval" category="bride" src="images/lehnga 1.webp"/></div>
            <Asterisk size={22} className="featured-deco-1"/>
            <MiniSpark size={14} className="featured-deco-2"/>
          </div>
          <div>
            <span className="lehenga-badge">✦ Exclusively in Lahar</span>
            <div className="eyebrow">Most Sought After · The Atelier</div>
            <h2>
              Lehenga<br/>
              <span className="sc">Rentals</span>
            </h2>
            <p>
              A hand-curated rack of designer lehengas, sized for real brides. Fittings, alterations and steam-pressing included. The only rental atelier of its kind between Gwalior and Bhind — and the piece that sets us apart from every other studio in the region.
            </p>
            <div className="featured-tags">
              <span className="tag">40+ Pieces</span>
              <span className="tag">Size 6–18</span>
              <span className="tag">Designer Sourced</span>
              <span className="tag">Fit Included</span>
              <span className="tag">Steam-Pressed</span>
            </div>
            <div className="featured-btns">
              <a className="btn solid lg" href="https://wa.me/919098888134?text=Hi%20Ankit%2C%20I%20would%20like%20to%20browse%20the%20lehenga%20rental%20collection." target="_blank" rel="noopener noreferrer">Browse The Rack →</a>
              <a className="btn lg" href="https://wa.me/919098888134?text=Hi%20Ankit%2C%20I%20would%20like%20to%20book%20a%20lehenga%20fitting." target="_blank" rel="noopener noreferrer">Book A Fitting</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Craft, Featured });
