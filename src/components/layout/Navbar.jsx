import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Anchor, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'OUR FLEET', href: '/fleet' },
    { label: 'EXPERIENCES', href: '/experiences' },
    { label: 'ABOUT US', href: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A2229]/95 backdrop-blur-lg border-b border-golden-hour/20 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Slimmer on desktop */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-golden-hour rounded-full flex items-center justify-center">
            <Anchor className="w-4 h-4 text-golden-hour" />
          </div>
          <div className="leading-none">
            <div className="font-display text-white text-xl md:text-2xl tracking-tight">Sacramento Boat Rentals</div>
            <div className="text-golden-hour text-[10px] tracking-widest">SACRAMENTO MARINA</div>
          </div>
        </Link>

        {/* Desktop Nav - Tighter spacing */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`op-caps hover:text-golden-hour transition-colors ${location.pathname === link.href ? 'text-golden-hour' : 'text-white/80'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA - More compact */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+19162232220" className="flex items-center gap-2 text-white/70 hover:text-golden-hour transition-colors text-sm">
            <Phone className="w-4 h-4" />
            (916) 223-2220
          </a>
          <Link to="/fleet" className="bg-golden-hour hover:bg-yellow-400 text-deep-river font-semibold px-6 py-2.5 rounded transition-all text-sm">
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Hamburger - Unchanged */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Unchanged (perfect as you said) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A2229] border-t border-white/10"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="text-white py-2 border-b border-white/10">
                  {link.label}
                </Link>
              ))}
              <a href="tel:+19162232220" className="flex items-center gap-2 text-golden-hour py-3">📞 (916) 223-2220</a>
              <Link to="/fleet" onClick={() => setMenuOpen(false)} className="bg-golden-hour text-deep-river py-4 text-center font-semibold rounded text-lg">
                BOOK YOUR BOAT NOW →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}