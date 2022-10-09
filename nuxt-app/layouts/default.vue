<template>
  <div>
    <Header></Header>
    <main class="n-container-xxl mx-auto wf-mplus1p px-3 px-sm-4">
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
