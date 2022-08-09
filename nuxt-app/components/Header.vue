<template>
  <header class="navbar navbar-dark bg-dark justify-content-center">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="container-xxl">
      <b-navbar-brand href="#">My Blog</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Post</b-nav-item>
          <b-nav-item href="#">Note</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto py-1">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="検索単語"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >検索</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<style lang="scss" scoped>
.container-xxl {
  width: 100%;
}

@media only screen and (min-width: 1400px) {
  .container-xxl {
    width: 1320px;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Header',
})
export default class Header extends Vue {}
</script>
