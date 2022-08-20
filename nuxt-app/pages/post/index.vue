<template>
  <div>
    <h1>Post一覧</h1>
    <div v-for="post in posts" :key="post.id">
      <img :src="post.image.url" />
      <nuxt-link :to="`/post/${post.id}`">{{ post.title }}</nuxt-link>
    </div>
    <b-pagination-nav
      :number-of-pages="pageMeta.rows"
      :link-gen="linkGen"
      align="center"
      pills
      use-router
    ></b-pagination-nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { paramToString } from '../../util/searchParam'
import { PostList } from '../../types/api'
import { Config } from '../../types/config'
import axios from 'axios'
import blogConfig from '../../blog.config'

@Component({
  name: 'PostHome',
})
export default class PostHome extends Vue {
  public head() {
    return { title: 'Post 一覧' }
  }

  private linkGen(pageNum: number) {
    return `/post/page/${pageNum}`
  }

  async asyncData({ $config, params }: any) {
    const page: number = params.p || 1
    console.log(page)
    const query = paramToString({
      limit: blogConfig.post.limit,
      offset: (page - 1) * 1,
    })
    const config = $config as Config

    const PostRes = await axios.get(`${config.apiUrl}/post?${query}`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })

    const postList = PostRes.data as PostList

    const pageMeta = {
      rows: Math.ceil(postList.totalCount / postList.limit),
      perPage: postList.limit,
      currentPage: page,
    }

    return {
      posts: postList.contents,
      pageMeta: pageMeta,
    }
  }
}
</script>
