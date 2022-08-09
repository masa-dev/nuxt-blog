<template>
  <div>
    {{ name }}
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class Post extends Vue {
  private name = "post";
}
</script>
