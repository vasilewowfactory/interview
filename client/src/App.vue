<template lang="pug">
  #app.todo-app
      div.container
         to-do-list
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ToDoList from './components/ToDoList.vue';

export default defineComponent({
  name: 'App',
  components: { ToDoList },
  setup() { return {}; },
});

</script>

<style lang="scss">
    @import "assets/scss/global";
</style>
