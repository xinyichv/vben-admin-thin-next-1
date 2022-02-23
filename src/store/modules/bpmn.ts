import { defineStore } from 'pinia';
import { store } from '/@/store';
import BpmnModeler from 'bpmn-js/lib/Modeler';

export const useBpmnStore = defineStore({
  id: 'app-bpmn',
  state: () => ({
    bpmnModeler: null,
  }),
  getters: {
    getBpmnModeler(): BpmnModeler {
      return this.bpmnModeler || null;
    },
  },
  actions: {
    setBpmnModeler(modeler: BpmnModeler) {
      this.bpmnModeler = modeler;
    },
  },
});

// Need to be used outside the setup
export function useBpmnStoreWithOut() {
  return useBpmnStore(store);
}
