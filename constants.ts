
import { Product, Leadership } from './types';

export const COMPANY_NAME = "Savita Global Group of Industries";
export const MOTHER_COMPANY = "Savita Global Interprises";
export const CONTACT_PHONE = "+91 9506943134";
export const OFFICE_ADDRESS = "302, Parth A, 3/11, Patel Colony, Jamnagar, Gujarat-361008";

export const CATEGORIES = [
  'Machinery',
  'Machinery Tools',
  'Brass Components',
  'SS Components',
  'Precision Components'
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- MACHINERY (M Series) ---
  {
    id: 'M1',
    name: 'Industrial CNC Lathe - XP Series',
    category: 'Machinery',
    description: 'High-precision heavy-duty CNC lathe with linear guideways and 8-station hydraulic turret. Features Fanuc/Siemens controller options.',
    application: 'Automotive shaft production, aerospace fasteners, and heavy engineering components.',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M2',
    name: 'Vertical Machining Center (VMC) - 850',
    category: 'Machinery',
    description: 'High-speed machining center with 8000 RPM spindle and 24-tool ATC. Rigid structure for vibration-free heavy cutting.',
    application: 'Die and mold manufacturing, precision aerospace structural parts, and medical device components.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M3',
    name: 'Hydraulic H-Frame Press - 500T',
    category: 'Machinery',
    description: 'Heavy-duty 500-ton hydraulic H-frame press with double-acting cylinder. Ideal for deep drawing and high-pressure stamping.',
    application: 'Automotive body panel forming, heavy appliance stamping, and industrial powder metallurgy.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M4',
    name: 'Servo Plastic Injection Molding Machine',
    category: 'Machinery',
    description: 'Energy-efficient servo-driven molding machine with high-precision clamping unit and 5-point toggle mechanism.',
    application: 'Manufacturing of consumer electronics housings, automotive interior trims, and medical disposables.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M5',
    name: 'CNC Wire Cut EDM Machine',
    category: 'Machinery',
    description: 'Advanced EDM with high-speed wire feed and automatic threading. Capable of machining complex shapes in hardened steels.',
    application: 'Extrusion die manufacturing, complex punch-die sets, and graphite electrode machining.',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f4593b6f?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M6',
    name: 'Radial Drilling Machine - 100mm',
    category: 'Machinery',
    description: 'Heavy-duty geared radial drill with motorized arm elevation and centralized controls for ease of operation.',
    application: 'Drilling, reaming, and tapping of large workpieces in shipbuilding and structural fabrication.',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M7',
    name: 'Surface Grinding Machine - Auto Feed',
    category: 'Machinery',
    description: 'Industrial-grade automatic surface grinder with heavy cast iron base and precision hydraulic feed for mirror finish.',
    application: 'Precision finishing of die sets, machine guideways, and high-tolerance industrial plates.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  {
    id: 'M8',
    name: 'Power Press - C Frame 100T',
    category: 'Machinery',
    description: 'Mechanical power press with pneumatic clutch and brake. High-frequency stamping capability for mass production.',
    application: 'Blanking, piercing, and bending of small to medium metal components for appliances.',
    image: 'https://images.unsplash.com/photo-1565153940428-f1f383e20689?auto=format&fit=crop&q=80&w=1200',
    manufacturedIn: 'India'
  },
  // Additional items to reach 60+
  ...Array.from({ length: 52 }).map((_, i) => ({
    id: `GEN-${i}`,
    name: `Industrial ${CATEGORIES[i % CATEGORIES.length]} Unit Gen-${i+10}`,
    category: CATEGORIES[i % CATEGORIES.length] as any,
    description: `High-performance industrial component engineered for export quality and long-term durability in high-demand ${CATEGORIES[i % CATEGORIES.length].toLowerCase()} applications.`,
    application: "Aerospace, Automotive, and General Engineering high-precision requirements.",
    image: `https://images.unsplash.com/photo-${1581091226825 + i}?auto=format&fit=crop&q=80&w=1200`,
    manufacturedIn: "India"
  }))
];

export const INITIAL_LEADERSHIP: Leadership = {
  ceo: {
    name: "Mrs. Savita Devi",
    designation: "Chief Executive Officer (CEO)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    message: "At Savita Global, we are committed to redefining industrial excellence. Our products are engineered to meet the most stringent international standards, ensuring that 'Made in India' is a global mark of trust, precision, and reliability."
  },
  opsHead: {
    name: "Mr. Shailesh Yadav",
    designation: "Operational Manager",
    // Representative image: Young professional, Indian male, charcoal suit, black shirt.
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    message: "Operational efficiency and uncompromising quality control are the pillars of our export success. My mission is to ensure that every machine and precision part leaving our facility exceeds client expectations in performance and delivery."
  }
};
