<template>
  <div>
    <h1>404 - Not Found</h1>
    <p>お探しのページは見つかりませんでした。</p>
    <p><nuxt-link to="/">トップページに戻る</nuxt-link></p>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component({
  name: "NotFound"
})
export default class NotFound extends Vue {
  public head() {
    return { title: "404 - NotFound" }
  }
}
</script>

