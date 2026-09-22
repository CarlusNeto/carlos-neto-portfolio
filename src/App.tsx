import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CinematicSection from './components/CinematicSection';
import MetricsSection from './components/MetricsSection';
import TechnologySection from './components/TechnologySection';
import SkillsSection from './components/SkillsSection';
import ArchitectureSection from './components/ArchitectureSection';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }} className="bg-black text-white">
      <Navbar entranceComplete={entranceComplete} />
      <HeroSection entranceComplete={entranceComplete} />
      <CinematicSection />
      <MetricsSection />
      <TechnologySection />
      <SkillsSection />
      <ArchitectureSection />
      <Footer />
    </div>
  );
}
