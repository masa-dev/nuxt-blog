<template>
  <div>
    <div v-for="tag in tags" :key="tag.id">
      <img :src="tag.image.url" />
      <nuxt-link :to="`/tag/${tag.id}`">{{ tag.name }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { paramToString } from '../../util/searchParam'
import { TagList } from '../../types/api'
import { Config } from '../../types/config'
import axios from 'axios'

@Component({
  name: 'TagHome',
})
export default class TagHome extends Vue {
  public head() {
    return { title: 'Tag 一覧' }
  }

  async asyncData({ $config }: any) {
    const query = paramToString({ limit: 20000, offset: 0 })
    const config = $config as Config

    const tagRes = await axios.get(`${config.apiUrl}/tag?${query}`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })

    const tagList = tagRes.data as TagList

    return {
      tags: tagList.contents,
    }
  }
}
</script>
