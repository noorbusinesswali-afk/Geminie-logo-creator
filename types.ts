export enum LogoStyle {
  MODERN = 'Modern and Minimalist',
  VINTAGE = 'Vintage and Retro',
  ABSTRACT = 'Abstract and Geometric',
  MASCOT = 'Mascot and Character-based',
  HAND_DRAWN = 'Hand-drawn and Organic',
  LUXURY = 'Luxury and Elegant',
  TECH = 'Futuristic and Tech-focused',
  CORPORATE = 'Professional and Corporate',
  PLAYFUL = 'Playful and Cartoonish'
}

export interface LogoFormData {
  name: string;
  style: LogoStyle;
  colors: string;
  description: string;
}

export interface GeneratedLogo {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
  data: LogoFormData;
}
