
export default function Experience({ onGo }) {
  return (
<div style={{ flex: '1', minHeight: '0', boxSizing: 'border-box', padding: '32px 32px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: '0', fontFamily: '\'JetBrains Mono\', monospace', fontSize: '13px', letterSpacing: '0.08em', color: '#0E5A5E' }}>05 · EXPERIENCE · JAN 2021 → NOW</p>
        <h1 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontWeight: '700', fontSize: '72px', lineHeight: '0.95', letterSpacing: '-0.045em' }}>Five years, uphill.</h1>
      </div>
      <a href="https://rxresu.me/nadhiii/general" style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center', padding: '0 22px', border: '1px solid #111111', borderRadius: '999px', fontWeight: '600', fontSize: '15px', boxSizing: 'border-box' }}>Full résumé ↗</a>
    </div>

    <ol style={{ flex: '1', minHeight: '0', listStyle: 'none', margin: '0', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) minmax(0, 1.6fr)', gap: '14px', alignItems: 'end' }}>
      <li style={{ height: '46%', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>2021 – 22</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Operations Representative</h2>
        <span style={{ fontSize: '13px', color: '#5C5B57' }}>Concentrix · OnePlus TV</span>
        <p style={{ margin: 'auto 0 0', fontSize: '14px', lineHeight: '1.45', color: '#33322F' }}>Phone support for TVs. Learned that people break things creatively.</p>
      </li>
      <li style={{ height: '56%', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>2022 – 23</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Associate, CEC Operations</h2>
        <span style={{ fontSize: '13px', color: '#5C5B57' }}>Tesco Bengaluru</span>
        <p style={{ margin: 'auto 0 0', fontSize: '14px', lineHeight: '1.45', color: '#33322F' }}>Remote support for store teams on product listings and point-of-sale systems.</p>
      </li>
      <li style={{ height: '66%', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>JAN – MAY 2023</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Implementation Consultant</h2>
        <span style={{ fontSize: '13px', color: '#5C5B57' }}>Regalix</span>
        <p style={{ margin: 'auto 0 0', fontSize: '14px', lineHeight: '1.45', color: '#33322F' }}>First step into measurement: Consent Mode, Enhanced Conversions, GA4 and GTM for Google Ads clients.</p>
      </li>
      <li style={{ height: '80%', background: '#FFFFFF', border: '1px solid #CFCDC6', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#5C5B57' }}>2023 – 25</span>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>Senior Process Executive</h2>
        <span style={{ fontSize: '13px', color: '#5C5B57' }}>Cognizant · Google Technical Solutions</span>
        <p style={{ margin: 'auto 0 0', fontSize: '14px', lineHeight: '1.45', color: '#33322F' }}>The project moved from Regalix to Cognizant. In April 2024 I moved into Google's LCS program and larger enterprise clients.</p>
      </li>
      <li style={{ height: '100%', background: '#111111', color: '#F4F3EF', borderRadius: '22px', padding: '26px', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: '\'JetBrains Mono\', monospace', fontSize: '12px', color: '#E8732A' }}>OCT 2025 → NOW</span>
          <span style={{ fontSize: '12px', fontWeight: '600', padding: '5px 10px', background: '#E8732A', color: '#0A0A0A', borderRadius: '999px' }}>Current</span>
        </div>
        <h2 style={{ margin: '0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '40px', lineHeight: '1', letterSpacing: '-0.03em' }}>Subject Matter Expert</h2>
        <span style={{ fontSize: '14px', color: '#9A9890' }}>Cognizant · Measurement CoE, Google LCS</span>
        <ul style={{ margin: '8px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: '1.45', color: '#DAD6CE' }}>
          <li>The measurement SME for enterprise advertisers such as Nike, L'Oréal, Bajaj, Lodha and Cult.fit.</li>
          <li>GA4, GTM, Enhanced Conversions, Consent Mode v2 and offline conversions, end to end.</li>
          <li>Six people mentored so far; works directly with Google teams.</li>
        </ul>
        <p style={{ margin: 'auto 0 0', fontFamily: '\'Bricolage Grotesque\', sans-serif', fontSize: '20px', color: '#E8732A' }}>"If the tracking is not right, the ROI is not real."</p>
      </li>
    </ol>
  </div>
  );
}
