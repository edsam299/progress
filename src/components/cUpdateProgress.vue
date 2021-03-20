<template>
  <div id="Progress">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
              <h3 class="primary--text">Progress Developer Team</h3>
              <h5 class="caption">Progress Update & Team Status</h5>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3" class="text-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn
                      to="/addtask"
                      small
                      class="mr-3"
                      color="green"
                      v-show="addtask"
                    >
                      <v-icon left>mdi-account-multiple-plus</v-icon>
                    </v-btn></span
                  >
                </template>
                <span>AddTask</span>
              </v-tooltip>

              <v-btn to="/complete" small class="mr-3" color="green">
                <v-icon left>mdi-checkbox-marked-circle</v-icon>Complete
              </v-btn>
              <v-btn to="/deploy" small class="mr-3" color="blue">
                <v-icon left>mdi-checkbox-marked-circle</v-icon>Deploy
              </v-btn>
              <v-btn @click="isActivep = !isActivep" small class="mr-3">
                Switch
              </v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-select
                class="mt-0 pt-0"
                :items="members"
                v-model="selected"
                @change="filters(selected)"
                label="Developer Team"
              ></v-select>
            </v-col>
          </v-row>
          <div class="pt-5 mt-5" v-if="statuswait">
            <div class="text-center">
              <h2 class="primary--text">
                <v-icon x-large color="primary">mdi-weather-cloudy</v-icon>
                กำลังโหลดข้อมูล...
              </h2>
            </div>
            <div>
              <v-progress-linear
                indeterminate
                color="primary"
              ></v-progress-linear>
            </div>
          </div>
          <v-row class="pa-1 ma-0" v-if="isActivep">
            <v-col cols="12">
              <span v-for="(item, index) in progval" :key="index">
                <v-card
                  v-if="item.statusCode == 'active'"
                  v-model="item.statusCode"
                  class="ma-1 mt-3 pb-3 pl-4"
                  color="grey lighten-5"
                  @click="addYourProgress(item, index)"
                >
                  <v-row no-gutters class="pt-1">
                    <v-col
                      cols="12"
                      sm="12"
                      md="3"
                      lg="3"
                      xl="3"
                      class="text-center mt-3"
                    >
                      <v-progress-circular
                        :rotate="180"
                        :size="90"
                        :width="10"
                        :value="calProgress(item)"
                        :color="getcolor(item)"
                      >
                        <h3>{{ calProgress(item) }}%</h3>
                      </v-progress-circular>
                      <div class="title font-weight-bold black--text">
                        {{ item.project }}
                      </div>
                      <h4
                        class="indigo--text body-2"
                        v-if="item.description != null"
                      >
                        <span class=""> รายละเอียด: </span
                        >{{ item.description }}
                      </h4>
                      <h4
                        class="indigo--text body-2"
                        v-if="item.startdate != null"
                      >
                        เริ่ม Project: {{ item.startdate }}
                      </h4>
                    </v-col>
                    <v-col cols="12" sm="12" md="9" lg="9" xl="9" class="pr-5">
                      <span
                        v-for="(member, indexs) in item.members"
                        :key="indexs"
                      >
                        <v-divider
                          v-if="indexs > 0"
                          class="mt-2 mb-2"
                        ></v-divider>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12" md="2" lg="2" xl="2">
                            <v-chip
                              class="ma-2 ml-0 text-subtitle-2 white--text"
                              color="grey darken-1"
                              dark
                              label
                              ><v-icon left color="white">
                                mdi-account
                              </v-icon>
                              {{ member.member }}
                            </v-chip>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="5"
                            lg="5"
                            xl="5"
                            class="mt-1"
                          >
                            <v-chip
                              label
                              small
                              color="teal"
                              dark
                              v-if="member.starttaskdate != null"
                            >
                              วันที่เริ่มงาน : {{ member.starttaskdate }}
                            </v-chip>
                            <v-chip
                              color="primary"
                              class="ma-1"
                              label
                              small
                              dark
                            >
                              Manday : {{ member.actuallyday }}/{{
                                member.manday
                              }}
                            </v-chip>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="12"
                            md="9"
                            lg="5"
                            xl="5"
                            class="text-right"
                          >
                            <v-chip
                              small
                              class="ma-1"
                              color="green"
                              text-color="white"
                              v-if="member.percentageadd > 0"
                            >
                              + {{ member.percentageadd }}%
                            </v-chip>
                            <span
                              class="fontfocus"
                              v-if="member.lastupd != null"
                              >UPDATE : {{ member.lastupd }}</span
                            ></v-col
                          >
                        </v-row>
                        <span
                          v-for="(task, indexs) in member.tasks"
                          :key="indexs"
                        >
                          <v-progress-linear
                            :value="task.value"
                            :color="getcolorProgressLine(task.value)"
                            height="20"
                            class="mt-1"
                          >
                            <v-layout row justify-space-between class="px-5">
                              <strong>{{ task.task }}</strong>
                              <strong
                                >{{ task.value }}%
                                <v-icon
                                  small
                                  color="black"
                                  v-if="task.value == 100"
                                  >mdi-checkbox-marked-circle-outline</v-icon
                                ></strong
                              >
                            </v-layout>
                          </v-progress-linear>
                        </span>
                        <div
                          class="black--text pl-2 mt-2"
                          v-if="member.remark != null && member.remark != ''"
                        >
                          <font class="font-weight-black"> Note : </font>
                          {{ member.remark }}
                        </div>
                      </span>
                    </v-col>
                  </v-row>
                  <v-layout justify-start> </v-layout>
                  {{ taskvalue }}
                </v-card>
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="ma-5 pa-5" elevation="2">
                <canvas id="my-chart"></canvas>
              </v-card>
            </v-col>
          </v-row>

          <v-row no-gutters> </v-row>
        </v-container>
      </v-main>
    </v-app>
    <v-dialog v-model="dialogAdd" max-width="1200px">
      <v-card>
        <v-img
          class="primary--text align-end"
          height="50px"
          src="@/assets/hd.jpg"
        >
          <v-card-title>
            Add Progress <font class="pl-2 black--text">{{ dlogProject }}</font
            ><v-spacer></v-spacer>
          </v-card-title>
        </v-img>

        <v-card-text>
          <v-row>
            <v-col cols="3"> </v-col>

            <v-col cols="6" class="text-center">
              <v-progress-circular
                :rotate="180"
                :size="120"
                :width="15"
                :value="calProgress(progressselect)"
                :color="getcolor(progressselect)"
              >
                <h2>{{ calProgress(progressselect) }}%</h2>
              </v-progress-circular>
              <div class="title font-weight-regular black--text">
                ความคืบหน้าของงาน
              </div>
            </v-col>
            <v-col cols="3"> </v-col>
          </v-row>

          <v-row
            v-for="(member, indexs) in progressselect"
            :key="indexs"
            no-gutters
            class="mt-5"
          >
            <v-col cols="12" class="pr-2">
              <v-card>
                <v-row no-gutters>
                  <v-col cols="1"></v-col>
                  <v-col
                    ><v-chip
                      class="text-subtitle-2 white--text"
                      color="grey darken-3"
                      dark
                      label
                      ><v-icon left color="white">
                        mdi-account
                      </v-icon>
                      {{ member.member }}
                    </v-chip></v-col
                  >
                  <v-col class="text-right">
                    <v-chip
                      label
                      small
                      color="teal"
                      dark
                      v-if="member.starttaskdate != null"
                    >
                      วันที่เริ่มงาน : {{ member.starttaskdate }}
                    </v-chip>
                    <v-chip color="primary" class="ma-2" label small dark>
                      Manday :{{ member.actuallyday }}/{{ member.manday }}
                    </v-chip>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      v-model="member.updActuallyday"
                      value="1"
                      v-if="member.actuallyday >= 0"
                      label="Actually Manday"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="addActuallyday(member, 'plus')"
                    >
                      <v-icon dark>
                        mdi-account-plus
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="addActuallyday(member, 'minut')"
                    >
                      <v-icon dark>
                        mdi-account-minus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <span v-for="(task, index) in member.tasks" :key="index">
                  <v-row no-gutters>
                    <v-col cols="1"></v-col>
                    <v-col cols="7">
                      <v-progress-linear
                        :value="task.value"
                        :color="getcolorProgressLine(task.value)"
                        height="35"
                        class="mt-1"
                      >
                        <v-layout row justify-space-between class="px-5">
                          <strong>{{ task.task }}</strong>
                          <strong>{{ task.value }}%</strong>
                        </v-layout>
                      </v-progress-linear>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="task.upd"
                        v-if="task.value < 100"
                        label="ความคืบหน้า"
                        outlined
                        dense
                      ></v-text-field>
                      <v-icon v-else color="green" large class="pt-1"
                        >mdi-checkbox-marked-circle-outline</v-icon
                      >
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        v-if="task.value < 100"
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        @click="addProgresss(task, index, indexs)"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </span>
                <v-row>
                  <v-col cols="2" class="justify-center text--center">
                    <v-checkbox
                      label="Remark History"
                      v-model="member.addremark"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Note"
                      value="dlogRemark"
                      v-model="member.remark"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-chip
                      small
                      class="ma-1"
                      color="green"
                      text-color="white"
                      v-if="member.percentageadd > 0"
                    >
                      + {{ member.percentageadd }}%
                    </v-chip>
                    <span class="fontfocus" v-if="member.lastupd != null"
                      >UPDATE : {{ member.lastupd }}</span
                    >
                    {{ idproject }}
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogAdd = false">
            Close
          </v-btn>
          <v-btn color="primary" @click="saveTask">
            Save
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar :snackbarcomponent="snackbarcomponent" />
    <!-- <v-snackbar
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
      <v-btn flat color="green" @click.native="snackbar = false">Close</v-btn> 
    </v-snackbar>-->
  </div>
</template>

<script>
//import addTask from "@/components/addTask.vue";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import moment from "moment";
import Snackbar from "@/components/cSnackbar.vue";

export default {
  name: "Progress",
  props: ["taskvalue"],
  components: {
    Snackbar,
  },
  data() {
    return {
      //snackbarcolor:'success',
      //snackbar: false,
      //text: '',
      // y:'top',
      progressstatus: null,
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
      //  checked: false,
      members: ["ALL"], //["ALL","บุษรา จี้เพชรงาม","ธนสาร กิติศุภวงศ์","ฐิติกานต์ เฉยบำรุง","สุกัญญา ศรีเตชะ","มงคล กิจรุ่งวิริยะ","ณรงค์เดช ช้างพลายงาม"],
      timestamp: null,
      index: 0,
      memberIndex: 0,
      upd: 0,
      value: 0,
      skill: 0,
      isActivep: true,
      dialogAdd: false,
      addtask: false,
      dlogMember: null,
      dlogRemark: null,
      dlogProject: null,
      dlogManday: null,
      updActuallyday: 1,
      progressselect: null,
      idproject: null,
      progval: [],
      tmpProgress: [],
      tmpAllprogress: [],
      selected: "",
      taskpercentage: [],
    };
  },
  methods: {
    getProgresspercentage(progress) {
      let percentage = 0;
      for (let i = 0; i < this.taskpercentage.length; i++) {
        percentage += parseInt(this.taskpercentage[i]);
      }
      progress.members[this.memberIndex].percentageadd = percentage;
    },
    filters(memberName) {
      this.tmpProgress = [];
      this.recallfilters();
      this.tmpAllprogress = this.progval;
      for (var i = 0; i < this.progval.length; i++) {
        for (let j = 0; j < this.progval[i].members.length; j++) {
          if (this.progval[i].members[j].member == memberName) {
            this.tmpProgress.push(this.progval[i]);
          }
        }
      }
      if (this.tmpProgress.length > 0) {
        this.progval = this.tmpProgress;
      } else {
        if (memberName != "ALL") {
          this.progval = this.tmpProgress;
        }
      }
      this.displayChart();
    },
    recallfilters() {
      if (this.tmpAllprogress.length > 0) {
        this.progval = this.tmpAllprogress;
      }
    },
    async getAllProject() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getAllProject",
          { statusCode: "active" }
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
        this.progval = result.data;
        this.statuswait = false;
        this.displayChart();
      }
    },
    async getAllMembers() {
      let result = await axios
        .get(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getAllMember"
        )
        .catch((err) => {
          this.setsnackbar(
            "Load Member " + err,
            "mdi-database",
            "Fail",
            "error",
            5000
          );
        });
      if (result.data != null) {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].statuscode == "active") {
            this.members.push(result.data[i].fullname);
          }
        }
      }
    },
    displayChart() {
      var ctx = document.getElementById("my-chart");
      new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: "bar",
        data: {
          labels: ["Progress Team Dev"],
          datasets: this.getdataBar(),
        },
      });
    },
    saveTask() {
      this.dialogAdd = false;
      //this.displayChart();
      // console.log(JSON.stringify(this.progval[this.index]))
      this.saveProgress(this.progval[this.index]);
    },
    async saveProgress(progress) {
      this.setsnackbar("กำลังจัดเก็บ", "mdi-database", "save", "info", 5000);
      let remark = {};
      let timestamp = this.getTimeStamp("YYYY-MM-DD HH:mm:ss");
      let date = this.getTimeStamp("YYYY-MM-DD");
      let duplicateremark = false;
      //console.log(JSON.stringify(progress))
      //console.log(progress.members[this.memberIndex].remark)
      //if(progress.members[this.memberIndex].remark != this.memberRemark){
      remark.date = date;
      remark.detail = progress.members[this.memberIndex].remark;
      //      for(let i=0; i<progress.members[this.memberIndex].remark.length; i++){
      //if(progress.members[this.memberIndex].remark[i].date != timestamp){
      if (
        typeof progress.members[this.memberIndex].remarkhistory == "undefined"
      ) {
        if (remark.detail != null) {
          progress.members[this.memberIndex].remarkhistory = [];
          progress.members[this.memberIndex].remarkhistory.push(remark);
        }
      } else {
        if (progress.members[this.memberIndex].addremark) {
          for (
            let i = 0;
            i < progress.members[this.memberIndex].remarkhistory.length;
            i++
          ) {
            if (
              progress.members[this.memberIndex].remarkhistory[i].detail ==
                remark.detail &&
              date == progress.members[this.memberIndex].remarkhistory[i].date
            ) {
              duplicateremark = true;
              break;
            }
          }
          if (duplicateremark == false) {
            progress.members[this.memberIndex].remarkhistory.push(remark);
          }
        }
      }
      if (this.progressstatus == "completed") {
        progress.statusCode = "completed";
      }
      progress.members[this.memberIndex].addremark = 0;
      progress.members[this.memberIndex].lastupd = timestamp;
      this.taskpercentage = [];
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/updateProject",
          progress
        )
        .catch((err) => {
          this.setsnackbar(
            "save fail " + err,
            "mdi-close-circle",
            "Fail",
            "error",
            5000
          );
        });
      if (result.data.length > 0) {
        this.setsnackbar(
          "save success",
          "mdi-checkbox-marked-circle-outline",
          "Success",
          "success",
          5000
        );
        this.displayChart();
      }
      result.data;
    },
    setsnackbar(text, icon, title, color, timeout) {
      this.snackbarcomponent.text = text;
      this.snackbarcomponent.icon = icon;
      this.snackbarcomponent.title = title;
      this.snackbarcomponent.mode = "multi-line";
      this.snackbarcomponent.color = color;
      this.snackbarcomponent.visible = true;
      this.snackbarcomponent.timeout = timeout;
    },
    addActuallyday(member, addType) {
      if (member.starttaskdate == null) {
        member.starttaskdate = this.getTimeStamp("YYYY-MM-DD");
      }
      //member.lastupd = this.getTimeStamp("YYYY-MM-DD HH:mm:ss");
      if (addType == "plus") {
        member.actuallyday += parseFloat(member.updActuallyday);
      } else {
        member.actuallyday -= parseFloat(member.updActuallyday);
      }
    },
    /*delCount() {
      this.$store.dispatch("delCount");
      this.value = this.$store.getters.getCount;
      this.skill = this.value;
    },*/
    addProgress() {
      if (this.progval[0].value > 0) {
        this.progval[0].value++;
      }
    },
    addProgresss(item, index, indexMember) {
      //if(val.value>0){
      /*console.log("memberIndex: "+indexMember)
        console.log(JSON.stringify(item))
      console.log(JSON.stringify(this.progval));
      console.log(new Date());*/
      moment.locale("th");
      let task = {};
      this.memberIndex = indexMember;
      //console.log(moment(Date()).format("YYYY-MM-DD hh:mm:ss"));
      if (parseInt(item.value) + parseInt(item.upd) <= 100) {
        this.progval[this.index].members[indexMember].tasks[index].value =
          parseInt(item.value) + parseInt(item.upd);
        this.progval[this.index].members[indexMember].tasks[
          index
        ].lastupd = this.getTimeStamp("YYYY-MM-DD hh:mm:ss");
      } else {
        this.setsnackbar(
          "Percentage Over 100 %",
          "mdi-alert-octagram",
          "Warning",
          "warning",
          5000
        );
        return;
      }
      task.date = this.getTimeStamp("YYYY-MM-DD");
      task.upd = item.upd;
      this.taskpercentage.push(item.upd);
      this.getProgresspercentage(this.progval[this.index]);
      //item.upd=''
      if (
        typeof this.progval[this.index].members[indexMember].tasks[index]
          .taskhistory == "undefined"
      ) {
        this.progval[this.index].members[indexMember].tasks[
          index
        ].taskhistory = [];
        this.progval[this.index].members[indexMember].tasks[
          index
        ].taskhistory.push(task);
      } else {
        this.progval[this.index].members[indexMember].tasks[
          index
        ].taskhistory.push(task);
      }

      let alltask = 0;
      let result = 0;
      for (let i = 0; i < this.progval[this.index].members.length; i++) {
        for (
          let j = 0;
          j < this.progval[this.index].members[i].tasks.length;
          j++
        ) {
          result += this.progval[this.index].members[i].tasks[j].value;
          alltask++;
        }
      }
      if (Number(Math.round(result / alltask + "e" + 2) + "e-" + 2) == 100) {
        this.progressstatus = "completed";
      } else {
        this.progressstatus = "active";
      }

      //}
    },
    calProgress(progress) {
      let result = 0;
      let alltask = 0;
      if (progress != null && typeof progress !== "undefined") {
        if (typeof progress.members !== "undefined") {
          for (let i = 0; i < progress.members.length; i++) {
            for (let j = 0; j < progress.members[i].tasks.length; j++) {
              alltask++;
              result += progress.members[i].tasks[j].value;
            }
          }
        } else {
          for (let i = 0; i < progress.length; i++) {
            for (let j = 0; j < progress[i].tasks.length; j++) {
              alltask++;
              result += progress[i].tasks[j].value;
            }
          }
        }
      }

      // Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      //this.progressstatus=Number(Math.round(result / alltask + "e" + 2) + "e-" + 2);
      // console.log(this.progressstatus)
      return Number(Math.round(result / alltask + "e" + 2) + "e-" + 2);
      //return Number(Math.round(5 / 3 + "e" + 2) + "e-" + 2);
    },
    addYourProgress(objItem, index) {
      //console.log(JSON.stringify(objItem));
      if (this.$store.getters.getAuthen) {
        // ถ้าผ่าน authen จะ add progress ได้
        this.dialogAdd = true;
        // this.checked = false;
        this.dlogMember = objItem.member;
        this.dlogRemark = objItem.remark;
        this.dlogProject = objItem.project;
        this.dlogManday = objItem.manday;
        this.progressselect = objItem.members;
        this.actuallyday = objItem.actuallyday;
        this.index = index; // index ของ progress ใหญ่
        this.idproject = objItem.id;
      }
    },
    getcolorProgressLine(pline) {
      if (pline == 100) {
        return "green darken-1";
      } else {
        return "blue lighten-2";
      }
    },
    getcolor(task) {
      let result = 0;
      let alltask = 0;

      if (task != null && typeof task !== "undefined") {
        if (typeof task.members != "undefined") {
          for (let i = 0; i < task.members.length; i++) {
            for (let j = 0; j < task.members[i].tasks.length; j++) {
              alltask++;
              result += task.members[i].tasks[j].value;
            }
          }
        } else {
          //console.log(JSON.stringify(task))
          for (let i = 0; i < task.length; i++) {
            for (let j = 0; j < task[i].tasks.length; j++) {
              alltask++;
              result += task[i].tasks[j].value;
            }
          }
        }
      }
      // Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      var numTask = Number(Math.round(result / alltask + "e" + 2) + "e-" + 2);
      if (numTask <= 20) {
        return "red";
      } else if (numTask >= 80) {
        return "green";
      } else {
        return "primary";
      }
    },
    getdataBar() {
      var showBar = [];

      var dataReal = this.progval;
      var arrColorBar = [
        "#C2F3FE",
        "#D7B7EE",
        "#F0CC60",
        "#B7C9FF",
        "#F9B5C6",
        "#FF8000",
        "#1A237E",
        "#00897B",
        "#827717",
        "#263238",
      ];
      for (let i = 0; i < dataReal.length; i++) {
        var pname = dataReal[i].project;
        var mymember = dataReal[i].members;
        var mycolor = arrColorBar[i];
        var alltask = 0;
        let result = 0;
        for (let j = 0; j < mymember.length; j++) {
          for (let k = 0; k < mymember[j].tasks.length; k++) {
            result += mymember[j].tasks[k].value;
            alltask++;
          }
        }
        var numTask = Number(Math.round(result / alltask + "e" + 2) + "e-" + 2);
        showBar.push({
          label: pname,
          data: [numTask],
          backgroundColor: mycolor,
        });
      }
      return showBar;
    },
    getTimeStamp(format) {
      moment.locales("th");
      return moment(Date()).format(format);
    },
  },
  mounted() {
    if (this.$store.getters.getAuthen) {
      this.addtask = true;
    }
    console.log(this.addtask);
    this.getAllMembers();
    this.getAllProject();
    this.timestamp = moment(Date()).format("YYYY-MM-DD");
    /*var ctx = document.getElementById("my-chart");
    new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: "bar",
      data: {
        labels: ["Progress Team Dev"],
        datasets: this.getdataBar(),
      },
    });*/
  },
};
</script>

<style scoped>
.fontlayout {
  color: rgb(3, 3, 8);
  font-size: 14px;
  font-weight: 500;
}
.fontfocus {
  color: rgb(233, 0, 0);
  font-size: 14px;
  font-weight: 500;
}
</style>
