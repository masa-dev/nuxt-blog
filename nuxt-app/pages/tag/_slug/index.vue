<template>
  <div>
    <img :src="tag.image.src" />
    <h1>{{ tag.name }}</h1>
    <PostListComponent :postList="posts" />
    <NoteListComponent :noteList="notes" />
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
    return { title: `${this.tag.name} - Tag` }
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
