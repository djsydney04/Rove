export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  bio?: string;
  interests: string[];
  verificationBadge: boolean;
  expertiseBadges: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  hostName?: string;
  hostId?: string;
  date?: string;
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  } | string;
  category?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  cost?: number;
  photos: string[];
  tags?: string[];
  verifiedStatus: boolean;
  participants?: string[];
  waitlist?: string[];
}
