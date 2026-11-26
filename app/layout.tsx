import type { Metadata } from 'next';
import './globals.css';
import { salonName } from './salon';
export const metadata: Metadata = {title:salonName + ' | Luxury Unisex Studio',description:'Premium hair, beauty and grooming experiences. Book your appointment today.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
