import { MotionConfig } from 'framer-motion';
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
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-black text-white font-sans">
        <Navbar />
        <main>
          <HeroSection />
          <CinematicSection />
          <MetricsSection />
          <TechnologySection />
          <SkillsSection />
          <ArchitectureSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
