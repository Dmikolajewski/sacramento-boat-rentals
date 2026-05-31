import { Link } from 'react-router-dom';
import { Anchor, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-river border-t border-golden-hour/20" style={{background:'#0A2229'}}>
      <div className="px-[8vw] pt-16 pb-8">
        <hr className="horizon-rule mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-golden-hour/60 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-golden-hour" style={{color:'#D4AF37'}} />
              </div>
              <div>
                <span className="font-display text-white text-2xl block" style={{color:'#fff'}}>Sacramento Boat Rentals</span>
                <span className="op-caps text-golden-hour/60 text-[10px]" style={{color:'rgba(212,175,55,0.6)'}}>Boat Rentals at the Sacramento Marina</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm" style={{color:'rgba(255,255,255,0.5)'}}>
              Rent a pontoon boat on the scenic Sacramento River. Conveniently located at the Sacramento Marina, just minutes from Old Sacramento.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-golden-hour hover:text-golden-hour transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-golden-hour hover:text-golden-hour transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="op-caps text-golden-hour text-xs mb-6" style={{color:'#D4AF37'}}>Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Fleet', href: '/fleet' },
                { label: 'Book a Vessel', href: '/fleet' },
                { label: 'Experiences', href: '/experiences' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/50 hover:text-white text-sm transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="op-caps text-golden-hour text-xs mb-6" style={{color:'#D4AF37'}}>Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/50 text-sm" style={{color:'rgba(255,255,255,0.5)'}}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-golden-hour/60" style={{color:'rgba(212,175,55,0.6)'}} />
                2710 Ramp Way, Sacramento, CA 95818
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm" style={{color:'rgba(255,255,255,0.5)'}}>
                <Phone className="w-4 h-4 shrink-0 text-golden-hour/60" style={{color:'rgba(212,175,55,0.6)'}} />
                (916) 223-2220
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm" style={{color:'rgba(255,255,255,0.5)'}}>
                <Mail className="w-4 h-4 shrink-0 text-golden-hour/60" style={{color:'rgba(212,175,55,0.6)'}} />
                info@sacramentoboatrentals.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="horizon-rule mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="op-caps text-white/30 text-xs" style={{color:'rgba(255,255,255,0.3)'}}>
            © 2026 Sacramento Boat Rentals. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((item) => (
              <a key={item} href="#" className="op-caps text-white/30 text-xs hover:text-white/60 transition-colors" style={{color:'rgba(255,255,255,0.3)'}}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}