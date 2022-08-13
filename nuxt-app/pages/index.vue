<template>
  <div>
    <div>
      <div v-for="post in posts" :key="post.id">
        <p>{{ post.title }}</p>
      </div>
    </div>
    <div>
      <div v-for="note in notes" :key="note.id">
        <p>{{ note.title }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { paramToString } from '../util/searchParam'
import { NoteList, PostList } from '../types/api'
import { Config } from '../types/config'
import axios from 'axios'

@Component({
  name: 'IndexPage',
})
export default class IndexPage extends Vue {
  async asyncData({ $config }: any) {
    const query = paramToString({ limit: 5, offset: 0 })
    const config = $config as Config

    const PostRes = await axios.get(`${config.apiUrl}/post?${query}`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })

    const NoteRes = await axios.get(`${config.apiUrl}/note?${query}`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })

    const postList = PostRes.data as PostList
    const noteList = NoteRes.data as NoteList

    return {
      posts: postList.contents,
      notes: noteList.contents,
    }
  }
}
</script>
