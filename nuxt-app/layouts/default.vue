<template>
  <div>
    <Header></Header>
    <main class="container-xxl mx-auto px-4 wf-mplus1p">
      <nuxt />
    </main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Layout',
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.wf-mplus1p {
  font-family: 'Noto Sans JP';
}
</style>
