import React from 'react';
import './App.css';
import { AccessibilityProvider } from './context/AccessibilityContext';
import ParticleEffect from './components/ParticleEffect';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsGrid from './components/ProjectsGrid';
import Timeline from './components/Timeline';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FloatingBadge from "./components/FloatingBadge";

function App() {
  return (
    <AccessibilityProvider>
      <div className="App bg-black min-h-screen">
        <ParticleEffect />
        <Nav />
        <main>
          <Hero />
          <About />
          <ProjectsGrid />
          <Timeline />
          <ContactForm />
          <FloatingBadge />
        </main>
        <Footer />
      </div>
    </AccessibilityProvider>
  );
}

export default App;