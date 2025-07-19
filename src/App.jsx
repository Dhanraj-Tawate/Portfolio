import React, { useState, useEffect, useRef } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Box, Typography, Button, Grid, Chip, Avatar, TextField, IconButton, AppBar, Toolbar, Link as MuiLink } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Typed from 'typed.js';

// Import Icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

// --- THEME CONFIGURATION ---
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // A vibrant cyan
    },
    secondary: {
      main: '#ff4081', // A bright pink for accents
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '-0.5px',
    },
    h3: {
        fontWeight: 700,
        fontSize: '2.8rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2.2rem',
    },
    h5: {
        fontWeight: 600,
    },
    h6: { // Added h6 for project titles
        fontWeight: 600,
        fontSize: '1.4rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
    body2: { // Added body2 for project descriptions
        fontSize: '0.95rem',
        lineHeight: 1.6,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 25px',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        },
        containedPrimary: {
            '&:hover': {
                backgroundColor: '#00b8d4',
            }
        }
      },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 500,
                fontSize: '0.9rem',
                padding: '8px 12px',
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                color: '#00e5ff',
                border: '1px solid rgba(0, 229, 255, 0.2)',
            },
            // Specific styles for project chips
            sizeSmall: {
                fontSize: '0.8rem',
                padding: '4px 8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 229, 255, 0.08)',
                border: 'none', // Remove border for project chips for a cleaner look
            }
        }
    }
  },
});

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2
    },
  },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// --- REUSABLE ANIMATED SECTION COMPONENT ---
const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <Box sx={{ py: 10 }}>
        {children}
      </Box>
    </motion.div>
  );
};


// --- HEADER COMPONENT ---
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

  return (
    <AppBar position="fixed" sx={{ 
        background: scrolled ? 'rgba(18, 18, 18, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease-in-out',
    }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '1px' }}>
            Dhanraj Tawate
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} color="inherit" onClick={() => scrollToSection(item.toLowerCase())}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


// --- HERO SECTION COMPONENT ---
const HeroSection = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['React.js Developer', 'Frontend Specialist', 'MERN Stack Developer', 'Problem Solver'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a237e 30%, #0d7377 90%)',
      }}
    >
        {/* Abstract background shapes */}
        <Box sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(0, 229, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
        }} />
        <Box sx={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 64, 129, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 12s ease-in-out infinite reverse',
        }} />
        <style>
        {`
            @keyframes float {
                0% { transform: translate(0, 0); }
                50% { transform: translate(30px, 40px); }
                100% { transform: translate(0, 0); }
            }
        `}
        </style>

      <Container maxWidth="md" sx={{ zIndex: 1 }}>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
          <Avatar
            alt="Dhanraj Tawate"
            src="https://placehold.co/200x200/00e5ff/121212?text=DT"
            sx={{ width: 150, height: 150, margin: '0 auto 20px', border: '4px solid #00e5ff' }}
          />
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white' }}>
            Hi, I'm Dhanraj Tawate
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, color: '#b0bec5', minHeight: '32px' }}>
            A <span ref={el} style={{ color: '#00e5ff' }} />
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button variant="contained" color="primary" size="large">
              Download CV
            </Button>
            <Button variant="outlined" color="inherit" size="large" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </Box>
          <Box>
            <IconButton color="inherit" href="https://linkedin.com/in/dhanraj-tawate" target="_blank"><LinkedInIcon fontSize="large" /></IconButton>
            <IconButton color="inherit" href="https://github.com/Dhanraj-Tawate" target="_blank"><GitHubIcon fontSize="large" /></IconButton>
            <IconButton color="inherit" href="mailto:dhanrajtawate13800@gmail.com"><EmailIcon fontSize="large" /></IconButton>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};


// --- ABOUT SECTION ---
const AboutSection = () => (
  <AnimatedSection id="about">
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>About Me</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
      </Box>
      <Typography variant="body1" align="center" sx={{ maxWidth: '750px', margin: 'auto' }}>
        React.js Developer with 2.5 years of hands-on experience in designing and developing interactive, scalable, and high-performance web applications. Adept at building intuitive user interfaces with React.js, integrating and managing RESTful APIs, and ensuring secure user authentication using JWT. Proficient in crafting responsive layouts with HTML5, CSS3, and modern JavaScript (ES6+). Experienced in working within agile teams, collaborating across design and backend teams, and delivering robust front-end solutions that enhance user engagement and system functionality.
      </Typography>
    </Container>
  </AnimatedSection>
);

// --- SKILLS SECTION ---
const skills = {
    "Frontend": ["React.js", "JavaScript", "HTML5", "CSS3", "MUI"],
    "Backend": ["Node.js", "Express.js"],
    "Databases": ["MongoDB"],
    "Programming Languages": ["JavaScript", "Python", "SQL"],
    "Tools & Workflow": ["Git", "Postman", "VS Code"]
};

const SkillCategory = ({ title, skillsList, icon }) => (
    <motion.div variants={itemVariants} style={{height: '100%'}}>
        <Box sx={{ p: 3, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {icon}
                <Typography variant="h5" sx={{ ml: 1.5 }}>{title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skillsList.map(skill => <Chip key={skill} label={skill} />)}
            </Box>
        </Box>
    </motion.div>
);

const SkillsSection = () => (
  <AnimatedSection id="skills">
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>Technical Skills</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}><SkillCategory title="Frontend" skillsList={skills.Frontend} icon={<CodeIcon color="primary"/>} /></Grid>
        <Grid item xs={12} sm={6} md={4}><SkillCategory title="Backend & Databases" skillsList={[...skills.Backend, ...skills.Databases]} icon={<StorageIcon color="primary"/>} /></Grid>
        <Grid item xs={12} sm={6} md={4}><SkillCategory title="Languages & Tools" skillsList={[...skills['Programming Languages'], ...skills['Tools & Workflow']]} icon={<LanguageIcon color="primary"/>} /></Grid>
      </Grid>
    </Container>
  </AnimatedSection>
);

// --- EXPERIENCE SECTION ---
const experiences = [
    {
        role: "System Engineer",
        company: "Infosys Ltd., Pune",
        duration: "Nov 2024 - Present",
        description: "Led the development of an AI-powered chatbot front-end using React.js, improving interface responsiveness by 30%. Integrated WebSocket for real-time communication, reducing latency by 40%. Implemented JWT-based authentication, designed reusable form components, and managed RESTful API integrations."
    },
    {
        role: "System Engineer",
        company: "Infosys Ltd., Bangalore",
        duration: "Jul 2023 - Oct 2024",
        description: "Built scalable front-end modules using React, improving reusability by 35%. Developed core features like user login, registration, and dashboard, reducing user drop-off by 20%. Designed a multi-tab driver registration flow for a telemetry platform and worked in agile sprints to deliver features ahead of schedule."
    },
    {
        role: "System Engineer Trainee",
        company: "Infosys Ltd., Mysore",
        duration: "Dec 2022 - Jun 2023",
        description: "Completed full-stack training in React.js, Node.js, MongoDB, HTML, CSS, and JavaScript. Built a MERN-based property booking application with full CRUD operations and applied Git-based version control in a collaborative, agile environment."
    }
];

const ExperienceSection = () => (
    <AnimatedSection id="experience">
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>Work Experience</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
            </Box>
            <Box sx={{ position: 'relative', '::before': { content: '""', position: 'absolute', left: {xs: 0, sm: '20px'}, top: 0, bottom: 0, width: '2px', background: '#00e5ff', opacity: 0.3 } }}>
                {experiences.map((exp, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Box sx={{ pl: {xs: 4, sm: 8}, mb: 4, position: 'relative' }}>
                            <Box sx={{ position: 'absolute', left: {xs: '-8px', sm: '12px'}, top: '5px', width: '18px', height: '18px', borderRadius: '50%', background: '#121212', border: '3px solid #00e5ff' }} />
                            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>{exp.role}</Typography>
                            <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1, fontWeight: 500 }}>{exp.company} | {exp.duration}</Typography>
                            <Typography variant="body1" color="text.secondary">{exp.description}</Typography>
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </Container>
    </AnimatedSection>
);


// --- PROJECTS SECTION ---
const projects = [
    {
        title: "AI-Powered Chatbot",
        description: "A responsive and real-time chatbot front-end with secure authentication. Features include dynamic form rendering and advanced file uploads with previews.",
        tech: ["React.js", "CSS", "WebSocket", "JWT", "REST APIs"],
        // image: "https://placehold.co/600x400/121212/00e5ff?text=AI+Chatbot", // Removed image property
        liveUrl: "#", // Replace with actual live URL
        githubUrl: "#", // Replace with actual GitHub URL
    },
    {
        title: "Telemetry Platform Frontend",
        description: "Scalable front-end modules for a telemetry platform, including a structured multi-tab driver registration flow, user login/registration, and a central dashboard.",
        tech: ["React", "HTML5", "CSS3", "JavaScript"],
        // image: "https://placehold.co/600x400/121212/ff4081?text=Telemetry+UI", // Removed image property
        liveUrl: "#", // Replace with actual live URL
        githubUrl: "#", // Replace with actual GitHub URL
    },
    {
        title: "Property Booking App",
        description: "A full-stack MERN application for booking properties. Features a responsive UI with complete CRUD (Create, Read, Update, Delete) operations for managing listings.",
        tech: ["React", "Node.js", "MongoDB", "Express.js"],
        // image: "https://placehold.co/600x400/121212/ffffff?text=Booking+App", // Removed image property
        liveUrl: "#", // Replace with actual live URL
        githubUrl: "#", // Replace with actual GitHub URL
    }
];

const ProjectCard = ({ project }) => (
    <Grid item xs={12} sm={6} md={4}>
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)' }} // Slightly less pronounced hover effect
            style={{ height: '100%' }}
        >
            <Box sx={{
                background: '#1e1e1e',
                borderRadius: '12px', // Slightly smaller border radius for a sleeker look
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'border 0.3s ease, transform 0.3s ease',
                '&:hover': {
                    border: '1px solid #00e5ff',
                }
            }}>
                {/* Removed the large image for a cleaner, more text-focused card.
                    If images are crucial, consider smaller thumbnails or icons. */}
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.light' }}>
                        {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2, fontSize: '0.95rem' }}>
                        {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                        {project.tech.map(t => (
                            <Chip
                                key={t}
                                label={t}
                                size="small"
                                sx={{
                                    backgroundColor: 'rgba(0, 229, 255, 0.08)', // Subtler chip background
                                    color: '#00e5ff',
                                    fontWeight: 500,
                                    fontSize: '0.8rem',
                                    borderRadius: '8px', // Smaller chip border radius
                                }}
                            />
                        ))}
                    </Box>
                    <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        {project.liveUrl && (
                            <Button
                                variant="outlined"
                                color="primary"
                                href={project.liveUrl}
                                target="_blank"
                                size="small"
                                endIcon={<LaunchIcon />}
                                sx={{ mr: 1, borderRadius: '20px' }} // More rounded button
                            >
                                Live Demo
                            </Button>
                        )}
                        {project.githubUrl && (
                            <IconButton
                                color="inherit"
                                href={project.githubUrl}
                                target="_blank"
                                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                            >
                                <GitHubIcon fontSize="small" /> {/* Smaller icon size */}
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </motion.div>
    </Grid>
);

const ProjectsSection = () => (
    <AnimatedSection id="projects">
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>My Projects</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
            </Box>
            <Grid container spacing={4}>
                {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </Grid>
        </Container>
    </AnimatedSection>
);

// --- CERTIFICATIONS SECTION ---
const certifications = [
    "Infosys Certified Frontend Web Developer",
    "Infosys Certified React Professional",
    "Infosys Certified Python Programmer",
    "Infosys Certified Applied Generative AI Professional"
];

const CertificationsSection = () => (
    <AnimatedSection id="certifications">
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>Certifications</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
            </Box>
            <Grid container spacing={2} justifyContent="center">
                {certifications.map((cert, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <motion.div variants={itemVariants}>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                                <CardMembershipIcon color="primary" />
                                <Typography sx={{ ml: 2 }}>{cert}</Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </AnimatedSection>
);


// --- CONTACT SECTION ---
const ContactSection = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    
    const handleChange = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // This is a mock submission. Replace with a real service like Formspree or EmailJS.
        console.log("Form submitted:", formState);
        // A non-blocking confirmation
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.textContent = 'Message Sent!';
        setTimeout(() => {
            submitButton.textContent = 'Send Message';
            setFormState({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <AnimatedSection id="contact">
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>Get In Touch</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                    <Box sx={{ width: '100px', height: '4px', background: 'linear-gradient(to right, #00e5ff, #ff4081)' }} />
                </Box>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <Typography variant="h6" gutterBottom>Let's Connect</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{mb:3}}>
                                I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon color="primary" />
                                <MuiLink href="mailto:dhanrajtawate13800@gmail.com" color="inherit" sx={{ ml: 2, textDecoration: 'none' }}>dhanrajtawate13800@gmail.com</MuiLink>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PhoneIcon color="primary" />
                                <Typography sx={{ ml: 2 }}>+91 97652 52030</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon color="primary" />
                                <Typography sx={{ ml: 2 }}>Pune, Maharashtra, India</Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField fullWidth label="Your Name" name="name" margin="normal" required value={formState.name} onChange={handleChange}/>
                                <TextField fullWidth label="Your Email" name="email" type="email" margin="normal" required value={formState.email} onChange={handleChange}/>
                                <TextField fullWidth label="Your Message" name="message" multiline rows={4} margin="normal" required value={formState.message} onChange={handleChange}/>
                                <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>Send Message</Button>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </AnimatedSection>
    );
};

// --- FOOTER ---
const Footer = () => (
    <Box component="footer" sx={{ background: '#1e1e1e', p: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
            <Box>
                <IconButton color="inherit" href="https://linkedin.com/in/dhanraj-tawate" target="_blank"><LinkedInIcon /></IconButton>
                <IconButton color="inherit" href="https://github.com/Dhanraj-Tawate" target="_blank"><GitHubIcon /></IconButton>
                <IconButton color="inherit" href="mailto:dhanrajtawate13800@gmail.com"><EmailIcon /></IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                © {new Date().getFullYear()} Dhanraj Tawate. Designed & Built by Dhanraj Tawate.
            </Typography>
        </Container>
    </Box>
);

// --- SCROLL TO TOP BUTTON ---
const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    return (
        <IconButton
            onClick={scrollToTop}
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: visible ? 'inline-flex' : 'none',
                background: 'primary.main',
                color: 'background.default',
                transition: 'opacity 0.3s, transform 0.3s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0)',
                '&:hover': {
                    background: 'primary.dark'
                }
            }}
        >
            <ArrowUpwardIcon />
        </IconButton>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </ThemeProvider>
  );
}