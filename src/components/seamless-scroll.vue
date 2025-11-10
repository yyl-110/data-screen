<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  speed: {
    type: Number,
    default: 1000
  },
  direction: {
    type: String,
    default: 'up'
  }
})

const box = ref(null)
const refRoll1 = ref(null)
const refRoll2 = ref(null)
let top = 0
let height = 0
let shadowHeight = 0
const sp = props.speed / 1000
let end = false
let isMouseHover = false

/**
 * 刷新滚动内容的位置和高度
 * 通过比较两个滚动元素的高度来同步内容
 */
function refresh () {
  height = refRoll1.value.clientHeight
  shadowHeight = refRoll2.value.clientHeight

  if (shadowHeight !== height) {
    refRoll2.value.innerHTML = refRoll1.value.innerHTML
  }
  if (top < 0) {
    if (Math.abs(top) >= height) {
      const tmp = refRoll1.value
      refRoll1.value = refRoll2.value
      refRoll2.value = tmp
      top = 0
    }
    refRoll1.value.style.transform = `translate3d(0,${top}px,0)`
    refRoll2.value.style.transform = `translate3d(0,${height + top}px,0)`
  } else {
    if (Math.abs(top) >= height) {
      const tmp = refRoll1.value
      refRoll1.value = refRoll2.value
      refRoll2.value = tmp
      top = -height
    }
    refRoll1.value.style.transform = `translate3d(0,${top}px,0)`
    refRoll2.value.style.transform = `translate3d(0,${top - height}px,0)`
  }
}

/**
 * 执行动画帧函数，实现无缝滚动效果
 * 使用requestAnimationFrame来优化动画性能
 */
function doAnimationFrame () {
  requestAnimationFrame(() => {
    if (end) {
      return
    }

    // 鼠标悬停时暂停滚动
    if (isMouseHover) {
      refresh()
      doAnimationFrame()
      return
    }

    // 根据容器高度和方向控制滚动
    if (height > box.value.clientHeight) {
      if (props.direction === 'down') {
        top += sp
      }
      if (props.direction === 'up') {
        top -= sp
      }
    } else {
      top = 0
    }
    refresh()
    doAnimationFrame()
  })
}

/**
 * 鼠标进入容器时的处理函数
 * 设置标志位以暂停滚动
 */
function onMouseEnter () {
  isMouseHover = true
}

/**
 * 鼠标离开容器时的处理函数
 * 恢复滚动状态
 */
function onMouseLeaver () {
  isMouseHover = false
}

// 组件挂载后开始执行动画
onMounted(doAnimationFrame)

// 组件销毁前设置结束标志，停止动画
onBeforeUnmount(() => {
  end = true
})

/**
 * 重置滚动位置到初始状态
 */
function reset () {
  top = 0;
  refresh();
}

// 暴露reset方法供外部调用
defineExpose({
  reset
})

</script>
<template>
  <div ref="box" class="hb-admin-roll-list-com" @mouseenter="onMouseEnter" @mouseleave="onMouseLeaver">
    <!-- 滚动内容容器1 -->
    <div ref="refRoll1" class="roll-item">
      <div class="list-item">
        <slot />
      </div>
    </div>
    <!-- 滚动内容容器2（用于实现无缝滚动效果） -->
    <div ref="refRoll2" class="roll-item" />
  </div>
</template>
<style scoped>
.hb-admin-roll-list-com {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.hb-admin-roll-list-com::-webkit-scrollbar {
  display: none;
}

.roll-item {
  width: 100%;
  position: absolute;
}

.list-item {}
</style>
