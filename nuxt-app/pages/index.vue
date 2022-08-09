<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import client from '../util/apiClient'
import { PostList } from '../types/api'

@Component({
  name: 'IndexPage',
})
export default class IndexPage extends Vue {
  public content = ''
  async mounted() {
    const res = await client.get('/blog', {})
    const content = res.data as PostList

    console.log(content)
    this.content = content.contents[0].body
  }
}
</script>
