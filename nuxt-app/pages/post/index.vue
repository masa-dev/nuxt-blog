<template>
  <div class="post-list-wrapper">
    <h2 class="mb-5 mt-4">Post一覧</h2>
    <PostListComponent :postList="posts" />
    <b-pagination-nav
      :value="page"
      :number-of-pages="pageMeta.rows"
      :link-gen="linkGen"
      align="center"
      pills
      use-router
    ></b-pagination-nav>
  </div>
</template>

<style lang="scss" scoped>
.post-list-wrapper {
  width: 900px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { paramToString } from '../../util/searchParam'
import { PostResponse } from '../../types/newtApi'
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

    const query = paramToString({
      limit: blogConfig.post.limit,
      skip: (page - 1) * 1,
    })
    const config = $config as Config

    const PostRes = await axios.get(`${config.apiUrl}/post?${query}`, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    const postList = PostRes.data as PostResponse

    const pageMeta = {
      rows: Math.ceil(postList.total / postList.limit),
      perPage: postList.limit,
      currentPage: page,
    }

    return {
      page: page,
      posts: postList.items,
      pageMeta: pageMeta,
    }
  }
}
</script>
