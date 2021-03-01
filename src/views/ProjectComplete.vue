<template>
  <div>
    <div>
      <v-row>
        <v-col cols="2" class="ml-15">
          <v-img max-width="250px" src="@/assets/complete.jpg"></v-img>
        </v-col>
        <v-col
          ><v-chip
            class="ma-2 mt-4"
            x-large
            label
            color="green"
            dark
            to="/dashboard"
            ><v-icon dark left x-large>
              mdi-home
            </v-icon>
            Home
          </v-chip>
          <v-chip class="ma-2 mt-4" x-large label color="grey darken-3" dark>
            Project ทั้งหมด
            <font class="pl-3 display-1">{{ this.dataTableAll.length }}</font>
          </v-chip></v-col
        >
        <v-col class="d-flex justify-end mr-5"> </v-col>
      </v-row>
    </div>
    <div class="pt-5 mt-5" v-if="statuswait">
      <div class="text-center">
        <h2 class="primary--text">
          <v-icon x-large color="primary">mdi-weather-cloudy</v-icon>
          กำลังโหลดข้อมูล...
        </h2>
      </div>
      <div>
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </div>
    </div>
    <div class="ma-15 mt-5">
      <v-card>
        <v-card-title>
          งานที่เสร็จ 100%
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="datashow"
          :search="search"
          dense
          :footer-props="{
            'items-per-page-options': [15, 20, 30, 40, 50, 100],
          }"
          style="background-color:#FFFFFF"
          class="black--text"
          :items-per-page="15"
        >
          <template v-slot:item="datashow">
            <!-- <tr :class="{'light-green lighten-5': dataTableAll.item.checkComplete}"> -->
            <tr>
              <td class="text-left subtitle-1">
                <v-tooltip right color="grey darken-4">
                  <template v-slot:activator="{ on, attrs }">
                    <font v-bind="attrs" v-on="on"
                      >{{ datashow.item.project }}
                    </font>
                  </template>
                  <span>Tasks : {{ datashow.item.tasks }}</span>
                </v-tooltip>
                <font
                  v-if="datashow.item.description != null"
                  class="pl-5 caption"
                  color="blue"
                  ><v-icon small color="primary">mdi-message</v-icon>
                  {{ datashow.item.description }}</font
                >
              </td>
              <td class="text-left subtitle-1">
                <v-chip
                  small
                  dark
                  class="ma-2"
                  :color="getcolorType(datashow.item.member)"
                >
                  <v-icon left>mdi-account</v-icon>{{ datashow.item.member }}
                </v-chip>
              </td>
              <td class="text-left subtitle-1">
                {{ datashow.item.startDate }}
              </td>
              <td class="text-left subtitle-1">{{ datashow.item.endDate }}</td>
              <td class="text-center subtitle-1">{{ datashow.item.manday }}</td>
              <td class="text-center subtitle-1">
                {{ datashow.item.actuallyday }}
              </td>
              <td
                class="text-center subtitle-1"
                :class="{
                  'orange lighten-4': datashow.item.status == 'Delay',
                  'green lighten-4': datashow.item.status != 'Delay',
                }"
              >
                <v-icon
                  left
                  v-if="datashow.item.status == 'On time'"
                  color="green"
                  >mdi-check</v-icon
                ><v-icon
                  left
                  v-if="datashow.item.status == 'Delay'"
                  color="orange"
                  >mdi-calendar-clock</v-icon
                >{{ datashow.item.status }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <Snackbar :snackbarcomponent="snackbarcomponent" />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Snackbar from "@/components/cSnackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      statuswait: true,
      search: "",
      headers: [
        {
          text: "Project Name",
          align: "start",
          sortable: true,
          value: "project",
        },
        { text: "ผู้พัฒนา", value: "member", sortable: true },
        { text: "Startdate", value: "startDate" },
        { text: "Enddate", value: "endDate" },
        { text: "Manday", value: "manday", align: "center" },
        { text: "วันทำงานจริง", value: "actuallyday", align: "center" },
        { text: "status", value: "status", align: "center" },
      ],
      datashow: [],
      dataTableAll: [],
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
    };
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
    getcolorType(val) {
      var findstatus = false;
      var txtcolor = "";
      var mapCatalogColor = {
        "ณรงค์เดช ช้างพลายงาม": "blue-grey darken-4",
        "มงคล กิจรุ่งวิริยะ": "deep-purple",
        "บุษรา จี้เพชรงาม": "pink lighten-1",
        "ธนสาร กิติศุภวงศ์": "primary",
        "ฐิติกานต์ เฉยบำรุง": "amber darken-4",
        "สุกัญญา ศรีเตชะ": "teal",
        "สุริเยนทร์ แดงทองดี": "light-green darken-1",
      };
      for (const [key, value] of Object.entries(mapCatalogColor)) {
        //console.log(key + ' = ' + value)
        if (key == val) {
          findstatus = true;
          txtcolor = value;
          break;
        }
      }
      if (!findstatus) {
        return "grey darken-3";
      } else {
        return txtcolor;
      }
    },
    async getAllProjectCompleted() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getAllProject",
          { statusCode: "completed" }
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
        this.statuswait = false;
        this.dataTableAll = result.data;
        this.renderTable();
      }
      return result;
    },
    renderTable() {
      var txtDescription = null;
      if (this.dataTableAll != null) {
        for (var i = 0; i < this.dataTableAll.length; i++) {
          var projectName = this.dataTableAll[i].project;
          txtDescription = this.dataTableAll[i].description;
          for (var j = 0; j < this.dataTableAll[i].members.length; j++) {
            var status = "";
            var membername = this.dataTableAll[i].members[j].member;
            var manday = this.dataTableAll[i].members[j].manday;
            var actuallyday = this.dataTableAll[i].members[j].actuallyday;
            var taskAll = "";
            if (actuallyday > manday) {
              status = "Delay";
            } else {
              status = "On time";
            }
            for (
              var k = 0;
              k < this.dataTableAll[i].members[j].tasks.length;
              k++
            ) {
              var inTask = this.dataTableAll[i].members[j].tasks[k].task;
              if (taskAll == "") {
                taskAll = inTask;
              } else {
                taskAll = taskAll + ", " + inTask;
              }
            }
             moment.locale("th");
            var obj = {
              project: projectName,
              description: txtDescription,
              member: membername,
              tasks: taskAll,
              manday: this.dataTableAll[i].members[j].manday,
              actuallyday: this.dataTableAll[i].members[j].actuallyday,
              startDate: this.dataTableAll[i].members[j].starttaskdate,
              endDate:moment(this.dataTableAll[i].members[j].lastupd).format("YYYY-MM-DD"),
              status: status,
            };

            this.datashow.push(obj);
          }
        }
      }
    },
  },
  created() {
    this.getAllProjectCompleted();
  },
  mounted() {
    //var mydataShow =[];
  },
};
</script>

<style lang="scss" scoped></style>
