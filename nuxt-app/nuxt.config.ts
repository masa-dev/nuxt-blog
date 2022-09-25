import sass from 'sass'
import axios from 'axios'
import { Note, Post, Tag, ApiResponse } from './types/newtApi'
import { paramToString } from './util/searchParam'
import blogConfig from './blog.config'
const { API_KEY, API_URL } = process.env

export default {
  privateRuntimeConfig: {
    apiKey: API_KEY,
  },

  publicRuntimeConfig: {
    apiUrl: API_URL,
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
  },

  router: {
    extendRoutes(routes: any, resolve: any) {
      routes.push(
        {
          path: '/note/page/:p',
          component: resolve(__dirname, 'pages/note/index.vue'),
          name: 'NotePage',
        },
        {
          path: '/post/page/:p',
          component: resolve(__dirname, 'pages/post/index.vue'),
          name: 'PostPage',
        }
      )
    },
  },

  generate: {
    fallback: true,

    async routes() {
      if (!API_KEY || !API_URL) {
        throw new Error('"API_KEY" or "API_URL" is invalid')
      }

      const routeList: string[] = []
      const query = paramToString({ limit: 1000 })
      const range = (start: number, end: number): number[] =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      const postRes = await axios.get<ApiResponse<Post>>(
        `${API_URL}/post?${query}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      const noteRes = await axios.get<ApiResponse<Note>>(
        `${API_URL}/note?${query}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      const tagRes = await axios.get<ApiResponse<Tag>>(
        `${API_URL}/tag?${query}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )

      const posts = postRes.data.items
      const notes = noteRes.data.items
      const tags = tagRes.data.items

      routeList.push(...posts.map(({ _id }) => '/post/' + _id))
      routeList.push(...notes.map(({ _id }) => '/note/' + _id))
      routeList.push(...tags.map(({ slug }) => '/tag/' + slug))

      routeList.push(
        ...range(1, Math.ceil(postRes.data.total / blogConfig.post.limit)).map(
          (p) => `/post/page/${p}`
        )
      )
      routeList.push(
        ...range(1, Math.ceil(noteRes.data.total / blogConfig.note.limit)).map(
          (p) => `/note/page/${p}`
        )
      )

      return routeList
    },
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'nuxt-app',
    htmlAttrs: { lang: 'ja' },
    titleTemplate: blogConfig.meta.titleTemplate,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
        rel: 'stylesheet',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/common.scss' },
    { src: '~/assets/scss/prisma/prisma.scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-lazy-load',
  ],

  bootstrapVue: {
    icons: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: sass,
        // sassOptions: {
        //   fiber: Fiber
        // }
      },
    },
  },
}
