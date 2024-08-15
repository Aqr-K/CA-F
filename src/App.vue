<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
theme.global.name.value = 'dark'
</script>
<style lang="scss">
#app {
  max-width: 100% !important;
  padding: 0 !important;
}
</style>