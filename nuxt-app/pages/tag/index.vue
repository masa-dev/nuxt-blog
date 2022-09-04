<template>
  <div>
    <div v-for="tag in tags" :key="tag._id">
      <img :src="tag.image.src" />
      <nuxt-link :to="`/tag/${tag.slug}`">{{ tag.name }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { paramToString } from '../../util/searchParam'
import { TagResponse } from '../../types/newtApi'
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
    const query = paramToString({ limit: 1000, skip: 0 })
    const config = $config as Config

    const tagRes = await axios.get(`${config.apiUrl}/tag?${query}`, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    const tagList = (tagRes.data as TagResponse).items

    return {
      tags: tagList,
    }
  }
}
</script>
