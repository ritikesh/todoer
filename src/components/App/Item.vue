<template>
    <v-card class="mt-5" width="80%">
      <v-container
        fluid
        grid-list-lg>
        <span class="headline"> Checklist </span>
        <v-list-tile
            value="true"
            class="mt-4"
            v-for="(todo, n) in this.getTodoList(item.appId)"
            :key="n">
            <v-list-tile-content>
                <v-switch 
                :label="todo" 
                v-model="item.todoMap[n]"
                @click="toggle">
                </v-switch>
            </v-list-tile-content>
        </v-list-tile>
      </v-container>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        data: () => ({
            item: {
                title: '',
                description: '',
                appId: null,
                id: null,
                todoMap: {}
            }
        }),
        computed: { 
            ...mapState([
                'apps',
                'route'
            ]),
            ...mapGetters([
                'getTodoList',
                'cloneObject'
            ])
        },
        mounted () {
            this.resetItem()
        },
        methods: {
            toggle () {
                this.setItem(this.item)
            },
            toggleAll () {
                // toggle All checkboxes
            },
            ...mapActions([
                'setItem'
            ]),
            resetItem() {
                const appId = this.route.params.appId
                const itemId = this.route.params.itemId
                this.item = this.cloneObject(this.apps[appId].items[itemId])
            }
        },
        watch: {
            '$route.params': {
                immediate: true,
                handler (value) {
                    this.resetItem()
                }
            }
        }
    }
</script>

<style scoped>
</style>
