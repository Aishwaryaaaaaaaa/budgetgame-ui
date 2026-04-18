export default function Navbar({ setPage, page }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: `1px solid #757070`,
      background: '#131414', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('landing')}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: '#728497',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
        }}>🏛️</div>
        <span style={{ fontWeight: 700, fontSize: 16 }}>
          <span style={{ color: '#728497' }}>Budget</span>
          <span style={{ color: '#F2F1F2' }}>Game</span>
        </span>
        <span style={{
          fontSize: 11, padding: '2px 8px', borderRadius: 4,
          background: '#728497', color: '#131414', fontWeight: 600
        }}>FY26</span>
      </div>

      <div style={{
        display: 'flex', gap: 4, background: '#1a1a1a', padding: 4,
        borderRadius: 10, border: `1px solid #757070`
      }}>
        <button onClick={() => setPage('landing')} style={{
          padding: '6px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500,
          background: page === 'landing' ? '#728497' : 'transparent',
          color: page === 'landing' ? '#131414' : '#757070',
          border: 'none', cursor: 'pointer', transition: 'all 0.2s'
        }}>Home</button>
        <button onClick={() => setPage('simulator')} style={{
          padding: '6px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500,
          background: page === 'simulator' ? '#728497' : 'transparent',
          color: page === 'simulator' ? '#131414' : '#757070',
          border: 'none', cursor: 'pointer'
        }}>Simulator</button>
        <button onClick={() => setPage('methodology')} style={{
          padding: '6px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500,
          background: page === 'methodology' ? '#728497' : 'transparent',
          color: page === 'methodology' ? '#131414' : '#757070',
          border: 'none', cursor: 'pointer'
        }}>Methodology</button>
      </div>

      <div style={{ fontSize: 13, color: '#757070', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>Built by</span>
        <a href="https://github.com/Aishwaryaaaaaaaa" target="_blank" rel="noreferrer"
           style={{ color: '#728497', textDecoration: 'none', fontWeight: 500 }}>
          Aishwarya Jha
        </a>
      </div>
    </nav>
  );
}