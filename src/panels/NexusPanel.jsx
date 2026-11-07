import { useState } from 'react';

const V3_SHOTS = [
  ['home', 'Home', 'Nexus v3 home screen: safe to spend today and the month so far, sample data'],
  ['plan', 'Plan', 'Nexus v3 plan screen: payoff plan, garage, budgets, goals and people, sample data'],
  ['itch', 'Itch', 'Itch, the wants companion: a want waiting out its cool-off, sample data'],
  ['nudge', 'Nudge', 'Nudge, the tasks companion: three tasks for today, sample data'],
];


export default function Nexus({ onGo }) {
  const [shot, setShot] = useState('home');
  const current = V3_SHOTS.find((x) => x[0] === shot);
  const go = (id) => (e) => {
    e.preventDefault();
    onGo(id);
  };
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '22px 32px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a href="#work" onClick={go('work')} style={{ fontSize: '14px', color: '#5C5B57' }}>← All work</a>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
          <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '64px', lineHeight: '0.9', letterSpacing: '-0.05em' }}>Nexus</h1>
          <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', letterSpacing: '0.08em', color: '#0E5A5E' }}>04 · PERSONAL FINANCE · 3 ATTEMPTS</span>
        </div>
      </div>
      <p style={{ margin: '0', maxWidth: '520px', fontSize: '16px', lineHeight: '1.5', color: '#33322F' }}>Three tries at one question: where did my money actually go? Each version taught me what the next one had to get right.</p>
    </div>

    <ol style={{ flex: '1', minHeight: '0', listStyle: 'none', margin: '0', padding: '0', display: 'grid', gridTemplateColumns: '210px minmax(0, 1fr) minmax(0, 1.25fr)', gap: '14px' }}>

      <li style={{ border: '1.5px dashed #8C8A84', borderRadius: '24px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>V1 · RETIRED</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '34px', letterSpacing: '-0.03em', color: '#5C5B57' }}>Pluto</h2>
        <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5', color: '#33322F' }}>The first one. Income, expenses, debts and investments in one place, budgets and payoff plans, sync across devices, and a dark mode for 2 AM budgeting.</p>
        <p style={{ margin: 'auto 0 0', paddingTop: '12px', borderTop: '1px solid #CFCDC6', fontSize: '14px', lineHeight: '1.45', color: '#33322F' }}><strong style={{ fontWeight: '600', color: '#111111' }}>Lesson:</strong> typing in every transaction by hand is the fastest way to stop using a finance app.</p>
      </li>

      <li style={{ background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '24px', padding: '22px', display: 'grid', gridTemplateColumns: '150px minmax(0, 1fr)', gap: '18px', boxSizing: 'border-box', minHeight: '0', overflow: 'hidden' }}>
        <div style={{ minHeight: '0', overflow: 'hidden', borderRadius: '22px', background: '#0B0D14' }}>
          <picture>
            <source srcSet="/img/nexus-flutter-home.webp" type="image/webp" />
            <img src="/img/nexus-flutter-home.png" alt="Nexus Flutter home screen, balances blurred" width="672" height="1496" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </picture>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
          <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#0E5A5E' }}>V2 · FLUTTER · RETIRED OCT 2026</span>
          <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '34px', letterSpacing: '-0.03em' }}>Nexus</h2>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5', color: '#33322F' }}>Went wide. Accounts, budgets, EMIs, investments, subscriptions, goals, a garage for the bike with fuel and mileage, and NBox: transactions picked up from SMS and Gmail, swiped right to keep. In October one JSON export carried all of it into v3.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ padding: '4px 10px', border: '1px solid #CFCDC6', borderRadius: '999px', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px' }}>Flutter</span>
            <span style={{ padding: '4px 10px', border: '1px solid #CFCDC6', borderRadius: '999px', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px' }}>Firebase</span>
            <span style={{ padding: '4px 10px', border: '1px solid #CFCDC6', borderRadius: '999px', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px' }}>Provider</span>
            <span style={{ padding: '4px 10px', border: '1px solid #CFCDC6', borderRadius: '999px', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px' }}>go_router</span>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid #CFCDC6' }}>
            <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#B4430F' }}>WHERE IT CRACKED</span>
            <ul style={{ margin: '0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', lineHeight: '1.4', color: '#33322F' }}>
              <li>Loans, cards and splits each kept their own copy of the money.</li>
              <li>Parsing pulled out fields, not meaning. Every transaction still needed me.</li>
              <li>Categories never felt like mine.</li>
            </ul>
          </div>
        </div>
      </li>

      <li style={{ background: '#0A0A0A', color: '#F5F0E8', borderRadius: '24px', padding: '22px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 190px', gap: '18px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden', minHeight: '0' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: '0', opacity: '0.05', backgroundImage: 'radial-gradient(circle, #F5F0E8 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
        <span style={{ position: 'relative', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#E8732A' }}>V3 · NATIVE ANDROID · IN DAILY USE</span>
        <h2 style={{ position: 'relative', margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '34px', letterSpacing: '-0.03em' }}>Nexus, native</h2>
        <p style={{ position: 'relative', margin: '0', fontSize: '14px', lineHeight: '1.5', color: '#C9C5BD' }}>Kotlin, Jetpack Compose and Room, rebuilt from the ledger up. Because why not: knowing native alongside Flutter felt worth it.</p>
        <p style={{ position: 'relative', margin: '0', paddingLeft: '12px', borderLeft: '2px solid #E8732A', fontSize: '14px', lineHeight: '1.45', color: '#F5F0E8' }}>The honest reason: I forget to log things. Miss one transaction and the month feels lost, and I quit. So this one has to work even when I do nothing.</p>
        <p aria-label="How money flows in v3: email, SMS and wallet taps go to the brain, then to the ledger" style={{ position: 'relative', margin: '0', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: '1.5', color: '#C9A84C' }}>Email · SMS · Wallet taps → Brain → Ledger, the only thing that writes money</p>
        <ul style={{ position: 'relative', margin: 'auto 0 0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', lineHeight: '1.4', color: '#DAD6CE' }}>
          <li>→ Record first, review later. No guilt screens.</li>
          <li>→ Zero expense. Sideloaded on my Pixel, updates itself from GitHub.</li>
          <li>→ 870+ unit tests and 90+ on-device tests guard the money.</li>
        </ul>
        <p style={{ position: 'relative', margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', lineHeight: '1.5', color: '#9A9890' }}>STATUS: my real money runs on it since October. Two small companions too: Itch for wants, Nudge for tasks.<br />LONG GAME: Nexus as the money personality of a personal AI.</p>
        </div>
        <div style={{ position: 'relative', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div role="group" aria-label="Pick a screen" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {V3_SHOTS.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={shot === id} onClick={() => setShot(id)} style={{ minHeight: '32px', padding: '0 10px', borderRadius: '999px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', border: `1px solid ${shot === id ? '#C8EB6A' : '#3A3A3A'}`, background: shot === id ? '#C8EB6A' : 'transparent', color: shot === id ? '#0A0A0A' : '#DAD6CE', fontWeight: shot === id ? '600' : '400' }}>{label}</button>
            ))}
          </div>
          <div style={{ flex: '1', minHeight: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2A2A2A', background: '#050505' }}>
            <picture style={{ display: 'block', height: '100%' }}>
              <source srcSet={`/img/nexus-v3-${shot}.webp`} type="image/webp" />
              <img src={`/img/nexus-v3-${shot}.png`} alt={current[2]} width="540" height="1154" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center', display: 'block' }} />
            </picture>
          </div>
        </div>
      </li>
    </ol>
  </div>
  );
}
