import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 2rem', color: '#F2F1F2' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{
          display: 'inline-block', fontSize: 12, padding: '4px 14px',
          borderRadius: 999, border: `1px solid #728497`,
          color: '#728497', marginBottom: '1.5rem',
          background: 'rgba(114,132,151,0.08)'
        }}>
          Game Theory · Macroeconomics · Agent-Based Simulation
        </div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '1.5rem' }}>
          The Union Budget is not{' '}
          <span style={{ color: '#728497' }}>an accounting document.</span>
          <br />It's a strategic game.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#757070', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
          When the government announces capex, corporates, bond markets,
          rural households and states all respond based on what they expect
          others to do. That's a Nash Equilibrium problem.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/simulator" style={{
            padding: '13px 28px', background: '#728497', color: '#131414',
            borderRadius: 12, textDecoration: 'none', fontWeight: 600, fontSize: 15
          }}>Open simulator →</Link>
          <Link to="/methodology" style={{
            padding: '13px 28px', background: 'transparent', color: '#757070',
            border: `1px solid #757070`, borderRadius: 12, textDecoration: 'none', fontSize: 15
          }}>Read methodology</Link>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: 1, background: '#757070', borderRadius: 16, overflow: 'hidden', marginBottom: '4rem'
      }}>
        {[
          ['12%', 'Avg capex underspend 2018–23'],
          ['4 players', 'In the coordination game'],
          ['2 equilibria', 'Good and bad Nash outcomes'],
          ['500 agents', 'Per simulation run'],
        ].map(([v, l]) => (
          <div key={l} style={{ background: '#131414', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#728497', marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 12, color: '#757070' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F2F1F2' }}>The core idea</h2>
        <p style={{ color: '#757070', marginBottom: '2rem', lineHeight: 1.7 }}>
          Tax cuts only work if corporates invest. Capex only multiplies if states match it.
          Each player's best move depends on what they predict others will do.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { n: '01', color: '#728497', title: 'Budget signal', desc: 'Govt announces capex, subsidies, deficit target. This is the opening move.' },
            { n: '02', color: '#656F6E', title: 'Player responses', desc: '4 agents update beliefs using own signals + crowd behaviour.' },
            { n: '03', color: '#728497', title: 'Nash Equilibrium', desc: 'System converges. Good outcome or bad trap — credibility decides.' },
            { n: '04', color: '#656F6E', title: 'Credibility trap', desc: 'Past underspending lowers initial beliefs. Even good budgets fail.' },
          ].map(p => (
            <div key={p.n} style={{ background: '#1a1a1a', border: `1px solid #757070`, borderRadius: 14, padding: '1.25rem' }}>
              <div style={{ fontSize: 11, color: p.color, fontWeight: 600, marginBottom: 8 }}>{p.n}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: '#F2F1F2' }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#757070', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '2rem', borderRadius: 16, marginBottom: '3rem',
        background: 'rgba(114,132,151,0.05)', border: `1px solid rgba(114,132,151,0.15)`
      }}>
        <div style={{ fontSize: 12, color: '#728497', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10 }}>THE KILLER FACT</div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.9, color: '#F2F1F2' }}>
          India averaged <strong style={{ color: '#728497' }}>12% capex underspending</strong> from 2018–23. Game theory explains why this is damaging beyond the missing rupees — corporates who know this history will{' '}
          <strong style={{ color: '#F2F1F2' }}>discount future signals and not invest</strong>, meaning the multiplier never materialises even in years when capex is fully delivered. Credibility is a game theory concept, not just a political one.
        </div>
      </div>

      <div style={{ borderTop: `1px solid #757070`, paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 12, color: '#757070' }}>Data: RBI Annual Reports · MOSPI · Union Budget documents · Not policy advice</div>
        <div style={{ fontSize: 12, color: '#757070', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>Built by</span>
          <a href="https://github.com/Aishwaryaaaaaaaa" target="_blank" rel="noreferrer" style={{ color: '#728497', textDecoration: 'none', fontWeight: 500 }}>Aishwarya Jha</a>
          <span>· Class 11 · Pune</span>
        </div>
      </div>
    </div>
  )
}