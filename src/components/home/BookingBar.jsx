import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';

export default function BookingBar() {
  const navigate = useNavigate();
  const dateRef = useRef(null);

  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [guests, setGuests] = useState('');

  const handleDateClick = () => dateRef.current?.showPicker();

  const handleFindVessels = () => {
    if (!date || !duration || !guests) {
      alert("Please fill out Date, Duration, and Guests before searching.");
      return;
    }

    navigate('/fleet', {
      state: {
        date,
        duration,
        guests
      }
    });
  };

  return (
    <div className="bg-[#132F38] rounded-3xl p-8 border border-white/10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        
        {/* DATE */}
        <div 
          onClick={handleDateClick} 
          className="flex-1 flex items-center gap-3 cursor-pointer bg-[#1A3A44] rounded-2xl p-4 border border-white/10"
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
        <div className="flex-1 flex items-center gap-3 bg-[#1A3A44] rounded-2xl p-4 border border-white/10">
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

        {/* GUESTS */}
        <div className="flex-1 flex items-center gap-3 bg-[#1A3A44] rounded-2xl p-4 border border-white/10">
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

        <button 
          onClick={handleFindVessels} 
          className="px-10 py-4 bg-golden-hour hover:bg-yellow-400 transition-colors text-deep-river font-semibold rounded-2xl text-lg whitespace-nowrap"
        >
          FIND VESSELS
        </button>
      </div>
    </div>
  );
}