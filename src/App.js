import { useState } from 'react';
import Landing from './pages/Landing';
import Methodology from './pages/Methodology';
import Simulator from './pages/Simulator';
import Navbar from './components/Navbar';

function App() {
  const [page, setPage] = useState('landing');

  return (
    <div>
      <Navbar setPage={setPage} page={page} />
      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'methodology' && <Methodology />}
      {page === 'simulator' && <Simulator />}
    </div>
  );
}

export default App;