<template>
    <v-layout row>
        <v-list>
            <v-list-tile avatar v-for="todo in todos" :key="todo">
                <v-list-tile-action>
                    <v-icon color="purple" dark>check_box</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="subheading" v-text="todo"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-layout>
</template>

<script>
    export default {
        props: {
            todos: null
        }
    }
</script>

<style scoped>
.list__tile__action {
    min-width: 35px;
}
.list {
    padding-top: 0px;
}
</style>
