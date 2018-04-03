<template>
  <v-app>
    <left-navigation 
      v-bind:clipped="clipped"
      v-bind:drawer="drawer"
      v-bind:miniVariant="miniVariant"
      />
    <toolbar
      v-bind:clipped="clipped"
      v-bind:drawer="drawer"
      v-bind:miniVariant="miniVariant"
      v-bind:fixed="fixed"
      />
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <v-text-field
              label="Name"
              @blur="addName"
              @keyup.enter="addName"
              @keyup.esc="username=null"
              v-model="username"
              v-if="!session"
            ></v-text-field>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import LeftNavigation from './components/shared/LeftNavigation'
  import Toolbar from './components/shared/Toolbar'

  export default {
    data () {
      return {
        fixed: false,
        clipped: false,
        drawer: true,
        miniVariant: false,
        username: null,
        showAddPanel: false
      }
    },
    computed: { 
      ...mapState([
        'author',
        'session'
      ])
    },
    methods: {
      addName: function() {
        if(this.username && this.username.trim() !== '') {
          this.setAuthor(this.username)
        }
      },
      ...mapActions([
        'setAuthor'
      ])
    },
    components: {
      LeftNavigation,
      Toolbar
    }
  }
</script>
