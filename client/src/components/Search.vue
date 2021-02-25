<template lang="pug">
    div.search
        img.search__icon.cursor-pointer(src="../assets/images/search.png")(@click="filterItems()")
        input.search__input(type='search', placeholder="Search" v-model="searchValue")(@input="filterItems()")
</template>

<script lang="ts">
/* eslint-disable */
    import {defineComponent, ref, Ref, PropType} from '@vue/composition-api';
import {ToDo} from "@/interfaces";

    export default defineComponent({
        name: "Search",
        props: {
            filterableItems: {type: Array as PropType<ToDo[]>, require:true},
        },
        emits:['filterItems'],
        setup(props){
            const searchValue: Ref<string> = ref('');
            return {
                searchValue,
                props
            }
        },
        methods:{
            filterItems () {
                const searchItem = this.searchValue.toLowerCase();
                if (!searchItem && searchItem.trim() === '') {
                    this.$emit('filterItems', this.filterableItems);
                    return;
                }
                const resultItems = (this.filterableItems as ToDo[]).filter((item) => (item.description.toLowerCase().indexOf(searchItem.toLowerCase()) > -1));
                this.$emit('filterItems',resultItems);
            }

        }
    })
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global";
    .search{
        margin-top: 20px;
        position: relative;
        &__icon{
            position: absolute;
            top: 8px;
            left: 7px;
        }
        &__input{
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
</style>
