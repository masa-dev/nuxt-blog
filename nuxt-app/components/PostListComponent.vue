<template>
  <div class="d-flex flex-wrap justify-content-between mb-3">
    <div v-for="post in postList" :key="post._id" class="post-item mb-4">
      <nuxt-link :to="`/post/${post._id}`" class="d-flex post-item-link">
        <div class="post-image-wrapper">
          <img :src="post.image.src" :alt="post.image.alt" />
        </div>
        <h2 class="m-0 pl-3">{{ post.title }}</h2>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Post } from '../types/newtApi'

@Component({
  name: 'PostListComponent',
})
export default class ItemList extends Vue {
  @Prop({ type: Array })
  postList!: Post[]

  mounted() {}
}
</script>

<style lang="scss" scoped>
.post-image-wrapper {
  width: 110px;
  height: 110px;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    border-radius: 10px;
  }
}

.post-item-link {
  &:hover {
    text-decoration: none !important;
  }
}

.post-item {
  width: 47%;

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #000;
    line-height: 1.5;
  }
}
</style>
