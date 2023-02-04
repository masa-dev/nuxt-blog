<template>
  <div class="n-container-xl mx-auto mb-5">
    <div>
      <h2 class="mb-5 mt-4 font-weight-bold">投稿一覧</h2>
      <PostListComponent :post-list="posts" />
      <div>
        <nuxt-link to="/post">投稿一覧を見る</nuxt-link>
      </div>
    </div>
    <div>
      <h2 class="mb-5 mt-4 font-weight-bold">ノート一覧</h2>
      <NoteListComponent :note-list="notes" />
      <div>
        <nuxt-link to="/note">ノート一覧を見る</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import { paramToString } from '../util/searchParam'
import { ApiResponse, Note, Post } from '../types/newtApi'
import { Config } from '../types/config'
import blogConfig from '../blog.config'

@Component({
  name: 'IndexPage',
})
export default class IndexPage extends Vue {
  public head() {
    return {
      title: 'ホーム',
      link: [
        {
          rel: 'canonical',
          href: 'https://masa-dev.net',
        },
      ],
    }
  }

  async asyncData({ $config }: any) {
    const postQuery = paramToString({
      limit: blogConfig.top.postLimit,
      offset: 0,
      depth: 2,
    })
    const noteQuery = paramToString({
      limit: blogConfig.top.noteLimit,
      offset: 0,
      depth: 2,
    })
    const config: Config = $config

    const PostRes = await axios.get<ApiResponse<Post>>(
      `${config.apiUrl}/post?${postQuery}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const NoteRes = await axios.get<ApiResponse<Note>>(
      `${config.apiUrl}/note?${noteQuery}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const postList = PostRes.data
    const noteList = NoteRes.data

    return {
      posts: postList.items,
      notes: noteList.items,
    }
  }
}
</script>
