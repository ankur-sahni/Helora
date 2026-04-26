// Main app + Tweaks
const defaults = /*EDITMODE-BEGIN*/{
  "gold1": "#C9956C",
  "gold2": "#D4AF7A",
  "bg": "#0D0B0A",
  "palette": "champagne"
}/*EDITMODE-END*/;

const PALETTES = {
  champagne: { gold1:'#C9956C', gold2:'#D4AF7A', bg:'#0D0B0A', label:'Champagne' },
  rose:      { gold1:'#C97A7A', gold2:'#D4988F', bg:'#0E0A0A', label:'Rose Gold' },
  platinum:  { gold1:'#B8B0A3', gold2:'#D4CEC4', bg:'#0B0B0D', label:'Platinum' },
  bronze:    { gold1:'#A8703F', gold2:'#C99060', bg:'#0D0906', label:'Bronze' },
  emerald:   { gold1:'#7A9E7E', gold2:'#B0C9A8', bg:'#0A0D0B', label:'Emerald' },
};

function TweaksPanel({ tweaks, setTweak }){
  return (
    <div className="tweaks open">
      <h4>✦ Tweaks</h4>
      <label>Palette</label>
      <div className="swatches">
        {Object.entries(PALETTES).map(([k, p]) => (
          <button key={k} onClick={() => {
            setTweak('gold1', p.gold1);
            setTweak('gold2', p.gold2);
            setTweak('bg', p.bg);
            setTweak('palette', k);
          }}
          title={p.label}
          className={'sw' + (tweaks.palette === k ? ' active' : '')}
          style={{ background:`linear-gradient(135deg, ${p.gold2} 0 50%, ${p.bg} 50% 100%)` }}/>
        ))}
      </div>
      <label>Gold accent</label>
      <input type="color" value={tweaks.gold2} onChange={e => setTweak('gold2', e.target.value)} style={{ width:'100%', height: 34, background:'transparent', border:'1px solid var(--line)', borderRadius:8 }}/>
      <label>Background</label>
      <input type="color" value={tweaks.bg} onChange={e => setTweak('bg', e.target.value)} style={{ width:'100%', height: 34, background:'transparent', border:'1px solid var(--line)', borderRadius:8 }}/>
      <p className="mute" style={{ fontSize: 10, marginTop: 14, lineHeight: 1.4 }}>
        Tweaks persist between reloads.
      </p>
    </div>
  );
}

function App(){
  const [editMode, setEditMode] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('asm-tweaks')) || defaults; }
    catch(e){ return defaults; }
  });
  React.useEffect(() => { localStorage.setItem('asm-tweaks', JSON.stringify(tweaks)); }, [tweaks]);
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--ink-gold-1', tweaks.gold1);
    r.style.setProperty('--ink-gold-2', tweaks.gold2);
    r.style.setProperty('--bg', tweaks.bg);
  }, [tweaks]);
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const setTweak = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };
  return (
    <>
      <Nav/>
      <Hero/>
      <Marquee/>
      <Stats/>
      <Craft/>
      <MakeupTypes/>
      <Featured/>
      <Packages/>
      <About/>
      <Awards/>
      <Gallery/>
      <BeforeAfter/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <WaFab/>
      {editMode && <TweaksPanel tweaks={tweaks} setTweak={setTweak}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
