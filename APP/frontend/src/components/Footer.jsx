import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, ArrowUp } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import profile from '../data/profile.json';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
};

const Footer = () => {
  const { reducedMotion } = useAccessibility();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center lg:text-left">
            <a href="#home" className="font-display text-3xl font-bold text-light-pink inline-block mb-4">
              AM
            </a>
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 mr-32">
            {Object.entries(profile.socials).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon) return null;
              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reducedMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-light-pink hover:text-black transition-colors"
                  aria-label={`Visit ${platform}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={reducedMotion ? {} : { y: -4 }}
            className="flex items-center gap-2 text-white/50 hover:text-light-pink transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-wider">Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Decorative line */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/30 text-sm font-mono">
            Designed & Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;