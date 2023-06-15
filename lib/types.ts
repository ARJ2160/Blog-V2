import { Session } from 'next-auth';

export interface SessionTypes {
  data: Session | null;
  status?: 'authenticated' | 'loading' | 'unauthenticated';
}

export interface NavbarProps {
  toggle: () => void;
  isOpen: boolean;
}

export interface TipTapProps {
  description: string;
  setDescription: (description: string) => void;
  setImages?: (images: string) => void;
}
