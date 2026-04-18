export default function PayoffMatrix({ payoffs, nashCells }) {
  if (!payoffs) return null
  const meta = {
    high_capex_invest: {govt:'High Capex', corp:'Invest', label:'GDP↑ | Profit↑'},
    high_capex_hold:   {govt:'High Capex', corp:'Hold',   label:'Waste | Safe'},
    austerity_invest:  {govt:'Austerity',  corp:'Invest', label:'Risk | Loss'},
    austerity_hold:    {govt:'Austerity',  corp:'Hold',   label:'Stable | Hedged'},
  }
  return (
    <div>
      <div style={{display:'flex', marginBottom:4}}>
        <div style={{width:95, flexShrink:0}}/>
        <div style={{flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:4}}>
          {['Corp: Invest','Corp: Hold'].map(h => (
            <div key={h} style={{fontSize:10, fontWeight:600, color:'#757070', textAlign:'center',
                                 padding:'4px 6px', background:'rgba(59,130,246,0.08)',
                                 borderRadius:6}}>{h}</div>
          ))}
        </div>
      </div>
      {['High Capex','Austerity'].map(govt => (
        <div key={govt} style={{display:'flex', marginBottom:4}}>
          <div style={{width:95, flexShrink:0, fontSize:10, fontWeight:600, color:'#757070',
                       display:'flex', alignItems:'center', paddingRight:8}}>{govt}</div>
          <div style={{flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:4}}>
            {['Invest','Hold'].map(corp => {
              const key    = `${govt.toLowerCase().replace(' ','_')}_${corp.toLowerCase()}`
              const pay    = payoffs[key]
              const isNash = nashCells?.includes(key)
              return (
                <div key={corp} style={{padding:'12px 8px', borderRadius:8, textAlign:'center',
                                        background: isNash ? '#0d2a0d' : '#1a1a1a',
                                        border: isNash ? '2px solid #656F6E' : '1px solid #757070',
                                        position:'relative', transition:'all 0.4s'}}>
                  {isNash && (
                    <div style={{position:'absolute', top:4, right:6, fontSize:10,
                                 color:'#656F6E', fontWeight:700}}>★ NE</div>
                  )}
                  {pay && (
                    <>
                      <div style={{fontSize:16, fontWeight:700, marginBottom:3,
                                   color: isNash ? '#656F6E' : '#F2F1F2'}}>
                        ({pay[0]}, {pay[1]})
                      </div>
                      <div style={{fontSize:9, color:'#757070'}}>{meta[key]?.label}</div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <div style={{marginTop:12, padding:'10px 14px', borderRadius:8,
                   background:'rgba(59,130,246,0.05)', border:'1px solid rgba(59,130,246,0.15)',
                   fontSize:11, color:'#94a3b8', lineHeight:1.7}}>
        💡 <strong style={{color:'#F2F1F2'}}>Nash Equilibrium:</strong> The starred cell is where
        neither player wants to deviate. When credibility drops, this shifts from the good
        outcome (High Capex, Invest) to the bad trap (Austerity, Hold).
      </div>
    </div>
  )
}