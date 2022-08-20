<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <p><nuxt-link to="/">トップページに戻る</nuxt-link></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface ErrorStatus {
  message: string
  statusCode: number
}

@Component({
  name: 'Error',
})
export default class Error extends Vue {
  @Prop({ type: Object })
  error!: ErrorStatus

  public head() {
    return { title: `${this.error.statusCode} - ${this.error.message}` }
  }

  private mounted() {
    console.log(this.error)
  }
}
</script>
