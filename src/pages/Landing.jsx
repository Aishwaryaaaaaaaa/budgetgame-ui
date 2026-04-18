import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Landing({ setPage }) {
  const [credibility, setCredibility] = useState(0.5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [counts, setCounts] = useState({ underspend: 0, players: 0, equilibria: 0, agents: 0 });

  // Animated counters
  useEffect(() => {
    const duration = 1500;
    const step = 20;
    const targets = { underspend: 12, players: 4, equilibria: 2, agents: 500 };
    const increments = {
      underspend: targets.underspend / (duration / step),
      players: targets.players / (duration / step),
      equilibria: targets.equilibria / (duration / step),
      agents: targets.agents / (duration / step),
    };
    let current = { underspend: 0, players: 0, equilibria: 0, agents: 0 };
    const timer = setInterval(() => {
      let allDone = true;
      for (let key of ['underspend', 'players', 'equilibria', 'agents']) {
        if (current[key] < targets[key]) {
          current[key] = Math.min(current[key] + increments[key], targets[key]);
          allDone = false;
        }
      }
      setCounts({ ...current });
      if (allDone) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { key: 'underspend', label: 'Avg capex underspend 2018–23', value: counts.underspend.toFixed(0) + '%', icon: '📉' },
    { key: 'players', label: 'In the coordination game', value: counts.players.toFixed(0), icon: '👥' },
    { key: 'equilibria', label: 'Good and bad Nash outcomes', value: counts.equilibria.toFixed(0), icon: '⚖️' },
    { key: 'agents', label: 'Per simulation run', value: Math.floor(counts.agents), icon: '🤖' },
  ];

  // Determine which equilibrium is dominant based on credibility
  const isGoodDominant = credibility >= 0.5;
  const equilibriumText = isGoodDominant ? 'Good equilibrium (Invest, Invest)' : 'Bad equilibrium (Hold, Hold)';
  const equilibriumColor = isGoodDominant ? '#656F6E' : '#757070';

  // Handler for slider
  const handleSliderChange = (e) => {
    setCredibility(parseFloat(e.target.value));
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
      {/* Hero section with asymmetrical layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            padding: '0.2rem 0.8rem',
            borderRadius: '12px',
            background: 'rgba(114,132,151,0.15)',
            color: '#728497',
            marginBottom: '1.5rem',
          }}>
            GAME THEORY · POLICY SIMULATION
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}>
            The Union Budget is not<br />
            <span style={{ color: '#728497', borderBottom: '2px solid #728497', display: 'inline-block' }}>an accounting document.</span>
          </h1>
          <p style={{ fontSize: '1rem', color: '#757070', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            It's a strategic game. When the government announces capex, corporates, bond markets,
            rural households and states all respond based on what they expect others to do.
            That's a Nash Equilibrium problem.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#8ba5b5' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage('simulator')}
              style={{
                padding: '0.8rem 1.8rem',
                background: '#728497',
                color: '#131414',
                border: 'none',
                borderRadius: '40px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Open simulator →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, borderColor: '#728497', color: '#728497' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPage('methodology')}
              style={{
                padding: '0.8rem 1.8rem',
                background: 'transparent',
                color: '#757070',
                border: '1px solid #757070',
                borderRadius: '40px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Read methodology
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(114,132,151,0.08) 0%, rgba(101,111,110,0.05) 100%)',
            border: '1px solid #757070',
            borderRadius: '24px',
            padding: '1.8rem',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#728497', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>CREDIBILITY TIPPING POINT</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>Where does the trap begin?</div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={credibility}
              onChange={handleSliderChange}
              style={{ width: '100%', margin: '0.5rem 0', accentColor: '#728497' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#757070' }}>
              <span>0 (no credibility)</span>
              <span style={{ fontWeight: 600, color: '#728497' }}>Threshold: 0.5</span>
              <span>1 (full credibility)</span>
            </div>
          </div>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '1rem',
            marginTop: '0.5rem',
            border: `1px solid ${equilibriumColor}`,
            transition: 'border 0.2s'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#757070', marginBottom: '0.25rem' }}>Equilibrium outcome</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: equilibriumColor }}>{equilibriumText}</div>
            <div style={{ fontSize: '0.7rem', color: '#757070', marginTop: '0.5rem' }}>
              {isGoodDominant
                ? '✅ High credibility → economy coordinates on growth.'
                : '⚠️ Low credibility → credibility trap: even good budgets fail.'}
            </div>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#757070', textAlign: 'center' }}>
            ⬅️ Slide to see the tipping point at 0.5
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '5rem',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.key}
            style={{
              background: '#1a1a1a',
              border: '1px solid #757070',
              borderRadius: '16px',
              padding: '1.2rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#728497' }}>{stat.value}</div>
            <div style={{ fontSize: '0.7rem', color: '#757070', marginTop: '0.25rem' }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Core Idea (minimal, no cards) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '4rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>The core idea</h2>
        <p style={{ color: '#757070', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Tax cuts only work if corporates invest. Capex only multiplies if states match it.
          Each player's best move depends on what they predict others will do.
        </p>
      </motion.div>

      {/* Killer Fact expandable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'rgba(114,132,151,0.05)',
          border: '1px solid rgba(114,132,151,0.2)',
          borderRadius: '20px',
          marginBottom: '3rem',
          overflow: 'hidden',
        }}
      >
        <div
          onClick={() => setShowTooltip(!showTooltip)}
          style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#728497', letterSpacing: '0.08em' }}>THE KILLER FACT</div>
            <div style={{ fontWeight: 500, marginTop: '0.25rem', fontSize: '0.9rem' }}>India's 12% capex underspend creates a credibility trap</div>
          </div>
          <motion.div
            animate={{ rotate: showTooltip ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '1.2rem', color: '#728497' }}
          >
            ▼
          </motion.div>
        </div>
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid rgba(114,132,151,0.2)' }}>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#F2F1F2' }}>
                  India averaged <strong style={{ color: '#728497' }}>12% capex underspending</strong> from 2018–23.
                  Game theory explains why this is damaging beyond the missing rupees — corporates who know this history will{' '}
                  <strong style={{ color: '#F2F1F2' }}>discount future signals and not invest</strong>,
                  meaning the multiplier never materialises even in years when capex is fully delivered.
                  Credibility is a game theory concept, not just a political one.
                </p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#757070' }}>
                  Data: RBI Annual Reports · MOSPI · Union Budget documents
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #757070', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.7rem', color: '#757070' }}>Built by Aishwarya Jha · Class 11 · Pune</div>
        <div style={{ fontSize: '0.7rem', color: '#757070', display: 'flex', gap: '1rem' }}>
          <a href="https://github.com/Aishwaryaaaaaaaa" target="_blank" rel="noreferrer" style={{ color: '#728497', textDecoration: 'none' }}>GitHub</a>
          <span>·</span>
          <span>Not policy advice</span>
        </div>
      </div>
    </div>
  );
}