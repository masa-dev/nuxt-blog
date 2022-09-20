<template>
  <div class="n-container-xl mx-auto mb-5">
    <h1 class="mt-4 mb-3 mb-sm-5">{{ post.title }}</h1>
    <div class="mb-4 post-thumb-wrapper">
      <img
        :src="post.image.src"
        :alt="post.image.alt"
        class="d-block mx-auto"
      />
    </div>
    <div class="post-tag-list">
      <TagIconSmall
        v-for="tag in tags"
        :key="tag._id"
        :tag="tag"
        class="mr-2 mb-2"
      />
    </div>
    <div class="post-content" v-html="post.body"></div>
  </div>
</template>

<style lang="scss" scoped>
.post-tag-list {
  display: flex;
  flex-wrap: wrap;
}

.post-thumb-wrapper {
  max-height: 480px;

  img {
    max-width: 100%;
  }
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
        { property: 'og:title', content: this.post.title },
        { property: 'og:image', content: this.post.image.src },
      ],
    }
  }

  async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config: Config = $config

    try {
      const PostRes = await axios.get<Post>(`${config.apiUrl}/post/${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      const post = PostRes.data
      const tags: Tag[] = []

      for (let postTag of post.tags) {
        const TagRes = await axios.get<Tag>(
          `${config.apiUrl}/tag/${postTag._id}`,
          {
            headers: {
              Authorization: `Bearer ${config.apiKey}`,
            },
          }
        )

        tags.push(TagRes.data)
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
