<template>
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
        <!-- make these routable, add logout -->
        <v-btn fab small dark color="purple" title="Add an item"
          v-if="session">
          <v-icon>add</v-icon>
        </v-btn>
    </v-toolbar>
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
        'miniVariant',
        'fixed'
    ],
    computed: mapState([
        'author',
        'session'
    ]),
    methods: {
      authorMessage: function() {
        return `Welcome, ${this.author}`
      }
    },
  }
</script>

<style scoped>

</style>
