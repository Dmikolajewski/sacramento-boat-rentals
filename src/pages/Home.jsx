import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingBar from '@/components/home/BookingBar';
import { ArrowRight } from 'lucide-react';

const featuredBoats = [
  {
    id: 1,
    name: "Pontoon — Premier",
    price: 124,
    image: "https://media.base44.com/images/public/6a127a02b30ab349581c479c/0e3bbaac6_generated_image.png",
    tagline: "Luxury 24ft • 12 Guests"
  },
  {
    id: 2,
    name: "Pontoon — Classic",
    price: 99,
    image: "https://media.base44.com/images/public/6a127a02b30ab349581c479c/d396a1946_generated_image.png",
    tagline: "Comfortable 24ft • 10 Guests"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-river-mist overflow-x-hidden">
      <Navbar scrolled={false} />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[620px] flex flex-col overflow-hidden" style={{background:'#0A2229'}}>
        <img
          src="https://media.base44.com/images/public/6a127a02b30ab349581c479c/52d9e3523_generated_image.png"
          alt="Sacramento River"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.65)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        <div className="relative flex-1 flex flex-col justify-center px-6 md:px-[8vw] pt-24">
          <h1 className="font-display text-white leading-none text-5xl md:text-7xl italic">
            Sacramento<br />Boat Rentals
          </h1>
          <p className="text-white/90 text-lg mt-4 max-w-md">
            Premium 24-foot pontoon boats. Easy booking. Unforgettable days on the river.
          </p>
        </div>

        {/* BookingBar inside hero on DESKTOP only */}
        <div className="hidden md:block relative px-4 md:px-[8vw] pb-8">
          <BookingBar />
        </div>
      </section>

      {/* Mobile BookingBar - Exact same color as Featured Boats section below */}
      <div className="md:hidden px-4 -mt-4 relative z-10 bg-[#0A2229]">
        <BookingBar />
      </div>

      {/* Featured Boats */}
      <section className="py-12 md:py-20 px-6 md:px-[8vw] bg-[#0A2229]">
        <h2 className="text-3xl md:text-4xl font-display italic text-white text-center mb-8">Featured Boats</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {featuredBoats.map(boat => (
            <Link key={boat.id} to={`/vessel/${boat.id}`} className="group">
              <div className="bg-[#132F38] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                <img src={boat.image} className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform" />
                <div className="p-6 md:p-8 text-white">
                  <h3 className="text-xl md:text-2xl font-display">{boat.name}</h3>
                  <p className="text-golden-hour">${boat.price} / hour</p>
                  <p className="text-white/70 mt-1">{boat.tagline}</p>
                  <button className="mt-6 text-golden-hour font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Details &amp; Book <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}