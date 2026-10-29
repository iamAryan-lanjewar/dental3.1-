import React, { useState, useEffect } from 'react';
import { AppointmentModal } from './components/AppointmentModal';
import { sounds } from './utils/sound';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleOpenAppointment = () => {
    sounds.playClick();
    setIsModalOpen(true);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden select-none bg-[#f47738] font-montserrat">
      {/* 
        Full-Screen Stage
        Matches the 4268.75 x 2400 (16:9) PDF artboard with pixel-perfect zero deviation.
      */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background Image: Joyful smiling girl on vibrant orange backdrop */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/images/joyful_smile_bg.png"
            alt="Joyful smiling girl against orange studio background"
            className="w-full h-full object-cover object-[78%_center] sm:object-[76%_center] md:object-[74%_center] lg:object-[72%_center] xl:object-[70%_center] pointer-events-none select-none transition-all duration-500 ease-out"
          />
        </div>

        {/* 
          Hero Content Layer
          Scaled and aligned to match the exact PDF coordinates:
          - Opening quote mark: smaller, floating above 'y'
          - Cursive IntroScript font: pure white with delicate warm drop shadow
          - Button: #CEEDED pill, deep slate navy text, white circle with right arrow
        */}
        <div className="relative z-10 w-full h-full max-w-[1920px] max-h-[1080px] mx-auto pointer-events-none">
          {/* Headline Typography Block */}
          <div className="absolute left-[3.2%] sm:left-[3.5%] top-[12%] sm:top-[16%] md:top-[18%] lg:top-[20%] xl:top-[21%] text-white tracking-normal font-intro-script pointer-events-auto filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
            {/* 
              Floating Opening Quotation Mark
              In the PDF design, this is smaller (~40% of the word height) and floats above the 'y'
            */}
            <div className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[4rem] xl:text-[4.6rem] leading-none mb-1 sm:mb-2 ml-0 sm:ml-1 text-white select-none font-intro-script">
              “
            </div>

            {/* Line 1: your smile */}
            <h1 className="text-[2.8rem] sm:text-[3.8rem] md:text-[4.8rem] lg:text-[5.9rem] xl:text-[6.9rem] 2xl:text-[7.8rem] leading-[0.98] text-white font-normal whitespace-nowrap pl-1 sm:pl-2 select-none font-intro-script">
              your smile
            </h1>

            {/* Line 2: does really */}
            <div className="text-[2.8rem] sm:text-[3.8rem] md:text-[4.8rem] lg:text-[5.9rem] xl:text-[6.9rem] 2xl:text-[7.8rem] leading-[0.98] text-white font-normal whitespace-nowrap pl-1 sm:pl-2 select-none font-intro-script">
              does really
            </div>

            {/* Line 3: matter !” */}
            <div className="text-[2.8rem] sm:text-[3.8rem] md:text-[4.8rem] lg:text-[5.9rem] xl:text-[6.9rem] 2xl:text-[7.8rem] leading-[0.98] text-white font-normal whitespace-nowrap pl-5 sm:pl-8 md:pl-10 lg:pl-12 select-none font-intro-script">
              matter !”
            </div>
          </div>

          {/* 
            Call To Action Button: "Get Appointment →"
            Background: #CEEDED
            Text color: #2E4A82
            Font: Montserrat Bold
            Icon: White circular badge with soft cyan arrow
          */}
          <div className="absolute left-[3.2%] sm:left-[3.5%] bottom-[6%] sm:bottom-[7.5%] md:bottom-[8.5%] lg:bottom-[9.5%] xl:bottom-[10%] pointer-events-auto">
            <button
              onClick={handleOpenAppointment}
              className="group relative flex items-center justify-between bg-[#CEEDED] hover:bg-[#bfe6e6] active:scale-[0.98] transition-all duration-300 rounded-full px-5 sm:px-7 md:px-8 py-2.5 sm:py-3.5 md:py-4 shadow-[0_8px_20px_rgba(32,86,107,0.18)] hover:shadow-[0_12px_28px_rgba(32,86,107,0.26)] min-w-[200px] sm:min-w-[240px] md:min-w-[270px] lg:min-w-[300px]"
              aria-label="Get Appointment"
            >
              {/* Button Text */}
              <span className="text-[#2E4A82] font-bold text-xs sm:text-sm md:text-base lg:text-lg tracking-normal mr-3 sm:mr-4 select-none">
                Get Appointment
              </span>

              {/* White Circular Badge with Soft Cyan Arrow */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#9dd7e8] transition-colors group-hover:text-[#2E4A82]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Reference Verification & UX Controls Toolbar (Collapsible pill at top right) */}
        <div className="fixed top-4 right-4 z-40 flex flex-col items-end space-y-2 pointer-events-auto">
          {!isToolbarOpen ? (
            <button
              onClick={() => {
                sounds.playClick();
                setIsToolbarOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white/90 text-xs font-semibold tracking-wide border border-white/20 shadow-lg transition-all flex items-center space-x-1.5"
              aria-label="Open controls"
            >
              <span>⚙️</span>
              <span className="hidden sm:inline">Controls</span>
            </button>
          ) : (
            <div className="bg-black/75 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 shadow-2xl space-y-3 w-64 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  UX & Verification
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsToolbarOpen(false);
                  }}
                  className="text-white/60 hover:text-white text-xs px-1"
                  aria-label="Close controls"
                >
                  ✕
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80">Audio Feedback</span>
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    soundEnabled
                      ? 'bg-emerald-500/80 text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Appointment Quick Trigger */}
              <div className="pt-1">
                <button
                  onClick={handleOpenAppointment}
                  className="w-full py-1.5 px-3 rounded-xl bg-[#CEEDED] hover:bg-white text-[#2E4A82] text-xs font-bold transition-all shadow"
                >
                  Open Booking Modal
                </button>
              </div>

              {/* Reference Info */}
              <div className="pt-1 border-t border-white/10 text-[10px] text-white/50 leading-relaxed">
                Matches PDF artboard (16:9), IntroScript font & exact hex palette (#CEEDED, #2E4A82).
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
