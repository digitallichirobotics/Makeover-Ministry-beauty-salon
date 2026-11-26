'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { salonName } from './salon';
import { whatsappChatUrl } from './whatsapp';

export default function WhatsAppPopup({ onBooking }: { onBooking: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex max-w-[calc(100%-2rem)] flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <section
        id="whatsapp-panel"
        aria-labelledby="whatsapp-panel-title"
        hidden={!open}
        className="w-80 max-w-full rounded-2xl border hairline bg-[#271728] p-5 shadow-xl"
      >
        <h2 id="whatsapp-panel-title" className="mb-2 text-xl">WhatsApp</h2>
        <p className="text-sm leading-6 text-[#eac9df]">
          {whatsappChatUrl ? `Chat with ${salonName} or request an appointment.` : 'WhatsApp chat is currently unavailable.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {whatsappChatUrl && <a href={whatsappChatUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Start chat</a>}
          <button type="button" className="btn-outline" onClick={() => { setOpen(false); onBooking(); }}>Book now</button>
        </div>
      </section>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={open ? 'Close WhatsApp panel' : 'Open WhatsApp panel'}
        onClick={() => setOpen(value => !value)}
        className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-[#146b49] px-4 text-sm font-semibold text-white shadow-lg hover:bg-[#0e583c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {open ? <X size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
        WhatsApp
      </button>
    </div>
  );
}
