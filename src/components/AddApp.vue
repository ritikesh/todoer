<template>
    <v-card class="mt-5" width="80%">
      <v-container
        fluid
        grid-list-lg>
        <span class="headline"> Add Checklist </span>
        <v-form v-model="valid" ref="form" class="mt-4" lazy-validation>
            <v-text-field
                label="Title"
                v-model="title"
                placeholder="Purpose"
                :rules="stringRules"
                required
            ></v-text-field>
            <v-text-field
                label="Icon Badge"
                placeholder="https://assets1.freshservice.com/assets/app_logo.png"
                v-model="icon"
                :rules="stringRules"
                required
            ></v-text-field>
            <v-text-field
                label="Description"
                placeholder="Describe it"
                v-model="description"
            ></v-text-field>
            <v-text-field
                label="Checklist Items"
                placeholder="comma separated"
                v-model="todoList"
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
            title: '',
            description: '',
            icon: '',
            todoList: '',
            stringRules: [
                v => !!v || 'This field is required'
            ]
        }),
        computed: mapState([
            'author',
            'session',
            'items'
        ]),
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    const item = {
                        title: this.title,
                        description: this.description,
                        icon: this.icon,
                        todoList: this.todoList
                    }
                    this.setItem(item)
                    this.clear()
                }
            },
            clear () {
                this.$refs.form.reset()
            },
            ...mapActions([
                'setItem'
            ])
        }
    }
</script>

<style scoped>
</style>
