import BenchScene from '../components/BenchScene.jsx';

export default function Home({ onGo }) {
  const go = (id) => (e) => {
    e.preventDefault();
    onGo(id);
  };
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '40px 32px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '48px' }}>
    <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <p style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5B57' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: '#0E5A5E' }}></span>
          MarTech & Analytics Specialist · Cognizant · Bengaluru
        </p>
        <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '112px', lineHeight: '0.9', letterSpacing: '-0.05em' }}>I make ad spend <span style={{ color: '#B4430F' }}>accountable.</span></h1>
        <p style={{ margin: '0', maxWidth: '600px', fontSize: '20px', lineHeight: '1.5', color: '#33322F' }}>By day, I build and fix measurement for enterprise Google Ads clients: GTM, GA4, Enhanced Conversions, Consent Mode. By night, I build the software my own life runs on, with Claude across the table.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#work" onClick={go('work')} style={{ minHeight: '52px', display: 'inline-flex', alignItems: 'center', padding: '0 26px', background: '#B4430F', color: '#FFFFFF', borderRadius: '999px', fontWeight: '600', fontSize: '16px' }}>See what I've built →</a>
          <a href="https://rxresu.me/nadhiii/general" style={{ minHeight: '52px', display: 'inline-flex', alignItems: 'center', padding: '0 24px', border: '1px solid #111111', borderRadius: '999px', fontWeight: '600', fontSize: '16px', boxSizing: 'border-box' }}>Résumé ↗</a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid #111111' }}>
        <div style={{ padding: '18px 16px 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '48px', letterSpacing: '-0.04em', lineHeight: '1' }}>1000+</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>tracking setups and fixes</span>
        </div>
        <div style={{ padding: '18px 16px 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '48px', letterSpacing: '-0.04em', lineHeight: '1' }}>100+</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>enterprise accounts, Google LCS</span>
        </div>
        <div style={{ padding: '18px 16px 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '48px', letterSpacing: '-0.04em', lineHeight: '1' }}>5 yrs</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>from TV support to SME</span>
        </div>
      </div>
    </section>

    <aside aria-label="How I build" style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
      <div style={{ flex: '1', minHeight: '0', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', padding: '20px 24px 22px', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.08em', color: '#5C5B57' }}><span>MOST EVENINGS</span><span>COLD COFFEE, OBVIOUSLY</span></div>
        <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><BenchScene /></div>
        <p style={{ margin: '0', paddingTop: '12px', borderTop: '1px solid #CFCDC6', fontSize: '13px', lineHeight: '1.45', color: '#5C5B57' }}>I bring the plan, we argue it out, I improvise, we ship it. Built with AI and not shy about it: Claude mostly, Gemini sometimes. The ideas and the calls are mine.</p>
      </div>
      <a href="#nandini" onClick={go('nandini')} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '20px' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.08em', padding: '6px 10px', background: '#0E5A5E', color: '#FFFFFF', borderRadius: '999px' }}>NEW</span>
        <span style={{ flex: '1', fontSize: '15px', lineHeight: '1.4' }}><strong style={{ fontWeight: '600' }}>Nandini POS</strong> is live: a point of sale system I built with Claude, used every day.</span>
        <span aria-hidden="true" style={{ fontSize: '20px' }}>→</span>
      </a>
    </aside>
  </div>
  );
}
