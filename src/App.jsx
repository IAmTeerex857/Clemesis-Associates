import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  Scale,
  Building2,
  Users,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// --- Count Up Animation Component ---
function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: ease-out quad
      const easedProgress = progress * (2 - progress);
      
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

function App() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position to toggle sticky class on header and active sections
  useEffect(() => {
    const handleScroll = () => {
      // Sticky header logic
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Active section tracking logic
      const sections = ['home', 'about', 'practice-areas', 'why-us', 'leadership', 'contact'];
      const scrollPosition = window.scrollY + 120; // offset for sticky header

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to target section
  const handleScrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* ==================== HEADER / NAVBAR ==================== */}
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <div className="container nav-container">
          {/* Stacked Text Logo (Left-aligned) */}
          <div className="brand" onClick={() => handleScrollTo('home')} style={{ cursor: 'pointer' }}>
            <div className="brand-title">CLEMESIS</div>
            <div className="brand-subtitle">ASSOCIATES</div>
          </div>

          {/* Desktop Right Side Navigation Group */}
          <div className="nav-right">
            <ul className="nav-menu">
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#practice-areas" 
                  className={`nav-link ${activeSection === 'practice-areas' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleScrollTo('practice-areas'); }}
                >
                  PRACTICE AREAS
                </a>
              </li>
              <li>
                <a 
                  href="#why-us" 
                  className={`nav-link ${activeSection === 'why-us' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleScrollTo('why-us'); }}
                >
                  WHY US
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
                >
                  CONTACT
                </a>
              </li>
            </ul>

            {/* Nav CTA Button */}
            <div className="nav-cta">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleScrollTo('contact')}
              >
                BOOK CONSULTATION
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <ul className={`nav-menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <a
              href="#about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#practice-areas"
              className={`nav-link ${activeSection === 'practice-areas' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleScrollTo('practice-areas'); }}
            >
              PRACTICE AREAS
            </a>
          </li>
          <li>
            <a
              href="#why-us"
              className={`nav-link ${activeSection === 'why-us' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleScrollTo('why-us'); }}
            >
              WHY US
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }}
            >
              CONTACT
            </a>
          </li>
          <div className="nav-cta">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleScrollTo('contact')}
            >
              BOOK A CONSULTATION
            </button>
          </div>
        </ul>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="hero-section">
        <div className="container hero-content animate-fade-in-up">
          <div className="hero-icon-container">
            <svg width="88" height="88" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-icon">
              <rect x="34" y="52" width="4" height="14" fill="#C9A84C"/>
              <rect x="24" y="64" width="24" height="3" rx="1" fill="#C9A84C"/>
              <rect x="35" y="12" width="2" height="40" fill="#C9A84C"/>
              <rect x="10" y="22" width="52" height="2.5" rx="1.25" fill="#C9A84C"/>
              <circle cx="36" cy="12" r="4" fill="#C9A84C"/>
              <circle cx="36" cy="12" r="2" fill="#0d1523"/>
              <line x1="36" y1="24.5" x2="16" y2="36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="36" y1="24.5" x2="56" y2="36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 36 Q16 44 24 36" stroke="#C9A84C" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <line x1="8" y1="36" x2="24" y2="36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M48 36 Q56 44 64 36" stroke="#C9A84C" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <line x1="48" y1="36" x2="64" y2="36" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="hero-title">
            Excellence in Law.<br />
            <span className="italic-accent">Unwavering</span> in Purpose.
          </h1>
          <p className="hero-description">
            Clemesis Associates is a premier law firm in Abuja, FCT, harnessing modern AI tools in its General Law Practice to deliver sophisticated legal counsel and solutions across Private Client, Immigration, Litigation, Property & Corporate Law.
          </p>
          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => handleScrollTo('contact')}
            >
              BOOK A CONSULTATION
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => handleScrollTo('practice-areas')}
            >
              OUR PRACTICE AREAS
            </button>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">
              <CountUp end={15} suffix="+" />
            </div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <CountUp end={500} suffix="+" />
            </div>
            <div className="stat-label">Cases Resolved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <CountUp end={3} />
            </div>
            <div className="stat-label">Areas of Specialisation</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <CountUp end={100} suffix="%" />
            </div>
            <div className="stat-label">Client Commitment</div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT THE FIRM SECTION ==================== */}
      <section id="about" className="section-padding-large">
        <div className="container">
          <div className="grid-2 grid-about">
            {/* About Conference Room Image (Left) */}
            <div className="about-image-wrapper">
              <div className="photo-frame-top-left">
                {/* Picture of chairs .jpeg has a space before file extension */}
                <img src="/images/Picture of chairs .jpeg" className="about-room-img" alt="Clemesis Conference Boardroom" />
              </div>
            </div>

            {/* About Text Block (Right) */}
            <div className="about-grid-text">
              <span className="section-subtitle">About the Firm</span>
              <h2 className="section-title dark-text">
                Trusted Legal <span className="italic-accent">Expertise</span> in the Heart of Abuja
              </h2>
              <div className="gold-line"></div>
              <p className="about-paragraph">
                Clemesis Associates is headquartered in Wuye, Abuja FCT with correspondence addresses in Asokoro FCT, Lagos, Awka and London, UK. The law firm is built on the principle that exceptional legal counsel should be personal, precise, and powerful.
              </p>
              <p className="about-paragraph">
                Our General Practice is powered by enhanced AI tools that transform how we administer, research and litigate. From intelligent document review to AI-assisted legal research and case strategy, we deliver faster, sharper, and more cost-effective outcomes for our clients.
              </p>
              <p className="about-paragraph">
                Our lawyers are comprised of internationally trained and locally qualified practitioners who bring a deep understanding of the Nigerian legal landscape, drawing on their diverse cultural and educational backgrounds to deliver results that truly matter. This rare combination of global exposure and local mastery affords our clients a decisive advantage — whether navigating complex transactions, safeguarding assets, or resolving high-stakes disputes.
              </p>
              <p className="about-paragraph">
                At Clemesis, our clients are not just file numbers but valued partners. We invest in understanding your goals deeply, advising proactively, and standing firmly in your corner at every step of your legal journey.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-text-link"
                  onClick={() => handleScrollTo('contact')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  SPEAK WITH US <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* About Team Full-Width Sub-section */}
          <div className="about-team-container">
            <div className="team-image-card">
              <img src="/images/New group image.jpg" className="team-img" alt="The Clemesis Associates Legal Team" />
            </div>
            <div className="team-caption">THE CLEMESIS ASSOCIATES TEAM</div>
          </div>
        </div>
      </section>

      {/* ==================== PRACTICE AREAS SECTION ==================== */}
      <section id="practice-areas" className="practice-section section-padding-large">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title light-text">Areas of Practice</h2>
            <div className="gold-line center"></div>
          </div>

          {/* Grid Layout: Row 1: 3 cards, Row 2: 3 cards */}
          <div className="practice-grid-container">
            <div className="practice-row-1">
              {/* Card 1: Private Client */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Users size={28} />
                </div>
                <h3 className="practice-card-title">Private Client</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  We provide discreet, comprehensive legal services for high-net-worth individuals and families — from estate planning and wills to trusts, succession matters, and personal legal advisory.
                </p>
              </div>

              {/* Card 2: Corporate Advisory */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Building2 size={28} />
                </div>
                <h3 className="practice-card-title">Corporate Advisory</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  We advise businesses at every stage — from incorporation and regulatory compliance to mergers, acquisitions, commercial contracts, and strategic corporate governance.
                </p>
              </div>

              {/* Card 3: Property & Real Estate */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Building2 size={28} />
                </div>
                <h3 className="practice-card-title">Property & Real Estate</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  Our team handles all aspects of real estate transactions, conveyancing, title perfection, property development advisory, and land dispute resolution across Nigeria.
                </p>
              </div>
            </div>

            <div className="practice-row-2">
              {/* Card 4: General Litigation */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Scale size={28} />
                </div>
                <h3 className="practice-card-title">General Litigation (Civil & Criminal)</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  We represent clients robustly in civil and criminal proceedings at all levels of the Nigerian court system, combining thorough legal research with skilled courtroom advocacy to protect our clients' interests.
                </p>
              </div>

              {/* Card 5: Dispute Resolution & Negotiation */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Scale size={28} />
                </div>
                <h3 className="practice-card-title">Dispute Resolution & Negotiation</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  We offer expert alternative dispute resolution services — including arbitration, mediation, and negotiation — providing strategic and cost-effective pathways to resolving complex disputes out of court.
                </p>
              </div>

              {/* Card 6: Immigration */}
              <div className="practice-card">
                <div className="practice-icon-box">
                  <Users size={28} />
                </div>
                <h3 className="practice-card-title">Immigration</h3>
                <div className="practice-card-gold-line"></div>
                <p className="practice-card-text">
                  We provide expert immigration advisory services for individuals, families and corporates — covering visas, residency, work permits, citizenship applications, and cross-border mobility solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section id="why-us" className="section-padding-large">
        <div className="container">
          <div className="grid-2">
            {/* Left side Bullet Points */}
            <div>
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title dark-text">
                The Clemesis <span className="italic-accent">Distinction</span>
              </h2>
              <div className="gold-line"></div>
              
              <div className="why-bullet-list">
                {/* Point 1 */}
                <div className="why-bullet-item">
                  <div className="why-bullet-icon"></div>
                  <div className="why-bullet-content">
                    <h3 className="why-bullet-title">AI-Powered Law Practice</h3>
                    <p className="why-bullet-text">
                      We leverage cutting-edge legal AI tools — including Law Pavilion, AI-driven case management platforms, and advanced legal analytics — to enhance the precision, speed, and depth of our research, documentation, and litigation strategies. Technology is not a supplement to our practice; it is at its core.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="why-bullet-item">
                  <div className="why-bullet-icon"></div>
                  <div className="why-bullet-content">
                    <h3 className="why-bullet-title">Bespoke Counsel</h3>
                    <p className="why-bullet-text">
                      We treat every matter as unique. No templates — only tailored strategy developed for your specific circumstances.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="why-bullet-item">
                  <div className="why-bullet-icon"></div>
                  <div className="why-bullet-content">
                    <h3 className="why-bullet-title">Absolute Discretion</h3>
                    <p className="why-bullet-text">
                      Client confidentiality is the bedrock of our practice. Your affairs are handled with the strictest privacy and professionalism.
                    </p>
                  </div>
                </div>

                {/* Point 4 */}
                <div className="why-bullet-item">
                  <div className="why-bullet-icon"></div>
                  <div className="why-bullet-content">
                    <h3 className="why-bullet-title">Results-Driven</h3>
                    <p className="why-bullet-text">
                      We combine rigorous legal analysis with pragmatic advice, always focused on achieving the best possible outcomes for our Clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side Book Shelf Image */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div className="why-image-wrapper">
                <div className="photo-frame-bottom-right">
                  <img src="/images/Book shelf image.jpeg" className="why-books-img" alt="Clemesis Law Library" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LEADERSHIP SECTION ==================== */}
      <section id="leadership" className="leadership-section section-padding-large">
        <div className="container">
          <div className="leader-card">
            {/* Left side: Flush Headshot Image */}
            <div className="leader-image-col">
              <img src="/images/Head shot image.jpeg" className="leader-img" alt="Chetachi Chinwoke Mbadinuju Esq." />
            </div>

            {/* Right side: Elegant details with no excess whitespace */}
            <div className="leader-info-col">
              <span className="section-subtitle">Leadership</span>
              <h2 className="leader-name">Chetachi Chinwoke Mbadinuju, Esq.</h2>
              <div className="leader-role">
                <div className="role-title">PRINCIPAL PARTNER</div>
                <div className="role-firm">CLEMESIS ASSOCIATES</div>
              </div>
              <div className="leader-gold-line"></div>
              
              <p className="leader-paragraph">
                Cheta holds a Business & Finance law degree from Brunel University Uxbridge and an MBA from Buckingham University, both in the UK. On attaining his BL qualifications from the Nigerian Law School in 2006, he co-founded Clemesis Associates and has remained its Principal Partner till date.
              </p>
              <p className="leader-paragraph">
                Cheta's areas of expertise include Private Client, Immigration, Property and Corporate Law. He is a member of the NBA Unity Branch Abuja, a Paul Harris Fellow of Rotary International and a Fellow of the Nigerian Immigration Lawyers Association. He has interests in hospitality, real estate, farming and is a Trustee and Principal Curator of the Chinwoke Mbadinuju Foundation, a not-for-profit organisation focused on human and community development.
              </p>
              <p className="leader-paragraph">
                A keen AI enthusiast, Cheta leads Clemesis Associates with a clear vision: to utilise modern AI tools and techniques in delivering world-class legal services with the highest standards of integrity, discretion, and excellence. Beyond the law, his interests encompass Arsenal FC, philanthropy, cycling, progressive networking, and strategy analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2 className="cta-title">
            Your Legal Matter Deserves<br />
            <span className="italic-accent">Expert Hands</span>
          </h2>
          <p className="cta-text">
            Schedule a confidential consultation with our team today and let us guide you through your legal journey with clarity and confidence.
          </p>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => handleScrollTo('contact')}
          >
            SCHEDULE A CONSULTATION
          </button>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="contact-section section-padding-large">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title dark-text">Contact Clemesis Associates</h2>
            <div className="gold-line center"></div>
          </div>

          <div className="grid-3">
            {/* Card 1: Telephone */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <h3 className="contact-card-title">Telephone</h3>
              <div className="contact-card-text">
                <p>+234 (0) 802 340 2455</p>
                <p style={{ marginTop: '0.2rem' }}>+234 (0) 815 675 2002</p>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <h3 className="contact-card-title">Email</h3>
              <div className="contact-card-text">
                <p>clemesisassociates@gmail.com</p>
              </div>
            </div>

            {/* Card 3: Office */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <h3 className="contact-card-title">Office</h3>
              <div className="contact-card-text" style={{ fontSize: '1rem' }}>
                <p>House A, Plot 345, MB Aliyu Mustapha Boulevard,</p>
                <p>Wuye, Abuja FCT, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            {/* Left Brand Area */}
            <div className="footer-brand">
              <div className="footer-logo-text">
                CLEMESIS <span className="gold">ASSOCIATES</span>
              </div>
              <div className="footer-sub-text">
                Legal Practitioners & Business Consultants
              </div>
            </div>

            {/* Right Menu Links */}
            <ul className="footer-menu">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo('about'); }} className="footer-link">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#practice-areas" onClick={(e) => { e.preventDefault(); handleScrollTo('practice-areas'); }} className="footer-link">
                  PRACTICE AREAS
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); handleScrollTo('why-us'); }} className="footer-link">
                  WHY US
                </a>
              </li>
              <li>
                <a href="#leadership" onClick={(e) => { e.preventDefault(); handleScrollTo('leadership'); }} className="footer-link">
                  LEADERSHIP
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="footer-link">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © 2026 Clemesis Associates. All rights reserved.
            </div>
            <div className="copyright" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Built with excellence.
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </>
  );
}

export default App;
