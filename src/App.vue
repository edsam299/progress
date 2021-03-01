<template>
  <v-app>
    <v-container fluid>
     
    </v-container>
    <router-view></router-view>
  </v-app>
</template>

<script>
//import MenuBar from "@/components/cMenuBar.vue"
//import UpdateProgress from "@/components/cUpdateProgress.vue"
//import Authentication from "@/components/cAuthen.vue"
export default {
  name: "App",

  components: {
   // MenuBar,
    //UpdateProgress,
    //Authentication
  },

  data: () => ({}),
  methods: {
    add() {
      this.$store.dispatch("addCount");
    },
  },
};
</script>
