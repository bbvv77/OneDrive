import { create } from 'zustand'
import { HistoryStatus, HistoryAction } from '../type'

const useHistoryStore = create<HistoryStatus & HistoryAction>((set) => ({
  historyList: null,
  updateHistoryList: (historyList) => set(() => ({ historyList: historyList })),
  insertHistoryItem: (historyItem) => set((state) => (
    (state.historyList !== null)
      ? { historyList: [historyItem, ...state.historyList.filter((item) => item.filePath !== historyItem.filePath)].slice(0, 100) }
      : { historyList: [historyItem] }
  )),
  removeHistoryItem: (path) => set((state) => (
    (state.historyList !== null)
      ? { historyList: state.historyList.filter((item) => item.filePath !== path) }
      : {}
  )),
  clearHistoryList: () => set({ historyList: [] }),
}))

export default useHistoryStore