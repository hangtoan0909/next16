import { create } from 'zustand';

interface SidebarState {
  isCollapse: boolean;
  setCollapse: (collapse: boolean) => void;
  toggleCollapse: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isCollapse: false,
  setCollapse: (collapse: boolean) => set(() => ({ isCollapse: collapse })),
  toggleCollapse: () => set((state) => ({ isCollapse: !state.isCollapse })),
}));

export default useSidebarStore;
