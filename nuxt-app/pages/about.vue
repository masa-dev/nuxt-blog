<template>
  <div>
    <div>about</div>
    <ul>
      <li v-for="title in titles" :key="title">
        {{title}}
      </li>
    </ul>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
    <h1 class="my-4 py-5">tagu</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  name: 'About',
})
export default class About extends Vue {
  public head() {
    return { title: 'About' }
  }
  public titles: string[] = []

  mounted() {
    const boxes = document.querySelectorAll('h1,h2,h3')
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      thredshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      console.log(entries)
    }, observerOptions)

    boxes.forEach((box) => {
      observer.observe(box)
      this.titles.push(box.textContent)
    })
  }
}
</script>
