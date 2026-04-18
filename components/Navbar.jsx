import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()
  return (
    <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                 padding:'14px 32px', borderBottom:'1px solid #757070',
                 background:'rgba(11,15,26,0.97)', position:'sticky', top:0, zIndex:100}}>
      <Link to="/" style={{textDecoration:'none', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:32, height:32, borderRadius:8, background:'#1e3a5f',
                     display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>
          🏛️
        </div>
        <span style={{fontWeight:700, fontSize:16}}>
          <span style={{color:'#728497'}}>Budget</span>
          <span style={{color:'#F2F1F2'}}>Game</span>
        </span>
        <span style={{fontSize:11, padding:'2px 8px', borderRadius:4,
                      background:'#1e3a5f', color:'#728497', fontWeight:600}}>FY26</span>
      </Link>

      <div style={{display:'flex', gap:4, background:'#1a1a1a', padding:4,
                   borderRadius:10, border:'1px solid #757070'}}>
        {[['/', 'Home'], ['/simulator', 'Simulator'], ['/methodology', 'Methodology']].map(([path, label]) => (
          <Link key={path} to={path} style={{
            padding:'6px 16px', borderRadius:7, fontSize:13, fontWeight:500,
            textDecoration:'none', transition:'all 0.2s',
            background: loc.pathname===path ? '#728497' : 'transparent',
            color: loc.pathname===path ? 'white' : '#757070',
          }}>{label}</Link>
        ))}
      </div>

      <div style={{fontSize:13, color:'#757070', display:'flex', alignItems:'center', gap:6}}>
        <span>Built by</span>
        <a href="https://github.com/Aishwaryaaaaaaaa" target="_blank" rel="noreferrer"
           style={{color:'#728497', textDecoration:'none', fontWeight:500}}>
          Aishwarya Jha
        </a>
      </div>
    </nav>
  )
}