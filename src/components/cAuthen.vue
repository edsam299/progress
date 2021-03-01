<template>
  <div id="authen">
    <v-container fluid>
      <v-row>
        <v-layout justify-center>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5" >
            <v-card class="justify-center">
              <v-text-field
                ref="security"
                label="Security Key deploy 2021-02-26"
                id="id"
                v-model="securitykey"
                :type="'password'"
                v-on:keyup.enter="authentication"
              ></v-text-field>
              <span class="red--text">{{ message }}</span>
            </v-card>
          </v-col>
        </v-layout>
      </v-row>
      <div class="pt-5 mt-5" v-if="statuswait">
        <div class="text-center">
          <h2 class="primary--text">
            <v-icon x-large color="primary">mdi-weather-cloudy</v-icon>
            Authentication...
          </h2>
        </div>
        <div>
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </div>
      </div>
    </v-container>
     <Snackbar :snackbarcomponent="snackbarcomponent"/>
  </div>
</template>

<script>
import axios from "axios";
import Snackbar from "@/components/cSnackbar.vue";
export default {
  name:"authen",
  components:{
    Snackbar
  },
  data() {
    return {
      statuswait: false,
      name: "authen",
      securitykey: null,
      message: "",
      snackbarcomponent: {
        color: 'green',
        icon: '',
        mode: '',
        position: "top",
        text: '',
        timeout: 3000,
        title: '',
        visible: false,
      },
    };
  },
  mounted() {
    this.$refs.security.focus();
  },
  methods: {
    async authentication() {
      // axios.post()
      this.statuswait = true;
      let result = await axios.post(
        "https://us-central1-fir-api-514b9.cloudfunctions.net/api/authentication",
        { securitykey: this.securitykey }
      );      
      if (result.data.length > 0) {
        this.$store.dispatch("addAuthen", true);
        if (this.$store.getters.getAuthen) {
          this.snackbarcomponent.visible=true;
          this.snackbarcomponent.text='Security Key Valid'
          this.snackbarcomponent.icon='mdi-account-key'
          this.snackbarcomponent.title='Authentication Security Key'
          this.snackbarcomponent.color='success'
          this.$router.push("dashboard");
        }
      } else {
        this.snackbarcomponent.visible=true;
        this.snackbarcomponent.text='Security Key Invalid'
        this.snackbarcomponent.icon='mdi-account-key'
        this.snackbarcomponent.title='Authentication Security Key'
        this.snackbarcomponent.color='error'
        this.snackbarcomponent.timeout = 8000
        //this.snackbarcomponent = "Invalid key";
      }
      this.statuswait = false;
    },
  },
};
</script>

<style></style>
