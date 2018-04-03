<template>
  <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
    >
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Checklists
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
              value="true"
              v-for="(item, i) in items"
              :key="i"
          >
              <v-list-tile-action>
              <img v-bind:src="item.icon" />
              </v-list-tile-action>
              <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    props: [
        'clipped',
        'drawer',
        'miniVariant'
    ],
    computed: mapState([
        'items'
    ]),
    methods: {
    }
  }
</script>

<style scoped>

</style>
