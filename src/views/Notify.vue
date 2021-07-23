<template>
  <div id="notify">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-bottom-navigation :value="value" color="teal" grow>
            <v-btn @click="viewNotify(0)">
              <span>อาทิตย์</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(1)">
              <span>จันทร์</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(2)">
              <span>อังคาร</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(3)">
              <span>พุธ</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(4)">
              <span>พฤหัสบดี</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(5)">
              <span>ศุกร์</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
            <v-btn @click="viewNotify(6)">
              <span>เสาร์</span>
              <v-icon>mdi-history</v-icon>
            </v-btn>
          </v-bottom-navigation>
          <v-row no-gutters>
            <v-col cols="8">
              <!-- <v-card> -->
                <span v-for="(item, index) in message" :key="index">
                  <v-text-field
                    v-model="item.message"
                    name="name"
                    label="ข้อความ"
                    id="id"
                  ></v-text-field>
                </span>
              <!-- </v-card> -->
            </v-col>
            <v-col cols="4">
              <v-card>
                testss
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value: [],
      notify: [],
      message: [],
    };
  },
  mounted() {
    let day = new Date();
    this.value = day.getDay();
    this.getNotify();
  },
  methods: {
    async getNotify() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getdocument",
          {
            collection: "notify",
            criteria: "where",
            where: { key: "statusCode", value: "active", operator: "==" },
            orderby: false,
          }
        )
        .catch((err) => {
          this.setsnackbar(
            "Load Project " + err,
            "mdi-database",
            "Fail",
            "error",
            5000
          );
        });
      if (result.data.length > 0) {
        this.notify = result.data[0];
        console.log(this.notify);
        // this.statuswait = false;
        // this.displayChart();
      }
    },
    viewNotify(value) {
      this.value = value;
      for (var i = 0; i < this.notify.messageList.length; i++) {
        if (this.notify.messageList[i].day == value) {
          this.message = this.notify.messageList[i].messages;
          for (var m = 0; m < this.notify.messageList[i].messages.length; m++) {
            console.log(this.notify.messageList[i].messages[m].message);
          }
        }
      }
    },
  },
};
</script>
<style>
.container {
  max-width: 100vw;
  padding: 0px;
}
</style>
