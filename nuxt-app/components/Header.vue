<template>
  <header class="navbar navbar-dark bg-dark justify-content-center p-container-0">
    <b-navbar toggleable="md" type="dark" variant="dark" class="container-xxl">
      <b-navbar-brand href="/">My Blog</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/post/page/1">Post</b-nav-item>
          <b-nav-item href="/note/page/1">Note</b-nav-item>
          <b-nav-item href="/tag">Tag</b-nav-item>
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
        <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet">
      </b-collapse>
    </b-navbar>
  </header>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Header',
})
export default class Header extends Vue {}
</script>
