import { Fragment } from 'react';
import { css } from '../css.js';

const ON = 'display:inline-block;width:10px;height:10px;border-radius:3px;background:#B4430F';
const ON_DARK = 'display:inline-block;width:10px;height:10px;border-radius:3px;background:#E8732A';
const OFF = 'display:inline-block;width:10px;height:10px;border-radius:3px;border:1px solid #8C8A84;box-sizing:border-box';
const RAW = [
  ['Google Tag Manager', 'Expert', 'Containers, data layers, custom templates and tag audits across 100+ enterprise accounts.', true],
  ['GA4', 'Expert', 'Event schemas, ecommerce tracking, custom dimensions, BigQuery exports.', false],
  ['Enhanced Conversions', 'Expert', 'Hashed first-party data for Google Ads. My main focus for top-tier clients.', false],
  ['Consent Mode v2', 'Expert', 'Basic and Advanced rollouts, signal validation, modeled conversions.', false],
  ['Google Ads Measurement', 'Expert', 'Conversion tracking, attribution, Floodlight, cross-account audits.', false],
  ['BigQuery', 'Proficient', 'GA4 raw exports and SQL for session and funnel analysis.', false],
  ['Looker Studio', 'Proficient', 'Dashboards for client reporting and team visibility.', false],
  ['Amplitude', 'Familiar', 'Event instrumentation and basic funnels.', false],
];
const skills = RAW.map(([name, level, note, dark]) => {
  const n = level === 'Expert' ? 3 : level === 'Proficient' ? 2 : 1;
  const o = dark ? ON_DARK : ON;
  return {
    name, note, level: level.toUpperCase(),
    b1: o, b2: n >= 2 ? o : OFF, b3: n >= 3 ? o : OFF,
    card: dark
      ? 'background:#111111;color:#F4F3EF;border-radius:22px;padding:20px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box;min-height:0'
      : 'background:#FFFFFF;border:1px solid #CFCDC6;border-radius:22px;padding:20px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box;min-height:0',
    levelText: "font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;color:" + (dark ? '#9A9890' : '#5C5B57'),
    noteStyle: 'margin:0;font-size:14px;line-height:1.45;color:' + (dark ? '#C9C5BD' : '#33322F'),
  };
});

export default function Skills() {
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '32px 32px 20px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '28px' }}>
    <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>06 · SKILLS · MEASUREMENT FIRST</p>
          <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '72px', lineHeight: '0.95', letterSpacing: '-0.045em' }}>What I work in, daily.</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#33322F', paddingBottom: '6px' }}>
          <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><span style={{ display: 'inline-flex', gap: '2px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span></span>Expert</span>
          <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><span style={{ display: 'inline-flex', gap: '2px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', border: '1px solid #8C8A84', boxSizing: 'border-box' }}></span></span>Proficient</span>
          <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><span style={{ display: 'inline-flex', gap: '2px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#B4430F' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', border: '1px solid #8C8A84', boxSizing: 'border-box' }}></span><span style={{ width: '10px', height: '10px', borderRadius: '3px', border: '1px solid #8C8A84', boxSizing: 'border-box' }}></span></span>Familiar</span>
        </div>
      </div>
      <div style={{ flex: '1', minHeight: '0', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
        {skills.map((s, i) => (<Fragment key={i}>
          <div style={css(`${s.card}`)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span style={css(`${s.levelText}`)}>{s.level}</span>
              <span style={{ display: 'inline-flex', gap: '2px' }} aria-hidden="true"><span style={css(`${s.b1}`)}></span><span style={css(`${s.b2}`)}></span><span style={css(`${s.b3}`)}></span></span>
            </div>
            <h2 style={{ margin: 'auto 0 0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '26px', lineHeight: '1.05', letterSpacing: '-0.02em' }}>{s.name}</h2>
            <p style={css(`${s.noteStyle}`)}>{s.note}</p>
          </div>
        </Fragment>))}
      </div>
    </section>

    <aside aria-label="Also building with" style={{ background: '#0E5A5E', color: '#F4F3EF', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box' }}>
      <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', letterSpacing: '0.08em', color: '#B9D3D1' }}>AFTER HOURS</p>
      <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '36px', lineHeight: '1', letterSpacing: '-0.03em' }}>Also building with</h2>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex', flexDirection: 'column' }}>
        <li style={{ padding: '14px 0', borderTop: '1px solid #3F7C7F' }}><div style={{ fontWeight: '600', fontSize: '17px' }}>React + TypeScript</div><div style={{ fontSize: '14px', color: '#B9D3D1', marginTop: '3px' }}>My newest builds and this site.</div></li>
        <li style={{ padding: '14px 0', borderTop: '1px solid #3F7C7F' }}><div style={{ fontWeight: '600', fontSize: '17px' }}>Flutter + Firebase</div><div style={{ fontSize: '14px', color: '#B9D3D1', marginTop: '3px' }}>Nexus, and Pluto before it.</div></li>
        <li style={{ padding: '14px 0', borderTop: '1px solid #3F7C7F' }}><div style={{ fontWeight: '600', fontSize: '17px' }}>Apps Script</div><div style={{ fontSize: '14px', color: '#B9D3D1', marginTop: '3px' }}>Team tools, and the CA report that emails itself.</div></li>
        <li style={{ padding: '14px 0', borderTop: '1px solid #3F7C7F' }}><div style={{ fontWeight: '600', fontSize: '17px' }}>JavaScript</div><div style={{ fontSize: '14px', color: '#B9D3D1', marginTop: '3px' }}>GTM templates and data layers, every day.</div></li>
        <li style={{ padding: '14px 0', borderTop: '1px solid #3F7C7F', borderBottom: '1px solid #3F7C7F' }}><div style={{ fontWeight: '600', fontSize: '17px' }}>HTML + CSS</div><div style={{ fontSize: '14px', color: '#B9D3D1', marginTop: '3px' }}>Enough to debug any tag in a browser.</div></li>
      </ul>
    </aside>
  </div>
  );
}
