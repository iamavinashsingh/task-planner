import { create } from 'zustand';

const today = new Date();

export const usePlannerStore = create((set) => ({
  userId: '65b8d8f8924db8ab7d728111',
  view: 'WEEKLY',
  activeDate: today.toISOString().slice(0, 10),
  selectedTask: null,
  setView: (view) => set({ view }),
  setActiveDate: (activeDate) => set({ activeDate }),
  setSelectedTask: (selectedTask) => set({ selectedTask })
}));
