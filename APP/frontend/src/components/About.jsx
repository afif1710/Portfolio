import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import profile from '../data/profile.json';

const About = () => {
  const { reducedMotion } = useAccessibility();

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Django', 'DevOps',
    'Tailwind CSS', 'UI/UX', 'Flutter', 'React Native', 'Web Development/Design',  'Mobile App Development'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-24 lg:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Profile Image */}
          <motion.div variants={reducedMotion ? {} : itemVariants} className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
              <div className="absolute inset-4 bg-light-pink rounded-2xl" />
              <div className="absolute inset-0 bg-grey rounded-2xl overflow-hidden">
                {/* REPLACE_ME: Add your profile image */}
                <img
                  src="/assets/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />

              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={reducedMotion ? {} : itemVariants}>
            <span className="inline-block bg-mid-purple text-black px-5 py-2 rounded-full font-mono text-s uppercase tracking-wider mb-6">
              About Me
            </span>
            
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-6">
              Crafting Digital
              <span className="text-mid-purple"> Experiences</span>
            </h2>
            
            {/* REPLACE_ME: Update bio */}
            <p className="text-dark-grey text-lg leading-relaxed mb-8">
              {profile.bio}
            </p>

            {/* Info */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-dark-grey">
                <MapPin className="w-5 h-5 text-mid-purple" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-grey">
                <Mail className="w-5 h-5 text-mid-purple" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-black transition-colors"
                >
                  {profile.email}
                </a>


              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-mid-grey mb-4">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;