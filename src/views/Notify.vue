<template>
  <div id="notify">
    <v-app>
      <v-main>
        <v-container fluid>
          <div class="pt-5 mt-5" v-if="statuswait">
            <div class="text-center">
              <h2 class="primary--text">
                <v-icon x-large color="primary">mdi-weather-cloudy</v-icon>
                Line Notify...
              </h2>
            </div>
            <div>
              <v-progress-linear
                indeterminate
                color="primary"
              ></v-progress-linear>
            </div>
          </div>
          <!-- <v-bottom-navigation :value="value" color="teal" grow>
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
          </v-bottom-navigation> -->
          <v-row dense>
            <v-col cols="12">
              <v-card class="mx-auto">
                <v-container fluid>
                  <v-row dense>
                    <v-col
                      v-for="(card, indexs) in messageList"
                      :key="indexs"
                      :cols="6"
                    >
                      <v-card>
                        <!-- <v-img
              :src="card.day"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img> -->
                        <v-card-text>
                          <span
                            v-for="(items, index) in card.messages"
                            :key="index"
                          >
                            <div
                              v-if="items.message != ''"
                              class="text--primary"
                            >
                              {{ items.message }}
                            </div>
                            <div v-else>
                              <br />
                            </div>
                          </span>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>หัวข้อ : {{ card.topic }} &nbsp;
                          เวลา &nbsp; {{ card.time }} &nbsp;
                          <v-icon
                            v-bind:style="[
                              currentDay == card.day
                                ? { color: 'blue' }
                                : { color: 'black' },
                            ]"
                            v-model="value"
                            >mdi-history</v-icon
                          >
                          <span
                            v-bind:style="[
                              currentDay == card.day
                                ? { color: 'blue' }
                                : { color: 'black' },
                            ]"
                            >{{ getDay(card.day) }}</span
                          >
                          <v-icon v-if="card.send" color="teal darken-2"
                            >mdi-message-text-clock</v-icon
                          >
                          <v-icon v-else color="red"
                            >mdi-message-text-lock</v-icon
                          >
                          <v-btn icon @click="openSetting(indexs)">
                            <v-icon color="green darken-2"
                              >mdi-cog-transfer-outline</v-icon
                            >
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="green">
            <v-btn icon dark @click="restoreDefault()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="save()">
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-col cols="12">
            <v-row>
              <v-col cols="5">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Current Token</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-text-field
                          class="centered-input text--darken-3 mt-3"
                          value="Select the configuration:"
                          color="grey lighten-43"
                          dense
                          single-line
                          v-model="currentToken"
                          label="token"
                        ></v-text-field>
                        <v-text-field
                          class="centered-input text--darken-3 mt-3"
                          value="Select the configuration:"
                          color="grey lighten-43"
                          dense
                          single-line
                          v-model="stickerPackageId"
                          label="stickerPackageId"
                        ></v-text-field>
                        <v-text-field
                          class="centered-input text--darken-3 mt-3"
                          value="Select the configuration:"
                          color="grey lighten-43"
                          dense
                          single-line
                          v-model="stickerId"
                          label="stickerId"
                        ></v-text-field>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="7">
                <!-- <v-subheader>Line Control</v-subheader> -->
                <span v-for="(item, index) in tokenList" :key="index">
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.desc }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          item.token
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-divider></v-divider>
          <v-list>
            <v-subheader
              ><span style="font-size:18px; color:green"
                >ประจำวัน {{ day }}</span
              ><v-btn x-small color="success" @click="addMessage()">+</v-btn>
              <v-checkbox label="ส่งข้อความ" v-model="sendMessage"></v-checkbox>
              <v-spacer></v-spacer>หัวข้อ :
              <v-spacer
                ><span>
                  <v-text-field
                    class="centered-input text--darken-3 mt-3"
                    value="Select the configuration:"
                    color="grey lighten-43"
                    dense
                    single-line
                    v-model="topic"
                    label="หัวข้อ"
                  ></v-text-field></span
              ></v-spacer>
              เวลา :
              <span
                ><v-text-field
                  class="centered-input text--darken-3 mt-3"
                  value="Select the configuration:"
                  color="grey lighten-43"
                  dense
                  single-line
                  v-model="time"
                  label="เวลา"
                ></v-text-field
              ></span>
            </v-subheader>
            <v-list-item>
              <v-list-item-content>
                <span
                  v-for="(item, index) in messageSetting.messages"
                  :key="index"
                >
                  <v-row no-gutters>
                    <v-col cols="11">
                      <v-text-field
                        class="centered-input text--darken-3 mt-0"
                        value="Select the configuration:"
                        color="grey lighten-43"
                        dense
                        single-line
                        height="22"
                        v-model="item.message"
                        label="ข้อความ"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn x-small color="error" @click="removeMessage(index)"
                        >X</v-btn
                      >
                    </v-col>
                  </v-row>
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
    <Snackbar :snackbarcomponent="snackbarcomponent" />
  </div>
</template>
<script>
import axios from "axios";
import Snackbar from "@/components/cSnackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      snackbarcomponent: {
        color: "green",
        icon: "",
        mode: "",
        position: "top",
        text: "",
        timeout: 3000,
        title: "",
        visible: false,
      },
      statuswait: true,
      currentDay: new Date().getDay(),
      value: [],
      notify: [],
      message: [],
      messageList: [],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      currentToken: "",
      stickerPackageId: "",
      stickerId: "",
      tokenList: [],
      messageSetting: [],
      tmpMessage:[],
      indexMessage:0,
      sendMessage: false,
      time: "",
      topic: "",
      days: [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์",
      ],
      day: "",
    };
  },
  mounted() {
    let day = new Date();
    this.value = day.getDay();
    this.getNotify();
  },
  methods: {
    setsnackbar(text, icon, title, color, timeout) {
      this.snackbarcomponent.text = text;
      this.snackbarcomponent.icon = icon;
      this.snackbarcomponent.title = title;
      this.snackbarcomponent.mode = "multi-line";
      this.snackbarcomponent.color = color;
      this.snackbarcomponent.visible = true;
      this.snackbarcomponent.timeout = timeout;
    },
    async getNotify() {
      this.statuswait = true;
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
        this.currentToken = this.notify.token;
        this.tokenList = this.notify.tokenList;
        this.messageList = this.notify.messageList;
        this.statuswait = false;
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
    getDay(day) {
      return this.days[day];
    },
    restoreDefault(){
      this.dialog = false
      this.notify.messageList[this.indexMessage].messages = this.tmpMessage
    },
    openSetting(index) {
      this.dialog = true;
      this.indexMessage = index
      this.messageSetting = this.notify.messageList[index]
      this.tmpMessage=[]
      for(let i=0; i<this.notify.messageList[index].messages.length; i++){
        this.tmpMessage.push(this.notify.messageList[index].messages[i])
      }
      this.stickerPackageId = this.notify.stickerPackageId
      this.stickerId = this.notify.stickerId
      this.day = this.days[index];
      this.sendMessage = this.messageSetting.send;
      this.time = this.messageSetting.time;
      this.topic = this.messageSetting.topic;
    },
    addMessage() {
      this.messageSetting.messages.push({ message: "", status: "active" });
    },
    removeMessage(index) {
      this.messageSetting.messages.splice(index, 1);
    },
    async save() {
      this.dialog = false;
      this.notify.token = this.currentToken;
      this.notify.stickerPackageId = this.stickerPackageId;
      this.notify.stickerId = this.stickerId;
      this.messageSetting.send = this.sendMessage;
      this.messageSetting.time = this.time;
      this.messageSetting.topic = this.topic;
      // console.log(JSON.stringify(this.notify))
      let result = await axios
        .post("https://us-central1-fir-api-514b9.cloudfunctions.net/api/save", {
          collection: "notify",
          criteria: "update",
          data: this.notify,
        })
        .catch((err) => {
          this.setsnackbar(
            "save fail " + err,
            "mdi-close-circle",
            "Fail",
            "error",
            5000
          );
        });
      if (result.data != null) {
        this.setsnackbar(
          "save success",
          "mdi-checkbox-marked-circle-outline",
          "Success",
          "success",
          3000
        );
      }
    },
  },
};
</script>
<style>
.container {
  /* max-width: 100vw; */
  padding: 0px;
}
</style>
