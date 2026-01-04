import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import HeritageHome from './Component/pages/HeritageHome';

// You can create basic placeholder components for these to avoid errors
const Services = () => <div className="p-20 text-center text-2xl">Services Page Coming Soon</div>;
const Contact = () => <div className="p-20 text-center text-2xl">Contact Page Coming Soon</div>;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* All these paths load the SAME page, but the Layout will handle scrolling */}
        <Route path="/" element={<HeritageHome />} />
        <Route path="/about" element={<HeritageHome />} />
        <Route path="/walks" element={<HeritageHome />} />
        <Route path="/gallery" element={<HeritageHome />} />
        <Route path="/contact" element={<HeritageHome />} />
      </Route>
    </Routes>
  );
}
export default App;
