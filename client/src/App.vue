<template lang="pug">
  #app.todo-app
      div.flex-container
          div.flex-item-full
              div.search-box
                  img.search-icon.cursor-pointer(src="./assets/images/search.png")(@click="filterToDoItems()")
                  input(type='search', placeholder="Search" v-model="searchValue")(@input="filterToDoItems()")
              ul.todo-list
                  li.clearfix
                      p.list-title Take a note
                      img.add-item.cursor-pointer(src="./assets/images/add.png")(@click="addItem()")
                  li(v-for="item in filteredToDoItems", :key="item._id")
                      div.cursor-pointer(@click="updateItem(item)")
                          input(type='checkbox', :name="'check_' + item._id", :id='item._id', :value='item._id', :checked="item.done")
                          label.cursor-pointer(:for='item._id')
                              span(:class="{'todo-done': item.done}") {{item.description}}
                              small.time(v-if="item.diffDate > 0") - {{item.diffDate}} minute{{item.diffDate > 1 ? 's' : ''}}
                      span.remove-item.cursor-pointer(@click="deleteItem(item)")
                          img(src="./assets/images/remove.png")
              div.no-items(v-if="!filteredToDoItems.length")
                  p No data
              div.pagination
                  button.cursor-pointer(@click="nextOrPrevPage('prev')")
                      img(src="./assets/images/arrow-left.png")
                  span |
                  button.cursor-pointer(@click="nextOrPrevPage('next')")
                      img(src="./assets/images/arrow-right.png")
</template>

<script lang="ts">
/* eslint-disable */
//I disabled temporarily eslint because it gets error "this.cliEngine is not a constructor" on my editor.
import { defineComponent, ref, Ref } from '@vue/composition-api';
import axios from 'axios';

import { ToDo } from '@/interfaces';

export default defineComponent({
  name: 'App',
  setup() {
    const BASE_URL = 'http://localhost:3000/api/v1/todo/';
    const toDoItems:Ref<ToDo[]> = ref([]);
    const filteredToDoItems:Ref<ToDo[]> = ref([]);
    const metaPagination: Ref<any> = ref({});
    const searchValue: Ref<string> = ref('');
    const params = { page: 1, offset: 0, limit: 20 };

    // Get all to do list
    const fetchToDoList = (params?:object) => {
      axios.get(BASE_URL, { params }).then((data) => {
        const response = data.data;

        filteredToDoItems.value = toDoItems.value = addDiffDateToItems(response.items);
        metaPagination.value = response.meta;
        if (searchValue.value) {
            filterToDoItems();
        }
      }).catch((error: any) => {
        console.error(error);
      });
    };

    // Add new to do
    const addItem = () => {
      const formData = { description: 'First todo' };

      axios.post(BASE_URL, formData).then((data) => {
        toDoItems.value.unshift(data.data);
        filteredToDoItems.value = toDoItems.value;
      }).catch((error: any) => {
        console.error(error);
      });
    };

    // Update to do
    const updateItem = (item: ToDo) => {
      axios.put(BASE_URL + item._id, { done: !item.done }).then((data) => {
        toDoItems.value.forEach((totDo) => {
          if (totDo._id === data.data._id) {
            const item = calculateDiffDate(totDo);

            return Object.assign(item, data.data);
          }
        });
        filteredToDoItems.value = toDoItems.value;
      }).catch((error: any) => {
        console.error(error);
      });
    };

    // Delete to do
    const deleteItem = (item: ToDo) => {
      axios.delete(BASE_URL + item._id).then(() => {
        toDoItems.value = toDoItems.value.filter((toDoItem: { _id: string | number; }) => toDoItem._id !== item._id);
        filteredToDoItems.value = toDoItems.value;
      }).catch((error: any) => {
        console.error(error);
      });
    };

    // Pagination
    const nextOrPrevPage = (type: string) => {
      const metaValue = metaPagination.value;

      if (metaValue.page === 1 && type === 'prev') {
        return;
      }

      if (!metaValue.hasNextPage && type === 'next') {
        return;
      }

      if (type === 'next') {
        params.page = parseInt(metaValue.page) + 1;
      } else {
        params.page = parseInt(metaValue.page) - 1;
      }

      params.offset = (params.page - 1) * metaValue.limit + 1;
      fetchToDoList(params);
    };

    // Filter
    const filterToDoItems = () => {
      const searchItem = searchValue.value.toLowerCase();

      if (!searchItem && searchItem.trim() === '') {
        filteredToDoItems.value = toDoItems.value;
        return;
      }

      filteredToDoItems.value = toDoItems.value.filter((item) => (item.description.toLowerCase().indexOf(searchItem.toLowerCase()) > -1));
    };

    const addDiffDateToItems = (items: ToDo[]) => items.map((item: ToDo) => calculateDiffDate(item));

    const calculateDiffDate = (item: ToDo) => {
      const createdAt = new Date(item.createdAt);
      const updatedAt = new Date(item.updatedAt);
      const time: any = (updatedAt.getTime() - createdAt.getTime());

      item.diffDate = Math.round(time / 60000);
      return item;
    };

    fetchToDoList();
    return {
      toDoItems,
      filteredToDoItems,
      metaPagination,
      searchValue,
      addItem,
      updateItem,
      deleteItem,
      nextOrPrevPage,
      filterToDoItems,
    };
  },
});

</script>

<style lang="scss">
@import "assets/scss/global";

.search-box{
    margin-top: 20px;
    position: relative;
    .search-icon{
        position: absolute;
        top: 8px;
        left: 7px;
    }
    input{
        background: $gray;
        border-radius: 12px;
        width: 100%;
        min-height: 32px;
        border: none;
        padding-left: 29px;
        font-size: 16px;
        &:focus{
            outline: none;
        }
    }
}
.todo-list{
    background-color: $white;
    border: 1px solid rgba(0, 0, 0, 0.17);
    box-sizing: border-box;
    border-radius: 12px;
    padding-left: 0;
    li{
        list-style-type: none;
        border-bottom: 1px solid #c6c6c6;
        padding: 5px 35px 5px 0;
        position: relative;
        div{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            min-height: 40px;
        }
        &:first-child{
            min-height: 50px;
            line-height: 40px;
            padding: 5px 13px 5px 20px;
            display: flex;
            align-items: center;
            .add-item{
                margin-left: auto;
            }
            p{
                font-size: 16px;
                color: #A8A8A8;
                font-weight: 400;
            }
        }
        &:last-child{
            border-bottom: none;
        }
        .todo-done{
            text-decoration-line: line-through;
            color: #AEAEAE
        }
        .remove-item{
            position: absolute;
            right: 15px;
            top: 50%;
            display: none;
            @extend .transformY;
        }
        &:hover{
            .remove-item{
                display: block;
            }
        }
        label{
            position: relative;
            padding-left: 55px;
            &:before {
                content: "";
                position: absolute;
                height: 40px;
                width: 40px;
                top: 50%;
                @extend .transformY;
            }
        }

        input[type=checkbox] {
            display: none;
        }

        label:before {
            background: url('./assets/images/unchecked.png') left center no-repeat;
            left: 12px;
        }

        input[type=checkbox]:checked + label:before {
            background: url('./assets/images/checked.png') left center no-repeat;
            left: 5px;
        }
        .time{
            font-weight: 300;
            font-size: 10px;
            color: $grey2;
            margin-left: 5px;
        }
    }
}
.pagination{
    float: right;
    background: $white;
    border: 1px solid rgba(0, 0, 0, 0.17);
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    align-items: center;
    button{
        border: none;
        background: none;
        padding: 8px 12px 6px 12px;
    }
}
.no-items{
    text-align: center;
    background: $white;
    padding: 10px;
    margin-bottom: 11px;
    border-radius: 12px;
}
</style>
