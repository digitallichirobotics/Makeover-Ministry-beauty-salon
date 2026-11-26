'use client';

import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { salonName } from './salon';

import { whatsappChatUrl } from './whatsapp';
const salonClock = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});
const fieldClass = 'mt-2 block w-full rounded-xl border hairline bg-[#21121f] p-4 focus-visible:outline-2 focus-visible:outline-[#f0aacc]';

type Props = {
  services: string[];
  service: string;
  onServiceChange: (service: string) => void;
};

export default function BookingForm({ services, service, onServiceChange }: Props) {
  const [error, setError] = useState('');

  function requestAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!whatsappChatUrl) return;

    const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name') ?? '').trim();
    const phone = String(fields.get('phone') ?? '').trim();
    const date = String(fields.get('date') ?? '');
    const time = String(fields.get('time') ?? '');
    const notes = String(fields.get('notes') ?? '').trim();
    const digits = phone.replace(/\D/g, '');

    if (!name || digits.length < 7 || digits.length > 15) {
      setError('Enter your name and a valid phone number.');
      return;
    }
    if (`${date} ${time}` <= salonClock.format(new Date())) {
      setError('Choose an appointment date and time in the future (IST).');
      return;
    }

    setError('');
    const message = [
      `Hello, I’d like to request an appointment at ${salonName}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Preferred appointment: ${date} at ${time} IST`,
      ...(notes ? [`Special requests: ${notes}`] : []),
    ].join('\n');
    window.location.assign(`${whatsappChatUrl}?text=${encodeURIComponent(message)}`);
  }

  return (
    <form onSubmit={requestAppointment} className="space-y-5 rounded-[2rem] border hairline bg-[#382137] p-6 md:p-10">
      <h2 id="booking-dialog-title" className="mb-6 pr-12 text-3xl">Book an Appointment</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Full name
          <input className={fieldClass} name="name" autoComplete="name" maxLength={100} required />
        </label>
        <label className="text-sm">
          Phone number
          <input className={fieldClass} name="phone" type="tel" autoComplete="tel" maxLength={30} required />
        </label>
      </div>
      <label className="block text-sm">
        Service
        <select className={fieldClass} value={service} onChange={event => onServiceChange(event.target.value)} required>
          <option value="">Choose a service</option>
          {services.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Preferred date
          <input className={fieldClass} name="date" type="date" required />
        </label>
        <label className="text-sm">
          Preferred time (IST)
          <input className={fieldClass} name="time" type="time" required />
        </label>
      </div>
      <label className="block text-sm">
        Special requests (optional)
        <textarea className={fieldClass} name="notes" rows={3} maxLength={500} />
      </label>
      {error && <p role="alert" className="text-sm text-[#ffc1da]">{error}</p>}
      <button type="submit" disabled={!whatsappChatUrl} className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50">
        Continue to WhatsApp <MessageCircle size={18} aria-hidden="true" />
      </button>
      <p className="text-center text-sm text-[#eac9df]">
        {whatsappChatUrl
          ? 'Tap Send in WhatsApp to submit your request. The salon will confirm your appointment there.'
          : 'WhatsApp booking is currently unavailable.'}
      </p>
    </form>
  );
}
