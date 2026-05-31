import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

export default function Experiences() {
  return (
    <div className="min-h-screen bg-river-mist">
      <Navbar scrolled={true} />

      <section className="pt-40 pb-24 px-6 bg-[#0A2229] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-display italic">River Experiences</h1>
          <p className="text-xl text-golden-hour mt-6">There’s no wrong way to enjoy the Sacramento River with us</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-[#132F38] p-8 rounded-2xl">
            <h3 className="text-2xl">🌅 Sunset Cruises</h3>
            <p className="text-white/70 mt-3">Watch the sky turn gold while cruising with music and drinks.</p>
          </div>
          <div className="bg-[#132F38] p-8 rounded-2xl">
            <h3 className="text-2xl">👨‍👩‍👧‍👦 Family Adventures</h3>
            <p className="text-white/70 mt-3">Perfect for birthdays and making memories with the kids.</p>
          </div>
          <div className="bg-[#132F38] p-8 rounded-2xl">
            <h3 className="text-2xl">💼 Corporate Outings</h3>
            <p className="text-white/70 mt-3">Impress your team with a private river cruise.</p>
          </div>
          <div className="bg-[#132F38] p-8 rounded-2xl">
            <h3 className="text-2xl">🎣 Fishing Trips</h3>
            <p className="text-white/70 mt-3">Catch bass right from the boat.</p>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg mb-4">Ready to create your own river memory?</p>
          <Link 
            to="/"
            className="inline-block bg-golden-hour hover:bg-yellow-400 text-deep-river font-semibold px-10 py-4 rounded text-lg transition-colors"
          >
            Let’s Plan Your Perfect Day →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}