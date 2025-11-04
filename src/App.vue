<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import MainLayout from '@/components/Layout/MainLayout.vue'
</script>

<template>
  <div id="app">
    <ConfigProvider :locale="zhCN">
      <MainLayout />
    </ConfigProvider>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
