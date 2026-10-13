
export default function Work({ onGo }) {
  const go = (id) => (e) => {
    e.preventDefault();
    onGo(id);
  };
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '36px 0 24px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: '32px', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>02 · WORK · 5 PROJECTS</p>
        <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '72px', lineHeight: '0.95', letterSpacing: '-0.045em' }}>Built because I needed them.</h1>
      </div>
      <p style={{ margin: '0', maxWidth: '360px', fontSize: '16px', lineHeight: '1.5', color: '#33322F' }}>None of these were assignments. Each started as a problem at work or at home that annoyed me enough to fix.</p>
    </div>

    <div style={{ flex: '1', minHeight: '0', display: 'flex', gap: '20px', overflowX: 'auto', paddingRight: '32px' }} data-own-scroll="">
      <a href="#nandini" onClick={go('nandini')} style={{ flex: '0 0 600px', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '300px', background: '#E4E2DB', overflow: 'hidden', position: 'relative' }}>
          <img src="/img/pos-en-billing.png" alt="Nandini POS billing screen with two items in the cart" style={{ position: 'absolute', left: '24px', top: '24px', width: '760px', borderRadius: '10px', boxShadow: '0 20px 40px rgba(17,17,17,0.18)' }} />
        </div>
        <div style={{ flex: '1', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>01 · REACT · TYPESCRIPT · FIREBASE</span>
            <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', padding: '5px 10px', background: '#0E5A5E', color: '#FFFFFF', borderRadius: '999px' }}>NEW</span>
          </div>
          <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '40px', letterSpacing: '-0.03em' }}>Nandini POS</h2>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5', color: '#33322F' }}>Our own billing system for my family's milk parlour, replacing a ₹10,000-a-year Odoo licence. Works offline, speaks Kannada, and my parents can run it without calling me.</p>
          <span style={{ marginTop: 'auto', fontWeight: '600', fontSize: '15px', color: '#B4430F' }}>Read the case study →</span>
        </div>
      </a>

      <a href="#nexus" onClick={go('nexus')} style={{ flex: '0 0 380px', background: '#0E5A5E', color: '#F4F3EF', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B9D3D1' }}>02 · FLUTTER · FIREBASE</span>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '64px', letterSpacing: '-0.04em', lineHeight: '1' }}>v2</span>
          <span style={{ fontSize: '14px', color: '#B9D3D1' }}>after Pluto. v3, native Android, in the works</span>
        </div>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '32px', letterSpacing: '-0.03em', color: '#FFFFFF' }}>Nexus</h2>
        <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}>My personal finance tracker, second time round. Pluto taught me what I actually needed; Nexus is the rebuild.</p>
        <span style={{ fontWeight: '600', fontSize: '15px' }}>Read the story →</span>
      </a>

      <a href="#team" onClick={(e) => { window.dispatchEvent(new CustomEvent('team-tab', { detail: 'dispatch' })); go('team')(e); }} style={{ flex: '0 0 340px', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>03 · APPS SCRIPT</span>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '64px', letterSpacing: '-0.04em', lineHeight: '1' }}>20+</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>agents, assigned by data instead of guesswork</span>
        </div>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '32px', letterSpacing: '-0.03em' }}>Team Command Center</h2>
        <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.5', color: '#33322F' }}>A dispatch console with live workload, duplicate detection and skill-based suggestions for who should take the next case.</p>
      <span style={{ fontWeight: '600', fontSize: '15px' }}>Read the case study →</span>
      </a>

      <a href="#team" onClick={(e) => { window.dispatchEvent(new CustomEvent('team-tab', { detail: 'followups' })); go('team')(e); }} style={{ flex: '0 0 340px', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>04 · APPS SCRIPT</span>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '64px', letterSpacing: '-0.04em', lineHeight: '1' }}>45 min</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>of copy-paste gone, every day, across 10+ teams</span>
        </div>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '32px', letterSpacing: '-0.03em' }}>Team-Wide Automation</h2>
        <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.5', color: '#33322F' }}>The first thing I ever built. A scheduled script that syncs and formats the morning data before anyone logs in.</p>
      <span style={{ fontWeight: '600', fontSize: '15px' }}>Read the case study →</span>
      </a>

      <article style={{ flex: '0 0 340px', background: '#E4E2DB', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>05 · REACT · VITE</span>
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
          <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '64px', letterSpacing: '-0.04em', lineHeight: '1' }}>0</span>
          <span style={{ fontSize: '14px', color: '#5C5B57' }}>templates used</span>
        </div>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '32px', letterSpacing: '-0.03em' }}>This site</h2>
        <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.5', color: '#33322F' }}>You're in it. Planned by me, argued over and built with Claude. The intro says my name in five languages; the rest flows like a river should.</p>
      </article>
      <aside aria-label="Up next" style={{ flex: '0 0 340px', background: '#F4F3EF', border: '1.5px dashed #0E5A5E', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#0E5A5E' }}>06 · UP NEXT</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '32px', letterSpacing: '-0.03em' }}>The rough plan</h2>
        <dl style={{ margin: '0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div><dt style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#B4430F' }}>NOW</dt><dd style={{ margin: '4px 0 0', fontSize: '15px', lineHeight: '1.45' }}>Nexus v3, a finance app that runs itself, plus case studies for my team tools.</dd></div>
          <div><dt style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#B4430F' }}>NEXT</dt><dd style={{ margin: '4px 0 0', fontSize: '15px', lineHeight: '1.45' }}>A personal AI that actually knows me. Nexus becomes its money personality. Long way to go.</dd></div>
          <div><dt style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#B4430F' }}>SOMEDAY</dt><dd style={{ margin: '4px 0 0', fontSize: '15px', lineHeight: '1.45' }}>Product Manager, building things people use every day.</dd></div>
        </dl>
        <p style={{ margin: 'auto 0 0', fontSize: '13px', color: '#5C5B57' }}>Plans change. That's the point of writing them in pencil.</p>
      </aside>
    </div>
  </div>
  );
}
