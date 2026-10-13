import { useEffect, useState } from 'react';
import { trackEvent } from '../utils/analytics.js';

// Team tools: the Apps Script work. Two tabs: the dispatch center and the morning follow-ups. All names and data are samples.

const C = {
  ground: '#F4F3EF', card: '#FFFFFF', sand: '#E4E2DB', ink: '#111111', body: '#33322F', muted: '#5C5B57',
  line: '#CFCDC6', accent: '#B4430F', river: '#0E5A5E', riverSoft: '#B9D3D1', night: '#0A0A0A',
};
const F = {
  display: "'Bricolage Grotesque', sans-serif",
  mono: "'JetBrains Mono', monospace",
  sheet: "'Instrument Sans', Arial, sans-serif",
};

const eyebrow = { margin: 0, fontFamily: F.mono, fontSize: 12, letterSpacing: '0.08em', color: C.river };
const label = { fontFamily: F.mono, fontSize: 11, letterSpacing: '0.06em', color: C.accent };

// What a lead did by hand every morning, before the script.
const BY_HAND = [
  'Open the team-wide follow-up sheet',
  'Filter it down to my own agents',
  'Split today’s follow-ups from the missed ones',
  'Copy both into my own sheet',
  'Sort by agent, colour the headers, add tick boxes',
  'Tidy away yesterday’s copy',
];

// Sample rows for the illustration only. Not real cases or people.
const TODAY = [
  ['C-10482', '13-10', 'Agent A', 'Pending'],
  ['C-10477', '13-10', 'Agent B', 'Awaiting reply'],
  ['C-10469', '13-10', 'Agent C', 'Pending'],
  ['C-10455', '13-10', 'Agent D', 'In review'],
];
const MISSED = [
  ['C-10398', '10-10', 'Agent B', 'Pending'],
  ['C-10371', '09-10', 'Agent E', 'Awaiting reply'],
];

function SheetTable({ title, tint, rows }) {
  const cell = { padding: '7px 8px', borderRight: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, whiteSpace: 'nowrap' };
  return (
    <table style={{ borderCollapse: 'collapse', fontFamily: F.sheet, fontSize: 12, textAlign: 'center', border: `1px solid ${C.line}`, background: C.card, flex: '1 1 0', minWidth: 0 }}>
      <thead>
        <tr>
          <th colSpan={5} style={{ ...cell, background: tint, fontWeight: 700, fontSize: 13 }}>{title}</th>
        </tr>
        <tr style={{ background: '#F3F3F3' }}>
          {['CASE ID', 'F/U DATE', 'AGENT', 'STATUS', ''].map((h) => (
            <th key={h || 'tick'} style={{ ...cell, fontWeight: 700, fontSize: 11 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r[0]}>
            {r.map((v, k) => (
              <td key={k} style={cell}>{v}</td>
            ))}
            <td style={cell}>
              <span aria-label={i === 0 ? 'Done' : 'Not done'} style={{ display: 'inline-block', width: 13, height: 13, borderRadius: 2, border: `1.5px solid ${i === 0 ? C.river : '#8C8A84'}`, background: i === 0 ? C.river : 'transparent', verticalAlign: 'middle' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AfterView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#F8F9FA', borderBottom: `1px solid ${C.line}`, fontFamily: F.sheet, fontSize: 12, color: C.muted }}>
        <span style={{ width: 18, height: 18, borderRadius: 3, background: '#1E8E3E', display: 'inline-block' }} aria-hidden="true" />
        <span style={{ color: C.ink, fontWeight: 600 }}>Team follow-ups</span>
        <span>· built at 7:00 AM, before anyone logs in</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start', background: C.card, overflow: 'hidden' }}>
        <SheetTable title="Today’s Follow-up" tint="#E6F4EA" rows={TODAY} />
        <SheetTable title="Follow-up Misses" tint="#FCE8E6" rows={MISSED} />
      </div>
      <div style={{ display: 'flex', gap: 2, padding: '0 10px', background: '#F1F3F4', borderTop: `1px solid ${C.line}`, fontFamily: F.sheet, fontSize: 12 }}>
        <span style={{ padding: '8px 14px', color: '#9AA0A6', textDecoration: 'line-through' }}>10-10-2026 · hidden</span>
        <span style={{ padding: '8px 14px', background: C.card, color: '#1E8E3E', fontWeight: 600, borderBottom: '2px solid #1E8E3E' }}>13-10-2026</span>
      </div>
    </div>
  );
}

function BeforeView() {
  return (
    <div style={{ height: '100%', padding: '22px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, background: C.card }}>
      <p style={{ ...label, color: C.muted, margin: 0 }}>EVERY MORNING, EVERY LEAD, BY HAND</p>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {BY_HAND.map((s, i) => (
          <li key={s} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 14px', border: `1px solid ${C.line}`, borderRadius: 12, fontSize: 15, color: C.body }}>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, width: 20 }}>{String(i + 1).padStart(2, '0')}</span>
            {s}
          </li>
        ))}
      </ol>
      <p style={{ margin: 'auto 0 0', fontFamily: F.display, fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em', color: C.ink }}>
        30+ minutes of copy-paste. Before the actual work starts.
      </p>
    </div>
  );
}

function Stats({ items }) {
  return (
    <div style={{ marginTop: 'auto', display: 'flex', gap: 28 }}>
      {items.map(([n, l]) => (
        <div key={l}>
          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 36, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function KeyList({ rows, keyWidth = 70 }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: `1px solid ${C.ink}` }}>
      {rows.map(([k, v]) => (
        <li key={k} style={{ display: 'flex', gap: 14, padding: '8px 0', borderBottom: `1px solid ${C.line}`, fontSize: 14.5, lineHeight: 1.4 }}>
          <span style={{ ...label, width: keyWidth, flex: `0 0 ${keyWidth}px`, paddingTop: 2 }}>{k}</span>
          <span style={{ flex: 1, minWidth: 0 }}>{v}</span>
        </li>
      ))}
    </ol>
  );
}

const segStyle = (on) => ({
  minHeight: 40, padding: '0 16px', border: 0, borderRadius: 999, fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit', background: on ? C.card : 'transparent', color: on ? C.ink : C.muted, fontWeight: on ? 600 : 400,
});

// ---------------------------------------------------------------- Morning follow-ups

function FollowupsCase() {
  const [view, setView] = useState('after');
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '470px minmax(0, 1fr)', gap: 28 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontFamily: F.display, fontWeight: 700, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          The first thing I ever built.
        </h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: C.body }}>
          Every team lead started the day the same way: dig their own follow-ups out of one shared sheet, by hand.
          I wrote an Apps Script that does it for them overnight, so the list is waiting when they log in.
        </p>
        <KeyList
          rows={[
            ['READS', 'the shared follow-up sheet, weekdays only'],
            ['FILTERS', 'down to one lead’s cases'],
            ['SPLITS', 'today’s follow-ups from missed ones and bad dates'],
            ['WRITES', 'a fresh tab named for today, sorted by agent, with tick boxes'],
            ['HIDES', 'yesterday’s tab (Friday’s, on a Monday)'],
          ]}
        />
        <div style={{ background: C.night, color: '#C9C5BD', borderRadius: 18, padding: '14px 16px', fontFamily: F.mono, fontSize: 12.5, lineHeight: 1.6 }}>
          <div style={{ color: '#9A9890' }}>// [1] the only part a lead ever edits</div>
          <div><span style={{ color: '#E8732A' }}>const</span> SUPERVISOR_NAME = <span style={{ color: '#C9A84C' }}>"Your name"</span>;</div>
          <div><span style={{ color: '#E8732A' }}>const</span> TARGET_ID = <span style={{ color: '#C9A84C' }}>"your-sheet-id"</span>;</div>
          <div style={{ color: '#9A9890' }}>// [2] to [5] protected logic: do not touch</div>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: C.body }}>
          <strong style={{ color: C.ink }}>Why it spread:</strong> a lead copies the script and changes two lines.
          No setup call with me, no training. That’s how one script ended up running for 10+ teams.
        </p>
        <Stats items={[['10+', 'teams adopted'], ['45 min', 'saved every day'], ['2', 'lines to set up']]} />
      </section>

      <section aria-label="Before and after" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div role="group" aria-label="View" style={{ display: 'flex', padding: 4, background: C.sand, borderRadius: 999 }}>
            <button type="button" aria-pressed={view === 'before'} onClick={() => setView('before')} style={segStyle(view === 'before')}>By hand</button>
            <button type="button" aria-pressed={view === 'after'} onClick={() => setView('after')} style={segStyle(view === 'after')}>With the script</button>
          </div>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>ILLUSTRATION · SAMPLE DATA</span>
        </div>
        <figure style={{ flex: 1, minHeight: 0, margin: 0, background: C.river, borderRadius: 28, padding: '24px 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <figcaption style={{ display: 'flex', justifyContent: 'space-between', color: C.ground, fontSize: 15 }}>
            <span style={{ fontWeight: 600 }}>{view === 'after' ? 'What a lead opens at 9 AM' : 'What a lead used to do at 9 AM'}</span>
            <span style={{ color: C.riverSoft }}>{view === 'after' ? 'Green: today. Red: missed.' : 'Six steps, every single day'}</span>
          </figcaption>
          <div style={{ flex: 1, minHeight: 0, borderRadius: '14px 14px 0 0', overflow: 'hidden', background: C.card }}>
            {view === 'after' ? <AfterView /> : <BeforeView />}
          </div>
        </figure>
        <p style={{ margin: 0, fontFamily: F.mono, fontSize: 12, color: C.muted }}>Google Apps Script · Sheets · time-driven trigger</p>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------- Dispatch center

// Sample agents for the illustration. The real tool ranks a live team; nothing here is real.
const PICKS = {
  'GTG Audit': {
    note: 'One pick per region, so every time zone is covered.',
    picks: [
      { name: 'Agent Asha', region: 'APAC', chips: ['Available', 'Idle for 2 days', '3 past'], growth: true },
      { name: 'Agent Ben', region: 'EMEA', chips: ['Available', 'Idle for 1 day', '9 past'] },
      { name: 'Agent Carla', region: 'AMER', chips: ['Busy', 'Idle for 4 days', '6 past'] },
    ],
  },
  'Enhanced Conversions': {
    note: 'Fewer past cases ranks higher, so people get to learn.',
    picks: [
      { name: 'Agent Dev', region: 'APAC', chips: ['Available', 'Idle for 3 days', '1 past'], growth: true },
      { name: 'Agent Elif', region: 'EMEA', chips: ['Available', 'Idle for 1 day', '4 past'] },
      { name: 'Agent Femi', region: 'KRK', chips: ['Available', 'no prior cases'], growth: true },
    ],
  },
  'Floodlight Audit': {
    specialist: true,
    note: 'Specialist work only goes to the people trained for it, even when they are busy.',
    picks: [
      { name: 'Agent Gita', region: 'Specialist', chips: ['Available', 'Idle for 1 day', '14 past'] },
      { name: 'Agent Hugo', region: 'Specialist', chips: ['Busy', 'Idle for 0 days', '11 past'] },
      { name: 'Agent Ines', region: 'Specialist', chips: ['On leave'], muted: true },
    ],
  },
};

function DispatchConsole() {
  const [task, setTask] = useState('GTG Audit');
  const [picked, setPicked] = useState('');
  const data = PICKS[task];
  const dark = { bg: '#131314', surface: '#1E1F20', surface2: '#2A2B2E', border: '#3C4043', text: '#E8EAED', dim: '#9AA0A6', blue: '#8AB4F8', green: '#81C995' };

  return (
    <div style={{ height: '100%', background: dark.bg, color: dark.text, display: 'flex', flexDirection: 'column', fontFamily: "'Instrument Sans', Arial, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `1px solid ${dark.border}`, fontSize: 13 }}>
        <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 999, background: dark.blue }} />
        <span style={{ color: dark.blue, fontWeight: 600 }}>Sherlock Homies</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 4, fontSize: 12 }}>
          {['Dispatch', 'My Cases', 'Workload', 'SME Stats'].map((t, i) => (
            <span key={t} style={{ padding: '5px 10px', borderRadius: 8, background: i === 0 ? '#4285F4' : 'transparent', color: i === 0 ? '#FFFFFF' : dark.dim }}>{t}</span>
          ))}
        </span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 16, padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.05em', color: dark.dim }}>TASK TYPE</span>
          <div role="group" aria-label="Task type" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.keys(PICKS).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={task === t}
                onClick={() => { setTask(t); setPicked(''); }}
                style={{ minHeight: 40, textAlign: 'left', padding: '0 12px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                  background: task === t ? 'rgba(66,133,244,0.15)' : dark.surface2, color: task === t ? dark.blue : dark.text,
                  border: `1px solid ${task === t ? dark.blue : dark.border}` }}
              >
                {t}{PICKS[t].specialist ? ' · specialist' : ''}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 11, letterSpacing: '0.05em', color: dark.dim, marginTop: 6 }}>ASSIGNED AGENT</span>
          <div style={{ minHeight: 40, display: 'flex', alignItems: 'center', padding: '0 12px', borderRadius: 10, background: dark.surface2, border: `1px solid ${picked ? dark.blue : dark.border}`, fontSize: 13, color: picked ? dark.text : '#6B6F73' }}>
            {picked || 'Click a suggestion →'}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: dark.dim, lineHeight: 1.45 }}>
            <span style={{ color: dark.green }}>✓ Screenshot link is a real URL</span>
            <span style={{ color: dark.green }}>✓ Case ID not already taken</span>
            <span style={{ color: dark.green }}>✓ POC is a name, not an email</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.05em', color: dark.dim }}>SUGGESTION</span>
          {data.picks.map((p) => (
            <button
              key={task + p.name}
              type="button"
              onClick={() => {
                if (p.muted) return;
                trackEvent('dispatch_demo_pick', 'Engagement', task);
                setPicked(p.name);
              }}
              disabled={p.muted}
              style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 12, cursor: p.muted ? 'default' : 'pointer', fontFamily: 'inherit',
                background: picked === p.name ? 'rgba(138,180,248,0.12)' : dark.surface, color: dark.text, opacity: p.muted ? 0.55 : 1,
                border: `1px solid ${picked === p.name ? dark.blue : dark.border}`, display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: dark.blue, background: 'rgba(138,180,248,0.15)', padding: '3px 9px', borderRadius: 999 }}>{p.region.toUpperCase()}</span>
              </span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.chips.map((c) => (
                  <span key={c} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, border: `1px solid ${c === 'Available' ? 'rgba(129,201,149,0.35)' : dark.border}`, color: c === 'Available' ? dark.green : dark.dim }}>{c}</span>
                ))}
                {p.growth && <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, border: '1px solid rgba(253,214,99,0.35)', color: '#FDD663' }}>Growth pick</span>}
              </span>
            </button>
          ))}
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.45, color: dark.dim }}>{data.note} Anyone on leave today is left out.</p>
        </div>
      </div>

      <div style={{ padding: '10px 16px', borderTop: `1px solid ${dark.border}`, fontSize: 12, color: dark.dim, display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ padding: '6px 12px', borderRadius: 8, background: picked ? '#4285F4' : dark.surface2, color: picked ? '#FFFFFF' : dark.dim, fontWeight: 600 }}>Assign &amp; notify</span>
        <span>{picked ? `${picked} gets an email with the case link. Lead and dispatcher are copied. It’s logged, and a group message is ready to paste.` : 'Pick an agent to see what happens next.'}</span>
      </div>
    </div>
  );
}

function DispatchCase() {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '470px minmax(0, 1fr)', gap: 28 }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <h2 style={{ margin: 0, fontFamily: F.display, fontWeight: 700, fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Sherlock Homies, our dispatch center.
        </h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, color: C.body }}>
          Cases used to go to whoever looked free, then got moved once that person turned out to be buried.
          Now a lead picks the task type and the console suggests who should take it, and why.
        </p>
        <p style={{ ...label, margin: '4px 0 0' }}>HOW IT PICKS</p>
        <KeyList
          keyWidth={26}
          rows={[
            ['01', 'Leaves out anyone on leave today, straight from the team’s leave tracker.'],
            ['02', 'Keeps specialist work with the people trained for it.'],
            ['03', 'Takes one pick per region, so every time zone is covered.'],
            ['04', 'Ranks by: free now, under 3 cases today, fewest open, least experience with the task, longest idle.'],
          ]}
        />
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: C.body }}>
          <strong style={{ color: C.ink }}>The part I care about:</strong> ranking the least experienced first means work spreads out and
          people learn new task types, instead of the same few experts getting everything.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: C.body }}>
          Around it: duplicate cases blocked, bundled dispatch, a backup of every row before it’s edited, and roles checked on the server.
        </p>
        <Stats items={[['20+', 'agents dispatched to'], ['4', 'regions covered'], ['3', 'roles, checked server-side']]} />
      </section>

      <section aria-label="Dispatch console illustration" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 48 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Try it: pick a task type, then a suggestion.</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>ILLUSTRATION · SAMPLE AGENTS</span>
        </div>
        <figure style={{ flex: 1, minHeight: 0, margin: 0, background: C.river, borderRadius: 28, padding: '24px 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, borderRadius: '14px 14px 0 0', overflow: 'hidden' }}>
            <DispatchConsole />
          </div>
        </figure>
        <p style={{ margin: 0, fontFamily: F.mono, fontSize: 12, color: C.muted }}>Apps Script web app · Sheets as the database · MailApp · CacheService</p>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------- The stop

export default function TeamPanel({ onGo }) {
  const [tab, setTab] = useState('dispatch');
  // The Work cards say which of the two tools to open.
  useEffect(() => {
    const pick = (e) => setTab(e.detail);
    window.addEventListener('team-tab', pick);
    return () => window.removeEventListener('team-tab', pick);
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    onGo(id);
  };
  const tabStyle = (on) => ({
    minHeight: 44, display: 'inline-flex', alignItems: 'center', padding: '0 18px', borderRadius: 999, fontSize: 14, cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: on ? 600 : 400, background: on ? C.ink : 'transparent', color: on ? C.ground : C.ink,
    border: `1px solid ${on ? C.ink : C.line}`,
  });

  return (
    <div style={{ flex: 1, minHeight: 0, boxSizing: 'border-box', padding: '22px 32px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="#work" onClick={go('work')} style={{ fontSize: 14, color: C.muted }}>← All work</a>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontFamily: F.display, fontWeight: 700, fontSize: 64, lineHeight: 0.9, letterSpacing: '-0.05em' }}>Team tools</h1>
            <span style={eyebrow}>05 · APPS SCRIPT · BUILT FOR MY TEAM</span>
          </div>
        </div>
        <div role="group" aria-label="Team tools" style={{ display: 'flex', gap: 8 }}>
          <button type="button" aria-pressed={tab === 'dispatch'} onClick={() => { trackEvent('team_tab', 'Engagement', 'dispatch'); setTab('dispatch'); }} style={tabStyle(tab === 'dispatch')}>Dispatch center</button>
          <button type="button" aria-pressed={tab === 'followups'} onClick={() => { trackEvent('team_tab', 'Engagement', 'followups'); setTab('followups'); }} style={tabStyle(tab === 'followups')}>Morning follow-ups</button>
        </div>
      </div>
      {tab === 'dispatch' ? <DispatchCase /> : <FollowupsCase />}
    </div>
  );
}
