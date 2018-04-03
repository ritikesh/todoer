<template>
  <v-app>
    <toolbar />
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  // import LeftNavigation from './components/global/LeftNavigation'
  import Toolbar from './components/global/Toolbar'

  export default {
    data () {
      return {
        fixed: false,
        clipped: false,
        drawer: true,
        miniVariant: false
      }
    },
    components: {
      // LeftNavigation,
      Toolbar
    }
  }
</script>
