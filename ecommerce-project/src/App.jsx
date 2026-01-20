
import { HomePage } from './pages/HomePage';
import './App.css'
import { Route, Routes } from 'react-router';

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />  
      <Route path="checkout" element={<p>..</p>} />
    </Routes>
    
  )
}

export default App
