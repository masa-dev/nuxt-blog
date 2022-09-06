<template>
  <div class="tag-list-wapper mb-5">
    <h2 class="mb-5 mt-4">タグ一覧</h2>
    <div class="d-flex flex-wrap justify-content-center">
      <nuxt-link
        v-for="tag in tags"
        :key="tag._id"
        :to="`/tag/${tag.slug}`"
        class="mb-3 mx-2 tag-link"
      >
        <div
          class="tag-item-wrapper d-flex align-items-center p-3 border border-light rounded-2 shadow-sm"
        >
          <img :src="tag.image.src" />
          <div class="ml-3 text-dark">
            {{ tag.name }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.tag-list-wapper {
  a.tag-link {
    &:hover {
      text-decoration: none;
    }

    & > .tag-item-wrapper {
      transition: 0.3s;
      &:hover {
        border-color: #f0f0f0 !important;
        background-color: #f0f0f0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.tag-list-wapper {
  width: 900px;
  margin: 0 auto;
  justify-content: space-around;
  flex-wrap: wrap;
  text-decoration: none;

  .tag-item-wrapper {
    width: 200px;

    img {
      height: 50px;
      width: 50px;
      object-fit: contain;
    }
  }
}

.rounded-2 {
  border-radius: 10px;
}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { paramToString } from '../../util/searchParam'
import { TagResponse } from '../../types/newtApi'
import { Config } from '../../types/config'
import axios from 'axios'

@Component({
  name: 'TagHome',
})
export default class TagHome extends Vue {
  public head() {
    return { title: 'Tag 一覧' }
  }

  async asyncData({ $config }: any) {
    const query = paramToString({ limit: 1000, skip: 0 })
    const config = $config as Config

    const tagRes = await axios.get(`${config.apiUrl}/tag?${query}`, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    })

    const tagList = (tagRes.data as TagResponse).items

    return {
      tags: tagList,
    }
  }
}
</script>
