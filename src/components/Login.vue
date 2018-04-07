<template>
    <v-layout column>
      <v-card class="mt-5 mx-auto" width="90%" v-if="!session">
        <v-container
          fluid
          grid-list-lg>
          <span class="headline"> Begin Now </span>
          <v-text-field
              label="Name"
              @keyup.enter="addName"
              @keyup.esc="username=null"
              v-model="username"
              class="mt-5"
          ></v-text-field>
          <h3 class="mt-5 text-sm-center">
            OR
          </h3>
          <v-divider />
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
        </v-container>
      </v-card>
      <v-card class="mt-5 mx-auto" width="80%" v-if="session && exportFlag">
        <v-container
          fluid
          grid-list-lg>
          <span class="headline"> Export Configurations </span>
          <v-text-field
            label="Config"
            v-model="exportText"
            class="mt-3"
            readonly
          ></v-text-field>
        </v-container>
      </v-card>
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
