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
    return {
      title: 'About',
      link: [
        {
          rel: 'canonical',
          href: 'https://masa-dev.net/about',
        },
      ],
    }
  }

  mounted() {}
}
</script>
