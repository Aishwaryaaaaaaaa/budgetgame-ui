import { computeBudgetQuality, simulate } from '../lib/simulation';
import { useState, useEffect } from 'react'
import axios from 'axios'
import SliderGroup from '../components/SliderGroup'
import PayoffMatrix from '../components/PayoffMatrix'
import PlayerCard from '../components/PlayerCard'
import EquilibriumPath from '../components/EquilibriumPath'

const API = 'http://localhost:8001'

const PRESETS = [
  {name:'India FY25',       icon:'🇮🇳', params:{capex:11.1,subsidy:3.8,deficit_target:5.1,credibility:0.93}},
  {name:'COVID shock',      icon:'🦠',  params:{capex:4.4, subsidy:6.2,deficit_target:9.2,credibility:0.91}},
  {name:'Austerity',        icon:'📉',  params:{capex:5.0, subsidy:2.0,deficit_target:3.0,credibility:0.95}},
  {name:'Max stimulus',     icon:'🚀',  params:{capex:14.0,subsidy:7.0,deficit_target:7.5,credibility:0.88}},
  {name:'Credibility trap', icon:'🪤',  params:{capex:10.0,subsidy:4.0,deficit_target:5.5,credibility:0.72}},
]

export default function Simulator() {
  const [params,  setParams]  = useState(PRESETS[0].params)
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [active,  setActive]  = useState('India FY25')

  const set = (key, val) => setParams(p => ({...p, [key]:val}))

  const run = async (p=params) => {
    setLoading(true)
    try {
      const r = await axios.post(`${API}/simulate`, p)
      setResult(r.data)
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { run() }, [])

  const card = (label, value, color, sub) => (
    <div style={{background:'#1a1a1a', border:'1px solid #757070',
                 borderRadius:12, padding:'14px 16px'}}>
      <div style={{fontSize:11, color:'#757070', textTransform:'uppercase',
                   letterSpacing:'0.05em', marginBottom:6}}>{label}</div>
      <div style={{fontSize:22, fontWeight:700, color}}>{value}</div>
      {sub && <div style={{fontSize:11, color:'#757070', marginTop:3}}>{sub}</div>}
    </div>
  )

  return (
    <div style={{display:'grid', gridTemplateColumns:'290px 1fr',
                 height:'calc(100vh - 57px)'}}>

      {/* ── LEFT ── */}
      <div style={{borderRight:'1px solid #757070', overflowY:'auto',
                   padding:18, display:'flex', flexDirection:'column', gap:14}}>

        <div>
          <div style={{fontSize:10, fontWeight:600, textTransform:'uppercase',
                       letterSpacing:'1px', color:'#757070', marginBottom:8}}>
            Scenario presets
          </div>
          {PRESETS.map(p => (
            <button key={p.name}
              onClick={() => { setParams(p.params); setActive(p.name); run(p.params) }}
              style={{width:'100%', padding:'8px 12px', marginBottom:5,
                      background: active===p.name ? '#1e3a5f' : '#1a1a1a',
                      border: active===p.name ? '1px solid #728497' : '1px solid #757070',
                      borderRadius:8, fontSize:12, cursor:'pointer',
                      color: active===p.name ? '#93c5fd' : '#94a3b8',
                      display:'flex', alignItems:'center', gap:8, textAlign:'left',
                      transition:'all 0.2s'}}>
              <span>{p.icon}</span><span>{p.name}</span>
            </button>
          ))}
        </div>

        <div style={{background:'#1a1a1a', border:'1px solid #757070',
                     borderRadius:12, padding:14}}>
          <div style={{fontSize:10, fontWeight:600, textTransform:'uppercase',
                       letterSpacing:'1px', color:'#757070', marginBottom:12}}>
            Budget controls
          </div>
          <SliderGroup label="Capital Expenditure" unit="₹"
            value={params.capex} min={2} max={15} step={0.1}
            color="#728497" hint="Infrastructure spending signal"
            onChange={v => set('capex',v)}/>
          <SliderGroup label="Subsidies & Welfare" unit="₹"
            value={params.subsidy} min={1} max={10} step={0.1}
            color="#656F6E" hint="Rural household support"
            onChange={v => set('subsidy',v)}/>
          <SliderGroup label="Fiscal Deficit" unit="%"
            value={params.deficit_target} min={2} max={10} step={0.1}
            color="#757070" hint="% of GDP — drives bond risk"
            onChange={v => set('deficit_target',v)}/>
          <SliderGroup label="Govt Credibility" unit="%"
            value={Math.round(params.credibility*100)} min={20} max={100} step={1}
            color="#728497" hint="Historical capex delivery rate"
            onChange={v => set('credibility',v/100)}/>
        </div>

        <button onClick={() => run()} disabled={loading}
          style={{padding:'12px', background:loading?'#757070':'#728497',
                  color:'white', border:'none', borderRadius:10,
                  fontSize:14, fontWeight:600,
                  cursor:loading?'not-allowed':'pointer', transition:'all 0.2s'}}>
          {loading ? '⏳ Simulating...' : '▶ Run Simulation'}
        </button>

        {result && (
          <div style={{background:'#0d1117', border:'1px solid #757070',
                       borderRadius:10, padding:12, fontSize:11, color:'#757070',
                       lineHeight:1.7}}>
            <div style={{color:'#F2F1F2', fontWeight:600, marginBottom:4}}>
              Model info
            </div>
            Budget quality: <span style={{color:'#728497'}}>
              {(result.budget_quality*100).toFixed(0)}%
            </span><br/>
            Equilibrium: <span style={{color:'#656F6E'}}>
              {result.equilibrium_type}
            </span>
          </div>
        )}
      </div>

      {/* ── RIGHT ── */}
      <div style={{overflowY:'auto', padding:24,
                   display:'flex', flexDirection:'column', gap:20}}>

        {result && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
            {card('GDP multiplier',    `${result.gdp_multiplier}×`,    '#656F6E')}
            {card('Corp investment',   `${result.players?.corporates?.final?.toFixed(0)}%`, '#757070')}
            {card('Crowding out risk', result.crowding_out,
                  result.crowding_out==='High'?'#ef4444':result.crowding_out==='Med'?'#757070':'#656F6E')}
            {card('Equilibrium',       result.equilibrium_type,        '#728497')}
          </div>
        )}

        {result && (
          <>
            <div style={{fontSize:11, fontWeight:600, color:'#757070',
                         textTransform:'uppercase', letterSpacing:'1px'}}>
              Player response probabilities
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
              <PlayerCard name="Corporates"       emoji="🏭"
                strategy="Probability of increasing investment"
                probability={result.players?.corporates?.final}
                color="#757070" series={result.players?.corporates?.series}/>
              <PlayerCard name="Rural households" emoji="👨‍🌾"
                strategy="Probability of increasing consumption"
                probability={result.players?.rural?.final}
                color="#656F6E" series={result.players?.rural?.series}/>
              <PlayerCard name="Bond market"      emoji="🏦"
                strategy="Probability of pricing in risk premium"
                probability={result.players?.bond_market?.final}
                color="#ef4444" series={result.players?.bond_market?.series}/>
              <PlayerCard name="State govts"      emoji="🏛️"
                strategy="Probability of matching capex locally"
                probability={result.players?.states?.final}
                color="#728497" series={result.players?.states?.series}/>
            </div>
          </>
        )}

        {result && (
          <div style={{background:'#1a1a1a', border:'1px solid #757070',
                       borderRadius:16, padding:20}}>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:14, fontWeight:600, marginBottom:3}}>
                Payoff Matrix — Government vs Corporates
              </div>
              <div style={{fontSize:12, color:'#757070'}}>
                Capex coordination game · Nash Equilibrium highlighted
              </div>
            </div>
            <PayoffMatrix payoffs={result.payoffs} nashCells={result.nash_cells}/>
          </div>
        )}

        {result && (
          <div style={{background:'#1a1a1a', border:'1px solid #757070',
                       borderRadius:16, padding:20}}>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:14, fontWeight:600, marginBottom:3}}>
                Equilibrium path
              </div>
              <div style={{fontSize:12, color:'#757070'}}>
                How the game unfolds from Budget Day → economic outcome
              </div>
            </div>
            <EquilibriumPath result={result}/>
          </div>
        )}

        {result && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div style={{padding:'14px 16px', borderRadius:12,
                         background:'rgba(59,130,246,0.05)',
                         border:'1px solid rgba(59,130,246,0.15)'}}>
              <div style={{fontSize:12, fontWeight:600, color:'#F2F1F2', marginBottom:6}}>
                🎯 Key insight
              </div>
              <div style={{fontSize:12, color:'#94a3b8', lineHeight:1.7}}>
                India's avg 12% capex underspend (2018–23) means corporates
                rationally discount budget signals. Even a genuinely good
                budget can fail to coordinate investment if credibility is low.
              </div>
            </div>
            <div style={{padding:'14px 16px', borderRadius:12,
                         background:'rgba(139,92,246,0.05)',
                         border:'1px solid rgba(139,92,246,0.15)'}}>
              <div style={{fontSize:12, fontWeight:600, color:'#F2F1F2', marginBottom:6}}>
                🏛️ States problem
              </div>
              <div style={{fontSize:12, color:'#94a3b8', lineHeight:1.7}}>
                State capex matching sits at {result.players?.states?.final?.toFixed(0)}%.
                This collective action problem within fiscal federalism is
                the weakest link in India's multiplier chain.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}