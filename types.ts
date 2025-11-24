export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

export interface Bet {
  id: string;
  sport: string;
  event: string;
  selection: string;
  odds: number;
  stake: number;
  status: 'pending' | 'won' | 'lost';
  date: string;
}

export interface WhopUser {
  id: string;
  username: string;
  email?: string;
  profilePicUrl?: string;
  experience?: 'pro' | 'casual';
}

export interface WhopState {
  isValid: boolean;
  isLoading: boolean;
  user: WhopUser | null;
}