'use client'

import { Mail, Github, Linkedin, FileText, Award, Cloud, Database, Cpu, Server, Circle, BarChart3, ShieldCheck } from "lucide-react";
import React from 'react';

export default function Home() {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
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

  const ProgressBar = ({ proficiency }: { proficiency: number }) => (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${proficiency}%` }}
      />
    </div>
  );


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto flex justify-center sm:justify-end gap-8 p-6">
          {['About', 'Portfolio', 'Skills', 'Contact'].map((label) => (
            <button
              key={label}
              onClick={() => scrollToSection(label.toLowerCase())}
              className="text-gray-300 hover:text-white relative group transition-colors text-sm tracking-wide"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-8">
      <section id="about" className="min-h-screen flex items-center justify-center pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src="./profile.jpg"
              alt="Manas Singh" 
              className="w-64 h-64 rounded-2xl border-2 border-blue-500/20 shadow-xl object-cover mx-auto"
            />
            <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight leading-tight py-1">
                Manas Singh
            </h1>
              
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
                <div className="p-4 bg-gray-800/50 rounded-xl border border-blue-500/20">
                  <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                    <Server size={18} /> Professional Impact
                  </h3>
                  <p className="text-gray-300">
                    At Elenjical Solutions, led cloud migration projects for Saudi National Bank (SNB) and MMH, improving system reliability by 30% and reducing operational costs.
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-xl border border-blue-500/20">
                  <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                    <Cloud size={18} /> Current Research
                  </h3>
                  <p className="text-gray-300">
                    Working with <a href="https://scholar.google.com/citations?user=zchOfB4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Professor Noor Ahmed</a> on cloud optimization for UAV networks, developing autonomous networking protocols and federated ML models for resource-constrained environments.
                  </p>
                </div>
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
            </div>
          </div>
        </section>

        <section id="portfolio" className="min-h-screen py-32">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold font-serif mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Recent Projects</h2>
            <div className="grid grid-cols-1 gap-8">
              {[
                {
                  title: "UAV Swarming Research",
                  date: "January 2024 - Present",
                  description: [
                    "Leading cloud infrastructure development for autonomous UAV swarms using OpenStack and AWS",
                    "Implementing lightweight federated ML models achieving 40% reduced resource usage",
                    "Developing secure communication protocols for GPS-denied environments with 99.9% uptime"
                  ],
                  tech: "OpenStack, AWS, Azure, ML",
                  icon: Cloud
                },
                {
                  title: "Stock Market Prediction",
                  date: "August 2024 - December 2024",
                  description: [
                    "Built ML pipeline achieving 25% improved accuracy using LSTM networks",
                    "Implemented automated data collection system processing 1M+ daily data points",
                    "Developed real-time market analysis dashboard with 5-second refresh rate"
                  ],
                  tech: "Python, AWS, Docker, Selenium",
                  icon: BarChart3
                },
                {
                  title: "Cloud Clinic",
                  date: "March 2024 - May 2024",
                  description: [
                    "Built HIPAA-compliant telehealth platform with end-to-end encryption",
                    "Achieved 90% test coverage and supported 50+ concurrent video calls",
                    "Implemented secure medical record sharing system with role-based access"
                  ],
                  tech: "Next.js, Python, AWS, Jest",
                  icon: ShieldCheck
                }
              ].map((project, index) => (
                <div key={index} className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                  <div className="bg-gray-900 p-8 rounded-2xl transition-transform group-hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <project.icon size={24} className="text-blue-400" />
                        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                      </div>
                      <span className="text-sm text-gray-400">{project.date}</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {project.description.map((point, i) => (
                        <li key={i} className="text-gray-300 flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-blue-400">
                      <Server size={16} />
                      {project.tech}
                    </div>
                  </div>
                </div>
              ))}
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

            <h3 className="text-2xl font-bold mb-8 text-blue-300 tracking-tight">Certifications</h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "AWS Solutions Architect Associate",
                  org: "Amazon Web Services",
                  link: "https://www.credly.com/badges/84eb1fea-4de2-4b42-bb71-07e84439b70c/linked_in_profile",
                  logo: (
                          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path d="M4 7L12 2L20 7V17L12 22L4 17V7Z" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            
                            <rect x="9" y="9" width="6" height="6" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                  )
                },
                {
                  title: "DevOps Professional Certificate",
                  org: "LinkedIn Learning",
                  link: "https://www.linkedin.com/learning/certificates/0ec469b60c3ef60980d2d272af199d981285322a5ca2ef6ecae9aabc215e93d1",
                  logo: (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                    <circle cx="12" cy="12" r="9" stroke="#00B5E2" strokeWidth="2" fill="none"/>
                    
                   
                    <path d="M15 9L18 12L15 15" stroke="#FF6F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15L6 12L9 9" stroke="#FF6F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    
                   
                    <circle cx="12" cy="12" r="3" fill="#FF9900"/>
                    <path d="M12 8V16" stroke="#FFFFFF" strokeWidth="1.5"/>
                    <path d="M8 12H16" stroke="#FFFFFF" strokeWidth="1.5"/>
                  </svg>)
                },
                {
                  title: "Career Essentials in Generative AI by Microsoft",
                  org: "LinkedIn Learning",
                  link: "https://www.linkedin.com/learning/certificates/38ee7a1b22f1e81ce30868e9fb9208304f241ff538d25043a06b929b04e2e816",
                  logo: (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                    <rect x="2" y="2" width="7" height="7" fill="#00A4EF" stroke="#FFFFFF" strokeWidth="1"/>
                    
                    
                    <rect x="2" y="11" width="7" height="7" fill="#7DBE3C" stroke="#FFFFFF" strokeWidth="1"/>
                    
                   
                    <rect x="11" y="2" width="7" height="7" fill="#FFB81C" stroke="#FFFFFF" strokeWidth="1"/>
                    
                    
                    <rect x="11" y="11" width="7" height="7" fill="#D83B01" stroke="#FFFFFF" strokeWidth="1"/>
                  </svg>)
                }
              ].map((cert, index) => (
                <a 
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl"
                >
                  <div className="bg-gray-900 p-6 rounded-2xl transition-transform group-hover:-translate-y-1 flex items-center gap-4">
                    {cert.logo}
                    <div>
                      <h4 className="font-semibold tracking-tight">{cert.title}</h4>
                      <p className="text-gray-300">{cert.org}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-32">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Let's Connect</h2>
            <p className="text-gray-300 mb-12 max-w-2xl">
              I'm always excited to collaborate on innovative projects and discuss new opportunities. Whether you're interested in my research, looking for a developer, or just want to chat about technology, feel free to reach out!
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