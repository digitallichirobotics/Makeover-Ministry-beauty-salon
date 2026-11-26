const whatsappNumber = (process.env.NEXT_PUBLIC_SALON_WHATSAPP ?? '').trim();
const whatsappReady = /^[1-9][0-9]{7,14}$/.test(whatsappNumber);
export const whatsappChatUrl = whatsappReady ? `https://wa.me/${whatsappNumber}` : null;
