<template>
  <div class="d-flex flex-wrap justify-content-between mb-3">
    <div v-for="post in postList" :key="post._id" class="post-item mb-5">
      <nuxt-link :to="`/post/${post._id}`" class="d-flex post-item-link w-100">
        <div class="post-image-wrapper">
          <img v-if="post.image" :src="post.image.src" :alt="post.image.alt" />
          <img v-else src="/img/dummy.png" alt="dummy image" />
        </div>
        <div class="pl-3 d-flex flex-column justify-content-between flex-fill">
          <h2 class="m-0">{{ post.title }}</h2>
          <p class="small m-0 text-secondary">
            {{ dayjs(post._sys.createdAt).format('YYYY年MM月DD日 HH:mm') }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Post } from '../types/newtApi'

@Component({
  name: 'PostListComponent',
})
export default class ItemList extends Vue {
  @Prop({ type: Array })
  postList!: Post[]

  dayjs = dayjs
}
</script>

<style lang="scss" scoped>
.post-image-wrapper {
  width: 110px;
  height: 110px;

  img {
    width: 110px;
    height: 110px;
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

@media only screen and (max-width: 750px) {
  .post-image-wrapper {
    width: 90px;
    height: 90px;

    img {
      width: 90px;
      height: 90px;
    }
  }
  .post-item {
    width: 100%;

    h2 {
      font-size: 1.05rem;
      line-height: 1.3;
    }
  }
}
</style>
