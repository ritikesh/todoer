<template>
    <v-card class="mt-5" width="80%">
      <v-container
        fluid
        grid-list-lg>
        <h2 class="title primary--text"> Checklist </h2>
        <p class="text-xs-left mt-3 ml-1 subheading">
            {{item.description}}
        </p>
        <v-list-tile
            value="true"
            v-for="(todo, n) in this.getTodoList(item.appId)"
            :key="n">
            <v-list-tile-content class="title">
                <v-checkbox 
                :label="todo" 
                v-model="item.todoMap[n]"
                @click.native="toggle"
                :class="item.todoMap[n] ? 'text_line_through' : ''">
                </v-checkbox>
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
                this.resetItem()
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

<style>
.theme--light div.checkbox.input-group > label {
    color: #000;
}

.theme--light div.checkbox.input-group.text_line_through > label {
    text-decoration: line-through;
    color: #CCC;
}
</style>
