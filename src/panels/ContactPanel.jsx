import { Fragment, useState } from 'react';
import emailjs from '@emailjs/browser';
import { css } from '../css.js';
import { EMAILJS, emailjsReady } from '../config/emailjs.js';
import { trackEvent, trackFormSubmissionWithEnhancedConversion } from '../utils/analytics.js';

const TOPICS = [
  ['A tracking problem', 'My conversions dropped after the Consent Mode update and…'],
  ['A role', 'We are hiring for a measurement role and…'],
  ['A project', 'I am building something and need…'],
  ['Just saying hi', 'Saw your portfolio and…'],
];
const CALENDAR_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2PrInWpWnFVLWvxUVR_Dr_mUK1D_FY_gHhG7MLaPBpHwPn10_IouKmbTqcnPeZwIKxzUQOG9y-';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ERROR_STYLE = { margin: '0', fontSize: '14px', color: '#B4430F' };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please add your name.';
  if (!email.trim()) errors.email = 'Please add your email.';
  else if (!EMAIL_RE.test(email.trim())) errors.email = "That email doesn't look right.";
  if (!message.trim()) errors.message = 'Please write a message.';
  else if (message.trim().length < 10) errors.message = 'A little more, please: at least 10 characters.';
  return errors;
}

// Same event names the old site built from the link label (email_click, linkedin_click, ...).
const trackLinkClick = (label) => trackEvent(label.toLowerCase() + '_click', 'Contact', label + ' clicked');

const BASE = 'min-height:44px;padding:0 16px;border-radius:999px;font-family:inherit;font-size:14px;cursor:pointer;';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [topic, setTopic] = useState(0);
  const topics = TOPICS.map((t, k) => ({
    label: t[0],
    pressed: String(topic === k),
    style: BASE + (topic === k ? 'background:#0E5A5E;color:#FFFFFF;border:1px solid #0E5A5E;font-weight:600' : 'background:transparent;color:#111111;border:1px solid #CFCDC6'),
    pick: () => setTopic(k),
  }));
  const placeholder = TOPICS[topic][1];
  const notSent = !sent;
  const sending = status === 'sending';
  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const send = async (e) => {
    e.preventDefault();
    if (sending) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    const name = form.name.trim();
    const email = form.email.trim();
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1).join(' ');
    const subject = TOPICS[topic][0];

    try {
      // Same params the EmailJS template already expects from the old site.
      if (!emailjsReady()) throw new Error('EmailJS settings missing');
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { from_name: name, from_email: email, phone: '', subject, message: form.message.trim(), to_name: 'Mahanadhi' },
        EMAILJS.publicKey
      );
      setSent(true);
      setStatus('idle');

      trackFormSubmissionWithEnhancedConversion({ email, phone: '', name, firstName, lastName });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        form_type: subject,
        // No phone field on this form, so phone_number is left out rather than sent empty.
        user_data: {
          email_address: email,
          address: { first_name: firstName, last_name: lastName },
        },
      });
    } catch (error) {
      setStatus('error');
      trackEvent('contact_form_error', 'Error', 'Contact form failed: ' + (error?.text || error?.message || 'Unknown error'));
    }
  };

  const reset = () => {
    setSent(false);
    setStatus('idle');
    setErrors({});
    setForm({ name: '', email: '', message: '' });
  };
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '32px 32px 20px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 600px', gap: '48px' }}>
    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '0' }}>
      <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>08 · CONTACT · END OF THE RIVER</p>
      <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '104px', lineHeight: '0.88', letterSpacing: '-0.05em' }}>Got something worth <span style={{ color: '#B4430F' }}>measuring?</span></h1>
      <p style={{ margin: '0', maxWidth: '520px', fontSize: '18px', lineHeight: '1.5', color: '#33322F' }}>A tag that won't fire, a role you think I'd fit, or something I built that you have opinions about. I read everything.</p>
      <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', borderTop: '1px solid #111111' }}>
        <li><a href="mailto:mahanadhip@gmail.com" onClick={() => trackLinkClick('Email')} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>EMAIL</span><span style={{ fontSize: '17px', fontWeight: '600' }}>mahanadhip@gmail.com</span></a></li>
        <li><a href="https://www.linkedin.com/in/mahanadhi/" target="_blank" rel="noreferrer" onClick={() => trackLinkClick('LinkedIn')} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>LINKEDIN</span><span style={{ fontSize: '17px', fontWeight: '600' }}>/in/mahanadhi ↗</span></a></li>
        <li><a href="tel:+916363149672" onClick={() => trackLinkClick('Phone')} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 16px 0 0' }}><span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '11px', letterSpacing: '0.06em', color: '#5C5B57' }}>PHONE</span><span style={{ fontSize: '17px', fontWeight: '600' }}>+91 63631 49672</span></a></li>
      </ul>
    </section>

    <form onSubmit={send} noValidate style={{ background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '28px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', boxSizing: 'border-box', minHeight: '0' }}>
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
            <input id="cname" type="text" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'cname-err' : undefined} style={{ minHeight: '50px', padding: '0 14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111' }} />
            {errors.name && <p id="cname-err" style={ERROR_STYLE}>{errors.name}</p>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="cemail" style={{ fontSize: '14px', color: '#33322F' }}>Email</label>
            <input id="cemail" type="email" autoComplete="email" value={form.email} onChange={update('email')} aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'cemail-err' : undefined} style={{ minHeight: '50px', padding: '0 14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111' }} />
            {errors.email && <p id="cemail-err" style={ERROR_STYLE}>{errors.email}</p>}
          </div>
        </div>
        <div style={{ flex: '1', minHeight: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="cmsg" style={{ fontSize: '14px', color: '#33322F' }}>Message</label>
          <textarea id="cmsg" placeholder={placeholder} value={form.message} onChange={update('message')} aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? 'cmsg-err' : undefined} style={{ flex: '1', minHeight: '120px', padding: '14px', background: '#F4F3EF', border: '1px solid #8C8A84', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', color: '#111111', resize: 'none' }}></textarea>
          {errors.message && <p id="cmsg-err" style={ERROR_STYLE}>{errors.message}</p>}
        </div>
        {status === 'error' && (
          <p role="alert" style={ERROR_STYLE}>
            Couldn't send that. Try again, or email me directly at{' '}
            <a href="mailto:mahanadhip@gmail.com" onClick={() => trackLinkClick('Email')} style={{ color: 'inherit', textDecoration: 'underline' }}>mahanadhip@gmail.com</a>.
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={sending} aria-busy={sending} style={{ flex: '1', minHeight: '56px', background: '#B4430F', color: '#FFFFFF', border: '0', borderRadius: '999px', fontFamily: 'inherit', fontWeight: '700', fontSize: '16px', cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.7 : 1 }}>{sending ? 'Sending…' : 'Send message'}</button>
          {/* A real link, so it opens even where pop-ups are blocked. */}
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('calendar_click', 'Contact', 'Schedule call button clicked')} style={{ minHeight: '56px', padding: '0 22px', background: 'transparent', color: '#111111', border: '1px solid #111111', borderRadius: '999px', fontFamily: 'inherit', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', textDecoration: 'none' }}>Book a call</a>
        </div>
      </>)}
    </form>
  </div>
  );
}
