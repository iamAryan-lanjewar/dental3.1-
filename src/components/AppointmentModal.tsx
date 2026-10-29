import React, { useState } from 'react';
import {
  SERVICES,
  AppointmentData,
  validateAppointment,
  generateConfirmationCode,
  getAvailableSlots
} from '../utils/appointment';
import { sounds } from '../utils/sound';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [serviceId, setServiceId] = useState<string>(SERVICES[0].id);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:15 AM');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const availableSlots = getAvailableSlots(date);

  const handleNextStep = () => {
    sounds.playClick();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const data: Partial<AppointmentData> = {
        serviceId,
        date,
        timeSlot,
        fullName,
        email,
        phone,
        notes
      };
      const result = validateAppointment(data);
      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }
      setErrors({});
      const code = generateConfirmationCode();
      setConfirmationCode(code);
      setStep(4);
      sounds.playSuccess();
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
    setConfirmationCode('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#20566B] to-[#163a48] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#CEEDED] font-semibold">
              Mainframe Dental Clinic
            </span>
            <h2 id="modal-title" className="text-xl font-bold tracking-tight">
              {step === 4 ? 'Appointment Confirmed!' : 'Schedule Your Smile Visit'}
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Indicator */}
        {step < 4 && (
          <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 py-3">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Patient Info' }
            ].map((s) => (
              <div
                key={s.num}
                className={`flex-1 flex items-center space-x-2 text-xs font-medium ${
                  step === s.num
                    ? 'text-[#20566B] font-bold'
                    : step > s.num
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === s.num
                      ? 'bg-[#20566B] text-white'
                      : step > s.num
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 mb-2">
                Choose the care plan tailored to make your smile sparkle:
              </p>
              {SERVICES.map((srv) => {
                const isSelected = serviceId === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      sounds.playClick();
                      setServiceId(srv.id);
                    }}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-[#20566B] bg-[#CEEDED]/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {srv.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{srv.description}</p>
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <span className="text-sm font-extrabold text-[#20566B]">{srv.price}</span>
                      <div className="mt-1 flex justify-end">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-[#20566B] bg-[#20566B]' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 2: Pick Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="appointment-date" className="block text-sm font-bold text-slate-800 mb-1">
                  Select Date
                </label>
                <input
                  id="appointment-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    sounds.playClick();
                    setDate(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#20566B] text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setTimeSlot(slot);
                        }}
                        className={`py-2 px-3 text-sm rounded-xl font-semibold transition-all border ${
                          isSelected
                            ? 'bg-[#20566B] text-white border-[#20566B] shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-800 flex items-center space-x-2">
                <span>✨</span>
                <span>All appointments include complimentary dental imaging and consultation.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  id="patient-name"
                  type="text"
                  placeholder="e.g. Maria Gonzalez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#20566B] ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    placeholder="maria@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#20566B] ${
                      errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="patient-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#20566B] ${
                      errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="patient-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Special Notes or Concerns (Optional)
                </label>
                <textarea
                  id="patient-notes"
                  rows={2}
                  placeholder="Any sensitivity, first time with us, or specific smile goals?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#20566B]"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex justify-between items-center">
                <span>Summary: {selectedService.title}</span>
                <span className="font-bold text-[#20566B]">{date} at {timeSlot}</span>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Your Smile is Booked!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We look forward to welcoming you to Mainframe Clinic.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Booking ID</span>
                  <span className="text-sm font-mono font-bold text-[#20566B] bg-[#CEEDED]/50 px-2 py-0.5 rounded">
                    {confirmationCode}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Patient</span>
                  <span className="font-semibold text-slate-800">{fullName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Service</span>
                  <span className="font-semibold text-slate-800">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Date & Time</span>
                  <span className="font-semibold text-slate-800">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800">Mainframe Smile Studio, Suite 400</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-100">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setStep((s) => (s - 1) as 1 | 2 | 3);
              }}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-full bg-[#20566B] hover:bg-[#184556] text-[#CEEDED] text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span>{step === 3 ? 'Confirm Appointment' : 'Continue'}</span>
              <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 rounded-full bg-[#20566B] hover:bg-[#184556] text-[#CEEDED] text-sm font-bold shadow-md transition-all"
            >
              Done & Return Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
