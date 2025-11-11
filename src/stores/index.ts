import { update } from "lodash";
import { defineStore } from "pinia";

interface IProjectItem {
  projectId: number;
  projectName: string;
  phaseList: IPhaseItem[];
}

interface IItem {
  value: number | string;
  label: string;
}

interface IPhaseItem {
  phaseId: number | string;
  phaseName: string;
}

export const useIndexStore = defineStore("index", {
  state: () => ({
    count: 0,
    projectList: [] as IItem[], // 明确数组元素类型
    phaseList: [] as IItem[],
    selectProjectId: "" as string | number, // 选择的项目Id
    selectPhaseId: "" as string | number, // 选择的阶段Id
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    updatePhaseList(list: IPhaseItem[]) {
      if (list && list.length > 0) {
        const _list = list.map((item) => ({
          value: item.phaseId,
          label: item.phaseName,
        }));
        _list.unshift({
          value: "-1",
          label: "全部",
        });
        this.phaseList = _list;
      } else {
        this.phaseList = [
          {
            value: "-1",
            label: "全部",
          },
        ];
      }
    },
    updateProjectList(list: IProjectItem[]) {
      this.projectList = list.map((item) => ({
        value: item.projectId,
        label: item.projectName,
        phaseList: item.phaseList,
      }));
    },
    updateSelectProjectId(id: string | number) {
      this.selectProjectId = id;
    },
    updateSelectPhaseId(id: string | number) {
      this.selectPhaseId = id;
    },
  },
});
