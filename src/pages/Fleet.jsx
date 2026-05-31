import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const boats = [
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

export default function Fleet() {
  const location = useLocation();
  const bookingData = location.state || {}; // Get data passed from homepage

  return (
    <div className="min-h-screen bg-[#0A2229]">
      <Navbar scrolled={true} />

      <section className="pt-40 pb-16 px-8 bg-[#0A2229] text-center">
        <h1 className="text-6xl font-display italic text-white">Our Fleet</h1>
        <p className="text-golden-hour mt-3">Choose your boat</p>
      </section>

      <section className="px-8 py-16 bg-[#0A2229]">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {boats.map(boat => (
            <Link 
              key={boat.id} 
              to={`/vessel/${boat.id}`}
              state={bookingData}   // ← Pass booking data forward
              className="group block"
            >
              <div className="bg-[#132F38] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                <img 
                  src={boat.image} 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-display">{boat.name}</h3>
                  <p className="text-3xl font-semibold text-golden-hour">${boat.price} / hour</p>
                  <p className="text-white/70 mt-2">{boat.tagline}</p>
                  <div className="mt-6 text-golden-hour font-medium">View Details &amp; Book →</div>
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