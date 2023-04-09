<template>
  <div class="d-flex justify-content-between">
    <div class="n-container-xl mb-5 px-lg-4">
      <h1 class="mt-4 mb-3 mb-sm-5 font-weight-bold h2-lg">{{ post.title }}</h1>
      <div class="mb-4 post-thumb-wrapper">
        <img
          v-if="post.image"
          :src="post.image.src"
          :alt="post.image.alt"
          :width="post.image.width"
          :height="post.image.height"
          class="d-block mx-auto"
        />
        <img v-else src="/img/dummy.png" alt="dummy image" />
      </div>
      <CreateAndUpdateTime
        :created-at="post._sys.createdAt"
        :updated-at="post._sys.updatedAt"
      />
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
    <ContentSideBar
      :title="post.title"
      :created-at="post._sys.createdAt"
      :updated-at="post._sys.updatedAt"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios, { AxiosError } from 'axios'
import { Config } from '../../../types/config'
import { Post, Tag } from '../../../types/newtApi'
import { codeHighlight } from '../../../util/codeHighlight'
import { replaceHTMLCode } from '../../../util/replaceHTMLCode'

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
        {
          property: 'og:image',
          content: this.post.image ? this.post.image.src : '/img/dummy image',
        },
        {
          property: 'description',
          content: this.post.description ? this.post.description : '',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://masa-dev.net/post/${this.post._id}`,
        },
      ],
    }
  }

  public async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config: Config = $config

    try {
      const PostRes = await axios.get<Post>(`${config.apiUrl}/post/${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      const post = PostRes.data
      post.body = await replaceHTMLCode(post.body)
      // console.log(post.body.match(/<a href="https?:\/\/.+?">https?:\/\/.+?<\/a>/))
      const tags: Tag[] = []

      for (const postTag of post.tags) {
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
        post,
        tags,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/post')
    }
  }

  private mounted() {
    codeHighlight()
  }
}
</script>

<style lang="scss" scoped>
.post-tag-list {
  display: flex;
  flex-wrap: wrap;
}

.post-thumb-wrapper {
  max-height: 480px;
  text-align: center;

  img {
    max-height: inherit;
    max-width: 100%;
  }
}
</style>
