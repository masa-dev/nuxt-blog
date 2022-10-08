<template>
  <header
    class="navbar navbar-dark bg-dark justify-content-center p-container-0"
  >
    <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
      class="n-container-xxl"
    >
      <nuxt-link to="/" class="navbar-brand">{{ title }}</nuxt-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <nuxt-link to="/post/" active-class="active-nav-link" class="mx-1 nav-link">Post</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/note/" active-class="active-nav-link" class="mx-1 nav-link">Note</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/tag/" active-class="active-nav-link" class="mx-1 nav-link">Tag</nuxt-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!--
        <b-navbar-nav class="ml-auto py-1">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2 px-3 rounded-pill"
              placeholder="検索単語"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >検索</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
        -->
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import config from '../blog.config'

@Component({
  name: 'Header',
})
export default class Header extends Vue {
  public title = config.title
}
</script>

<style lang="scss" scoped></style>
