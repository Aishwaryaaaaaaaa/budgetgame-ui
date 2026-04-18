export default function Methodology() {
  const sections = [
    {title:'The coordination game',
     content:`The Union Budget creates a coordination problem among four strategic players. Each agent's optimal decision depends on their belief about what others will do — the classic setup for Nash Equilibrium analysis. Tax cuts only work if corporates invest. Capex only multiplies if states match it. Subsidies only boost consumption if supply chains respond.`},
    {title:'Agent decision model',
     content:`Each agent maintains a belief p (probability others will cooperate). Each round they compute expected payoffs of investing vs holding, using a logistic function to convert the payoff difference into an investment probability. Actual investment is a Bernoulli draw from this probability. Belief updates via: p_new = (1 - β) × p_old + β × outcome. β = 0.2 controls how fast agents learn.`},
    {title:'Budget quality function',
     content:`Q = (0.5 × capex_score + 0.25 × subsidy_score + 0.25 × deficit_score) × (0.6 + 0.4 × credibility). Each input normalised to 0–1. Credibility is the key multiplier — low credibility tanks quality even for high capex announcements. This directly models India's 12% average underspend from 2018–23.`},
    {title:'The credibility trap',
     content:`When credibility is high (≥0.5), the payoff for the good equilibrium (both invest) is 0.6 × base. When credibility is low (<0.5), this payoff collapses to 0.1 × base — making the bad equilibrium (both hold) dominant. This captures the game-theoretic mechanism: past underspending permanently damages future coordination even if the announced budget is genuinely good.`},
    {title:'Nash Equilibrium',
     content:`The 2×2 strategic game (Govt: High Capex/Austerity × Corp: Invest/Hold) is solved analytically. Nash Equilibria exist where neither player benefits from unilaterally deviating. Good budgets with high credibility produce (High Capex, Invest) as the unique Nash Equilibrium. Low credibility can create multiple equilibria or shift the unique equilibrium to (Austerity, Hold).`},
    {title:'Limitations',
     content:`Initial beliefs are estimated from credibility parameters, not empirically observed. A production model would extract agent beliefs from corporate earnings call transcripts using NLP sentiment analysis. The 2×2 payoff matrix simplifies a richer strategic space. State governments are modelled homogeneously despite significant fiscal heterogeneity across Indian states. Results are directionally correct, not precisely calibrated.`},
  ]

  return (
    <div style={{maxWidth:800, margin:'0 auto', padding:'4rem 2rem'}}>
      <div style={{marginBottom:'3rem'}}>
        <h1 style={{fontSize:'2rem', fontWeight:700, marginBottom:8}}>Methodology</h1>
        <p style={{color:'#757070', lineHeight:1.7}}>
          How the BudgetGame simulation works — the model, the assumptions, and what it can and can't tell you.
        </p>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        {sections.map((s,i) => (
          <div key={i} style={{background:'#1a1a1a', border:'1px solid #757070',
                               borderRadius:14, padding:'1.5rem'}}>
            <div style={{fontSize:11, color:'#728497', fontWeight:600,
                         textTransform:'uppercase', letterSpacing:'0.08em',
                         marginBottom:8}}>{String(i+1).padStart(2,'0')}</div>
            <h2 style={{fontSize:'1.05rem', fontWeight:600, marginBottom:8}}>{s.title}</h2>
            <p style={{fontSize:13, color:'#94a3b8', lineHeight:1.8}}>{s.content}</p>
          </div>
        ))}
      </div>

      <div style={{marginTop:'2rem', padding:'1.5rem', borderRadius:14,
                   background:'rgba(59,130,246,0.05)',
                   border:'1px solid rgba(59,130,246,0.15)'}}>
        <div style={{fontSize:12, fontWeight:600, color:'#728497', marginBottom:8}}>
          Data sources
        </div>
        <div style={{fontSize:12, color:'#94a3b8', lineHeight:2}}>
          RBI Annual Reports (capex data) · MOSPI National Accounts (corporate investment) ·
          Union Budget documents via data.gov.in · yfinance (capital goods stocks)
        </div>
      </div>
    </div>
  )
}