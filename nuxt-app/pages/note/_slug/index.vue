<template>
  <div class="d-flex justify-content-between">
    <div class="n-container-xl mb-5 px-lg-4">
      <h1 class="mt-4 mb-3 mb-sm-5 font-weight-bold h2-lg">{{ note.title }}</h1>
      <CreateAndUpdateTime
        :created-at="note._sys.createdAt"
        :updated-at="note._sys.updatedAt"
      />
      <div class="note-tag-list">
        <TagIconSmall
          v-for="tag in tags"
          :key="tag._id"
          :tag="tag"
          class="mr-2 mb-2"
        />
      </div>
      <div class="post-content" v-html="body"></div>
    </div>
    <ContentSideBar
      :title="note.title"
      :created-at="note._sys.createdAt"
      :updated-at="note._sys.updatedAt"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios, { AxiosError } from 'axios'
import { Config } from '../../../types/config'
import { Note, Tag } from '../../../types/newtApi'
import { codeHighlight } from '../../../util/codeHighlight'

@Component({
  name: 'NoteContent',
})
export default class NoteContent extends Vue {
  public note!: Note
  public tags!: Tag[] | null

  public head() {
    const tagImage = this.tags ? this.tags[0].image.src : ''

    return {
      title: `${this.note.title} - Note`,
      meta: [
        { property: 'og:title', content: this.note.title },
        { property: 'og:image', content: tagImage },
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://masa-dev.net/note/${this.note._id}`,
        },
      ],
    }
  }

  public async asyncData({ params, $config, redirect }: any) {
    const slug: string = params.slug

    const config: Config = $config

    try {
      const noteRes = await axios.get<Note>(`${config.apiUrl}/note/${slug}`, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })

      const note = noteRes.data
      const tags: Tag[] = []

      for (const noteTag of note.tags) {
        const TagRes = await axios.get<Tag>(
          `${config.apiUrl}/tag/${noteTag._id}`,
          {
            headers: {
              Authorization: `Bearer ${config.apiKey}`,
            },
          }
        )

        tags.push(TagRes.data)
      }

      return {
        body: note.body,
        note,
        tags,
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

<style lang="scss" scoped>
.note-tag-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
