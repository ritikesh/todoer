<template>
    <v-card class="mt-5" width="80%">
      <v-container
        fluid
        grid-list-lg>
        <span class="headline"> Add Checklist </span>
        <v-form v-model="valid" ref="form" class="mt-4" lazy-validation>
            <v-text-field
                label="Title"
                v-model="custom_app.title"
                placeholder="Purpose"
                :rules="stringRules"
                required
            ></v-text-field>
            <v-text-field
                label="Icon Badge"
                placeholder="https://assets1.freshservice.com/assets/app_logo.png"
                v-model="custom_app.icon"
                :rules="stringRules"
                required
            ></v-text-field>
            <v-text-field
                label="Description"
                placeholder="Describe it"
                v-model="custom_app.description"
            ></v-text-field>
            <v-text-field
                label="Checklist Items"
                placeholder="comma separated"
                v-model="custom_app.todoList"
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
            custom_app: {
                title: '',
                description: '',
                icon: '',
                todoList: '',
                items: [],
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
                    this.setApp(this.custom_app)
                    this.$router.push({
                        name: 'default'
                    })
                }
            },
            clear () {
                this.$refs.form && this.$refs.form.reset()
            },
            ...mapActions([
                'setApp'
            ]),
            resetApp() {
                const appId = this.route.params.appId
                if(appId == undefined) {
                    this.clear()
                    return
                }
                this.custom_app = this.deepClone(this.apps[appId])
                this.custom_app.id = appId
            },
            deepClone(object) {
                return JSON.parse(JSON.stringify(object));
            }
        },
        watch: {
            '$route.params.appId': {
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
