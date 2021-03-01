<template>
  <v-bottom-navigation :value="value" color="primary" height="35px;">
    <v-btn to="/">
      <span>Member</span>

      <!-- <v-icon>mdi-history</v-icon>-->
    </v-btn>
    <v-btn to="/Project">
      <span>Project</span>

      <!-- <v-icon>mdi-history</v-icon>-->
    </v-btn>

    <v-btn to="/progress">
      <span>Progress</span>

      <!--<v-icon>mdi-heart</v-icon>-->
    </v-btn>

    <v-btn to="/Resource">
      <span>Resource</span>

      <!--<v-icon>mdi-map-marker</v-icon>-->
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>

<style></style>
