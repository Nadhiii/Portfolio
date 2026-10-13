import { Fragment, useState } from 'react';
import { css } from '../css.js';

const TOPICS = [
  ['A tracking problem', 'My conversions dropped after the Consent Mode update and…'],
  ['A role', 'We are hiring for a measurement role and…'],
  ['A project', 'I am building something and need…'],
  ['Just saying hi', 'Saw your portfolio and…'],
];
const BASE = 'min-height:44px;padding:0 16px;border-radius:999px;font-family:inherit;font-size:14px;cursor:pointer;';

export default function Contact() {
  // The form is a front-end mockup for now; wire `send` to EmailJS (already used on the old site) when this goes live.
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(0);
  const topics = TOPICS.map((t, k) => ({
    label: t[0],
    pressed: String(topic === k),
    style: BASE + (topic === k ? 'background:#0E5A5E;color:#FFFFFF;border:1px solid #0E5A5E;font-weight:600' : 'background:transparent;color:#111111;border:1px solid #CFCDC6'),
    pick: () => setTopic(k),
  }));
  const placeholder = TOPICS[topic][1];
  const notSent = !sent;
  const send = () => setSent(true);
  const reset = () => setSent(false);
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '32px 32px 20px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 600px', gap: '48px' }}>
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '0' }}>
      <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>08 · CONTACT · END OF THE RIVER</p>
      <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '104px', lineHeight: '0.88', letterSpacing: '-0.05em' }}>Got something worth <span style={{ color: '#B4430F' }}>measuring?</span></h1>
      <p style={{ margin: '0', maxWidth: '520px', fontSize: '18px', lineHeight: '1.5', color: '#33322F' }}>A tag that won't fire, a role you think I'd fit, or something I built that you have opinions about. I read everything.</p>
      <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid #111111' }}>
        <li><a href="mailto:mahanadhip@gmail.com" style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>EMAIL</span><span style={{ fontSize: '17px', fontWeight: '600' }}>mahanadhip@gmail.com</span></a></li>
        <li><a href="https://www.linkedin.com/in/mahanadhi/" style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>LINKEDIN</span><span style={{ fontSize: '17px', fontWeight: '600' }}>/in/mahanadhi ↗</span></a></li>
        <li><a href="tel:+916363149672" style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>PHONE</span><span style={{ fontSize: '17px', fontWeight: '600' }}>+91 63631 49672</span></a></li>
      </ul>
    </section>

    <form onSubmit={(e) => e.preventDefault()} style={{ background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box', minHeight: '0' }}>
      {sent && (<>
        <div role="status" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
          <span style={{ width: '56px', height: '56px', borderRadius: '999px', background: '#0E5A5E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"></path></svg>
          </span>
          <p style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '44px', letterSpacing: '-0.03em', lineHeight: '1' }}>Conversion recorded.</p>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5', color: '#33322F' }}>Thanks for writing. Expect a reply from mahanadhip@gmail.com.</p>
          <button type="button" onClick={reset} style={{ alignSelf: 'flex-start', minHeight: '44px', padding: '0 20px', background: 'transparent', border: '1px solid #111111', borderRadius: '999px', fontFamily: 'inherit', fontSize: '14px', cursor: 'pointer', color: '#111111' }}>Send another</button>
        </div>
      </>)}
      {notSent && (<>
        <fieldset style={{ border: '0', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <legend style={{ fontSize: '14px', color: '#33322F', padding: '0', marginBottom: '10px' }}>What's this about?</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {topics.map((t, i) => (<Fragment key={i}>
              <button type="button" onClick={t.pick} aria-pressed={t.pressed} style={css(`${t.style}`)}>{t.label}</button>
            </Fragment>))}
          </div>
        </fieldset>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cname" style={{ fontSize: '14px', color: '#33322F' }}>Name</label>
            <input id="cname" type="text" autoComplete="name" style={{ minHeight: '50px', padding: '0 14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cemail" style={{ fontSize: '14px', color: '#33322F' }}>Email</label>
            <input id="cemail" type="email" autoComplete="email" style={{ minHeight: '50px', padding: '0 14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111' }} />
          </div>
        </div>
        <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="cmsg" style={{ fontSize: '14px', color: '#33322F' }}>Message</label>
          <textarea id="cmsg" placeholder={placeholder} style={{ flex: '1', minHeight: '120px', padding: '14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111', resize: 'none' }}></textarea>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={send} style={{ flex: '1', minHeight: '56px', background: '#B4430F', color: '#FFFFFF', border: '0', borderRadius: '999px', fontFamily: 'inherit', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>Send message</button>
          <button type="button" style={{ minHeight: '56px', padding: '0 22px', background: 'transparent', color: '#111111', border: '1px solid #111111', borderRadius: '999px', fontFamily: 'inherit', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>Book a call</button>
        </div>
      </>)}
    </form>
  </div>
  );
}
