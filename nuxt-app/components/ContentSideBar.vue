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
            <time :datetime="getUpdatedAtIsoLocaled">{{
              getUpdatedAtLocaled
            }}</time>
          </li>
        </ul>
      </div>
      <div class="toc p-3 shadow mb-4">
        <ul class="p-0 m-0">
          <li v-for="title in titles" :key="title.title">
            <a
              :href="title.anchorLink"
              :class="{ active: title.isActive, 'sidebar-h3': title.isH3 }"
              class="d-block"
            >
              {{ title.title }}
            </a>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8320868048874229"
        crossorigin="anonymous"
      ></script>
      <!-- サイドメニュー下 -->
      <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-8320868048874229"
        data-ad-slot="2338631336"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        ;(adsbygoogle = window.adsbygoogle || []).push({})
      </script>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs, { locale } from 'dayjs'
import ja from 'dayjs/locale/ja'
import { isNullOrWhitespace } from '../util/utilFunction'
locale(ja)

interface TocTitle {
  title: string
  isActive: boolean
  isH3: boolean
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
        if (entry.isIntersecting === true) {
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
    }, observerOptions)

    boxes.forEach((box, index) => {
      observer.observe(box)

      box.id = `content-h-${index + 1}`

      this.titles.push({
        title: box.textContent!,
        isActive: false,
        anchorLink: `#content-h-${index + 1}`,
        isH3: box.tagName === 'H3',
      })
    })
  }

  get getCreatedAtLocaled() {
    return dayjs(this.createdAt).format('YYYY年MM月DD日')
  }

  get getUpdatedAtLocaled() {
    return dayjs(this.updatedAt).format('YYYY年MM月DD日')
  }

  get getUpdatedAtIsoLocaled() {
    return dayjs(this.updatedAt).toISOString()
  }

  public activeToc() {}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

aside {
  $side-card-bg-color: rgb(241, 241, 241);
  width: 270px;

  .sidebar-post-info {
    background: $side-card-bg-color;
    border-radius: 15px;

    ul > li {
      font-size: 0.9rem;

      img {
        margin-bottom: 2px;
      }
    }
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
          padding: 3px 10px 3px;
          color: black;
          border-radius: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.active {
            font-weight: bolder;
            color: rgb(34, 137, 206);
            background: rgb(207, 227, 243);
          }

          &:hover {
            text-decoration: none;
          }

          &.sidebar-h3 {
            padding-left: 15px;
            font-size: 0.95rem;

            &::before {
              content: '-';
              margin-right: 0.5rem;
            }
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
