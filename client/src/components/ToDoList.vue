<template lang="pug">
    div.flex-item-full
        search(:filterableItems="toDoItems", @filterItems="filteredToDoItems = $event")
        ul.list
            li.list__item.clearfix
                p Take a note
                img.list__add.cursor-pointer(src="../assets/images/add.png")(@click="addItem()")
            li.list__item(v-for="item in filteredToDoItems", :key="item._id")
                to-do-item(:item="item",  @updateItem="updateItem($event)", @deleteItem="deleteItem($event)")
        div.no-items(v-if="!filteredToDoItems.length")
            p No data
        pagination(:metaPagination="metaPagination", @changePage="fetchToDoList($event)")
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, Ref } from '@vue/composition-api';

import { addDiffDateToItems, calculateDiffDate } from '@/helpers/to-do.helper';
import { MetaParams, ToDo } from '@/interfaces';

import ToDoService from '../services/to-do.service';
import Pagination from './Pagination.vue';
import Search from './Search.vue';
import ToDoItem from './ToDoItem.vue';

export default defineComponent({
  name: 'ToDoList',
  components: { Search, ToDoItem, Pagination },
  setup() {
    const toDoItems: Ref<ToDo[]> = ref([]);
    const filteredToDoItems: Ref<ToDo[]> = ref([]);
    const metaPagination = ref({});

    // Get all to do list
    const fetchToDoList = (params?: MetaParams) => {
      ToDoService.getToDoList(params).then((data) => {
        const response = data.data;

        filteredToDoItems.value = toDoItems.value = addDiffDateToItems(response.items);
        metaPagination.value = response.meta;
      }).catch((error) => {
        console.error(error);
      });
    };

    fetchToDoList();
    return {
      toDoItems,
      filteredToDoItems,
      metaPagination,
      fetchToDoList,
    };
  },
  methods: {
    // Add new to do
    addItem() {
      const description = 'First todo';

      ToDoService.addItem(description).then((data) => {
        this.successAdd(data.data);
      }).catch((error) => {
        console.error(error);
      });
    },

    successAdd(response: ToDo) {
      this.toDoItems.unshift(response);
      this.filteredToDoItems = this.toDoItems;
    },

    // Update to do
    updateItem(item: ToDo) {
      ToDoService.updateItem(item._id, !item.done).then((data) => {
        this.successUpdate(data.data);
      }).catch((error) => {
        console.error(error);
      });
    },

    successUpdate(response:ToDo) {
      this.toDoItems.forEach((totDo) => {
        if (totDo._id === response._id) {
          const item = calculateDiffDate(totDo);

          return Object.assign(item, response);
        }
      });
      this.filteredToDoItems = this.toDoItems;
    },

    // Delete to do
    deleteItem(item: ToDo) {
      ToDoService.deleteItem(item._id).then(() => {
        this.successDelete(item);
      }).catch((error) => {
        console.error(error);
      });
    },

    successDelete(response: ToDo) {
      this.toDoItems = this.toDoItems.filter((toDoItem: { _id: string | number; }) => toDoItem._id !== response._id);
      this.filteredToDoItems = this.toDoItems;
    },
  },
});
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global";
    .list{
        background-color: $white;
        border: 0.06em solid rgba(0, 0, 0, 0.17);
        box-sizing: border-box;
        @include border-radius(0.75em);
        padding-left: 0;
        &__item{
            list-style-type: none;
            border-bottom: 0.06em solid $greyLight2;
            position: relative;

            &:first-child {
                min-height: 3.13rem;
                line-height: 2.5em;
                padding: 0.32em 0.82em 0.32em 1.25em;
                display: flex;
                align-items: center;
                p {
                    font-size: 1rem;
                    color: #A8A8A8;
                    font-weight: 400;
                }
            }
            &:last-child {
                border-bottom: none;
            }
        }
        &__add {
            margin-left: auto;
        }
    }
    .no-items{
        text-align: center;
        background: $white;
        padding: 0.62em;
        margin-bottom: 0.68em;
        @include border-radius(0.75em);
    }
</style>
