<template>
  <div>
    <div>about</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  name: 'About',
})
export default class About extends Vue {
  public head() {
    return { title: 'About' }
  }

  mounted() {}
}
</script>
