export default function PlayerCard({ name, emoji, strategy, probability, color, series }) {
  const pct = Math.min(100, Math.max(0, probability || 0))
  const label = pct >= 65 ? 'Investing' : pct >= 40 ? 'Uncertain' : 'Holding back'
  const labelColor = pct >= 65 ? '#656F6E' : pct >= 40 ? '#757070' : '#ef4444'

  return (
    <div style={{background:'#1a1a1a', border:'1px solid #757070',
                 borderRadius:12, padding:'16px'}}>
      <div style={{display:'flex', alignItems:'center',
                   justifyContent:'space-between', marginBottom:12}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span style={{fontSize:22}}>{emoji}</span>
          <div>
            <div style={{fontSize:13, fontWeight:600}}>{name}</div>
            <div style={{fontSize:11, color:'#757070'}}>{strategy}</div>
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:20, fontWeight:700, color}}>{pct.toFixed(1)}%</div>
          <div style={{fontSize:10, color:labelColor, fontWeight:500}}>{label}</div>
        </div>
      </div>

      <div style={{height:6, background:'#757070', borderRadius:999, marginBottom:10}}>
        <div style={{height:6, borderRadius:999, background:color,
                     width:`${pct}%`, transition:'width 1s ease'}}/>
      </div>

      {series && series.length > 0 && (
        <div style={{height:36, display:'flex', alignItems:'flex-end', gap:1}}>
          {series.map((v, i) => (
            <div key={i} style={{
              flex:1, background:color+'66',
              height:`${Math.max(4, v)}%`,
              borderRadius:2, transition:'height 0.6s ease'
            }}/>
          ))}
        </div>
      )}
    </div>
  )
}