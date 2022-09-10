<template>
  <div class="n-container-xl mx-auto">
    <div>
      <h2 class="mb-5 mt-4 font-weight-bold">投稿一覧</h2>
      <PostListComponent :postList="posts" />
    </div>
    <div>
      <h2 class="mb-5 mt-4 font-weight-bold">ノート一覧</h2>
      <NoteListComponent :noteList="notes" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { paramToString } from '../util/searchParam'
import { ApiResponse, Note, Post } from '../types/newtApi'
import { Config } from '../types/config'
import axios from 'axios'

@Component({
  name: 'IndexPage',
})
export default class IndexPage extends Vue {
  public head() {
    return { title: 'ホーム' }
  }

  async asyncData({ $config }: any) {
    const query = paramToString({ limit: 5, offset: 0, depth: 2 })
    const config: Config = $config

    const PostRes = await axios.get<ApiResponse<Post>>(
      `${config.apiUrl}/post?${query}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const NoteRes = await axios.get<ApiResponse<Note>>(
      `${config.apiUrl}/note?${query}`,
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
