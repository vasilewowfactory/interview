<template lang="pug">
    div.element.cursor-pointer(@click="$emit('updateItem', item)")
        input.element__input(type='checkbox', :name="'check_' + item._id", :id='item._id', :value='item._id', :checked="item.done")
        label.element__label.cursor-pointer(:for='item._id')
            span(:class="{'element--done': item.done}") {{item.description}}
            small.element__time(v-if="item.diffDate > 0") - {{item.diffDate}} minute{{item.diffDate > 1 ? 's' : ''}}
        span.element__remove.cursor-pointer(@click="$emit('deleteItem',item)")
            img(src="../assets/images/remove.png")
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType } from '@vue/composition-api';

import { ToDo } from '@/interfaces';

export default defineComponent({
  name: 'ToDoItem',
  props: {
    item: {
      type: Object as PropType<ToDo>,
    },
  },
  emits: ['updateItem', 'deleteItem'],
});
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global";
    .element {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 2.5rem;
        padding: 0.4em 2.18em 0.4em 0;
        &--done {
            text-decoration-line: line-through;
            color: $greyLight
        }

        &__remove{
            position: absolute;
            right: 0.93em;
            top: 50%;
            display: none;
            @include translateY(-50%);
        }

        &:hover .element__remove {
            display: block;
        }

        &__label {
            position: relative;
            padding-left: 3.43em;
            &:before {
                content: "";
                position: absolute;
                height: 2.5rem;
                width: 2.5rem;
                top: 50%;
                @include translateY(-50%);
            }
        }

        &__input[type=checkbox] {
            display: none;
        }

        &__label:before {
            background: url('../assets/images/unchecked.png') left center no-repeat;
            left: 0.75em;
        }

        &__input[type=checkbox]:checked + &__label:before {
            background: url('../assets/images/checked.png') left center no-repeat;
            left: 0.31em;
        }

        &__time {
            font-weight: 300;
            font-size: 0.63rem;
            color: $greyStrong;
            margin-left: 0.31em;
        }
    }
</style>
