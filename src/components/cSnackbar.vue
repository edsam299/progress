<template>
  <div id="cSnackbar">
    <v-snackbar
      v-model="snackbar.visible"
      auto-height
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :top="snackbar.position === 'top'"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
      <!-- <v-btn flat color="green" @click.native="snackbar = false">Close</v-btn> -->
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "cSnackbar",
  props: [
    'snackbarcomponent'
  ],
  data() {
    return {
        snackbar:this.snackbarcomponent
        
    /*  snackbar: {
        color: null,
        icon: null,
        mode: null,
        position: "top",
        text: null,
        timeout: 3000,
        title: null,
        visible: false,
      },*/
    };
  }
};
</script>

<style></style>
