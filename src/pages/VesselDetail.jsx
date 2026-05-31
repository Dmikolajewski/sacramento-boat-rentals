import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingEngine from '@/components/vessel/BookingEngine';

const boats = {
  1: {
    id: 1,
    name: "Pontoon — Premier",
    tagline: "Luxury 24ft • The Flagship Experience",
    description: "Our premium flagship pontoon. Spacious, elegant, and loaded with features including plush seating for 12, large Bimini top, Bluetooth sound system, built-in cooler, and plenty of storage. Perfect for family gatherings, sunset cruises, corporate outings, or a luxurious day on the river.",
    capacity: 12,
    length_ft: 24,
    base_price_per_hour: 124,
    image_url: "https://media.base44.com/images/public/6a127a02b30ab349581c479c/0e3bbaac6_generated_image.png"
  },
  2: {
    id: 2,
    name: "Pontoon — Classic",
    tagline: "Reliable 24ft • Best Value on the River",
    description: "Our most popular and affordable pontoon. Clean, safe, and well-maintained with comfortable seating for 10 guests, Bimini top, and a reliable motor. Ideal for casual outings, fishing trips, birthdays, or simply enjoying the Sacramento River.",
    capacity: 10,
    length_ft: 24,
    base_price_per_hour: 99,
    image_url: "https://media.base44.com/images/public/6a127a02b30ab349581c479c/d396a1946_generated_image.png"
  }
};

export default function VesselDetail() {
  const { id } = useParams();
  const location = useLocation();
  
  const vessel = boats[id] || boats[1];
  const bookingData = location.state || {}; // Receive data from homepage → fleet

  return (
    <div className="min-h-screen bg-[#0A2229]">
      <Navbar scrolled={true} />

      {/* Hero Image Section */}
      <div className="h-[520px] relative">
        <img 
          src={vessel.image_url} 
          alt={vessel.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        
        <div className="absolute bottom-12 left-8 text-white">
          <h1 className="text-5xl md:text-6xl font-display italic leading-none">
            {vessel.name}
          </h1>
          <p className="text-golden-hour text-xl mt-1">{vessel.tagline}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Description Card */}
          <div className="lg:col-span-7 bg-[#132F38] rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">About This Vessel</h2>
            <p className="text-white/80 leading-relaxed text-[17px]">
              {vessel.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-[#1A3A44] rounded-2xl p-6 text-center">
                <div className="text-4xl font-semibold text-golden-hour">{vessel.capacity}</div>
                <div className="text-white/70 mt-1">Maximum Guests</div>
              </div>
              <div className="bg-[#1A3A44] rounded-2xl p-6 text-center">
                <div className="text-4xl font-semibold text-golden-hour">{vessel.length_ft} ft</div>
                <div className="text-white/70 mt-1">Boat Length</div>
              </div>
            </div>
          </div>

          {/* Booking Engine - Now receives pre-filled data */}
          <div className="lg:col-span-5">
            <BookingEngine 
              vessel={vessel} 
              initialDate={bookingData.date}
              initialDuration={bookingData.duration}
              initialGuests={bookingData.guests}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}