<template>
  <div class="post-date mb-3 text-right">
    <div
      v-if="!isNullOrWhiteSpace(createdAt)"
      class="post-date-time time-create d-inline mr-2 mr-sm-4"
    >
      <time>{{ getCreatedAtLocaled }}</time>
    </div>
    <div
      v-if="!isNullOrWhiteSpace(updatedAt)"
      class="post-date-time time-update d-inline"
    >
      <time>{{ getUpdatedAtLocaled }}</time>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-date {
  line-height: 1.5;
  .post-date-time {
    font-size: 0.9rem;
    color: gray;
    white-space: nowrap;

    &::before {
      display: inline-block;
      height: 0.8rem;
      width: 0.8rem;
      margin-right: 0.5rem;
    }
  }

  .time-create {
    &::before {
      content: url(/img/pen-solid.svg);
    }
  }

  .time-update {
    &::before {
      content: url(/img/rotate-right-solid.svg);
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import { isNullOrWhitespace } from '../util/utilFunction'
dayjs.locale(ja)

@Component({
  name: 'CreateOrUpdateTime',
})
export default class CreateOrUpdateTime extends Vue {
  @Prop({ default: '', type: String })
  private updatedAt!: string

  @Prop({ default: '', type: String })
  private createdAt!: string

  public isNullOrWhiteSpace = isNullOrWhitespace

  get getCreatedAtLocaled() {
    return dayjs(this.createdAt).format('YYYY年M月D日 HH:mm')
  }
  get getUpdatedAtLocaled() {
    return dayjs(this.updatedAt).format('YYYY年M月D日 HH:mm')
  }
}
</script>
