// Contact + Footer
function Contact(){
  const [form, setForm] = React.useState({ name:'', phone:'', date:'', service:'Bridal Makeup', message:'' });
  const [sent, setSent] = React.useState(false);
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <section id="contact" className="contact container">
      <div className="contact-grid reveal">
        <div className="contact-left">
          <div className="eyebrow">Get in Touch · Book Your Look</div>
          <h2>
            Let's create<br/>
            your <span className="sc">look.</span>
          </h2>
          <p>
            WhatsApp is the fastest route — Ankit personally replies within the hour,
            9 AM – 9 PM IST. For detailed briefs, use the form on the right.
          </p>
          <a className="contact-card-wa" href={WA_LINK('Hi Ankit, I would like to discuss a bridal booking.')} target="_blank" rel="noopener noreferrer">
            <div className="icon"><WaIcon size={32}/></div>
            <div className="meta">
              <div className="t">WhatsApp us now</div>
              <div className="s">+91 90988 88134 · reply &lt; 1 hr</div>
            </div>
          </a>
          <div className="contact-info">
            <div>
              <div className="mono gold-deep">Studio</div>
              <div className="ivory contact-info-val">
                Main Bazaar Road<br/>
                Lahar, Dist. Bhind<br/>
                Madhya Pradesh 477445
              </div>
            </div>
            <div>
              <div className="mono gold-deep">Hours</div>
              <div className="ivory contact-info-val">
                Mon – Sun<br/>
                9:00 – 21:00<br/>
                <span className="mute">Walk-ins welcome</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          {sent ? (
            <div className="fade-in form-success">
              <Asterisk size={32}/>
              <h3>Brief received.</h3>
              <p className="ivory">
                Ankit will WhatsApp you within the hour with available dates and a custom brief.
              </p>
              <button className="btn" onClick={() => { setSent(false); setForm({ name:'', phone:'', date:'', service:'Bridal Makeup', message:'' }); }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={e => {
              e.preventDefault();
              const msg = `Hi Ankit,\n\n${form.name}\nPhone: ${form.phone}${form.date ? `\nWedding Date: ${form.date}` : ''}\n\nService: ${form.service}\n\n${form.message}`;
              window.open(WA_LINK(msg), '_blank');
              setSent(true);
            }}>
              <div className="eyebrow">— Bridal Brief</div>
              <h3>Send us the details.</h3>
              <p className="mute form-desc">
                The more you share, the better our brief comes back to you.
              </p>
              <div className="field">
                <label>Your Name</label>
                <input required value={form.name} onChange={e => u('name', e.target.value)} placeholder="Full name"/>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Phone</label>
                  <input required value={form.phone} onChange={e => u('phone', e.target.value)} placeholder="+91 · · · · ·"/>
                </div>
                <div className="field">
                  <label>Wedding Date</label>
                  <input value={form.date} onChange={e => u('date', e.target.value)} placeholder="DD / MM / YY"/>
                </div>
              </div>
              <div className="field">
                <label>Service</label>
                <select value={form.service} onChange={e => u('service', e.target.value)}>
                  <option>Bridal Makeup</option>
                  <option>Hair Styling</option>
                  <option>Pre-Bridal Skin</option>
                  <option>Lehenga Rental</option>
                  <option>Full Package (Silver)</option>
                  <option>Full Package (Gold)</option>
                  <option>Full Package (Deluxe)</option>
                </select>
              </div>
              <div className="field">
                <label>Brief</label>
                <textarea value={form.message} onChange={e => u('message', e.target.value)} placeholder="Tell us about your outfit, palette, venue and vibe."/>
              </div>
              <button className="btn solid lg btn-full" type="submit">
                Send my bridal brief →
              </button>
              <p className="mute form-privacy">
                No spam · WhatsApp reply · under 1 hr
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              Ankit Sahni
              <small>Makeover · Est. 1994</small>
            </div>
            <p className="mute footer-desc">
              Three decades of bridal beauty, editorial styling and designer lehenga rentals in Lahar, Madhya Pradesh.
            </p>
          </div>
          <div>
            <h4>— Services</h4>
            <a href="#craft">Bridal Makeup</a>
            <a href="#craft">Hair Artistry</a>
            <a href="#craft">Skin & Glow</a>
            <a href="#craft">Nail Couture</a>
            <a href="#featured">Lehenga Rentals</a>
          </div>
          <div>
            <h4>— Studio</h4>
            <a href="#packages">Packages</a>
            <a href="#gallery">Portfolio</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>— Reach Us</h4>
            <div className="footer-contact">
              <a href="https://www.instagram.com/ankitsahnimakeover" target="_blank" rel="noopener noreferrer"><span className="ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></span>@ankitsahnimakeover</a>
              <a href={WA_LINK('Hi Ankit, I found you on ankitsahnimakeover.com and would like to enquire.')} target="_blank" rel="noopener noreferrer"><span className="ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/></svg></span>+91 90988 88134</a>
              <a href="#"><span className="ico">★</span>Google · 4.8 / 169 Reviews</a>
            </div>
          </div>
        </div>
        <div className="footer-sig">
          <Asterisk size={14} className="footer-sig-ast"/>
          © {new Date().getFullYear()} · Ankit Sahni Makeover · Lahar, Madhya Pradesh · All rights reserved
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
