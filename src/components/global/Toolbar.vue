<template>
  <main>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      width="350"
      app>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link
                class="navigation_link purple--text"
                :to="{ 
                  name: 'default', 
                }">
                <!-- <v-icon medium>apps</v-icon>  -->
                TodoEr
              </router-link>
            </v-list-tile-title>
          </v-list-tile>
          <v-divider />
          <v-list-group
            v-for="(app, i) in apps"
            :key="i"
            no-action
            class="mt-2"
          >
            <v-list-tile slot="activator">
              <v-list-tile-avatar>
                <img v-bind:src="app.icon" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-text="app.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon flat
                  :to="{ 
                    name: 'edit-app', 
                    params: { appId: i }
                  }"
                  @click.native.stop>
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon flat
                  @click.native="deleteAppHandler(i)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon flat
                  :to="{ 
                    name: 'add-item', 
                    params: { appId: i }
                  }"
                  @click.native.stop>
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile
              value="true"
              v-for="(item, n) in app.items"
              :key="n">
              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link class="navigation_link"
                    :to="{ 
                      name: 'show-item', 
                      params: { appId: i, itemId: n }
                    }">
                    {{item.title}}
                  </router-link>
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon flat
                  :to="{ 
                    name: 'edit-item', 
                    params: { appId: i, itemId: n }
                  }">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon flat
                  @click.native="deleteItemHandler({id: n, appId: i})">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile 
              value="true"
              v-if="!app.items.length">
                <v-list-tile-action>
                  <v-icon>block</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title> No items Found in this List</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile 
            value="true"
            v-if="!apps.length">
              <v-list-tile-action>
                <v-icon>block</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> 
                  No Lists Found
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn dark medium flat
                  :to="{
                    name: 'add-app'
                  }"
                  v-if="session"
                  color="purple">
                  Add Now
                </v-btn>
              </v-list-tile-action>
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
        @click.native="exportHandler"
        v-if="session">
        <v-icon>import_export</v-icon>
      </v-btn>
      <v-btn fab small dark color="purple"
        @click="logoutHandler"
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
    computed: {
      ...mapState([
        'author',
        'session',
        'apps'
      ])
    },
    methods: {
      authorMessage: function() {
        return `Welcome, ${this.author}`
      },
      logoutHandler: function() {
        this.logout()
        this.$router.push({
          name: 'default'
        })
      },
      exportHandler: function() {
        this.$router.push({
          name: 'default',
          query: {
            export: 1
          }
        })
      },
      deleteAppHandler: function(appId) {
        this.deleteApp(appId)
        this.$router.push({
          name: 'default'
        })
      },
      deleteItemHandler: function(item) {
        this.deleteItem(item)
        this.$router.push({
          name: 'default'
        })
      },
      ...mapActions([
        'logout',
        'deleteApp',
        'deleteItem'
      ])
    },
  }
</script>
<style scoped>
  .navigation_link {
    text-decoration: none;
    color: initial;
  }
  .list__tile__action {
    min-width: 30px;
  }
</style>
<style>
  .list__group__items .list__tile:hover {
    background-color: #ccc;
  }
</style>

