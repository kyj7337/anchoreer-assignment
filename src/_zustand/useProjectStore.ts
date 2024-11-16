import { create } from 'zustand';

interface ProjectStoreState {
  /** 확인한 project 리스트 배열 */
  checkedProjectIds: number[];
  setCheckedProjectIds: (ids: number[]) => void;
  /** 직무 id가 담긴 배열 */
  dutyIds: number[];
  setDutyIds: (ids: number[]) => void;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  checkedProjectIds: [],
  setCheckedProjectIds: (ids: number[]) => set({ checkedProjectIds: ids }),
  dutyIds: [],
  setDutyIds: (newIds: number[]) => set({ dutyIds: newIds }),
}));
