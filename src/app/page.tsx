'use client';

import { Mail, Github, Linkedin, FileText, Cloud, Database, Cpu, Server, ArrowUp, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Progress Bar Component
const ProgressBar = ({ proficiency }: { proficiency: number }) => (
  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
    <div 
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${proficiency}%` }}
    />
  </div>
);

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = ['about', 'portfolio', 'skills', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const roles = [
    { title: "Solutions Architect", icon: Cloud },
    { title: "Data Engineer", icon: Database },
    { title: "MLOps & DevOps Specialist", icon: Cpu }
  ];

  const skillCategories = [
    {
      title: "Programming & Scripting",
      skills: [
        { name: "Python, C, Java, Bash, JavaScript, Lua, Go", proficiency: 80 }
      ]
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS, OpenStack, Kubernetes, Jenkins, Nginx, Apache Airflow", proficiency: 70 }
      ]
    },
    {
      title: "Databases and Visualization",
      skills: [
        { name: "MySQL, Oracle DB, AWS DynamoDB, Redis, Tableau, MongoDB", proficiency: 90 }
      ]
    }
  ];

  // Loading Screen Component
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Manas Singh
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 mt-2"
        >
          Loading Portfolio...
        </motion.p>
      </div>
    </motion.div>
  );

  // Floating Action Buttons
  const FloatingElements = () => (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowUp size={20} className="text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('contact')}
          className="p-3 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group mb-4"
        >
          <MessageCircle size={20} className="text-white group-hover:rotate-12 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );

  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-lg border-b border-white/10 z-50"
      >
        <div className="max-w-6xl mx-auto flex justify-center sm:justify-end gap-8 p-6">
          {['About', 'Portfolio', 'Skills', 'Contact'].map((label) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(label.toLowerCase())}
              className={`relative group transition-colors text-sm tracking-wide ${
                activeSection === label.toLowerCase() 
                  ? 'text-blue-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                initial={{ width: 0 }}
                animate={{ 
                  width: activeSection === label.toLowerCase() ? '100%' : 0 
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      <FloatingElements />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <section id="about" className="min-h-screen flex items-center justify-center pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <Image 
                src="/profile.jpg"
                alt="Manas Singh" 
                width={256}
                height={256}
                className="w-64 h-64 rounded-2xl border-2 border-blue-500/20 shadow-xl object-cover mx-auto hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl sm:text-6xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight leading-tight py-1"
              >
                Manas Singh
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl sm:text-2xl text-blue-400 mb-6"
              >
                Solutions Architect & Data Engineer
              </motion.div>
                
              <div className="flex flex-wrap gap-4">
                {roles.map((role, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-blue-500/20">
                    <role.icon size={16} className="text-blue-400" />
                    <span className="text-sm text-gray-200">{role.title}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Masters in Computer Science student at Stevens Institute of Technology with 2+ years of experience specializing in cloud optimization, automation, and scalable infrastructure across DevOps, Data Engineering, and FinTech domains.
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <a 
                  href="https://drive.google.com/file/d/1O1M0T34O3U3KYT4gAX-fqFnSuhMNcR5Q/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
                >
                  <div className="bg-gray-900 px-6 py-2 rounded-full flex items-center gap-2 transition-transform group-hover:-translate-y-0.5">
                    <FileText size={18} className="text-blue-400" />
                    <span className="text-sm">Resume</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="portfolio" className="min-h-screen py-32">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold font-serif mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Recent Projects</h2>
            <div className="grid grid-cols-1 gap-8">
              <div className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                <div className="bg-gray-900 p-8 rounded-2xl transition-transform group-hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Cloud size={24} className="text-blue-400" />
                      <h3 className="text-xl font-semibold tracking-tight">UAV Swarming Research</h3>
                    </div>
                    <span className="text-sm text-gray-400">January 2024 - Present</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="text-gray-300 flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      Leading cloud infrastructure development for autonomous UAV swarms using OpenStack and AWS
                    </li>
                    <li className="text-gray-300 flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      Implementing lightweight federated ML models achieving 40% reduced resource usage
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <Server size={16} />
                    OpenStack, AWS, Azure, ML
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="min-h-screen py-32">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold font-serif mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Skills & Certifications</h2>
            
            <div className="grid grid-cols-1 gap-8 mb-16">
              {skillCategories.map((category, index) => (
                <div key={index} className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                  <div className="bg-gray-900 p-6 rounded-2xl transition-transform group-hover:-translate-y-1">
                    <h3 className="font-semibold mb-4 tracking-tight">{category.title}</h3>
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <p className="text-gray-300">{skill.name}</p>
                        <ProgressBar proficiency={skill.proficiency} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-32">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Let&apos;s Connect</h2>
            <p className="text-gray-300 mb-12 max-w-2xl">
              I&apos;m always excited to collaborate on innovative projects and discuss new opportunities. Whether you&apos;re interested in my research, looking for a developer, or just want to chat about technology, feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {[
                { icon: Mail, label: "Email", href: "mailto:msingh23@stevens.edu" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/manas300/" },
                { icon: Github, label: "GitHub", href: "https://github.com/Manas300" }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full w-full sm:w-auto"
                >
                  <div className="bg-gray-900 px-6 py-3 rounded-full flex items-center gap-2 transition-transform group-hover:-translate-y-0.5 justify-center">
                    <link.icon size={20} className="text-blue-400" />
                    <span>{link.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
