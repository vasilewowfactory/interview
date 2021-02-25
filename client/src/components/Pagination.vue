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
    import {defineComponent} from '@vue/composition-api';

    export default defineComponent({
        name: "Pagination",
        props: {
            metaPagination: {type: Object, require:true}
        },
        emits:['changePage'],
        setup(props){
            const params = { page: 1, offset: 0, limit: 10 };
            return {
                params,
                props
            }
        },
        methods:{
            nextOrPrevPage(type: string){
                const metaValue: any = this.props.metaPagination;

                if (metaValue.page === 1 && type === 'prev') {
                    return;
                }

                if (!metaValue.hasNextPage && type === 'next') {
                    return;
                }

                if (type === 'next') {
                    this.params.page = parseInt(metaValue.page) + 1;
                } else {
                    this.params.page = parseInt(metaValue.page) - 1;
                }

                this.params.offset = (this.params.page - 1) * metaValue.limit + 1;
                this.$emit('changePage', this.params);
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "../assets/scss/global";
    .pagination {
        float: right;
        background: $white;
        border: 1px solid rgba(0, 0, 0, 0.17);
        box-sizing: border-box;
        border-radius: 12px;
        display: flex;
        align-items: center;

        &__button {
            border: none;
            background: none;
            padding: 8px 12px 6px 12px;
        }
    }

</style>
