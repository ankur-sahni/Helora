// Makeup Types — Bridal · Engagement · Party
function MakeupTypes(){
  const types = [
    {
      id: 'bridal',
      no: 'I',
      title: 'Bridal',
      sub: 'Makeup',
      tag: 'The Signature Look',
      shape: 'oval',
      img: 'images/bride-navy-studio.webp',
      incl: ['— Inclusions to be confirmed by Ankit —'],
      price: 'On Request',
      note: 'Pricing shared on consultation',
      wa: 'Hi Ankit, I would like to enquire about Bridal Makeup — what is included and the pricing.',
    },
    {
      id: 'engagement',
      no: 'II',
      title: 'Engagement',
      sub: 'Makeup',
      tag: 'The First Look',
      shape: 'arch',
      img: 'images/bride-nath-closeup.webp',
      incl: ['— Inclusions to be confirmed by Ankit —'],
      price: 'On Request',
      note: 'Pricing shared on consultation',
      wa: 'Hi Ankit, I would like to enquire about Engagement Makeup — what is included and the pricing.',
    },
    {
      id: 'party',
      no: 'III',
      title: 'Party',
      sub: 'Makeup',
      tag: 'The Night Look',
      shape: 'oval',
      img: 'images/bride-bright-red.webp',
      incl: ['— Inclusions to be confirmed by Ankit —'],
      price: 'On Request',
      note: 'Pricing shared on consultation',
      wa: 'Hi Ankit, I would like to enquire about Party Makeup — what is included and the pricing.',
    },
  ];

  return (
    <section id="makeups" className="makeups container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Makeup Services · Bridal · Party · Engagement</div>
          <h2 className="serif">
            Every occasion,<br/>
            <span className="script">a masterpiece.</span>
          </h2>
        </div>
        <p className="mute">
          Whether it is your wedding day, your ring ceremony, or an evening celebration — every look is personalised, rehearsed, and built to last.
        </p>
      </div>

      <div className="mkup-grid reveal-stagger">
        {types.map(t => (
          <div key={t.id} className="mkup-card">
            <div className="mkup-img">
              <Ph label={t.title + ' · ' + t.sub} shape={t.shape} category="makeup" src={t.img} objectPosition="top"/>
            </div>
            <div className="mkup-body">
              <div className="mkup-meta">
                <span className="n">№ {t.no}</span>
                <span className="eyebrow">{t.tag}</span>
              </div>
              <h3 className="serif">
                {t.title} <span className="it">{t.sub}</span>
              </h3>
              <hr/>
              <ul className="mkup-list">
                {t.incl.map((line, i) => (
                  <li key={i}>
                    <MiniSpark size={10}/>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mkup-price">
                <div className="mono mkup-price-label">Starting Price</div>
                <div className="serif mkup-price-val">{t.price}</div>
                <div className="mkup-price-note">{t.note}</div>
              </div>
              <a className="btn block"
                href={`https://wa.me/919098888134?text=${encodeURIComponent(t.wa)}`}
                target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { MakeupTypes });
