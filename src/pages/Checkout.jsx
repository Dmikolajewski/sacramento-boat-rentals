import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Anchor, Clock, ChevronLeft } from 'lucide-react';

function TimerDisplay() {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-2 bg-black/30 px-5 py-2 rounded-2xl text-white/70">
      <Clock className="w-4 h-4" />
      <span className="font-mono">{mins}:{secs}</span>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};
  const { vessel, date, duration, guests } = booking;

  const vesselName = vessel?.name || 'Selected Vessel';
  const basePrice = vessel?.base_price_per_hour || 0;
  const bookingDate = date || 'Not selected';
  const durationHours = parseInt(duration?.replace(' Hours', '') || '4');
  const guestCount = guests ? guests.split('–')[1] || guests : '6';

  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');

  const formRef = useRef({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    special_requests: '',
  });

  const totalPrice = basePrice * durationHours;

  const handleStep1 = () => {
    const formData = formRef.current;
    if (!formData.guest_name.trim() || !formData.guest_email.trim() || !formData.guest_phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    const code = 'RK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setConfirmationCode(code);
    setStep(3);
  };

  const updateField = (field, value) => {
    formRef.current[field] = value;
  };

  return (
    <div className="min-h-screen bg-[#0A2229]">
      <div className="border-b border-white/10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Anchor className="w-5 h-5 text-golden-hour" />
          <span className="font-display text-xl text-white">Sacramento Boat Rentals</span>
        </div>
        <TimerDisplay />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Step 1: Guest Info */}
        {step === 1 && (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white mb-6">
                <ChevronLeft className="w-5 h-5" /> Back to Vessel
              </button>

              <h1 className="text-4xl font-display italic text-white mb-10">Guest Information</h1>
              
              <div className="space-y-8">
                <div>
                  <label className="text-golden-hour/70 text-xs block mb-2">Full Name *</label>
                  <input type="text" onChange={(e) => updateField('guest_name', e.target.value)} placeholder="John Smith" className="w-full px-5 py-4 bg-[#1A3A44] text-white border border-white/20 rounded-2xl focus:border-golden-hour focus:outline-none" />
                </div>
                <div>
                  <label className="text-golden-hour/70 text-xs block mb-2">Email Address *</label>
                  <input type="email" onChange={(e) => updateField('guest_email', e.target.value)} placeholder="you@email.com" className="w-full px-5 py-4 bg-[#1A3A44] text-white border border-white/20 rounded-2xl focus:border-golden-hour focus:outline-none" />
                </div>
                <div>
                  <label className="text-golden-hour/70 text-xs block mb-2">Phone Number *</label>
                  <input type="tel" onChange={(e) => updateField('guest_phone', e.target.value)} placeholder="(916) 555-1234" className="w-full px-5 py-4 bg-[#1A3A44] text-white border border-white/20 rounded-2xl focus:border-golden-hour focus:outline-none" />
                </div>
                <div>
                  <label className="text-golden-hour/70 text-xs block mb-2">Special Requests (Optional)</label>
                  <textarea onChange={(e) => updateField('special_requests', e.target.value)} placeholder="Any special requests..." rows={4} className="w-full px-5 py-4 bg-[#1A3A44] text-white border border-white/20 rounded-2xl focus:border-golden-hour focus:outline-none resize-none" />
                </div>
              </div>

              <button onClick={handleStep1} className="mt-10 w-full py-5 bg-golden-hour text-deep-river font-semibold rounded-2xl text-lg hover:bg-yellow-400 transition">
                Continue to Review
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#132F38] rounded-3xl p-8 sticky top-8">
                <h3 className="text-golden-hour/70 mb-4">BOOKING SUMMARY</h3>
                <p className="text-2xl font-display text-white">{vesselName}</p>
                <p className="text-white/70 mt-1">{bookingDate} • {duration}</p>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex justify-between text-xl">
                    <span className="text-white/80">Total</span>
                    <span className="text-golden-hour font-semibold">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review & Confirm */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-white/60 hover:text-white mb-8">
              <ChevronLeft className="w-5 h-5" /> Edit Guest Information
            </button>

            <h1 className="text-4xl font-display italic text-white mb-10">Review Your Booking</h1>

            <div className="bg-[#132F38] rounded-3xl p-10 space-y-10">
              <div>
                <h3 className="text-golden-hour/70 text-sm mb-4">VESSEL</h3>
                <p className="text-3xl font-display text-white">{vesselName}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-golden-hour/70 text-sm mb-2">DATE & DURATION</h3>
                  <p className="text-white">{bookingDate} • {duration}</p>
                </div>
                <div>
                  <h3 className="text-golden-hour/70 text-sm mb-2">GUESTS</h3>
                  <p className="text-white">{guestCount} Guests</p>
                </div>
              </div>

              <div>
                <h3 className="text-golden-hour/70 text-sm mb-3">GUEST DETAILS</h3>
                <div className="grid grid-cols-2 gap-4 text-white">
                  <p><span className="text-white/60">Name:</span> {formRef.current.guest_name}</p>
                  <p><span className="text-white/60">Email:</span> {formRef.current.guest_email}</p>
                  <p><span className="text-white/60">Phone:</span> {formRef.current.guest_phone}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-2xl">Total</span>
                  <span className="text-4xl font-semibold text-golden-hour">${totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="mt-10 w-full py-6 bg-golden-hour text-deep-river font-semibold rounded-2xl text-xl hover:bg-yellow-400 transition"
            >
              Confirm & Secure Booking
            </button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-20 max-w-lg mx-auto">
            <div className="w-28 h-28 rounded-full border-4 border-golden-hour mx-auto flex items-center justify-center mb-8">
              <Check className="w-16 h-16 text-golden-hour" />
            </div>
            <h2 className="text-5xl font-display italic text-white mb-4">You're Confirmed!</h2>
            <p className="text-2xl text-golden-hour mb-8">Confirmation Code: {confirmationCode}</p>
            <p className="text-white/70 mb-10">A member of our team will contact you shortly.</p>
            <button onClick={() => navigate('/')} className="px-10 py-4 bg-golden-hour text-deep-river rounded-2xl font-semibold">
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}