<template>
  <div class="note-details n-container-xl mx-auto mb-5">
    <h1 class="mt-4 mb-3 mb-sm-5">{{ note.title }}</h1>
    <div class="post-content" v-html="body"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Config } from '../../../types/config'
import axios, { AxiosError } from 'axios'
import { Note } from '../../../types/newtApi'
import { codeHighlight } from '../../../util/codeHighlight'

@Component({
  name: 'NoteContent',
})
export default class NoteContent extends Vue {
  public note!: Note

  public head() {
    return { title: `${this.note.title} - Note` }
  }

  async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config: Config = $config

    try {
      const noteRes = await axios.get<Note>(`${config.apiUrl}/note/${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      const note = noteRes.data

      return {
        body: note.body,
        note: note,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/note')
    }
  }

  mounted() {
    codeHighlight()
  }
}
</script>

<style lang="scss">
.note-details {
}
</style>
