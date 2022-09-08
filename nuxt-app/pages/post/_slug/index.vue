<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div>
      <img :src="post.image.src" :alt="post.image.alt" class="w-100" />
    </div>
    <div class="post-tag-list">
      <TagIconSmall
        v-for="tag in tags"
        :key="tag._id"
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
import { Post, Tag } from '../../../types/newtApi'
import { codeHighlight } from '../../../util/codeHighlight'

@Component({
  name: 'PostContent',
})
export default class PostContent extends Vue {
  private post!: Post

  public head() {
    return {
      title: `${this.post.title} - Post`,
      meta: [
        { name: 'og:title', content: this.post.title },
        { name: 'og:image', content: this.post.image.src },
      ],
    }
  }

  async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config = $config as Config

    try {
      const PostRes = await axios.get(`${config.apiUrl}/post/${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      const post = PostRes.data as Post
      const tags: Tag[] = []

      for (let postTag of post.tags) {
        const TagRes = await axios.get(`${config.apiUrl}/tag/${postTag._id}`, {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        })

        tags.push(TagRes.data as Tag)
      }

      return {
        post: post,
        tags: tags,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      console.log(axiosError)
      redirect(axiosError.response!.status, '/post')
    }
  }

  mounted() {
    codeHighlight()
  }
}
</script>
