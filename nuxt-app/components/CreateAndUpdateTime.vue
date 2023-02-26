<template>
  <div class="post-date mb-3 text-right">
    <div
      v-if="!isNullOrWhiteSpace(createdAt)"
      class="post-date-time time-create mb-1"
    >
      <time>{{ getCreatedAtLocaled }}</time>
    </div>
    <div
      v-if="!isNullOrWhiteSpace(updatedAt)"
      class="post-date-time time-update"
    >
      <time :datetime="getUpdatedAtIsoLocaled">{{ getUpdatedAtLocaled }}</time>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import dayjs, { locale } from 'dayjs'
import ja from 'dayjs/locale/ja'
import { isNullOrWhitespace } from '../util/utilFunction'
locale(ja)

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

  get getUpdatedAtIsoLocaled() {
    return dayjs(this.updatedAt).toISOString()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

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

@media only screen and (min-width: $hide-sidebar) {
  .post-date {
    display: none;
  }
}
</style>
