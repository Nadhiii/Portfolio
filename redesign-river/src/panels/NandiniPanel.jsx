import { Fragment, useState } from 'react';
import { css } from '../css.js';

const SHOTS = {
  billing: { en: '/img/pos-en-billing.png', kn: '/img/pos-kn-billing.png', label: 'Billing', caption: 'The counter', note: 'Scan, tap or search. F8 saves.' },
  dashboard: { en: '/img/pos-en-dashboard.png', label: 'Dashboard', caption: 'The owner view', note: 'Day, month and 30-day trends' },
  bills: { en: '/img/pos-en-bills.png', label: 'Bills', caption: 'Every bill, searchable', note: 'Filters, reprints, CSV' },
  close: { en: '/img/pos-en-dayClose.png', label: 'Day close', caption: 'Closing the drawer', note: 'Expected vs counted cash' },
};
const PILL = 'min-height:44px;padding:0 16px;border-radius:999px;font-family:inherit;font-size:14px;cursor:pointer;';
const SEG = 'min-height:36px;padding:0 14px;border:0;border-radius:999px;font-size:14px;cursor:pointer;';
const SEG_ON = SEG + 'background:#FFFFFF;color:#111111;font-weight:600';
const SEG_OFF = SEG + 'background:transparent;color:#5C5B57';

export default function Nandini({ onGo }) {
  const go = (id) => (e) => {
    e.preventDefault();
    onGo(id);
  };
  const [tab, setTab] = useState('billing');
  const [lang, setLang] = useState('en');
  const s = SHOTS[tab];
  const useKn = lang === 'kn' && s.kn;
  const tabs = Object.keys(SHOTS).map((k) => ({
    label: SHOTS[k].label,
    pressed: String(tab === k),
    style: PILL + (tab === k ? 'background:#111111;color:#F4F3EF;border:1px solid #111111;font-weight:600' : 'background:transparent;color:#111111;border:1px solid #CFCDC6'),
    pick: () => setTab(k),
  }));
  const shot = useKn ? s.kn : s.en;
  const alt = 'Nandini POS ' + s.label + ' screen' + (useKn ? ' in Kannada' : '');
  const caption = s.caption;
  const note = lang === 'kn' && !s.kn ? 'Kannada view shown on Billing' : s.note;
  const enStyle = lang === 'en' ? SEG_ON : SEG_OFF;
  const knStyle = (lang === 'kn' ? SEG_ON : SEG_OFF) + ";font-family:'Noto Sans Kannada',sans-serif";
  const enPressed = String(lang === 'en');
  const knPressed = String(lang === 'kn');
  const toEn = () => setLang('en');
  const toKn = () => { setLang('kn'); setTab('billing'); };
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '28px 32px 20px', display: 'grid', gridTemplateColumns: '440px minmax(0, 1fr)', gap: '40px' }}>
    <section style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
      <a href="#work" onClick={go('work')} style={{ fontSize: '14px', color: '#5C5B57', minHeight: '32px', display: 'inline-flex', alignItems: 'center' }}>← All work</a>
      <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', letterSpacing: '0.08em', color: '#0E5A5E' }}>03 · CASE STUDY · LIVE</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span role="img" aria-label="Nandini POS logo" style={{ flex: '0 0 56px', width: '56px', height: '56px', borderRadius: '12px', background: '#0B5EA8', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', fontWeight: '700', fontSize: '32px' }}>N</span><h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '64px', lineHeight: '0.92', letterSpacing: '-0.045em' }}>Nandini POS</h1></div>
      <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.45', color: '#33322F' }}>My family runs a Nandini milk parlour and café in Periyapatna. Odoo worked, but it was hard to understand and harder to change, so every small edit meant my parents calling us kids. At nearly ₹10,000 a year, that adds up for a small shop. So I planned our own, built it with Claude, and it's live at the counter now. The logo too.</p>
      <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: '0', display: 'flex', flexDirection: 'column', borderTop: '1px solid #111111' }}>
        <li style={{ display: 'flex', gap: '14px', padding: '8px 0', borderBottom: '1px solid #CFCDC6', fontSize: '15px', lineHeight: '1.4' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B4430F', width: '92px', flex: '0 0 92px', paddingTop: '2px' }}>OFFLINE</span><span>Bills save with no internet and sync when it's back. Power cuts don't lose a bill.</span></li>
        <li style={{ display: 'flex', gap: '14px', padding: '8px 0', borderBottom: '1px solid #CFCDC6', fontSize: '15px', lineHeight: '1.4' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B4430F', width: '92px', flex: '0 0 92px', paddingTop: '2px' }}>ಕನ್ನಡ</span><span>Screens in Kannada or English for the staff; bills always print in English.</span></li>
        <li style={{ display: 'flex', gap: '14px', padding: '8px 0', borderBottom: '1px solid #CFCDC6', fontSize: '15px', lineHeight: '1.4' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B4430F', width: '92px', flex: '0 0 92px', paddingTop: '2px' }}>GST</span><span>Tax-inclusive prices from the official KMF list, broken up by rate, maths done in paise.</span></li>
        <li style={{ display: 'flex', gap: '14px', padding: '8px 0', borderBottom: '1px solid #CFCDC6', fontSize: '15px', lineHeight: '1.4' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B4430F', width: '92px', flex: '0 0 92px', paddingTop: '2px' }}>COUNTER</span><span>Barcode scans, several open bills as tabs, hold and resume, day close with a cash count.</span></li>
        <li style={{ display: 'flex', gap: '14px', padding: '8px 0', borderBottom: '1px solid #CFCDC6', fontSize: '15px', lineHeight: '1.4' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#B4430F', width: '92px', flex: '0 0 92px', paddingTop: '2px' }}>CA-READY</span><span>Saved bills are never edited. A monthly report emails itself to the accountant.</span></li>
      </ul>
      <div style={{ marginTop: 'auto', display: 'flex', gap: '28px', alignItems: 'flex-end' }}>
        <div><div style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '40px', letterSpacing: '-0.03em', lineHeight: '1' }}>285</div><div style={{ fontSize: '13px', color: '#5C5B57', marginTop: '4px' }}>automated tests</div></div>
        <div><div style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '40px', letterSpacing: '-0.03em', lineHeight: '1' }}>2</div><div style={{ fontSize: '13px', color: '#5C5B57', marginTop: '4px' }}>languages</div></div>
        <div><div style={{ fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '600', fontSize: '40px', letterSpacing: '-0.03em', lineHeight: '1' }}>₹10k</div><div style={{ fontSize: '13px', color: '#5C5B57', marginTop: '4px' }}>yearly licence, gone</div></div>
      </div>
    </section>

    <section aria-label="Screens" style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div role="group" aria-label="Screen" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tabs.map((t, i) => (<Fragment key={i}>
            <button type="button" onClick={t.pick} aria-pressed={t.pressed} style={css(`${t.style}`)}>{t.label}</button>
          </Fragment>))}
        </div>
        <div role="group" aria-label="Language" style={{ display: 'flex', padding: '4px', background: '#E4E2DB', borderRadius: '999px' }}>
          <button type="button" onClick={toEn} aria-pressed={enPressed} style={css(`${enStyle}`)}>EN</button>
          <button type="button" onClick={toKn} aria-pressed={knPressed} style={css(`${knStyle}`)}>ಕನ್ನಡ</button>
        </div>
      </div>
      <figure style={{ flex: '1', minHeight: '0', margin: '0', background: '#0E5A5E', borderRadius: '28px', padding: '28px 28px 0', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden', boxSizing: 'border-box' }}>
        <figcaption style={{ display: 'flex', justifyContent: 'space-between', color: '#F4F3EF', fontSize: '15px', gap: '16px' }}><span style={{ fontWeight: '600' }}>{caption}</span><span style={{ color: '#B9D3D1' }}>{note}</span></figcaption>
        <div style={{ flex: '1', minHeight: '0', overflow: 'hidden', borderRadius: '14px 14px 0 0', background: '#FFFFFF' }}>
          <img src={shot} alt={alt} style={{ width: '100%', display: 'block' }} />
        </div>
      </figure>
      <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>React · TypeScript · Vite PWA · Firestore (offline) · Firebase Auth · Apps Script · built with Claude</p>
    </section>
  </div>
  );
}
