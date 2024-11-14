import { create } from 'zustand';

interface DutyStoreState {
  /** 직무 id가 담긴 배열 */
  dutyIds: number[];
  setDutyIds: (ids: number[]) => void;
}

export const useDutyStore = create<DutyStoreState>((set) => ({
  dutyIds: [],
  setDutyIds: (newIds: number[]) => set({ dutyIds: newIds }),
}));
