import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAppointment,
  generateConfirmationCode,
  calculateAspectFit,
  getAvailableSlots
} from './appointment.ts';

test('validateAppointment rejects empty fields', () => {
  const res = validateAppointment({});
  assert.equal(res.isValid, false);
  assert.ok(res.errors.serviceId);
  assert.ok(res.errors.fullName);
  assert.ok(res.errors.email);
  assert.ok(res.errors.phone);
});

test('validateAppointment validates email and phone formatting', () => {
  const invalidEmail = validateAppointment({
    serviceId: 'smile-consult',
    date: '2026-11-01',
    timeSlot: '10:15 AM',
    fullName: 'Jane Doe',
    email: 'not-an-email',
    phone: '123'
  });
  assert.equal(invalidEmail.isValid, false);
  assert.ok(invalidEmail.errors.email);
  assert.ok(invalidEmail.errors.phone);

  const valid = validateAppointment({
    serviceId: 'smile-consult',
    date: '2026-11-01',
    timeSlot: '10:15 AM',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678'
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateConfirmationCode creates valid format', () => {
  const code = generateConfirmationCode();
  assert.match(code, /^MF-[2-9A-Z]{6}$/);
});

test('calculateAspectFit correctly calculates 16:9 bounds', () => {
  // Test widescreen container (e.g. 21:9)
  const wide = calculateAspectFit(2100, 900, 16 / 9);
  assert.equal(wide.height, 900);
  assert.equal(wide.width, 1600);
  assert.equal(wide.left, 250);
  assert.equal(wide.top, 0);

  // Test tall container (e.g. mobile 9:16)
  const tall = calculateAspectFit(900, 1600, 16 / 9);
  assert.equal(tall.width, 900);
  assert.equal(tall.height, 900 / (16 / 9));
});

test('getAvailableSlots returns slots list', () => {
  const slots = getAvailableSlots('2026-11-05');
  assert.ok(slots.length > 0);
  assert.ok(slots.includes('10:15 AM'));
});
