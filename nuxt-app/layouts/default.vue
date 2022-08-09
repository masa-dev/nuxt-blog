<template>
  <div>
    <Header></Header>
    <main>
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
