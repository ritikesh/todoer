<template>
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
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
    data () {
      return {
        username: null
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
    }
}
</script>

<style scoped>

</style>
