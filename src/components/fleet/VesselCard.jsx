import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Ruler, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VesselCard({ vessel, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const features = vessel.features || [];
  const displayFeatures = features.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className={`group relative ${index % 2 === 1 ? 'md:mt-12' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/vessel/${vessel.id}`} className="block">
        {/* Card */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
          {/* Image */}
          <img
            src={vessel.image_url}
            alt={vessel.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          />

          {/* Blueprint Overlay */}
          <div
            className={`blueprint-overlay absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Schematic grid lines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `
                linear-gradient(rgba(212,175,55,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,175,55,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />

            {/* Vessel specs overlay */}
            <div className="relative z-10">
              <div className="flex gap-4 mb-4">
                <div className="glass-panel px-3 py-2 rounded-sm text-center">
                  <span className="block text-golden-hour text-xl font-display" style={{color:'#D4AF37'}}>{vessel.capacity}</span>
                  <span className="op-caps text-white/60 text-[10px]" style={{color:'rgba(255,255,255,0.6)'}}>Guests</span>
                </div>
                <div className="glass-panel px-3 py-2 rounded-sm text-center">
                  <span className="block text-golden-hour text-xl font-display" style={{color:'#D4AF37'}}>{vessel.length_ft}'</span>
                  <span className="op-caps text-white/60 text-[10px]" style={{color:'rgba(255,255,255,0.6)'}}>Length</span>
                </div>
                <div className="glass-panel px-3 py-2 rounded-sm text-center">
                  <span className="block text-golden-hour text-xl font-display" style={{color:'#D4AF37'}}>${vessel.base_price_per_hour}</span>
                  <span className="op-caps text-white/60 text-[10px]" style={{color:'rgba(255,255,255,0.6)'}}>Per Hour</span>
                </div>
              </div>
              {displayFeatures.length > 0 && (
                <ul className="space-y-1">
                  {displayFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/80 text-sm" style={{color:'rgba(255,255,255,0.8)'}}>
                      <span className="w-1 h-1 rounded-full bg-golden-hour shrink-0" style={{background:'#D4AF37'}} />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-center gap-2 text-golden-hour op-caps text-xs font-semibold" style={{color:'#D4AF37'}}>
                View Details <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Status badge */}
          {vessel.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-golden-hour text-deep-river op-caps text-[10px] font-bold rounded-sm" style={{background:'#D4AF37', color:'#0A2229'}}>
              Featured
            </div>
          )}
          {!vessel.available && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/80 text-white op-caps text-[10px] font-bold rounded-sm backdrop-blur-sm">
              Unavailable
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="pt-5 pb-8 border-b border-golden-hour/15">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="op-caps text-golden-hour/70 text-[10px] mb-1" style={{color:'rgba(212,175,55,0.7)'}}>{vessel.type}</p>
              <h3 className="font-display text-deep-river text-2xl leading-tight" style={{color:'#0A2229'}}>{vessel.name}</h3>
              {vessel.tagline && (
                <p className="text-muted-foreground text-sm mt-1">{vessel.tagline}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="font-display text-deep-river text-2xl" style={{color:'#0A2229'}}>${vessel.base_price_per_hour}</span>
              <p className="op-caps text-muted-foreground text-[10px]">/ hour</p>
            </div>
          </div>

          {vessel.rating && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className="w-3 h-3"
                    style={{
                      color: s <= Math.round(vessel.rating) ? '#D4AF37' : 'rgba(0,0,0,0.15)',
                      fill: s <= Math.round(vessel.rating) ? '#D4AF37' : 'transparent'
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{vessel.rating} ({vessel.review_count} reviews)</span>
            </div>
          )}

          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              Up to {vessel.capacity}
            </span>
            {vessel.length_ft && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Ruler className="w-3.5 h-3.5" />
                {vessel.length_ft} ft
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}