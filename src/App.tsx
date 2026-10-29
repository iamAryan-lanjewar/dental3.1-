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
        Full-Screen Edge-to-Edge Stage
        Guarantees zero letterboxing across any viewport ratio (16:9, 16:10, ultrawide, mobile)
      */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Full-bleed background image seamlessly filling entire screen */}
        <img
          src="/images/joyful_smile_bg.png"
          alt="Joyful smiling girl against orange studio background"
          className="absolute inset-0 w-full h-full object-cover object-[86%_center] sm:object-[74%_center] md:object-[70%_center] lg:object-[68%_center] xl:object-[65%_center] pointer-events-none select-none transition-all duration-500"
        />

        {/* 
          16:9 Proportional Content Container
          Centers and anchors the exact PDF typography and button layout
        */}
        <div className="relative z-10 w-full h-full max-w-[1920px] max-h-[1080px] mx-auto pointer-events-none">
          {/* 
            Hero Typography
            From PDF:
            Line 1: “ your smile  (x ≈ 1.5%, y ≈ 22%)
            Line 2: does really    (x ≈ 2.2%, y ≈ 38%)
            Line 3: matter !”      (x ≈ 6.0%, y ≈ 54%)
          */}
          <div
            className="absolute left-[3%] sm:left-[3.5%] top-[18%] sm:top-[20%] md:top-[22%] text-white font-intro-script leading-[1.12] pointer-events-auto filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.22)] select-none"
            style={{ fontSize: 'clamp(2.5rem, 8.8vw, 7.8rem)' }}
          >
            {/* Line 1: “ your smile */}
            <h1 className="whitespace-nowrap tracking-normal font-normal pl-0">
              “ your smile
            </h1>

            {/* Line 2: does really */}
            <div className="whitespace-nowrap tracking-normal font-normal pl-[0.06em]">
              does really
            </div>

            {/* Line 3: matter !” */}
            <div className="whitespace-nowrap tracking-normal font-normal pl-[0.34em]">
              matter !”
            </div>
          </div>

          {/* 
            Call To Action Button: "Get Appointment →"
            Left: 3.5%
            Bottom: 8.5%
            Background: #CEEDED
            Text: #2E4A82 (Montserrat Bold)
            Arrow circle: White with soft cyan cutout arrow #9ad4dc
          */}
          <div className="absolute left-[3%] sm:left-[3.5%] bottom-[7%] sm:bottom-[8%] md:bottom-[9%] pointer-events-auto">
            <button
              onClick={handleOpenAppointment}
              className="group relative flex items-center justify-between bg-[#CEEDED] hover:bg-[#bce4e4] active:scale-[0.985] transition-all duration-300 rounded-full px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 md:py-4.5 shadow-[0_8px_24px_rgba(32,86,107,0.18)] hover:shadow-[0_12px_32px_rgba(32,86,107,0.28)] cursor-pointer min-w-[210px] sm:min-w-[250px] md:min-w-[290px]"
              aria-label="Get Appointment"
            >
              {/* Button Text */}
              <span className="text-[#2E4A82] font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight mr-3 sm:mr-4 select-none">
                Get Appointment
              </span>

              {/* White Circular Badge with Soft Cyan Arrow */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#9ad4dc] transition-colors group-hover:text-[#2E4A82]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
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
