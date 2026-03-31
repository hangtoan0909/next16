import { ROLE } from '@/constants';
import { InspectionInfoType, JWTPayload, UserInfoType } from '@/types';
import { cookies } from '@/utils';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { SNS_PROVIDER, STORAGE_KEYS } from './../constants/app';

interface AuthState {
  user: UserInfoType | null;
  inspection: InspectionInfoType | null;
  role: ROLE | null;
  token: string | null;
  provider: SNS_PROVIDER | null;

  setUser: (user: UserInfoType | null) => void;
  setInspection: (user: InspectionInfoType) => void;
  setToken: (token: string | null) => void;
  removeCredentials: () => void;
  setProvider: (provider: SNS_PROVIDER | null) => void;
}

const decodeToken = (token: string | null) => {
  if (!token) return { token: null, role: null };
  try {
    const payload = jwtDecode<JWTPayload>(token);
    return { token, role: payload.role ?? null };
  } catch {
    return { token, role: null };
  }
};

export const useAuthStore = create<AuthState>((set) => {
  const tokenFromCookie = cookies.get(STORAGE_KEYS.ACCESS_TOKEN) ?? null;

  const { token, role } = decodeToken(tokenFromCookie);

  return {
    user: null,
    inspection: null,
    role,
    token,
    provider: null,

    setUser: (user) => set({ user }),

    setInspection: (inspection) => set({ inspection }),

    setToken: (newToken) => {
      const decoded = decodeToken(newToken);
      set({ token: decoded.token, role: decoded.role });
    },

    setProvider: (provider) => {
      set({ provider });
    },

    removeCredentials: () => {
      cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
      set({ user: null, role: null, token: null });
    },
  };
});
