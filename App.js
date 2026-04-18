import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Simulator from './pages/Simulator'
import Methodology from './pages/Methodology'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{background:'#131414', minHeight:'100vh', color:'#F2F1F2'}}>
        <Navbar />
        <Routes>
          <Route path="/"            element={<Landing />} />
          <Route path="/simulator"   element={<Simulator />} />
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}