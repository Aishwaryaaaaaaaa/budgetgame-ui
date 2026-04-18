export default function EquilibriumPath({ result }) {
  if (!result) return null
  const corp  = result.players?.corporates?.final  || 0
  const bond  = result.players?.bond_market?.final || 0
  const rural = result.players?.rural?.final       || 0
  const gdp   = result.gdp_multiplier              || 1

  const steps = [
    {icon:'🏛️', label:'Budget Announced',
     outcome:`Quality: ${(result.budget_quality*100).toFixed(0)}%`, active:true},
    {icon:'📊', label:'Bond Market Reacts',
     outcome:`Risk pricing: ${bond.toFixed(0)}%`, active:bond>30},
    {icon:'🏭', label:'Corporates Decide',
     outcome:`${corp.toFixed(0)}% invest`, active:corp>40},
    {icon:'👨‍🌾', label:'Rural Demand',
     outcome:`${rural.toFixed(0)}% consume more`, active:rural>30},
    {icon:'📈', label:'Equilibrium',
     outcome:`GDP ×${gdp}`, active:gdp>1.3},
  ]

  return (
    <div style={{position:'relative', padding:'8px 0'}}>
      <div style={{position:'absolute', top:32, left:'10%', right:'10%',
                   height:2, background:'#757070', zIndex:0}}/>
      <div style={{display:'flex', justifyContent:'space-between',
                   position:'relative', zIndex:1}}>
        {steps.map((s, i) => (
          <div key={i} style={{display:'flex', flexDirection:'column',
                               alignItems:'center', gap:8, flex:1}}>
            <div style={{width:52, height:52, borderRadius:'50%',
                         background: s.active ? '#1e3a5f' : '#0d1117',
                         border:`2px solid ${s.active ? '#728497' : '#757070'}`,
                         display:'flex', alignItems:'center', justifyContent:'center',
                         fontSize:22, transition:'all 0.6s'}}>
              {s.icon}
            </div>
            <div style={{textAlign:'center', maxWidth:90}}>
              <div style={{fontSize:11, fontWeight:600, color:'#F2F1F2'}}>{s.label}</div>
              <div style={{fontSize:10, marginTop:2,
                           color: s.active ? '#728497' : '#374151'}}>{s.outcome}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}