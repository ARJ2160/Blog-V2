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
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export interface EditorProps {
  postImage: string;
  setPostImages: (postImage: string) => void;
  postTitle: string;
  setPostTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  loading: boolean;
  handlePostSubmit: (e: any) => Promise<void>;
}
