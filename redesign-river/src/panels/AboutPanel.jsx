import { Fragment, useState } from 'react';
import { css } from '../css.js';

const RAW = [
  ['01', 'Graduation', 'B.COM · ACHARYA INSTITUTE', 'A B.Com and no clear direction. I started working because that is what you do next.', 'Had zero plans. Improvisation is a skill too.'],
  ['02', 'The Start', 'TECH SUPPORT · ONEPLUS', 'First real job: TV support on the phone. I did not love it, but working with technology felt natural in a way I had not expected.', 'Tech support taught me that people break things creatively.'],
  ['03', 'The Shift', 'GOOGLE ADS · REGALIX', 'Supporting Google Ads clients put me inside marketing for the first time: measurement, data, and why a number moves. I had no idea this world existed.', 'I did not know what marketing data was. Then I could not stop thinking about it.'],
  ['04', 'The Click', 'AUTOMATION · COGNIZANT', 'Every morning: open the sheet, filter, copy, paste, sort, colour. I automated it with Apps Script. The first thing I ever built, and the moment I realised I could solve problems by building.', 'Why do it manually when you can build something that does it for you?'],
  ['05', 'Building with Claude', 'PLUTO · NEXUS · NANDINI POS', 'Pluto, then Nexus, to run my own money. Then Nandini POS, to run the family shop. I bring the plan, talk it through with Claude (and Gemini now and then), improvise, and ship. Each one bigger, each one used every day by real people.', 'I Googled my way through the first one. Now I have a better pair.'],
  ['06', 'The Work, Now', 'MEASUREMENT SME · GOOGLE LCS', 'Enterprise Google Ads clients at the top tiers. GTM, GA4, Enhanced Conversions, Consent Mode. Audits, fixes, implementations. The learning curve never flattened, which is exactly why I am still here.', 'If the tracking is not right, the ROI is not real.'],
];
const XS = [115, 345, 575, 805, 1035, 1265];

export default function About({ onGo }) {
  const [i, setI] = useState(0);
  const chapters = RAW.map((r, k) => {
    const here = k === i;
    const up = k % 2 === 1;
    return {
      num: r[0], title: r[1], left: XS[k] + 'px',
      justify: up ? 'flex-start' : 'flex-end',
      pressed: String(here), aria: 'Chapter ' + r[0] + ', ' + r[1],
      labelStyle: "font-family:'JetBrains Mono',monospace;font-size:12px;white-space:nowrap;order:" + (up ? 0 : 1) + ';' + (here ? 'color:#111111;font-weight:500' : 'color:#5C5B57'),
      dot: (here
        ? 'display:block;width:22px;height:22px;border-radius:999px;background:#B4430F;box-shadow:0 0 0 6px #F4F3EF'
        : k < i
          ? 'display:block;width:14px;height:14px;border-radius:999px;background:#0E5A5E;box-shadow:0 0 0 5px #F4F3EF'
          : 'display:block;width:14px;height:14px;border-radius:999px;background:#F4F3EF;border:2px solid #0E5A5E;box-sizing:border-box;box-shadow:0 0 0 5px #F4F3EF') + ';margin:' + (up ? '24px 0 0' : '0 0 46px'),
      pick: () => setI(k),
    };
  });
  const r = RAW[i];
  const cur = { num: r[0], title: r[1], subtitle: r[2], story: r[3], quote: r[4] };
  const dash = XS[i] + 115 + ' 4000';
  const prev = () => setI((i + RAW.length - 1) % RAW.length);
  const next = () => setI((i + 1) % RAW.length);
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '32px 0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <div style={{ padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>07 · ABOUT · SIX CHAPTERS</p>
        <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '72px', lineHeight: '0.95', letterSpacing: '-0.045em' }}>Not a straight line.</h1>
      </div>
      <p style={{ margin: '0', maxWidth: '420px', fontSize: '16px', lineHeight: '1.5', color: '#33322F' }}>Mahanadhi means "great river". Fitting, since my path has mostly been about finding a way around whatever was in front of it. Tap a bend to read that chapter.</p>
    </div>

    <div className="about-river" style={{ position: 'relative', height: '150px', margin: '8px 32px 0' }}>
      <svg aria-hidden="true" width="1376" height="80" viewBox="0 0 1376 80" style={{ position: 'absolute', left: '0', top: '30px', overflow: 'hidden' }}>
        <path d="M-115 40 Q0 0 115 40 T345 40 T575 40 T805 40 T1035 40 T1265 40 T1495 40" fill="none" stroke="#0E5A5E" strokeWidth="2" opacity="0.4"></path>
        <path d="M-115 40 Q0 0 115 40 T345 40 T575 40 T805 40 T1035 40 T1265 40 T1495 40" fill="none" stroke="#0E5A5E" strokeWidth="4" strokeDasharray={dash}></path>
      </svg>
      {chapters.map((c, i) => (<Fragment key={i}>
        <button type="button" onClick={c.pick} aria-pressed={c.pressed} aria-label={c.aria} style={css(`position: absolute; left: ${c.left}; top: 0; width: 180px; margin-left: -90px; height: 150px; background: transparent; border: 0; padding: 0; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: ${c.justify}; gap: 10px; font-family: inherit; color: #111111`)}>
          <span style={css(`${c.labelStyle}`)}>{c.num} · {c.title}</span>
          <span style={css(`${c.dot}`)}></span>
        </button>
      </Fragment>))}
    </div>

    <section aria-live="polite" style={{ flex: '1', minHeight: '0', margin: '8px 32px 0', display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr) minmax(0, 0.9fr)', gap: '40px', alignItems: 'start', paddingTop: '28px', borderTop: '1px solid #111111' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '120px', lineHeight: '0.8', letterSpacing: '-0.06em', color: '#0E5A5E' }}>{cur.num}</span>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', letterSpacing: '0.06em', color: '#5C5B57' }}>{cur.subtitle}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '44px', letterSpacing: '-0.03em', lineHeight: '1' }}>{cur.title}</h2>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.6', color: '#33322F' }}>{cur.story}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <p style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '500', fontSize: '32px', lineHeight: '1.15', letterSpacing: '-0.02em', color: '#B4430F' }}>"{cur.quote}"</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={prev} aria-label="Previous chapter" style={{ width: '48px', height: '48px', borderRadius: '999px', border: '1px solid #111111', background: 'transparent', fontSize: '18px', cursor: 'pointer', color: '#111111' }}>←</button>
          <button type="button" onClick={next} aria-label="Next chapter" style={{ width: '48px', height: '48px', borderRadius: '999px', border: '0', background: '#111111', color: '#F4F3EF', fontSize: '18px', cursor: 'pointer' }}>→</button>
        </div>
      </div>
    </section>
  </div>
  );
}
