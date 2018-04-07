<template>
  <v-app>
    <toolbar />
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view class="mx-auto"></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Toolbar from './components/global/Toolbar'

  export default {
    components: {
      Toolbar
    }
  }
</script>
