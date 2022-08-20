<template>
  <div>
    <h1>{{ note.title }}</h1>
    <div v-html="note.body"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Config } from '../../../types/config'
import axios, { AxiosError } from 'axios'
import { Note } from '../../../types/api'

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

    const config = $config as Config

    try {
      const noteRes = await axios.get(`${config.apiUrl}/note/${slug}`, {
        headers: { 'X-MICROCMS-API-KEY': config.apiKey },
      })

      return {
        note: noteRes.data as Note,
      }
    } catch (e) {
      const axiosError = e as AxiosError
      redirect(axiosError.response!.status, '/note')
    }
  }
}
</script>
