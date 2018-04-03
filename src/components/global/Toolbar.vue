<template>
  <main>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Checklists
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
            value="true"
            v-for="(item, i) in items"
            :key="i">
              <v-list-tile-action>
              <img v-bind:src="item.icon" />
              </v-list-tile-action>
              <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile 
            value="true"
            v-if="!items.length">
              <v-list-tile-action>
                <v-icon>block</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> No Lists Found</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      fixed app :clipped-left="clipped">
      <v-toolbar-side-icon 
          @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-if="session">
        {{authorMessage()}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab small dark color="purple"
        :to="{
          name: 'add-app'
        }"
        v-if="session">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab small dark color="purple"
        @click="logout"
        v-if="session">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-toolbar>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        fixed: false,
        clipped: false,
        drawer: true,
        miniVariant: false
      }
    },
    computed: mapState([
        'author',
        'session',
        'items'
    ]),
    methods: {
      authorMessage: function() {
        return `Welcome, ${this.author}`
      },
      logout: function() {
        this.logout()
      },
      ...mapActions([
        'logout'
      ])
    },
  }
</script>

<style scoped>

</style>
