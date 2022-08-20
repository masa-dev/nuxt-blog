import sass from "sass";
import axios from "axios";
import { NoteList, PostList, TagList } from "./types/api";
import { paramToString } from "./util/searchParam"
import blogConfig from "./blog.config"
const { API_KEY, API_URL } = process.env;

export default {
  privateRuntimeConfig: {
    apiKey: API_KEY
  },

  publicRuntimeConfig: {
    apiUrl: API_URL,
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },

  router: {
    extendRoutes(routes: any, resolve: any) {
      routes.push({
        path: '/note/page/:p',
        component: resolve(__dirname, 'pages/note/index.vue'),
        name: 'NotePage',
      },
      {
        path: '/post/page/:p',
        component: resolve(__dirname, 'pages/post/index.vue'),
        name: 'PostPage',
      })
    },
  },

  generate: {
    fallback: true,

    async routes() {
      if (!API_KEY || !API_URL) {
        throw new Error('"API_KEY" or "API_URL" is invalid');
      }

      const routeList: string[] = [];
      const query = paramToString({ limit: 20000 });
      const range = (start: number, end: number): number[] =>
        [...Array(end - start + 1)].map((_, i) => start + i);

      try {
        const postRes = await axios.get(`${API_URL}/post?${query}`, {
          headers: { 'X-MICROCMS-API-KEY': API_KEY },
        });
        const noteRes = await axios.get(`${API_URL}/note?${query}`, {
          headers: { 'X-MICROCMS-API-KEY': API_KEY },
        });
        const tagRes = await axios.get(`${API_URL}/tag?${query}`, {
          headers: { 'X-MICROCMS-API-KEY': API_KEY },
        });

        const posts = (postRes.data as PostList).contents;
        const notes = (noteRes.data as NoteList).contents;
        const tags = (tagRes.data as TagList).contents;

        routeList.push(...posts.map(({ id }) => "/post/" + id));
        routeList.push(...notes.map(({ id }) => "/note/" + id));
        routeList.push(...tags.map(({ id }) => "/tag/" + id));

        routeList.push(...range(1, Math.ceil((postRes.data as PostList).totalCount / blogConfig.post.limit)).map(p => `/post/page/${p}`));
        routeList.push(...range(1, Math.ceil((noteRes.data as NoteList).totalCount / blogConfig.note.limit)).map(p => `/note/page/${p}`));
      } catch (error: any) {
        throw error;
      }

      return routeList;
    }
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'nuxt-app',
    titleTemplate: blogConfig.meta.titleTemplate,
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/common.scss' },
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
  ],

  bootstrapVue: {
    icons: true
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
      }
    },
  },
};
