<template lang="pug">
  #app.todo-app
      div.container
         to-do-list
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent} from '@vue/composition-api';
import ToDoList from './components/ToDoList.vue';

export default defineComponent({
  name: 'App',
  components: {ToDoList},
  setup() {}
});

</script>

<style lang="scss">
    @import "assets/scss/global";
</style>
