<template>
  <nuxt-link
    v-if="tag"
    :to="`/tag/${tag.slug}`"
    class="tag-icon-link border rounded-pill"
  >
    <img
      :src="tag.image.src"
      class="icon-image d-block"
      :alt="tag.image.altText ? tag.image.altText : 'Tag image'"
    />
    <div class="icon-image-name">{{ tag.name }}</div>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Tag } from '../types/newtApi'

@Component({
  name: 'TagIconSmall',
})
export default class TagIconSmall extends Vue {
  @Prop({ type: Object })
  tag?: Tag
}
</script>

<style lang="scss" scoped>
.tag-icon-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: {
    top: 2px;
    bottom: 2px;
    left: 0.6rem;
    right: 0.6rem;
  }
  transition: background-color 0.3s;

  &:hover {
    background-color: #343a400c;
  }
}

.icon-image {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  padding: 0.2rem 0;
  margin-right: 0.4rem;
}

.icon-image-name {
  font-size: 0.85rem;
}
</style>
