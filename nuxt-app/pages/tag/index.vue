<template>
  <div class="tag-list-wapper n-container-xl mx-auto mb-5">
    <h2 class="mb-5 mt-4 font-weight-bold">タグ一覧</h2>
    <div class="tag-search mb-5 mx-auto">
      <input
        v-model="searchWord"
        type="search"
        class="form-control rounded-pill px-4"
        placeholder="JavaScript"
      />
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <nuxt-link
        v-for="tag in tags.filter(
          (t) => t.slug.toLowerCase().search(searchWord.toLowerCase()) != -1
        )"
        :key="tag._id"
        :to="`/tag/${tag.slug}`"
        class="mb-3 mx-2 tag-link"
      >
        <div
          class="tag-item-wrapper d-flex align-items-center p-3 border border-light rounded-2 shadow-sm h-100"
        >
          <img :src="tag.image.src" />
          <div class="ml-3 text-dark lh-base text-center">
            {{ tag.name }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'
import { paramToString } from '../../util/searchParam'
import { Tag, ApiResponse, Post, Note } from '../../types/newtApi'
import { Config } from '../../types/config'

@Component({
  name: 'TagHome',
})
export default class TagHome extends Vue {
  public searchWord = ''
  public tags: Tag[] = []
  public tagRes: any

  public head() {
    return {
      title: 'Tag 一覧',
      link: [
        {
          rel: 'canonical',
          href: 'https://masa-dev.net/tag',
        },
      ],
    }
  }

  mounted() {
    console.log({ tags: this.tags, tagRes: this.tagRes })
  }

  public async asyncData({ $config }: any) {
    const query = paramToString({ limit: 1000, skip: 0 })
    const config: Config = $config

    const tagRes = await axios.get<ApiResponse<Tag>>(
      `${config.apiUrl}/tag?${query}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const postQuery = paramToString({ limit: 1000, select: 'tags' })
    const postRes = await axios.get<ApiResponse<Post>>(
      `${config.apiUrl}/post?${postQuery}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )
    const noteQuery = paramToString({ limit: 1000, select: 'tags' })
    const noteRes = await axios.get<ApiResponse<Note>>(
      `${config.apiUrl}/note?${noteQuery}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    )

    const postOrNoteTagList = [...postRes.data.items, ...noteRes.data.items]
    const tagList = tagRes.data.items
      .filter((tag) => {
        const tagCount = postOrNoteTagList.filter((p) =>
          p.tags.some((pt) => pt._id === tag._id)
        ).length

        return tagCount >= 1
      })
      .sort((a, b) => {
        const countA = postOrNoteTagList.filter((p) =>
          p.tags.some((pt) => pt._id === a._id)
        ).length
        const countB = postOrNoteTagList.filter((p) =>
          p.tags.some((pt) => pt._id === b._id)
        ).length
        if (countA < countB) {
          return 1
        } else {
          return -1
        }
      })

    return {
      tags: tagList,
      tagRes: tagRes.data,
    }
  }
}
</script>

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
.tag-search {
  max-width: 500px;
}

.tag-list-wapper {
  justify-content: space-around;
  flex-wrap: wrap;
  text-decoration: none;

  .tag-item-wrapper {
    width: 195px;

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

@media only screen and (max-width: 500px) {
  .tag-list-wapper {
    .tag-item-wrapper {
      flex-direction: column;
      width: 140px;
      > div {
        margin-top: 0.5rem;
        margin-left: 0 !important;
      }
    }
  }
}
</style>
