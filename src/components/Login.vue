<template>
    <v-layout column>
      <div class="unauthenticated_user" v-if="!session">
        <h2 class="headline mt-5">
          Begin Now
        </h2>
        <v-text-field
            label="Name"
            @keyup.enter="addName"
            @keyup.esc="username=null"
            v-model="username"
            class="mt-3"
        ></v-text-field>
        <v-divider class="mt-5" />
        <h2 class="headline mt-5">
          Import Configurations
        </h2>
        <v-text-field
            label="Config"
            @keyup.enter="importHandler"
            @keyup.esc="importText=null"
            v-model="importText"
            class="mt-3"
        ></v-text-field>
      </div>
      <div class="authenticated_user" v-if="session && exportFlag">
        <h2 class="headline mt-5">
          Export Configurations
        </h2>
        <v-text-field
            label="Config"
            v-model="exportText"
            class="mt-3"
            readonly
        ></v-text-field>
      </div>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    data () {
      return {
        username: null,
        importText: null,
        exportFlag: false,
        exportText: ''
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
      importHandler: function() {
        if(this.importText && this.importText.trim() !== '') {
          this.importState(JSON.parse(this.importText))
          this.$router.push({
            name: 'default'
          })
        }
      },
      ...mapActions([
        'setAuthor',
        'importState'
      ]),
      ...mapGetters([
        'exportState'
      ])
    },
    watch: {
      '$route.query.export': {
        immediate: true,
        handler (value) {
          this.exportFlag = !!value
          if(this.exportFlag) {
            this.exportText = this.exportState()
          }
        }
      }
    }
}
</script>

<style scoped>

</style>
