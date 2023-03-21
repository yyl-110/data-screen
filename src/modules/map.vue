<template>
  <div class="mapWrap">
    <div class="topWrap" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { Scene, PointLayer, Popup } from '@antv/l7';
import { GaodeMap, GaodeMapV2, GaodeMapV1 } from '@antv/l7-maps';
// 需要引入 t
const props = withDefaults(
  defineProps<{
    data: any;
    lang: any;
  }>(),
  { data: [], lang: 'cn' },
);
const _scene = ref<any>(null);

const initChart = () => {
  const scene = new Scene({
    id: 'map',
    map: new GaodeMapV1({
      style: 'dark',
      logoVisible: false,
      pitch: 40,
      center: [105, 31.847],
      zoom: 5,
      rotation: 0,
      lang: props.lang,
    }),
  });

  scene.on('loaded', () => {
    const pointLayer1 = new PointLayer({ depth: false })
      .source(props.data, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape(['cylinder'])
      .size('income', function (level) {
        return [5, 5, 50];
      })
      .active(true)
      .color('lat', [
        '#2894E0',
        '#CFF6FF',
        '#FFF5B8',
        '#FFAB5C',
        '#F27049',
        '#730D1C',
      ]);
    pointLayer1.on('mousemove', (e) => {
      const popup = new Popup({
        offsets: [0, 0],
        closeOnEsc: true,
        closeButton: true,
        closeButtonOffsets: [10, 10],
      }).setLnglat({ lat: e.feature.lat, lng: e.feature.lng })
        .setHTML(`<div class="wrap">
          <b class="b">${e.feature.device_name}</b></br>
          <span>装机容量：&nbsp;&nbsp;${e.feature.installed_power}kW</span></br>
          <span>装机功率：&nbsp;&nbsp;${e.feature.installed_capacity}元</span></br>
          <span>累计收益：&nbsp;&nbsp;${e.feature.income}kW</span></br>
          <span>当前功率：&nbsp;&nbsp;${e.feature.Pac}kW</span></br>
          <span>变压器利用率：&nbsp;&nbsp;${e.feature.load_rate}%</span></br>
          </div>`);
      scene.addPopup(popup);
    });

    const pointLayer = new PointLayer({})
      .source(props.data, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(40)
      .color('#ffa842')
      .style({
        offsets: [0, 0],
      });
    const pointLayer2 = new PointLayer({})
      .source(props.data, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        },
      })
      .shape('circle')
      .active(true)
      .animate(true)
      .size(50)
      .color('#f00');

    scene.addLayer(pointLayer);
    scene.addLayer(pointLayer2);
    scene.addLayer(pointLayer1);
    _scene.value = scene;
  });
};
onMounted(() => {
  initChart();
});
watch(
  () => props.lang,
  () => {
    _scene.value.removeAllLayer();
    _scene.value.destroy();
    initChart();
  },
);
</script>

<style scoped lang="less">
.mapWrap {
  padding: 10px;
  flex: 66% 1;
}

.topWrap {
  width: 100%;
  height: 100%;
  background-size: 98% 98%;
  background-repeat: no-repeat;
  background-position: 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;


  :deep(.l7-control-logo) {
    display: none;
  }

  :deep(.amap-copyright) {
    display: none !important;
  }

  :deep(.l7-popup) {
    padding: 30px;

    .l7-popup-tip {
      display: none;
    }

    .l7-popup-content {
      background: rgba(20, 37, 72, 0.7);
      color: #fff;

      .l7-popup-close-button {
        fill: #fff;
      }

      .wrap {
        width: 180px;
        line-height: 30px;
      }
    }
  }
}
</style>