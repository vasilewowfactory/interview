<template lang="pug">
    div.pagination
        button.pagination__button.cursor-pointer(@click="nextOrPrevPage('prev')")
            img(src="../assets/images/arrow-left.png")
        span |
        button.pagination__button.cursor-pointer(@click="nextOrPrevPage('next')")
            img(src="../assets/images/arrow-right.png")
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType } from '@vue/composition-api';

import { MetaPagination, MetaParams } from '@/interfaces';

export default defineComponent({
  name: 'Pagination',
  props: {
    metaPagination: { type: (Object as PropType<MetaPagination>), require: true },
  },
  emits: ['changePage'],
  setup(props) {
    const params: MetaParams = { page: 1, offset: 0, limit: 20 };

    return {
      params,
      props,
    };
  },
  methods: {
    nextOrPrevPage(type: string) {
      const metaValue = this.props.metaPagination;

      if (!metaValue) {
        return;
      }

      if (metaValue.page === 1 && type === 'prev') {
        return;
      }

      if (!metaValue.hasNextPage && type === 'next') {
        return;
      }

      if (type === 'next') {
        this.params.page = metaValue.page + 1;
      } else {
        this.params.page = metaValue.page - 1;
      }

      this.params.offset = (this.params.page - 1) * metaValue.limit + 1;
      this.$emit('changePage', this.params);
    },
  },
});
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global";
    .pagination {
        float: right;
        background: $white;
        border: 0.06em solid rgba(0, 0, 0, 0.17);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        @include border-radius(0.75em);

        &__button {
            border: none;
            background: none;
            padding: 0.5em 0.75em 0.37em 0.75em;
        }
    }

</style>
