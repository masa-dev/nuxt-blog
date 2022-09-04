<template>
  <div>
    <img :src="tag.image.src" />
    <h1>{{ tag.name }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Config } from '../../../types/config'
import axios, { AxiosError } from 'axios'
import { Tag, TagResponse } from '../../../types/newtApi'

@Component({
  name: 'TagContent',
})
export default class TagContent extends Vue {
  private tag!: Tag

  public head() {
    return { title: `${this.tag.name} - Tag` }
  }

  async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config = $config as Config

    try {
      const tagRes = await axios.get(`${config.apiUrl}/tag/?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      return {
        tag: (tagRes.data as TagResponse).items[0],
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/tag')
    }
  }
}
</script>
