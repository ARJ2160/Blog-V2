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
  postImageFile: File | undefined;
  setPostImage: (postImage: string) => void;
  setPostImageFile: (postImageFile: File | undefined) => void;
  postTitle: string;
  setPostTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  loading: boolean;
  handlePostSubmit: (e: any) => Promise<void>;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  isUserSignedIn?: boolean;
}

export interface UserState extends User {
  initialUser: User | null;
  getUserSignedInStatus: () => boolean;
  signInUser: (payload: User) => void;
  signOutUser: () => void;
}
