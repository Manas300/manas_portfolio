'use client';

import { Mail, Github, Linkedin, Cloud, Server, ArrowUp, Award, Rocket, Target, TrendingUp, BookOpen, ExternalLink, Zap, Brain } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import * as THREE from 'three';

// Three.js 3D Scene Component
const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xf7931e, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true }),
    ];

    const meshes: THREE.Mesh[] = [];
    
    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, materials[index]);
      mesh.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      scene.add(mesh);
      meshes.push(mesh);
    });

    camera.position.z = 5;
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 + index * 0.002;
        mesh.rotation.y += 0.01 + index * 0.003;
        mesh.position.y = Math.sin(Date.now() * 0.001 + index) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

// Project Card Component
interface ProjectType {
  title: string;
  description: string;
  tech: string[];
  github: string;
  impact: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  color: string;
}

const ProjectCard = ({ project, index }: { project: ProjectType, index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className={`p-8 bg-gradient-to-r ${project.color} rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <project.icon size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-white">{project.title}</h3>
        </div>
        
        <p className="text-white/90 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <span key={techIndex} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-white/80 text-sm font-semibold">
            🎯 {project.impact}
          </p>
          <div className="flex gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              Code
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg transition-colors font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              View
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Stats Card Component
interface StatType {
  number: string;
  label: string;
  icon: React.ComponentType<{ size: number; className: string }>;
}

const StatsCard = ({ stat, index }: { stat: StatType, index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full mb-4 group-hover:shadow-lg transition-shadow"
      >
        <stat.icon size={32} className="text-white" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="text-4xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
      >
        {stat.number}
      </motion.h3>
      <p className="text-white/80 font-semibold mt-2">{stat.label}</p>
    </motion.div>
  );
};

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Solutions Architect",
    "Data Engineer", 
    "MLOps Specialist",
    "Cloud Expert",
    "AI Researcher"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, [roles.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = ['hero', 'about', 'projects', 'research', 'skills', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  // Loading Screen Component
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-24 h-24 border-8 border-white border-t-transparent rounded-full mx-auto mb-8"
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-black text-white mb-4 tracking-tight"
        >
          MANAS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-2xl text-white/90 font-bold"
        >
          Building the Future
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 1.5, duration: 1 }}
          className="h-2 bg-white rounded-full mx-auto mt-6"
        />
      </div>
    </motion.div>
  );

  // Floating Elements
  const FloatingElements = () => (
    <>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} className="text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Social Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5 }}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
      >
        {[
          { icon: Github, href: "https://github.com/Manas300", color: "from-gray-600 to-gray-800" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/manas300/", color: "from-blue-500 to-blue-700" },
          { icon: Mail, href: "mailto:msingh23@stevens.edu", color: "from-red-500 to-pink-600" }
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-3 bg-gradient-to-r ${social.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <social.icon size={20} className="text-white" />
          </motion.a>
        ))}
      </motion.div>
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-b border-white/10 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"
          >
            MANAS
          </motion.div>
          
          <div className="flex gap-8">
            {['Hero', 'About', 'Projects', 'Research', 'Contact'].map((label) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(label.toLowerCase())}
                className={`relative font-bold text-sm tracking-wide transition-colors ${
                  activeSection === label.toLowerCase() 
                    ? 'text-orange-400' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
                {activeSection === label.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* MINT NFT Style Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://drive.google.com/file/d/1O1M0T34O3U3KYT4gAX-fqFnSuhMNcR5Q/view?usp=sharing', '_blank')}
            className="relative px-6 py-3 bg-white text-black font-black text-sm rounded-full transition-all duration-300 shadow-lg overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              VIEW RESUME
            </span>
          </motion.button>
        </div>
      </motion.nav>

      <FloatingElements />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h1 
                className="text-7xl lg:text-8xl font-black mb-6 leading-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  MEET
                </span>
                <br />
                <span className="text-white">MANAS</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-3xl font-bold text-orange-400 mb-8 h-12"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {roles[currentRole]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl"
              >
                Masters in Computer Science at Stevens Institute of Technology. 
                Building scalable cloud solutions and ML pipelines that power the future. 
                From autonomous UAV swarms to fintech innovations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex gap-6"
              >
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW PROJECTS
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-orange-500 rounded-full font-bold text-lg hover:bg-orange-500 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LET&apos;S TALK
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Profile Image with 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative w-96 h-96 mx-auto"
            >
              {/* Background 3D Scene */}
              <div className="absolute inset-0">
                <ThreeScene />
              </div>
              
              {/* Profile Image */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full opacity-20"
                  />
                  <Image 
                    src="/profile.jpg"
                    alt="Manas Singh" 
                    width={192}
                    height={192}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl relative z-10"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "24", label: "GitHub Repos", icon: Award },
                { number: "4", label: "Major Projects", icon: Rocket },
                { number: "99.9%", label: "System Uptime", icon: Target },
                { number: "35%", label: "Cost Reduction", icon: TrendingUp }
              ].map((stat, index) => (
                <StatsCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-gradient-to-br from-slate-800/50 to-purple-900/30">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-6xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-6">
                About Me
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Personal Story */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-2xl blur-xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <Brain className="text-orange-400" size={32} />
                      My Journey
                    </h3>
                    <p className="text-lg text-white/80 leading-relaxed mb-6">
                      I&apos;m a passionate <span className="text-orange-400 font-semibold">Solutions Architect & Data Engineer</span> at Stevens Institute of Technology, where I transform complex problems into elegant, scalable solutions. My journey spans from building autonomous UAV swarms to developing cutting-edge fintech platforms.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed">
                      With expertise in <span className="text-pink-400 font-semibold">MLOps, DevOps, and Cloud Computing</span>, I specialize in creating systems that don&apos;t just work today, but scale for tomorrow&apos;s challenges. Every project is an opportunity to push boundaries and innovate.
                    </p>
                  </div>
                </div>

                {/* Core Values */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-6"
                >
                  {[
                    { icon: Target, title: "Innovation", desc: "Pushing technological boundaries" },
                    { icon: Zap, title: "Efficiency", desc: "Optimizing for performance" },
                    { icon: Rocket, title: "Scalability", desc: "Building for the future" },
                    { icon: Award, title: "Excellence", desc: "Delivering quality solutions" }
                  ].map((value) => (
                    <motion.div
                      key={value.title}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center group hover:border-orange-400/50 transition-all duration-300"
                    >
                      <value.icon className="text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" size={28} />
                      <h4 className="font-bold text-white mb-2">{value.title}</h4>
                      <p className="text-sm text-white/60">{value.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column - Skills & Technologies */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-orange-400/20 rounded-2xl blur-xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  />
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                      <Server className="text-pink-400" size={32} />
                      Technical Expertise
                    </h3>
                    
                    {/* Skills Categories */}
                    <div className="space-y-8">
                      {[
                        {
                          category: "Cloud & DevOps",
                          skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
                          color: "from-blue-400 to-cyan-400"
                        },
                        {
                          category: "Data & ML",
                          skills: ["Python", "Apache Spark", "TensorFlow", "MLflow", "Airflow"],
                          color: "from-green-400 to-emerald-400"
                        },
                        {
                          category: "Development",
                          skills: ["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL"],
                          color: "from-purple-400 to-violet-400"
                        }
                      ].map((skillGroup, index) => (
                        <motion.div
                          key={skillGroup.category}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="text-xl font-bold text-white mb-4">{skillGroup.category}</h4>
                          <div className="flex flex-wrap gap-3">
                            {skillGroup.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.8 + skillIndex * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className={`px-4 py-2 bg-gradient-to-r ${skillGroup.color} text-white font-semibold rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300`}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl p-8 border border-orange-400/20"
                >
                  <h4 className="text-2xl font-bold text-white mb-6 text-center">Quick Facts</h4>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-black text-orange-400 mb-2">2+</div>
                      <div className="text-white/80">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-pink-400 mb-2">20+</div>
                      <div className="text-white/80">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-orange-400 mb-2">3</div>
                      <div className="text-white/80">Research Papers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-pink-400 mb-2">∞</div>
                      <div className="text-white/80">Learning Mindset</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section - Using Real GitHub Data */}
        <section id="projects" className="py-32">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  FEATURED
                </span>
                <br />
                <span className="text-white">PROJECTS</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "AI-Driven Cloud Resource Management",
                  description: "Optimizing cloud resource usage by detecting anomalies in CPU metrics using ARIMA, Prophet, LSTM, and Autoencoders. Integrates Prometheus for real-time data collection and Grafana for visualization.",
                  tech: ["Python", "Machine Learning", "AWS", "Prometheus", "Grafana"],
                  github: "https://github.com/Manas300/AI-driven-cloud-resource-management-system",
                  impact: "35% cost reduction • 99.99% availability SLA",
                  icon: Brain,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Study-Buddy AI Platform",
                  description: "Cloud-native, AI-driven educational platform leveraging multi-agent systems for intelligent tutoring, curriculum planning, and automated assessment capabilities.",
                  tech: ["Python", "Microservices", "AI/ML", "Kubernetes"],
                  github: "https://github.com/Manas300/Study-buddy",
                  impact: "Multi-agent AI tutoring • Adaptive learning",
                  icon: BookOpen,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Canteen Management System",
                  description: "Full-stack MERN application with real-time order tracking, JWT authentication, Redis caching, and AWS S3 integration for seamless canteen operations.",
                  tech: ["React", "Node.js", "MongoDB", "AWS S3", "Redis"],
                  github: "https://github.com/Manas300/Canteen-Management",
                  impact: "Real-time tracking • JWT auth • Live & Running",
                  icon: Server,
                  color: "from-green-500 to-teal-500"
                },
                {
                  title: "Cloud Clinic - Telehealth Platform",
                  description: "HIPAA-compliant telehealth platform enabling secure video consultations, appointment scheduling, and medical record management with AWS services.",
                  tech: ["Next.js", "Express.js", "AWS DynamoDB", "WebRTC"],
                  github: "https://github.com/Manas300/Cloud-Clinic",
                  impact: "HIPAA-compliant • Video consultations • Production Ready",
                  icon: Cloud,
                  color: "from-orange-500 to-red-500"
                }
              ].map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-32 bg-black/20">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  RESEARCH
                </span>
                <br />
                <span className="text-white">FOCUS</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-black text-white mb-8">UAV Network Optimization</h3>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Working with <strong>Prof. Noor Ahmed</strong> on cutting-edge research in autonomous UAV swarms, 
                  developing intelligent protocols for drone networks in challenging environments.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: Zap, title: "Autonomous Networking", desc: "Intelligent protocols for drone swarms" },
                    { icon: Brain, title: "Federated ML", desc: "ML models for resource-constrained devices" },
                    { icon: Cloud, title: "Adaptive Cloud Systems", desc: "Dynamic optimization of UAV workloads" },
                    { icon: Target, title: "Real-time Decisions", desc: "Mission-critical applications" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                        <item.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-white/70">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-full h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center">
                  <ThreeScene />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-gradient-to-r from-orange-500/10 to-pink-500/10">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl font-black mb-8">
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  LET&apos;S BUILD
                </span>
                <br />
                <span className="text-white">SOMETHING AMAZING</span>
              </h2>
              
              <p className="text-2xl text-white/80 mb-16 max-w-3xl mx-auto">
                Ready to transform your ideas into reality? Let&apos;s create the next big thing together.
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { 
                    icon: Mail, 
                    label: "Email Me", 
                    value: "msingh23@stevens.edu",
                    href: "mailto:msingh23@stevens.edu",
                    color: "from-red-500 to-pink-600"
                  },
                  { 
                    icon: Linkedin, 
                    label: "Connect", 
                    value: "LinkedIn Profile",
                    href: "https://www.linkedin.com/in/manas300/",
                    color: "from-blue-500 to-blue-700"
                  },
                  { 
                    icon: Github, 
                    label: "Code", 
                    value: "GitHub Projects",
                    href: "https://github.com/Manas300",
                    color: "from-gray-600 to-gray-800"
                  }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className={`block p-8 bg-gradient-to-r ${contact.color} rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-300`}
                  >
                    <contact.icon size={48} className="text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{contact.label}</h3>
                    <p className="text-white/80">{contact.value}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
              MANAS SINGH
            </h3>
            <p className="text-white/60 mb-6">
              Building the future, one line of code at a time.
            </p>
            <p className="text-white/40 text-sm">
              © 2025 Manas Singh. Crafted with passion and precision.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}