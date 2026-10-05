import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Brain,
  Check,
  HeartHandshake,
  Home as HomeIcon,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const logo = '/assets/images/BRIGHT_-removebg-preview.png';
const heroImage = 'https://images.pexels.com/photos/7345463/pexels-photo-7345463.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const teamImage = 'https://images.pexels.com/photos/6129494/pexels-photo-6129494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const careImage = 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

type Page = 'home' | 'about' | 'services' | 'qsp' | 'behavioral' | 'contact';

const navItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'QSP Services', page: 'qsp' },
  { label: '1915(i) Behavioral Health', page: 'behavioral' },
  { label: 'Contact', page: 'contact' },
];

function getPage(): Page {
  const path = window.location.pathname.replace(/^\//, '') as Page;
  return navItems.some((item) => item.page === path) ? path : 'home';
}

function navigate(page: Page) {
  window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function App() {
  const [page, setPage] = useState<Page>(getPage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const go = (next: Page) => {
    navigate(next);
    setPage(next);
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <Announcement />
      <Header page={page} onNavigate={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main key={page} className="page-transition">
        {page === 'home' && <Home onNavigate={go} />}
        {page === 'about' && <About onNavigate={go} />}
        {page === 'services' && <Services onNavigate={go} />}
        {page === 'qsp' && <Qsp onNavigate={go} />}
        {page === 'behavioral' && <Behavioral onNavigate={go} />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer onNavigate={go} />
    </div>
  );
}

function Announcement() {
  return <div className="announcement"><span>Care that meets you where you are.</span><a href="tel:+17018098497">Call us today <ArrowRight size={14} /></a></div>;
}

function Header({ page, onNavigate, menuOpen, setMenuOpen }: { page: Page; onNavigate: (page: Page) => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return <header className="header">
    <div className="container nav-wrap">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="Brighter Care home"><img src={logo} alt="Brighter Care LLC" /></button>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map((item) => <button key={item.page} className={page === item.page ? 'active' : ''} onClick={() => onNavigate(item.page)}>{item.label}</button>)}
        <a className="nav-phone" href="tel:+17018098497"><Phone size={15} /> (701) 809-8497</a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Button({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'light' | 'outline' }) {
  return <button className={`button button-${variant}`} onClick={onClick}>{children}<ArrowRight size={17} /></button>;
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><span />{children}</div>; }

function Home({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <>
    <section className="hero">
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
      <div className="container hero-grid">
        <div className="hero-copy reveal"><Eyebrow>Personalized care. Meaningful lives.</Eyebrow><h1>Helping you live a life that feels <em>brighter.</em></h1><p>Brighter Care LLC provides compassionate, person-centered support that celebrates independence, builds confidence, and creates room for what matters most.</p><div className="hero-actions"><Button onClick={() => onNavigate('contact')}>Talk with our team</Button><button className="text-link" onClick={() => onNavigate('services')}>Explore our services <ArrowRight size={16} /></button></div><div className="trust-row"><div className="avatar-stack"><span>BC</span><span>Q</span><span>+</span></div><p><strong>Here for your next chapter</strong><br />Support built around you.</p></div></div>
        <div className="hero-visual reveal delay-one"><div className="image-frame"><img src={heroImage} alt="Caregiver sharing a warm moment with an older adult" /><div className="image-caption"><span className="caption-icon"><HeartHandshake size={18} /></span><div><strong>Care with purpose</strong><small>Support • Growth • Independence</small></div></div></div><div className="sun-mark"><Sparkles size={17} /> Your brighter days start here</div></div>
      </div>
    </section>
    <section className="intro-section section-pad"><div className="container split-intro"><div><Eyebrow>A different kind of care</Eyebrow><h2>Support that sees the <em>whole person.</em></h2></div><div><p className="lead">You deserve support that feels personal, respectful, and empowering. We listen first, then design services around your goals, preferences, and everyday life.</p><Button variant="outline" onClick={() => onNavigate('about')}>Meet Brighter Care</Button></div></div></section>
    <section className="pillars section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Our promise</Eyebrow><h2>Care made <em>human.</em></h2></div><p>Every interaction is an opportunity to help someone feel capable, connected, and seen.</p></div><div className="pillar-grid"><Pillar icon={<HeartHandshake />} title="Compassion first" text="We lead with empathy and honor each person’s story, voice, and choices." /><Pillar icon={<ShieldCheck />} title="Trust in every detail" text="Reliable, consistent support gives families confidence and peace of mind." /><Pillar icon={<Sparkles />} title="Room to grow" text="Small steps become meaningful progress when goals are truly your own." /></div></div></section>
    <section className="feature-band"><div className="container feature-grid"><div className="feature-image"><img src={careImage} alt="Caregiver offering support at home" /></div><div className="feature-copy"><Eyebrow>Designed around you</Eyebrow><h2>More than a service.<br /><em>A relationship.</em></h2><p>Whether you are looking for in-home support or behavioral health services, our team brings patience, professionalism, and genuine care to every day.</p><ul className="check-list"><li><Check size={17} /> Individualized plans and practical support</li><li><Check size={17} /> A team that listens and communicates</li><li><Check size={17} /> A focus on independence and possibility</li></ul><Button variant="light" onClick={() => onNavigate('contact')}>Start a conversation</Button></div></div></section>
    <Cta onNavigate={onNavigate} />
  </>;
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="pillar-card"><div className="icon-box">{icon}</div><h3>{title}</h3><p>{text}</p><span className="card-arrow"><ArrowRight size={17} /></span></div>; }

function About({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <><PageHero eyebrow="About Brighter Care" title={<>Care that brings more <em>possibility</em> to every day.</>} text="We believe the brightest care begins with listening. Our work is grounded in respect, consistency, and the belief that every person deserves support on their own terms." image={teamImage} /><section className="section-pad about-story"><div className="container narrow-grid"><div><Eyebrow>Our approach</Eyebrow><h2>Professional support.<br /><em>Personal connection.</em></h2></div><div><p className="lead">Brighter Care LLC is a North Dakota-based provider of Qualified Service Provider and 1915(i) Behavioral Health Services.</p><p>We partner with individuals and families to create practical support that fits real life. That means honoring routines, encouraging independence, and showing up with warmth and reliability.</p><Button onClick={() => onNavigate('services')}>See how we help</Button></div></div></section><section className="values-section"><div className="container"><Eyebrow>What guides us</Eyebrow><div className="values-grid"><Value number="01" title="Listen deeply" text="Your goals and preferences shape the care you receive." /><Value number="02" title="Show up fully" text="We bring consistency, skill, and heart to every interaction." /><Value number="03" title="Celebrate progress" text="We notice the small wins that make a big difference." /></div></div></section><Cta onNavigate={onNavigate} /></>;
}

function Value({ number, title, text }: { number: string; title: string; text: string }) { return <div className="value"><span>{number}</span><h3>{title}</h3><p>{text}</p></div>; }

function Services({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <><PageHero eyebrow="Our services" title={<>Support for the life you are <em>building.</em></>} text="From everyday assistance to behavioral health support, our services are created to help you feel more confident, connected, and in control." image={careImage} /><section className="section-pad service-list"><div className="container"><div className="service-intro"><Eyebrow>Two pathways. One purpose.</Eyebrow><p className="lead">Explore the support that fits your needs today. We are here to answer questions and help you take the next step.</p></div><div className="service-cards"><ServiceCard icon={<HomeIcon />} label="Qualified Service Provider" title="Everyday support, on your terms." text="Personal assistance and in-home support that make daily routines feel more manageable while protecting your independence." link="qsp" onNavigate={onNavigate} /><ServiceCard icon={<Brain />} label="1915(i) Behavioral Health" title="Tools for a more balanced life." text="Skills training, community connection, and recovery-focused support for greater stability and wellbeing." link="behavioral" onNavigate={onNavigate} /></div></div></section><Cta onNavigate={onNavigate} /></>;
}

function ServiceCard({ icon, label, title, text, link, onNavigate }: { icon: React.ReactNode; label: string; title: string; text: string; link: Page; onNavigate: (page: Page) => void }) { return <button className="service-card" onClick={() => onNavigate(link)}><div className="service-card-top"><div className="icon-box">{icon}</div><span>{label}</span></div><h2>{title}</h2><p>{text}</p><span className="learn-more">Learn more <ArrowRight size={17} /></span></button>; }

function Qsp({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const items = [
    { title: 'Personal Care', text: 'Assistance with daily living activities and personal needs.' },
    { title: 'Homemaker Services', text: 'Help with household tasks to maintain a clean, safe home.' },
    { title: 'Respite Care', text: 'Temporary support that gives family caregivers needed relief.' },
    { title: 'Companionship', text: 'Social interaction, engagement, and supportive presence.' },
    { title: 'Supervision', text: 'Ongoing monitoring and assistance to promote safety and independence.' },
    { title: 'Non-Medical Transportation', text: 'Transportation and escort assistance for appointments, shopping, community activities, and other approved needs.' },
    { title: 'Extended Personal Care', text: 'Additional non-nursing personal care assistance based on the individual’s authorized care plan.' },
  ];
  return <><PageHero compact eyebrow="Qualified Service Provider" title={<>Practical help.<br /><em>Personal freedom.</em></>} text="QSP services provide individualized support in the comfort of your home and community, helping you stay connected to the people, places, and routines you value." image={heroImage} /><DetailSection eyebrow="QSP services we provide" title="Support that fits your everyday life." text="Brighter Care LLC provides dependable, person-centered support that helps individuals remain safe, comfortable, and as independent as possible." items={items} /><Cta onNavigate={onNavigate} /></>;
}

function Behavioral({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const items = [
    { title: 'Care Coordination', text: 'Person-centered coordination that helps individuals develop their plan of care, connect with needed services and resources, and work toward their identified goals.' },
    { title: 'Peer Support', text: 'Recovery-focused support provided by trained and certified peer support specialists with lived behavioral health experience, promoting hope, self-determination, recovery, and community involvement.' },
  ];
  return <><PageHero compact eyebrow="1915(i) Behavioral Health Services" title={<>A steadier path toward <em>wellbeing.</em></>} text="Behavioral health support that builds practical skills, strengthens confidence, and helps you participate more fully in the life you want." image={teamImage} /><DetailSection eyebrow="1915(i) behavioral health services" title="Tools, support, and a team in your corner." text="Our services center your goals, your voice, and your path forward. We help connect the right support and resources so progress feels possible and personal." items={items} /><section className="quote-section"><div className="container quote-inner"><Sparkles size={28} /><blockquote>“Progress does not have to be perfect to be powerful.”</blockquote><p>— The Brighter Care approach</p></div></section><Cta onNavigate={onNavigate} /></>;
}

function PageHero({ eyebrow, title, text, image, compact = false }: { eyebrow: string; title: React.ReactNode; text: string; image: string; compact?: boolean }) { return <section className={`page-hero ${compact ? 'compact' : ''}`}><div className="container page-hero-grid"><div className="page-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div><div className="page-hero-image"><img src={image} alt="Brighter Care support in action" /></div></div></section>; }

function DetailSection({ eyebrow, title, text, items }: { eyebrow: string; title: string; text: string; items: { title: string; text: string }[] }) { return <section className="section-pad detail-section"><div className="container detail-grid"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p className="lead">{text}</p></div><div className="included-card"><span className="included-label">How we can help</span>{items.map((item) => <div className="included-item" key={item.title}><span><Check size={15} /></span><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div></div></section>; }

function Contact() { return <section className="contact-page"><div className="container contact-grid"><div className="contact-copy"><Eyebrow>Let’s connect</Eyebrow><h1>There is a brighter way <em>forward.</em></h1><p className="lead">Questions about services, eligibility, or getting started? Our team is here to listen and help you find the right next step.</p><div className="contact-details"><a href="tel:+17018098497"><span className="icon-box"><Phone size={20} /></span><div><small>Call us</small><strong>+1 (701) 809-8497</strong></div></a><a href="mailto:info@brightercarellc.com"><span className="icon-box"><Mail size={20} /></span><div><small>Email us</small><strong>info@brightercarellc.com</strong></div></a></div></div><div className="contact-card"><div className="card-spark"><Sparkles size={21} /></div><h2>Start with a conversation.</h2><p>Tell us a little about what you are looking for, and we will be in touch.</p><form onSubmit={(event) => event.preventDefault()}><label>Name<input type="text" placeholder="Your name" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><label>How can we help?<textarea rows={4} placeholder="Share a little about your needs" /></label><button className="button button-primary" type="submit">Send inquiry <ArrowRight size={17} /></button></form></div></div></section>; }

function Cta({ onNavigate }: { onNavigate: (page: Page) => void }) { return <section className="cta"><div className="cta-glow" /><div className="container cta-inner"><div className="cta-copy"><Eyebrow>Take the next step</Eyebrow><h2>Let’s make the days ahead <em>brighter.</em></h2><p>Thoughtful support starts with a simple conversation.</p></div><div className="cta-action"><span>We are ready when you are</span><Button variant="light" onClick={() => onNavigate('contact')}>Connect with us</Button></div></div></section>; }

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) { return <footer className="footer"><div className="container footer-top"><div className="footer-brand"><button className="brand" onClick={() => onNavigate('home')}><img src={logo} alt="Brighter Care LLC" /></button><p>Support. Growth. Independence.</p><span className="footer-note">Person-centered care for brighter days.</span></div><div className="footer-links"><div><strong>Explore</strong>{navItems.slice(1, 5).map((item) => <button key={item.page} onClick={() => onNavigate(item.page)}>{item.label}</button>)}</div><div><strong>Reach us</strong><a href="tel:+17018098497"><Phone size={14} /> +1 (701) 809-8497</a><a href="mailto:info@brightercarellc.com"><Mail size={14} /> info@brightercarellc.com</a><button onClick={() => onNavigate('contact')} className="footer-cta">Start a conversation <ArrowRight size={14} /></button></div></div></div><div className="container footer-bottom"><span>© 2024 Brighter Care LLC. All rights reserved.</span><span className="footer-signoff"><span /> Care with purpose.</span></div></footer>; }

export default App;
