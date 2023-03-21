<template>
  <div class="title">
    <img src="@/assets/right.png" alt="" />
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
  }>(),
  { text: '' },
);
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #0ddbff;
  line-height: 28px;
  text-shadow: 0 0 4px rgba(4, 44, 103, 0.35);

  img {
    height: 12px;
    margin-right: 10px;
  }
}
</style>