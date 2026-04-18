export default function Methodology() {
  const sections = [
    { title: 'The coordination game', content: 'The Union Budget creates a coordination problem among four strategic players...' },
    { title: 'Agent decision model', content: 'Each agent maintains a belief p (probability others will cooperate)...' },
    { title: 'Budget quality function', content: 'Q = (0.5 × capex_score + 0.25 × subsidy_score + 0.25 × deficit_score) × (0.6 + 0.4 × credibility)...' },
    { title: 'The credibility trap', content: 'When credibility is high (≥0.5), the payoff for the good equilibrium is 0.6 × base...' },
    { title: 'Nash Equilibrium', content: 'The 2×2 strategic game is solved analytically...' },
    { title: 'Limitations', content: 'Initial beliefs are estimated from credibility parameters...' },
  ]
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', color: '#F2F1F2' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>Methodology</h1>
        <p style={{ color: '#757070', lineHeight: 1.7 }}>How the BudgetGame simulation works — the model, the assumptions, and what it can and can't tell you.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: `1px solid #757070`, borderRadius: 14, padding: '1.5rem' }}>
            <div style={{ fontSize: 11, color: '#728497', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 13, color: '#757070', lineHeight: 1.8 }}>{s.content}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: 14, background: 'rgba(114,132,151,0.05)', border: `1px solid rgba(114,132,151,0.15)` }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#728497', marginBottom: 8 }}>Data sources</div>
        <div style={{ fontSize: 12, color: '#757070', lineHeight: 2 }}>RBI Annual Reports · MOSPI · Union Budget documents · yfinance</div>
      </div>
    </div>
  )
}