// About Us — Team + SEO description
function About(){
  const team = [
    {
      name: 'Kusum Sahni',
      title: 'Founder',
      gender: 'woman',
      img: 'images/kusum-portrait.webp',
      bio: 'The artist who built it all. Kusum Sahni founded the studio in Lahar in 1994, building its reputation across three decades on patience, precision, and an unwavering commitment to every bride who sits in her chair.',
      shape: 'oval',
    },
    {
      name: 'Ankit Sahni',
      title: 'Co-Founder',
      gender: 'man',
      img: 'images/ankit-portrait.webp',
      bio: 'A nationally recognised makeup artist whose portfolio spans bridal ceremonies, celebrity clients, and editorial features. Ankit combines modern HD and airbrush techniques with a deep understanding of Indian bridal aesthetics.',
      shape: 'oval',
    },
    {
      name: 'Harshita',
      title: 'Head Makeup Artist',
      gender: 'woman',
      img: 'images/harshita-portrait.webp',
      bio: 'Harshita leads the day-of artist team with a specialisation in engagement and party looks. Her signature: flawless, camera-ready finishes that hold from the ceremony to the after-party.',
      shape: 'oval',
    },
  ];

  return (
    <section id="about" className="about-sec container">
      <div className="sec-head">
        <div>
          <div className="eyebrow">Our Story · Est. 1994</div>
          <h2 className="serif">
            Thirty years<br/>
            <span className="script">of artistry.</span>
          </h2>
        </div>
        <p className="mute">
          Ankit Sahni Makeover is Lahar's most trusted bridal beauty studio — founded in 1994 and led today by a team of nationally recognised artists across bridal, engagement, and editorial makeup.
        </p>
      </div>

      <div className="about-desc">
        <p>
          Established over 30 years ago by <strong>Kusum Sahni</strong>, <strong>Ankit Sahni Makeover</strong> is the leading bridal makeup studio in Lahar, Madhya Pradesh. Our artists have transformed thousands of brides across Bhind, Gwalior, Morena, Datia, and beyond — delivering HD airbrush bridal looks, engagement glam, party makeup, and pre-bridal skin rituals that photograph beautifully and last through every moment of your celebration.
        </p>
        <p>
          Under the leadership of <strong>Ankit Sahni</strong> — a celebrated makeup artist with a portfolio spanning celebrity clients and award ceremonies — and <strong>Harshita</strong>, our Head Artist, the studio has earned its place as the premier destination for brides who expect more. Every look is briefed, trialled, and executed with precision. Located in Lahar, MP. Bookings accepted across Madhya Pradesh and nearby states.
        </p>
      </div>

      <div className="team-grid reveal-stagger">
        {team.map((m, i) => (
          <div key={i} className="team-card">
            <div className="team-img">
              <Ph label={m.name} shape="oval" category={m.gender} src={m.img}/>
            </div>
            <h3 className="serif">
              {m.name}
            </h3>
            <div className="mono team-title">
              {m.title}
            </div>
            <p className="mute team-bio">
              {m.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { About });
