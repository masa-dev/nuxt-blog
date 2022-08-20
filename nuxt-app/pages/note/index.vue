<template>
  <div>
    <div v-for="note in notes" :key="note.id">
      <nuxt-link :to="`/note/${note.id}`">{{ note.title }}</nuxt-link>
    </div>
    <b-pagination-nav
      :number-of-pages="noteMeta.rows"
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
import { Note, NoteList } from '../../types/api'
import { Config } from '../../types/config'
import axios from 'axios'
import blogConfig from '../../blog.config'

@Component({
  name: 'NoteHome',
})
export default class NoteHome extends Vue {
  private linkGen(pageNum: number) {
    return `/note/page/${pageNum}`
  }
  
  public head() {
    return { title: 'Note 一覧' }
  }

  async asyncData({ $config, params }: any) {
    const page: number = params.p || 1

    const query = paramToString({
      limit: blogConfig.note.limit,
      offset: (page - 1) * 1,
    })
    const config = $config as Config

    const noteRes = await axios.get(`${config.apiUrl}/note?${query}`, {
      headers: { 'X-MICROCMS-API-KEY': config.apiKey },
    })

    const noteList = noteRes.data as NoteList

    const noteMeta = {
      rows: Math.ceil(noteList.totalCount / noteList.limit),
      perPage: noteList.limit,
      currentPage: page,
    }

    return {
      notes: noteList.contents,
      noteMeta: noteMeta,
    }
  }
}
</script>
