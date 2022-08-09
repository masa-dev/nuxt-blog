<template>
  <div>
    {{ about }}
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class AboutComponent extends Vue {
  private about = "about"
}
</script>
