<template>
  <footer>
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.1)">
      <section class="mb-2">
        <!-- Twitter -->
        <a
          class="btn btn-primary btn-floating m-1 rounded-circle link-circle border-0"
          style="background-color: #55acee"
          :href="snsLink.twitter"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/twitter.svg" alt="twitter" />
        </a>

        <!-- Github -->
        <a
          class="btn btn-primary btn-floating m-1 rounded-circle link-circle border-0"
          style="background-color: #333333"
          :href="snsLink.github"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/github.svg" alt="github" />
        </a>
      </section>
      © {{ new Date().getFullYear() }} Copyright
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import config from '../blog.config'

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {
  public snsLink = config.snsLink
}
</script>

<style lang="scss">
$icon-size: 2.5rem;

.link-circle {
  position: relative;
  width: $icon-size;
  height: $icon-size;

  img {
    position: absolute;
    width: calc($icon-size * (3 / 5));
    height: calc($icon-size * (3 / 5));
    transform: translateY(-50%) translateX(-50%);
    top: 50%;
    left: 50%;
  }
}
</style>
