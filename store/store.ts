import { createWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';
import { User, UserState } from '../lib/types';

const UserStore = createWithEqualityFn<UserState>()(
  devtools((set, get: any) => ({
    initialUser: null,
    getUserSignedInStatus: () => {
      return get().isUserSignedIn;
    },
    signInUser: (payload: User) => {
      set({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        isUserSignedIn: true
      });
    },
    signOutUser: () => {
      set({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        isUserSignedIn: false
      });
    }
  }))
);

export default UserStore;
