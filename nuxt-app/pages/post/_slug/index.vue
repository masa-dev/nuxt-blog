<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div class="post-tag-list">
      <TagIconSmall
        v-for="tag in post.tags"
        :key="tag.id"
        :tag="tag"
        class="mr-2 mb-2"
      />
    </div>
    <div v-html="post.body"></div>
  </div>
</template>

<style lang="scss" scoped>
.post-tag-list {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Config } from '../../../types/config'
import axios, { AxiosError } from 'axios'
import { Post } from '../../../types/api'

@Component({
  name: 'PostContent',
})
export default class PostContent extends Vue {
  async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config = $config as Config

    try {
      const PostRes = await axios.get(`${config.apiUrl}/post/${slug}`, {
        headers: { 'X-MICROCMS-API-KEY': config.apiKey },
      })

      return {
        post: PostRes.data as Post,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/post')
    }
  }
}
</script>
