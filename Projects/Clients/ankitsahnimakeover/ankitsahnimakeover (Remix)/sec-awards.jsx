// Awards + Celebrity Showcase
function Awards(){
  const awards = [
    { title: 'Masterclass with Bhumika Bahl', year: '2026', body: 'Arora Enterprises · Firozabad', src: 'images/Bhumika Behal.webp', objectPosition: 'center 35%' },
  ];

  const celebs = [
    { name: 'Miss Earth India', caption: 'Pageant · Official Makeup Artist', img: 'images/celeb-miss-earth-india.webp' },
    { name: 'Miss Divine Beauty', caption: 'Pageant · Winner Styled by Ankit', img: 'images/celeb-miss-divine-beauty.webp' },
    { name: 'Celebrity Client', caption: 'Award Night · Styled by Ankit', img: 'images/celeb-actor.webp' },
    { name: 'Beauty Pageant', caption: 'Backstage · Official Artist', img: 'images/celeb-pageant-group.webp' },
    { name: 'Pageant Finalist', caption: 'Backstage · Styled by Ankit', img: 'images/celeb-contestant-9.webp' },
    { name: 'Pageant Finalist', caption: 'Backstage · Official Artist', img: 'images/celeb-hotpink.webp' },
  ];

  return (
    <section id="awards" className="awards-sec">
      <div className="container">

        {/* Awards */}
        <div className="sec-head">
          <div>
            <div className="eyebrow">Recognition · Awards</div>
            <h2 className="serif">
              Recognised<br/>
              <span className="script">nationally.</span>
            </h2>
          </div>
          <p className="mute">
            Over three decades, Ankit Sahni has been recognised by some of India's most respected beauty and fashion institutions.
          </p>
        </div>

        <div className="awards-grid reveal-stagger">
          {awards.map((a, i) => (
            <div key={i} className="award-card">
              <div className="award-img">
                <Ph label={'Award ' + (i + 1)} shape="arch" category="woman" src={a.src} objectPosition={a.objectPosition}/>
              </div>
              <div className="award-info">
                <div className="mono award-year">{a.year}</div>
                <h4 className="serif">{a.title}</h4>
                <div className="mute award-body">{a.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Celebrity Clients */}
        <div className="sec-head celeb-sec-head">
          <div>
            <div className="eyebrow">Portfolio · Celebrities &amp; Notable Clients</div>
            <h2 className="serif fs-80">
              Faces we've<br/>
              <span className="script script-lg">transformed.</span>
            </h2>
          </div>
          <p className="mute">
            From award nights to editorial shoots — a glimpse of the notable faces Ankit has styled over the years.
          </p>
        </div>

        <div className="celeb-grid reveal-stagger">
          {celebs.map((c, i) => (
            <div key={i} className="celeb-card">
              <div className="celeb-img">
                <Ph label={c.name} shape="oval" category="woman" src={c.img}/>
              </div>
              <div className="serif celeb-name">{c.name}</div>
              <div className="mute celeb-caption">{c.caption}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

Object.assign(window, { Awards });
