<template>
  <div class="n-container-xl mx-auto">
    <h2 class="mb-5 mt-4 font-weight-bold">ノート一覧</h2>
    <NoteListComponent :note-list="notes" />
    <b-pagination-nav
      v-if="noteMeta.rows > 1"
      :value="page"
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
import axios from 'axios'
import { paramToString } from '../../util/searchParam'
import { ApiResponse, Note } from '../../types/newtApi'
import { Config } from '../../types/config'
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

  public async asyncData({ $config, params }: any) {
    const page: number = params.p || 1

    const query = paramToString({
      limit: blogConfig.note.limit,
      offset: (page - 1) * 1,
      depth: 2,
    })
    const config: Config = $config

    const noteRes = await axios.get<ApiResponse<Note>>(
      `${config.apiUrl}/note?${query}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const noteList = noteRes.data

    const noteMeta = {
      rows: Math.ceil(noteList.total / noteList.limit),
      perPage: noteList.limit,
      currentPage: page,
    }

    return {
      page,
      notes: noteList.items,
      noteMeta,
    }
  }
}
</script>
