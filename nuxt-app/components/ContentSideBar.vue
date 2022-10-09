<template>
  <aside class="mt-5">
    <div class="sticky-top">
      <div class="sidebar-post-info p-3 shadow mb-4">
        <ul class="p-0 m-0">
          <li
            v-if="!isNullOrWhitespace(createdAt)"
            class="d-flex flex-row justify-content-between"
          >
            <div>
              <img
                src="/img/pen-solid.svg"
                width="15px"
                height="15px"
                class="mr-2"
              />公開日
            </div>
            <time>{{ getCreatedAtLocaled }}</time>
          </li>
          <li
            v-if="!isNullOrWhitespace(updatedAt)"
            class="d-flex flex-row justify-content-between"
          >
            <div>
              <img
                src="/img/rotate-right-solid.svg"
                width="15px"
                height="15px"
                class="mr-2"
              />更新日
            </div>
            <time>{{ getUpdatedAtLocaled }}</time>
          </li>
        </ul>
      </div>
      <div class="toc p-3 shadow">
        <ul class="p-0 m-0">
          <li v-for="title in titles" :key="title.title">
            <a
              :href="title.anchorLink"
              :class="{ active: title.isActive }"
              class="d-block"
            >
              {{ title.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables';

aside {
  width: 270px;

  $side-card-bg-color: rgb(241, 241, 241);
  .sidebar-post-info {
    background: $side-card-bg-color;
    border-radius: 15px;
  }

  .sticky-top {
    top: 1.5rem;
  }

  .toc {
    background: $side-card-bg-color;
    border-radius: 15px;

    ul {
      padding-left: 0;
      list-style: none;

      li {
        a {
          padding: 5px 10px;
          color: black;
          border-radius: 10px;
          &.active {
            font-weight: bolder;
            color: rgb(34, 137, 206);
            background: rgb(207, 227, 243);
          }

          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: $hide-sidebar) {
  aside {
    display: none;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { isNullOrWhitespace } from '../util/utilFunction'
import dayjs, { locale } from 'dayjs'
import ja from 'dayjs/locale/ja'
locale(ja)

interface TocTitle {
  title: string
  isActive: boolean
  anchorLink: string
}

@Component({
  name: 'ContentSideBar',
})
export default class ContentSideBar extends Vue {
  @Prop({ default: '', type: String })
  private updatedAt!: string

  @Prop({ default: '', type: String })
  private createdAt!: string

  @Prop({ default: '', type: String })
  public title!: string
  public titles: TocTitle[] = []
  public isNullOrWhitespace = isNullOrWhitespace

  public mounted() {
    const boxes = document.querySelectorAll(
      '.post-content h1,.post-content h2,.post-content h3'
    )
    const observerOptions = {
      root: null,
      rootMargin: '0% 0px -60% 0px',
      thredshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting == true) {
          this.titles.forEach((t) => {
            if (t.anchorLink === '#' + entry.target.id) {
              t.isActive = true
            } else {
              t.isActive = false
            }
          })
          return
        }
      }
      console.log(entries)
    }, observerOptions)

    boxes.forEach((box, index) => {
      observer.observe(box)

      box.id = `content-h-${index + 1}`

      this.titles.push({
        title: box.textContent,
        isActive: false,
        anchorLink: `#content-h-${index + 1}`,
      })
    })
  }

  get getCreatedAtLocaled() {
    return dayjs(this.createdAt).format('YYYY年MM月DD日')
  }

  get getUpdatedAtLocaled() {
    return dayjs(this.updatedAt).format('YYYY年MM月DD日')
  }

  public activeToc() {}
}
</script>
