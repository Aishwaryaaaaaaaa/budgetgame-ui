export default function SliderGroup({ label, value, min, max, step, unit, onChange, color='#728497', hint }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{marginBottom:18}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
        <div>
          <div style={{fontSize:13, color:'#F2F1F2'}}>{label}</div>
          {hint && <div style={{fontSize:11, color:'#757070'}}>{hint}</div>}
        </div>
        <span style={{fontSize:13, fontWeight:600, color, background:'#1e3a5f',
                      padding:'2px 10px', borderRadius:5}}>
          {unit==='₹' ? `₹${value}L Cr` : `${value}${unit}`}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{width:'100%', height:4, borderRadius:4, outline:'none', cursor:'pointer',
                appearance:'none', WebkitAppearance:'none',
                background:`linear-gradient(to right,${color} 0%,${color} ${pct}%,#757070 ${pct}%)`}}/>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:3,
                   fontSize:10, color:'#374151'}}>
        <span>{unit==='₹' ? `₹${min}L` : `${min}${unit}`}</span>
        <span>{unit==='₹' ? `₹${max}L` : `${max}${unit}`}</span>
      </div>
    </div>
  )
}