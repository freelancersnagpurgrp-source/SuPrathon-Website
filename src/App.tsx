import { useEffect, useState, useRef } from 'react';
import { Award, Code, Trophy, Users, Zap, Shield, Smartphone, Brain, Globe, Sparkles, Target, CheckCircle, Mail } from 'lucide-react';

function App() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeout(() => setShowCurtain(false), 3500);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const targetDate = new Date('2025-07-20T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Exo+2:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Exo 2', sans-serif; background: #0A0A0A; color: #F5F0E8; overflow-x: hidden; cursor: none; }
        .custom-cursor { position: fixed; width: 12px; height: 12px; border-radius: 50%; background: #C41E3A; pointer-events: none; z-index: 10000; box-shadow: 0 0 20px #FFD700; }
        .custom-cursor-ring { position: fixed; width: 40px; height: 40px; border: 2px solid #FFD700; border-radius: 50%; pointer-events: none; z-index: 9999; }
        .curtain-overlay { position: fixed; inset: 0; z-index: 9998; background: #000; display: flex; align-items: center; justify-content: center; animation: fadeOut 0.5s ease 3s forwards; }
        .curtain { position: absolute; top: 0; bottom: 0; width: 50%; background: linear-gradient(135deg, #8B0000 0%, #C41E3A 50%, #8B0000 100%); }
        .curtain-left { left: 0; border-right: 20px solid #DAA520; box-shadow: inset -50px 0 100px rgba(0,0,0,0.5); animation: curtainOpenLeft 3s ease-in-out forwards; }
        .curtain-right { right: 0; border-left: 20px solid #DAA520; box-shadow: inset 50px 0 100px rgba(0,0,0,0.5); animation: curtainOpenRight 3s ease-in-out forwards; }
        .spotlight { position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 300px; height: 150%; background: linear-gradient(180deg, rgba(255,215,0,0.3) 0%, transparent 100%); animation: spotlightGlow 3s ease-in-out forwards; pointer-events: none; }
        .curtain-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Cinzel Decorative', serif; font-size: 3rem; font-weight: 900; color: #FFD700; text-shadow: 0 0 30px #FFD700, 0 0 60px #C41E3A; animation: textGlow 3s ease-in-out forwards; white-space: nowrap; z-index: 1; }
        .confetti { position: absolute; width: 10px; height: 10px; animation: confettiFall 2s ease-in-out forwards; }
        @keyframes curtainOpenLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes curtainOpenRight { 0% { transform: translateX(0); } 100% { transform: translateX(100%); } }
        @keyframes spotlightGlow { 0%, 50% { opacity: 0; } 70% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes textGlow { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 50% { opacity: 0; } 60% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } 100% { transform: translate(-50%, -50%) scale(1); } }
        @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
        @keyframes confettiFall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        .particles { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: -1; }
        .particle { position: absolute; width: 3px; height: 3px; border-radius: 50%; animation: float 15s infinite ease-in-out; opacity: 0.6; }
        @keyframes float { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(50px, -50px); } 50% { transform: translate(-50px, -100px); } 75% { transform: translate(30px, -150px); } }
        .glitch { position: relative; font-family: 'Cinzel Decorative', serif; }
        .glitch:hover::before, .glitch:hover::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .glitch:hover::before { animation: glitch-1 0.3s infinite; color: #ff0000; z-index: -1; }
        .glitch:hover::after { animation: glitch-2 0.3s infinite; color: #00ff00; z-index: -2; }
        @keyframes glitch-1 { 0%, 100% { transform: translate(0); } 33% { transform: translate(-2px, 2px); } 66% { transform: translate(2px, -2px); } }
        @keyframes glitch-2 { 0%, 100% { transform: translate(0); } 33% { transform: translate(2px, -2px); } 66% { transform: translate(-2px, 2px); } }
        .glass-card { background: rgba(138, 0, 0, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(218, 165, 32, 0.2); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
        .gold-glow { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.1) !important; }
        h1, h2, h3, h4 { font-family: 'Cinzel Decorative', serif; }
        .section-reveal { opacity: 0; transform: translateY(50px) scale(0.95); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .section-reveal.visible { opacity: 1; transform: translateY(0) scale(1); }
        .tilt-card { transform-style: preserve-3d; transition: transform 0.3s ease; }
        .floating-orb { position: absolute; border-radius: 50%; filter: blur(60px); animation: floatOrb 20s infinite ease-in-out; pointer-events: none; }
        @keyframes floatOrb { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(100px, -100px) scale(1.2); } 50% { transform: translate(-100px, 100px) scale(0.8); } 75% { transform: translate(50px, 50px) scale(1.1); } }
        .magnetic-btn { transition: transform 0.2s ease; }
        .grain { position: fixed; inset: 0; pointer-events: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.05" /></svg>'); z-index: 9997; }
        .bounce { animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        .timeline-line { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawLine 2s ease-in-out forwards; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @media (max-width: 768px) { .curtain-text { font-size: 1.5rem; } }
      `}</style>

      <div className="custom-cursor" style={{ left: cursorPos.x - 6, top: cursorPos.y - 6 }} />
      <div className="custom-cursor-ring" style={{ left: cursorPos.x - 20, top: cursorPos.y - 20 }} />
      <div className="grain" />

      {showCurtain && (
        <div className="curtain-overlay">
          <div className="relative w-full h-full">
            <div className="spotlight" />
            <div className="curtain curtain-left" />
            <div className="curtain curtain-right" />
            <div className="curtain-text">INDIA'S BIGGEST HACKATHON</div>
            {[...Array(30)].map((_, i) => (
              <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${2 + Math.random()}s`, background: i % 2 === 0 ? '#FFD700' : '#C41E3A' }} />
            ))}
          </div>
        </div>
      )}

      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 15}s`, animationDuration: `${10 + Math.random() * 10}s`, background: i % 3 === 0 ? '#C41E3A' : '#FFD700' }} />
        ))}
      </div>

      <HeroSection timeLeft={timeLeft} />
      <AboutSection />
      <StatsSection />
      <TracksSection />
      <WhyParticipateSection />
      <AwardsSection />
      <TimelineSection />
      <EligibilitySection />
      <WorldRecordSection />
      <OrganizersSection />
      <FAQSection />
      <RegisterCTASection />
      <Footer />
    </>
  );
}

function HeroSection({ timeLeft }: any) {
  const [scrambledText, setScrambledText] = useState('Code. Create. Conquer.');
  const texts = ['Code. Create. Conquer.', 'Build. Innovate. Win.', 'Dream. Code. Achieve.'];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (textIndex + 1) % texts.length;
      const nextText = texts[nextIndex];
      let iterations = 0;
      const scrambleInterval = setInterval(() => {
        setScrambledText(nextText.split('').map((c, i) => iterations > i ? c : String.fromCharCode(65 + Math.random() * 26)).join(''));
        if (iterations >= nextText.length) clearInterval(scrambleInterval);
        iterations += 1 / 3;
      }, 30);
      setTextIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [textIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="floating-orb" style={{ width: '400px', height: '400px', background: '#C41E3A', top: '10%', left: '10%' }} />
      <div className="floating-orb" style={{ width: '300px', height: '300px', background: '#FFD700', bottom: '10%', right: '10%', animationDelay: '5s' }} />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          <div className="glass-card gold-glow px-6 py-3 rounded-full flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400" /><span className="text-sm font-semibold">World Record Holder</span></div>
          <div className="glass-card gold-glow px-6 py-3 rounded-full flex items-center gap-2"><Users className="w-5 h-5 text-yellow-400" /><span className="text-sm font-semibold">500K+ Reach</span></div>
          <div className="glass-card gold-glow px-6 py-3 rounded-full flex items-center gap-2"><Code className="w-5 h-5 text-yellow-400" /><span className="text-sm font-semibold">500+ Submissions</span></div>
        </div>

        <h1 className="glitch text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent" data-text="SUPRATHON 2K25" style={{ lineHeight: 1.2 }}>SUPRATHON 2K25</h1>
        <p className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">{scrambledText}</p>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">India's Biggest Virtual Hackathon | World Record Holder</p>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <MagneticButton className="bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 gold-glow">
            <Zap className="w-5 h-5" />Register Now
          </MagneticButton>
          <MagneticButton className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-full font-bold text-lg">Learn More</MagneticButton>
        </div>

        <div className="glass-card inline-block px-8 py-6 rounded-2xl mb-8">
          <p className="text-sm text-gray-400 mb-3">Event Starts In</p>
          <div className="flex gap-6 text-center text-4xl font-black">
            <div><div className="text-yellow-400">{timeLeft.days}</div><div className="text-xs text-gray-400 mt-1">DAYS</div></div>
            <div className="text-red-500">:</div>
            <div><div className="text-yellow-400">{timeLeft.hours}</div><div className="text-xs text-gray-400 mt-1">HRS</div></div>
            <div className="text-red-500">:</div>
            <div><div className="text-yellow-400">{timeLeft.minutes}</div><div className="text-xs text-gray-400 mt-1">MIN</div></div>
            <div className="text-red-500">:</div>
            <div><div className="text-yellow-400">{timeLeft.seconds}</div><div className="text-xs text-gray-400 mt-1">SEC</div></div>
          </div>
        </div>

        <div className="bounce"><svg width="30" height="50" viewBox="0 0 30 50" className="mx-auto opacity-60"><rect x="5" y="5" width="20" height="40" rx="10" stroke="#FFD700" strokeWidth="2" fill="none" /><circle cx="15" cy="15" r="3" fill="#FFD700"><animate attributeName="cy" from="15" to="30" dur="1.5s" repeatCount="indefinite" /></circle></svg></div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4"><div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div><h2 className="text-5xl md:text-6xl font-black mb-6 text-yellow-400">About SuPrathon</h2>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">SuPrathon 2K25 is India's biggest National Level Virtual Hackathon — a 36-hour coding marathon organized by SuPrazo Technologies and CodeElevate Academy. Open to students, developers, freelancers and innovators across India.</p>
        <div className="glass-card gold-glow p-6 rounded-xl mb-6"><div className="flex items-center gap-3 mb-3"><Globe className="w-6 h-6 text-yellow-400" /><h3 className="text-xl font-bold text-yellow-400">World Record Holder</h3></div><p className="text-gray-300">India's Biggest Virtual Hackathon</p></div>
        <CounterBox number={500000} suffix="+" label="Total Reach" />
      </div>
      <div className="glass-card gold-glow p-12 rounded-3xl text-center transform hover:scale-105 transition-transform">
        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
        <h3 className="text-3xl font-black text-yellow-400 mb-4">SUPRATHON</h3>
        <p className="text-gray-400">Organized by</p>
        <p className="text-xl font-bold text-white mt-2">SuPrazo Technologies</p>
        <p className="text-gray-400 my-2">×</p>
        <p className="text-xl font-bold text-white">CodeElevate Academy</p>
      </div>
    </div></section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4 bg-gradient-to-r from-red-950 to-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[{ n: 500000, s: '+', l: 'Total Reach' }, { n: 500, s: '+', l: 'Submissions' }, { n: 36, s: '', l: 'Hours of Innovation' }, { n: 1, s: '', l: 'World Record' }].map((item, i) => (
          <TiltCard key={i}><div className="glass-card gold-glow p-8 rounded-2xl text-center"><CounterBox number={item.n} suffix={item.s} label={item.l} large /></div></TiltCard>
        ))}
      </div>
    </section>
  );
}

function TracksSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tracks = [
    { icon: Globe, title: 'Web Development', desc: 'Responsive websites & web apps' },
    { icon: Brain, title: 'Artificial Intelligence', desc: 'AI/ML models for real-world problems' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Android/iOS with intuitive interfaces' },
    { icon: Sparkles, title: 'Open Innovation', desc: 'Any domain, any idea' },
    { icon: Shield, title: 'Cybersecurity', desc: 'Secure systems & ethical hacking' },
  ];

  return (
    <section ref={ref} className="section-reveal py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Build Across Any Domain</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, i) => (
            <TiltCard key={i}>
              <div className="glass-card gold-glow p-8 rounded-2xl hover:border-yellow-400 transition-all h-full">
                <track.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-white">{track.title}</h3>
                <p className="text-gray-400">{track.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyParticipateSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    { icon: Award, text: 'Nationally Recognized Certificate & Badge from partners' },
    { icon: Brain, text: '36 Hours of Real Innovation' },
    { icon: Trophy, text: 'Cash Prizes & Awards' },
    { icon: Users, text: 'Mentorship from Industry Experts' },
    { icon: Globe, text: '500K+ Community Reach' },
    { icon: Sparkles, text: 'Be Part of a World Record Event' },
  ];

  return (
    <section ref={ref} className="section-reveal py-24 px-4 bg-gradient-to-b from-black to-red-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Why Participate?</h2>
        <div className="space-y-6">
          {benefits.map((b, i) => (
            <div key={i} className="glass-card gold-glow p-6 rounded-xl flex items-center gap-4 transform hover:scale-105 transition-all">
              <b.icon className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <p className="text-lg font-semibold">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Awards & Prizes</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[{ pos: '1st', color: 'yellow', icon: '#FFD700', glow: 'rgba(255, 215, 0, 0.5)' }, { pos: '2nd', color: 'gray', icon: '#C0C0C0', glow: 'rgba(192, 192, 192, 0.5)' }, { pos: '3rd', color: 'orange', icon: '#CD7F32', glow: 'rgba(205, 127, 50, 0.5)' }].map((p, i) => (
            <TiltCard key={i}>
              <div className="glass-card p-8 rounded-2xl text-center" style={{ boxShadow: `0 0 40px ${p.glow}` }}>
                <Trophy className={`w-20 h-20 text-${p.color}-400 mx-auto mb-4 animate-pulse`} style={{ color: p.icon }} />
                <h3 className="text-3xl font-black mb-2" style={{ color: p.icon }}>{p.pos} Place</h3>
                <p className="text-gray-400">Cash Prize + Certificate</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[{ icon: Sparkles, title: 'Most Creative Idea' }, { icon: Zap, title: 'Best Technical Implementation' }, { icon: Target, title: 'Best Social Impact' }].map((a, i) => (
            <div key={i} className="glass-card gold-glow p-6 rounded-xl text-center">
              <a.icon className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold">{a.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const timeline = [
    { title: 'Registration Opens', desc: 'Secure your spot now' },
    { title: 'Team Formation Deadline', desc: 'Form your dream team' },
    { title: 'Hackathon Begins', desc: '36 hours of innovation starts' },
    { title: 'Submission Deadline', desc: 'July 20, 2025 - 12:00 PM IST' },
    { title: 'Results Announcement', desc: 'Winners revealed' },
  ];

  return (
    <section ref={ref} className="section-reveal py-24 px-4 bg-gradient-to-b from-red-950 to-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Event Timeline</h2>
        <div className="relative">
          <svg className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2" style={{ zIndex: 0 }}>
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#FFD700" strokeWidth="3" className="timeline-line" />
          </svg>
          <div className="space-y-12 relative z-10">
            {timeline.map((item, i) => (
              <div key={i} className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="glass-card gold-glow p-6 rounded-xl inline-block">
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-yellow-400 gold-glow flex-shrink-0" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EligibilitySection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Eligibility & Rules</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card gold-glow p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-3"><Users className="w-6 h-6" />Who Can Participate</h3>
            <ul className="space-y-3 text-gray-300">
              {['Students from all educational backgrounds', 'Professional developers and coders', 'Freelancers and independent innovators', 'Solo participants or teams welcome'].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="glass-card gold-glow p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-3"><Target className="w-6 h-6" />Judging Criteria</h3>
            <ul className="space-y-3 text-gray-300">
              {['Creativity and Innovation', 'Technical Complexity', 'Real-World Impact', 'Originality', 'Presentation Quality'].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 glass-card gold-glow p-8 rounded-2xl text-center">
          <p className="text-xl font-semibold text-gray-300">All participants receive a <span className="text-yellow-400 font-bold">National Level Certificate</span> and exclusive digital badges</p>
        </div>
      </div>
    </section>
  );
}

function WorldRecordSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4 bg-gradient-to-r from-red-900 to-red-950 overflow-hidden">
      <div className="absolute inset-0">{[...Array(20)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />)}</div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-block mb-8"><div className="glass-card gold-glow p-8 rounded-full"><Globe className="w-24 h-24 text-yellow-400" /></div></div>
        <h2 className="text-6xl md:text-7xl font-black mb-6 text-yellow-400">WORLD RECORD HOLDER</h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">SuPrathon is recognized as India's Biggest Virtual Hackathon with 500K+ reach and 500+ submissions, making it a landmark event in India's tech ecosystem.</p>
        <div className="glass-card gold-glow inline-block px-12 py-8 rounded-2xl"><CounterBox number={500000} suffix="+" label="People Reached Globally" large /></div>
      </div>
    </section>
  );
}

function OrganizersSection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-yellow-400">Organized By</h2>
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {[{ icon: Code, name: 'SuPrazo Technologies', desc: 'Leading Technology Solutions Provider' }, { icon: Award, name: 'CodeElevate Academy', desc: 'Empowering Future Developers' }].map((org, i) => (
            <TiltCard key={i}>
              <div className="glass-card gold-glow p-12 rounded-2xl">
                <org.icon className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-3xl font-black mb-4">{org.name}</h3>
                <p className="text-gray-400">{org.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <MagneticButton className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2">
          <Users className="w-5 h-5" />Become a Partner
        </MagneticButton>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<any>(null);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const faqs = [
    { q: 'Is SuPrathon free to participate?', a: 'Registration requires a paid entry. All participants receive certificates and access to exclusive resources.' },
    { q: 'What domains can I build in?', a: 'You can build in any domain - Web Development, AI/ML, Mobile Apps, Cybersecurity, or any Open Innovation idea.' },
    { q: 'Will I get a certificate?', a: 'Yes! All participants receive a National Level certificate and digital badges from our organizing partners.' },
    { q: 'How are projects judged?', a: 'Projects are evaluated on Creativity, Technical Complexity, Real-World Impact, Originality, and Presentation Quality.' },
    { q: 'Can I participate solo?', a: 'Absolutely! Both solo participants and teams are welcome to participate.' },
    { q: 'When is the submission deadline?', a: 'The final submission deadline is July 20, 2025 at 12:00 PM IST.' },
    { q: 'How do I submit my project?', a: 'Projects must be submitted via the official Google Form link provided after registration.' },
  ];

  return (
    <section ref={ref} className="section-reveal py-24 px-4 bg-gradient-to-b from-black to-red-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-yellow-400">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card gold-glow rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold pr-4">{faq.q}</h3>
                <span className={`text-yellow-400 text-2xl transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-6 pb-6 text-gray-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterCTASection() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-reveal py-32 px-4 bg-gradient-to-br from-red-900 via-red-950 to-black overflow-hidden">
      <div className="floating-orb" style={{ width: '500px', height: '500px', background: '#FFD700', top: '-10%', right: '-10%' }} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-6xl md:text-8xl font-black mb-6 text-yellow-400">Don't Wait. Build It.</h2>
        <p className="text-2xl md:text-3xl mb-12 text-gray-300">Secure your spot in India's Biggest Hackathon</p>
        <MagneticButton className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-16 py-6 rounded-full font-black text-2xl inline-flex items-center gap-3 gold-glow mb-12">
          <Zap className="w-8 h-8" />REGISTER NOW
        </MagneticButton>
        <div className="glass-card gold-glow inline-block px-8 py-4 rounded-full mb-8">
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-yellow-400" /><span className="text-gray-300">contact@suprathon.com</span></div>
        </div>
        <div className="flex justify-center gap-6 flex-wrap">
          {['Twitter', 'LinkedIn', 'Instagram', 'Discord'].map(p => <a key={p} href="#" className="glass-card gold-glow px-6 py-3 rounded-full hover:scale-110 transition-transform">{p}</a>)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-yellow-900/30 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div><h3 className="text-2xl font-black text-yellow-400 mb-4">SUPRATHON</h3><p className="text-gray-400 text-sm">India's Biggest Hackathon</p></div>
        <div><h4 className="font-bold mb-4 text-yellow-400">Quick Links</h4><ul className="space-y-2 text-sm text-gray-400">{['About', 'Tracks', 'Prizes', 'Timeline'].map(l => <li key={l}><a href="#" className="hover:text-yellow-400">{l}</a></li>)}</ul></div>
        <div><h4 className="font-bold mb-4 text-yellow-400">Resources</h4><ul className="space-y-2 text-sm text-gray-400">{['FAQ', 'Register', 'Rules', 'Contact'].map(l => <li key={l}><a href="#" className="hover:text-yellow-400">{l}</a></li>)}</ul></div>
        <div><h4 className="font-bold mb-4 text-yellow-400">Organized By</h4><p className="text-sm text-gray-400">SuPrazo Technologies</p><p className="text-sm text-gray-400">× CodeElevate Academy</p></div>
      </div>
      <div className="border-t border-yellow-900/30 pt-8 text-center text-sm text-gray-500">
        <p>© 2025 SuPrathon. India's Biggest Hackathon. All rights reserved.</p>
      </div>
    </footer>
  );
}

function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    if (distance < 100) {
      const force = (100 - distance) / 100;
      setPos({ x: x * force * 0.3, y: y * force * 0.3 });
    }
  };

  return (
    <button ref={ref} className={`magnetic-btn ${className}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} onMouseMove={handleMouseMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} {...props}>
      {children}
    </button>
  );
}

function TiltCard({ children }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  return (
    <div ref={ref} className="tilt-card" onMouseMove={handleMouseMove} onMouseLeave={() => { if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'; }}>
      {children}
    </div>
  );
}

function CounterBox({ number, suffix = '', label, large = false }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !animated) {
          setAnimated(true);
          let current = 0;
          const increment = number / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= number) { setCount(number); clearInterval(timer); } else setCount(Math.floor(current));
          }, 33);
        }
      });
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number, animated]);

  return (
    <div ref={ref}>
      <div className={`${large ? 'text-5xl' : 'text-4xl'} font-black text-yellow-400 mb-2`}>{count.toLocaleString()}{suffix}</div>
      <div className={`${large ? 'text-base' : 'text-sm'} text-gray-400 uppercase tracking-wider`}>{label}</div>
    </div>
  );
}

export default App;
