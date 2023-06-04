import { Session } from 'next-auth';

export interface SessionTypes {
  data: Session | null;
  status?: 'authenticated' | 'loading' | 'unauthenticated';
}
