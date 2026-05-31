import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';

export default function BookingEngine({ 
  vessel, 
  initialDate = '', 
  initialDuration = '', 
  initialGuests = '' 
}) {
  const navigate = useNavigate();
  const dateRef = useRef(null);

  const [date, setDate] = useState(initialDate);
  const [duration, setDuration] = useState(initialDuration);
  const [guests, setGuests] = useState(initialGuests);

  // Update form if new initial data comes in (e.g. user goes back and forth)
  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialDuration) setDuration(initialDuration);
    if (initialGuests) setGuests(initialGuests);
  }, [initialDate, initialDuration, initialGuests]);

  const handleDateClick = () => dateRef.current?.showPicker();

  const handleBookNow = () => {
    if (!date || !duration || !guests) {
      alert("Please fill out all fields: Date, Duration, and Guests");
      return;
    }

    navigate('/checkout', {
      state: {
        vessel,
        date,
        duration,
        guests
      }
    });
  };

  return (
    <div className="bg-[#132F38] rounded-3xl p-8 sticky top-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Book This Vessel</h2>
      
      <div className="space-y-6">
        {/* DATE */}
        <div 
          onClick={handleDateClick} 
          className="flex items-center gap-3 cursor-pointer bg-[#1A3A44] rounded-2xl p-4 border border-white/10"
        >
          <Calendar className="w-5 h-5 text-golden-hour" />
          <div className="flex-1">
            <label className="text-golden-hour/70 text-xs block">DATE</label>
            <input 
              ref={dateRef} 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="w-full bg-transparent text-white focus:outline-none text-lg" 
            />
          </div>
        </div>

        {/* DURATION */}
        <div className="bg-[#1A3A44] rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-golden-hour" />
            <div className="flex-1">
              <label className="text-golden-hour/70 text-xs block">DURATION</label>
              <select 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                className="w-full bg-[#1A3A44] text-white rounded-xl focus:outline-none text-lg"
              >
                <option value="">Select Duration</option>
                <option value="2 Hours">2 Hours</option>
                <option value="4 Hours">4 Hours</option>
                <option value="6 Hours">6 Hours</option>
                <option value="8 Hours">8 Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* GUESTS */}
        <div className="bg-[#1A3A44] rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-golden-hour" />
            <div className="flex-1">
              <label className="text-golden-hour/70 text-xs block">GUESTS</label>
              <select 
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
                className="w-full bg-[#1A3A44] text-white rounded-xl focus:outline-none text-lg"
              >
                <option value="">How Many Guests?</option>
                <option value="1-4">1–4 Guests</option>
                <option value="5-8">5–8 Guests</option>
                <option value="9-12">9–12 Guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY */}
        {duration && vessel && (
          <div className="bg-[#1A3A44] rounded-2xl p-6 text-center border border-white/10">
            <p className="text-white/70">Starting at</p>
            <p className="text-4xl font-semibold text-golden-hour">
              ${vessel.base_price_per_hour} <span className="text-xl">/hour</span>
            </p>
          </div>
        )}

        {/* BOOK BUTTON */}
        <button 
          onClick={handleBookNow}
          className="w-full bg-golden-hour hover:bg-yellow-400 transition-colors text-deep-river font-semibold py-4 rounded-2xl text-lg mt-2"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}