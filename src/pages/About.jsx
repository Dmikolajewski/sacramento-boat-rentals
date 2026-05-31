import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Anchor, Users, Award, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-river-mist">
      <Navbar scrolled={true} />

      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#0A2229] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display italic">Our Story</h1>
          <p className="text-xl text-golden-hour mt-6">Sacramento Boat Rentals • Family Owned Since 2018</p>
        </div>

        <div className="max-w-3xl mx-auto mt-16 prose prose-invert">
          <p className="text-lg leading-relaxed">
            Located at the beautiful Sacramento Marina, we specialize in providing premium 24-foot pontoon boat rentals for families, friends, and adventurers who want to experience the Sacramento River the right way.
          </p>
          <p className="text-lg leading-relaxed mt-6">
            What started as a passion project between two brothers who grew up on the river has grown into Sacramento’s most trusted boat rental company. Every boat is meticulously maintained, cleaned daily, and prepared with care so you can focus on making memories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-golden-hour/10 rounded-full flex items-center justify-center mb-4">
              <Anchor className="w-8 h-8 text-golden-hour" />
            </div>
            <h3 className="font-semibold">Prime Location</h3>
            <p className="text-sm text-white/70 mt-2">Minutes from Old Sacramento and downtown</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-golden-hour/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-golden-hour" />
            </div>
            <h3 className="font-semibold">Family Operated</h3>
            <p className="text-sm text-white/70 mt-2">We treat every customer like family</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-golden-hour/10 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-golden-hour" />
            </div>
            <h3 className="font-semibold">4.8 Star Rated</h3>
            <p className="text-sm text-white/70 mt-2">Consistently ranked #1 on Google</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}