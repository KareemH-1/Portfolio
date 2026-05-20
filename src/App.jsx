import { HashRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Cursor from './components/layout/Cursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GridBackground from './components/layout/GridBackground';
import Home from './pages/Home';
import Timeline from './pages/Timeline';

function Layout({ children }) {
  useLenis();
  return (
    <>
      <GridBackground />
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/timeline" element={<Layout><Timeline /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}