<template>
  <div>
    <h1>404 - Not Found</h1>
    <p>お探しのページは見つかりませんでした。</p>
    <p><nuxt-link to="/">トップページに戻る</nuxt-link></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import blogConfig from '../blog.config'

@Component({
  name: 'NotFound',
})
export default class NotFound extends Vue {
  private mounted() {
    const title = blogConfig.meta.titleTemplate.replace('%s', '404 - NotFound')
    document.title = title
  }
}
</script>
