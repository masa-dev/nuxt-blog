<template>
  <footer>
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.1)">
      <section class="mb-2">
        <!-- Twitter -->
        <a
          class="btn btn-primary btn-floating m-1 rounded-circle link-circle border-0"
          style="background-color: #55acee"
          href="#!"
          role="button"
          ><b-icon icon="twitter"></b-icon
        ></a>

        <!-- Github -->
        <a
          class="btn btn-primary btn-floating m-1 rounded-circle link-circle border-0"
          style="background-color: #333333"
          href="#!"
          role="button"
          ><b-icon icon="github"></b-icon
        ></a>
      </section>
      © 2022 Copyright
    </div>
    <!-- Copyright -->
  </footer>
</template>

<style lang="scss">
$icon-size: 2.5rem;

.link-circle {
  position: relative;
  width: $icon-size;
  height: $icon-size;

  svg {
    position: absolute;
    width: calc($icon-size * (3 / 5));
    height: calc($icon-size * (3 / 5));
    transform: translateY(-50%) translateX(-50%);
    top: 50%;
    left: 50%;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {}
</script>
