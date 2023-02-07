<template>
  <div class="n-container-xl mx-auto mb-5">
    <div class="tag-title d-flex align-items-center my-3 my-sm-5">
      <img :src="tag.image.src" :width="100" :height="100" class="mr-4" />
      <h1 class="font-weight-bolder h2-lg">{{ tag.name }}</h1>
    </div>
    <PostListComponent :post-list="posts" />
    <NoteListComponent :note-list="notes" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios, { AxiosError } from 'axios'
import { Config } from '../../../types/config'
import { ApiResponse, Tag, Post, Note } from '../../../types/newtApi'
import { paramToString } from '../../../util/searchParam'

@Component({
  name: 'TagContent',
})
export default class TagContent extends Vue {
  private tag!: Tag

  public head() {
    return {
      title: `${this.tag.name} - Tag`,
      link: [
        {
          rel: 'canonical',
          href: `https://masa-dev.net/tag/${this.tag.slug}`,
        },
      ],
    }
  }

  public async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug
    const query = paramToString({ depth: 2 })

    const config: Config = $config

    try {
      const tagRes = await axios.get<ApiResponse<Tag>>(
        `${config.apiUrl}/tag/?slug=${slug}`,
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      )
      const tag = tagRes.data.items[0]

      const postRes = await axios.get<ApiResponse<Post>>(
        `${config.apiUrl}/post/?tags=${tag._id}&${query}`,
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      )
      const posts = postRes.data.items

      const noteRes = await axios.get<ApiResponse<Note>>(
        `${config.apiUrl}/note/?tags=${tag._id}&${query}`,
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      )
      const notes = noteRes.data.items

      return {
        tag,
        posts,
        notes,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/tag')
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-title {
  h1 {
    font-size: 2.25rem;
  }
}
</style>
