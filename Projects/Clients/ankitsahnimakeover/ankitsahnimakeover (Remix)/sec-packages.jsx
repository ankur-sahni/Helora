// Packages
function Packages(){
  const tiers = [
    {
      id:'silver', name:'Silver', tag:'The Essentials',
      price:'15,000',
      incl:[
        'HD bridal makeup — day of',
        'Signature hair styling',
        'Draping assistance',
        'Pre-bridal consultation',
        'Touch-up kit for 4 hours',
      ],
    },
    {
      id:'gold', name:'Gold', tag:'Most Sought After',
      price:'32,000',
      badge:'★ Most Sought After',
      featured: true,
      italic: true,
      incl:[
        'HDLV airbrush bridal look',
        'Hair — up-do + textured braid',
        'Pre-bridal 15-day glow protocol',
        'Bridal trial session',
        'Full-day touch-ups on site',
        'Drape + dupatta pinning',
        'Sangeet look — add-on pricing',
      ],
    },
    {
      id:'deluxe', name:'Deluxe', tag:'The Editorial',
      price:'58,000',
      badge:'Couture',
      incl:[
        'Everything in Gold, plus —',
        '3-event styling (sangeet · haldi · reception)',
        '30-day bridal skin ritual',
        'Lehenga rental — 1 piece included',
        'Dedicated on-site artist + assistant',
        'Pre-shoot editorial session',
        'Family makeup — 2 members',
      ],
    },
  ];
  return (
    <section id="packages" className="pkgs container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Bridal Packages · Pick Your Look</div>
          <h2 className="serif">
            Three tiers,<br/>
            <span className="script">one bride.</span>
          </h2>
        </div>
        <p className="mute">
          All prices are starting points. Every package is re-briefed to your palette, outfit, and timeline.
        </p>
      </div>
      <div className="pkg-grid reveal-stagger">
        {tiers.map(t => (
          <div key={t.id} className={'pkg' + (t.featured ? ' featured-pkg' : '')}>
            {t.badge && <div className="badge">{t.badge}</div>}
            <div className="tag-line">{t.tag}</div>
            <h3 className={t.italic ? 'it' : ''}>{t.name}</h3>
            <div className="price"><sup>₹</sup>{t.price}</div>
            <div className="price-note">Starting · GST extra</div>
            <hr/>
            <ul>
              {t.incl.map((line, i) => (
                <li key={i}>
                  <span className="b"><MiniSpark size={11}/></span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <a className={'btn block ' + (t.featured ? 'solid' : '')}
              href={`https://wa.me/919098888134?text=${encodeURIComponent('Hi Ankit, I am interested in the ' + t.name + ' bridal package (₹' + t.price + '). Please share availability.')}`}
              target="_blank" rel="noopener noreferrer">
              {t.featured ? 'Book Gold — Enquire →' : 'Enquire on WhatsApp'}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Packages });
