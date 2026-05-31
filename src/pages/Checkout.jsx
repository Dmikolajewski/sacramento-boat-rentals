import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, Anchor, ChevronLeft } from 'lucide-react';

// === CHANGE THIS TO YOUR TEST KEY FOR TESTING ===
const stripePromise = loadStripe('pk_live_LXlUuTi3t8OzNHSwqPMwFRY8001ezahSZw');

function PaymentForm({ totalPrice, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    // Simulate successful payment (for testing)
    setTimeout(() => {
      onSuccess();
      setProcessing(false);
    }, 1600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#1A3A44] p-6 rounded-2xl">
        <CardElement 
          options={{
            style: {
              base: {
                color: '#fff',
                fontSize: '16px',
                '::placeholder': { color: '#aaa' },
              },
            },
          }}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-6 bg-golden-hour text-deep-river font-semibold rounded-2xl text-xl hover:bg-yellow-400 disabled:opacity-50"
      >
        {processing ? 'Processing Payment...' : `Pay $${totalPrice} Securely`}
      </button>
    </form>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};
  const { vessel, date, duration } = booking;

  const vesselName = vessel?.name || 'Selected Vessel';
  const basePrice = vessel?.base_price_per_hour || 0;
  const bookingDate = date || '';
  const durationHours = parseInt(duration?.replace(' Hours', '') || '4');
  const totalPrice = basePrice * durationHours;

  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');

  const formRef = useRef({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
  });

  const updateField = (field, value) => {
    formRef.current[field] = value;
  };

  const handleStep1 = () => {
    const formData = formRef.current;
    if (!formData.guest_name.trim() || !formData.guest_email.trim() || !formData.guest_phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSuccess = () => {
    const code = 'RK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setConfirmationCode(code);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#0A2229]">
      <div className="border-b border-white/10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Anchor className="w-5 h-5 text-golden-hour" />
          <span className="font-display text-xl text-white">Sacramento Boat Rentals</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
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
              </div>

              <button onClick={handleStep1} className="mt-10 w-full py-6 bg-golden-hour text-deep-river font-semibold rounded-2xl text-xl hover:bg-yellow-400 transition">
                Continue to Payment
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#132F38] rounded-3xl p-8 sticky top-8">
                <h3 className="text-golden-hour/70 mb-4">BOOKING SUMMARY</h3>
                <p className="text-2xl font-display text-white">{vesselName}</p>
                <p className="text-white/70 mt-1">{bookingDate} • {duration}</p>
                <div className="mt-10 pt-8 border-t border-white/10 flex justify-between text-xl">
                  <span className="text-white/80">Total</span>
                  <span className="text-golden-hour font-semibold">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-display italic text-white mb-10">Secure Payment</h1>
            <Elements stripe={stripePromise}>
              <PaymentForm totalPrice={totalPrice} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-20">
            <Check className="w-24 h-24 text-golden-hour mx-auto mb-8" />
            <h2 className="text-5xl font-display italic text-white">Payment Successful!</h2>
            <p className="text-2xl text-golden-hour mt-6">Confirmation Code: {confirmationCode}</p>
          </div>
        )}
      </div>
    </div>
  );
}