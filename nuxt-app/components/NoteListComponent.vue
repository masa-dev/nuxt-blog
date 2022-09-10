<template>
  <div class="d-flex flex-wrap justify-content-between mb-3">
    <div v-for="note in noteList" :key="note._id" class="note-item mb-5">
      <nuxt-link :to="`/note/${note._id}`" class="d-flex note-item-link">
        <div
          v-if="note.tags.length > 0 && note.tags[0].image"
          class="note-icon-wrapper"
        >
          <img :src="note.tags[0].image.src" />
        </div>
        <div v-else class="note-icon-wrapper">
          <b-icon-circle-fill class="text-black-50" />
        </div>
        <div class="pl-3 d-flex flex-column justify-content-between flex-fill">
          <h2 class="m-0">{{ note.title }}</h2>
          <p class="small m-0 text-secondary">
            {{ dayjs(note._sys.createdAt).format('YYYY年MM月DD日 HH:mm') }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Note } from '../types/newtApi'

@Component({
  name: 'NoteListComponent',
})
export default class NoteListComponent extends Vue {
  @Prop({ type: Array })
  noteList!: Note[]

  dayjs = dayjs
}
</script>

<style lang="scss" scoped>
.note-icon-wrapper {
  width: 80px;
  height: 80px;
  padding: 10px;

  > * {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
}

.note-item-link {
  &:hover {
    text-decoration: none !important;
  }
}

.note-item {
  width: 47%;

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #000;
    line-height: 1.5;
  }
}

@media only screen and (max-width: 750px) {
  .note-image-wrapper {
    width: 60px;
    height: 60px;
    padding: 5px;

    img {
      width: 50px;
      height: 50px;
    }
  }
  .note-item {
    width: 100%;

    h2 {
      font-size: 1.05rem;
      line-height: 1.3;
    }
  }
}
</style>
