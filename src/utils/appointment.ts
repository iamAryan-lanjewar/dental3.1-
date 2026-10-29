export interface AppointmentData {
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const SERVICES = [
  {
    id: 'smile-consult',
    title: 'Smile Consultation & Dental Checkup',
    duration: '45 mins',
    price: '$85',
    description: 'Comprehensive dental examination, digital x-ray review, and custom care plan.'
  },
  {
    id: 'teeth-whitening',
    title: 'Laser Teeth Whitening & Polish',
    duration: '60 mins',
    price: '$195',
    description: 'Gentle, high-efficiency stain removal and enamel-safe illumination for a radiant smile.'
  },
  {
    id: 'pediatric-smile',
    title: 'Pediatric Happy Smiles Care',
    duration: '40 mins',
    price: '$75',
    description: 'Child-friendly dental cleaning, cavity check, and positive smile hygiene coaching.'
  },
  {
    id: 'ortho-align',
    title: 'Orthodontics & Clear Aligners',
    duration: '30 mins',
    price: 'Free assessment',
    description: '3D intraoral digital smile scan and custom aligner suitability roadmap.'
  }
];

export function validateAppointment(data: Partial<AppointmentData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.serviceId) {
    errors.serviceId = 'Please select a dental service.';
  }

  if (!data.date) {
    errors.date = 'Please pick a preferred appointment date.';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select a convenient time slot.';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  const phoneClean = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || phoneClean.length < 7) {
    errors.phone = 'Please provide a valid phone number (at least 7 digits).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateConfirmationCode(prefix = 'MF'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${random}`;
}

export function calculateAspectFit(
  containerWidth: number,
  containerHeight: number,
  targetRatio = 16 / 9
): { width: number; height: number; left: number; top: number; scale: number } {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return { width: 1920, height: 1080, left: 0, top: 0, scale: 1 };
  }

  const containerRatio = containerWidth / containerHeight;
  let width: number;
  let height: number;

  if (containerRatio > targetRatio) {
    height = containerHeight;
    width = height * targetRatio;
  } else {
    width = containerWidth;
    height = width / targetRatio;
  }

  const left = (containerWidth - width) / 2;
  const top = (containerHeight - height) / 2;
  const scale = width / 1920;

  return { width, height, left, top, scale };
}

export function getAvailableSlots(dateString: string): string[] {
  if (!dateString) return [];
  // Return standard clinic time slots
  return [
    '09:00 AM',
    '10:15 AM',
    '11:30 AM',
    '01:15 PM',
    '02:30 PM',
    '03:45 PM',
    '04:30 PM'
  ];
}
