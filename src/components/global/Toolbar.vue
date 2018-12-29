<template>
  <div>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      v-model="drawer"
      width="350"
      app>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="title">
                {{authorMessage() }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn small dark fab
                :to="{
                  name: 'add-app'
                }"
                v-if="session"
                class="header_icons mr-1">
                <v-icon>add</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn small dark fab
                @click.native="exportHandler"
                v-if="session"
                class="header_icons mr-1">
                <v-icon>import_export</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn small dark fab
                @click="logoutHandler"
                v-if="session"
                class="header_icons">
                <v-icon>power_settings_new</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider />
          <v-list-group
            v-for="(app, i) in apps"
            :key="i"
            no-action
            :class="(true ? 'checked' : '') + ' mt-2'"
          >
            <v-list-tile slot="activator">
              <v-list-tile-avatar>
                <img 
                  v-bind:src="app.icon" 
                  :style="{ height: '35px', width: '30px' }"
                />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-text="app.title"></v-list-tile-title>
              </v-list-tile-content>
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
            </v-list-tile>
            <v-list-tile
              value="true"
              :class="itemCompleted(i, n) ? 'checked' : ''"
              v-for="(item, n) in app.items"
              :key="n">
              <v-list-tile-content>
                <router-link class="navigation_link"
                  :to="{ 
                    name: 'show-item', 
                    params: { appId: i, itemId: n }
                  }">
                  <v-list-tile-title>
                    <v-icon
                    v-if="itemCompleted(i, n)">
                      done
                    </v-icon>
                    <v-icon
                    v-if="!itemCompleted(i, n)">
                      toc
                    </v-icon>
                    {{item.title}}
                  </v-list-tile-title>
                </router-link>
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
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      fixed app :clipped-left="clipped">
      <v-toolbar-side-icon 
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          class="navigation_link purple--text"
          :to="{ 
            name: 'default', 
          }">
          TodoEr
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        fixed: false,
        clipped: false,
        drawer: true
      }
    },
    computed: {
      ...mapState([
        'author',
        'session',
        'apps'
      ]),
      ...mapGetters([
        'itemCompleted'
      ])
    },
    methods: {
      authorMessage: function() {
        if(!this.session) {
          return "Hello, Guest!"
        }
        return `${this.author}`
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
    color: inherit;
  }
  .header_icons, .list__tile__action {
    height: 24px;
    width: 24px;
  }
  .list__tile__action i {
    font-size: 21px;
  }
  .list__tile__avatar .avatar {
    width: initial;
    height: initial;
    max-width: 40px;
    max-height: 40px;
  }
  .list .list__group--active:before {
    background: none;
  }
  .list__group__items .list__tile__content {
    color: orange;
  }
  .list__group__items .checked .list__tile__content {
    color: green;
  }
  .icon.material-icons {
    color: inherit;
  }
</style>
<style>
  .list__group__items .list__tile:hover {
    background-color: #ccc;
  }
  .list__tile.visited {
    background-color: #ccc;
  }
  .list__tile__action {
    min-width: 35px;
  }
  .list__group__header .list__group__header__append-icon {
    padding: 0 15px 0 0;
  }
  .router-link-exact-active {
    font-size: 30px;
  }
  .router-link-exact-active::after {
    content: "";
    height: 0.6rem;
    width: 0.6rem;
    line-height: 1rem;
    position: absolute;
    top: 20px;
    right: 5px;
    text-align: center;
    font-size: 1rem;
    border-radius: 50%;
    background: rgba(0,0,255,1);
  }
</style>

