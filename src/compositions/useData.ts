import {
  rankData as _rankData,
  dayIncome as _datIncome,
  dayIncome1 as _dayIncome1,
  dayElectricity as _dayElectricity,
  inputOutPower as _inputOutPower,
  mapData as _mapData,
} from '@/api/mocks/mockData';
import {splitArray} from '@/utils/tool';

export default function ({once = true}) {
  const ready = ref(false);
  const newRank = splitArray(_rankData, 12);
  const rankData = ref<any[]>(newRank);
  const dayIncome = ref<any[]>(_datIncome);
  const dayElectricity = ref<any[]>(_dayElectricity);
  const inputOutPower = ref<any[]>(_inputOutPower);
  const mapData = ref<any[]>(_mapData);
  const dayIncome1 = ref<any[]>(_dayIncome1);

  onMounted(() => {});

  return {
    ready,
    rankData,
    dayIncome,
    dayElectricity,
    inputOutPower,
    mapData,
    dayIncome1,
  };
}
