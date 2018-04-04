<template>
    <v-card class="mt-5" width="80%">
      <v-container
        fluid
        grid-list-lg>
        <span class="headline"> Add Item </span>
        <v-form v-model="valid" ref="form" class="mt-4" lazy-validation>
            <v-text-field
                label="Title"
                v-model="item.title"
                placeholder="Purpose"
                :rules="stringRules"
                required
            ></v-text-field>
            <v-text-field
                label="Description"
                placeholder="Describe it"
                v-model="item.description"
                :rules="stringRules"
                required
            ></v-text-field>

            <v-btn
                @click="submit"
                :disabled="!valid"
            > submit </v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-container>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        data: () => ({
            valid: true,
            item: {
                title: '',
                description: '',
                appId: null,
                id: null
            },
            stringRules: [
                v => !!v || 'This field is required'
            ]
        }),
        computed: mapState([
            'apps',
            'route'
        ]),
        mounted () {
            this.resetApp()
        },
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    this.setItem(this.item)
                    this.$router.push({
                        name: 'default'
                    })
                }
            },
            clear () {
                this.$refs.form && this.$refs.form.reset()
            },
            ...mapActions([
                'setItem'
            ]),
            resetApp() {
                const appId = this.route.params.appId
                const itemId = this.route.params.itemId
                if(itemId == undefined) {
                    this.item.appId = appId
                    this.clear()
                    return
                }
                this.item = this.deepClone(this.apps[appId].items[itemId])
                this.item.id = itemId
            },
            deepClone(object) {
                return JSON.parse(JSON.stringify(object));
            }
        },
        watch: {
            '$route.params': {
                immediate: true,
                handler (value) {
                    this.resetApp()
                }
            }
        }
    }
</script>

<style scoped>
</style>
