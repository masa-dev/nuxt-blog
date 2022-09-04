<template>
  <div>
    <div>
      <div v-for="post in posts" :key="post._id">
        <p>{{ post.title }}</p>
      </div>
    </div>
    <div>
      <div v-for="note in notes" :key="note._id">
        <p>{{ note.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { paramToString } from '../util/searchParam'
import { NoteResponse, PostResponse } from '../types/newtApi'
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
    const query = paramToString({ limit: 5, offset: 0 })
    const config = $config as Config

    const PostRes = await axios.get(`${config.apiUrl}/post?${query}`, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    const NoteRes = await axios.get(`${config.apiUrl}/note?${query}`, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    const postList = PostRes.data as PostResponse
    const noteList = NoteRes.data as NoteResponse

    return {
      posts: postList.items,
      notes: noteList.items,
    }
  }
}
</script>
