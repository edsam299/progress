<template>
  <div id="addCount">
      <v-container fluid>
          <v-row>
              <v-card>
                  {{$store.getters.getCount}}
                  <v-btn color="success" @click="add">Add</v-btn>
              </v-card>
          </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    name:"AddCount",
    methods: {
        add(){
            this.$store.dispatch("addCount")
        }
    },
}
</script>

<style>

</style>