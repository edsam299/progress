<template>
  <div>
    <div>
      <v-row>
        <v-col cols="2" class="ml-15">
          <v-img max-width="250px" src="@/assets/deploy.jpg"></v-img>
        </v-col>
        <v-col
          ><v-chip
            class="ma-2 mt-4"
            x-large
            label
            color="blue"
            dark
            to="/dashboard"
            ><v-icon dark left x-large>
              mdi-home
            </v-icon>
            Home
          </v-chip>
          <v-chip class="ma-2 mt-4" x-large label color="grey darken-3" dark>
            Deploy ทั้งหมด
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
          Deploy 100%
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
                      >{{ datashow.item.domain }}
                    </font>
                  </template>
                  <span>ReleaseNote : {{ datashow.item.releaseNote }}</span>
                </v-tooltip>
                <!-- <font
                  v-if="datashow.item.desc != null"
                  class="pl-5 caption"
                  color="blue"
                  ><v-icon small color="primary">mdi-message</v-icon>
                  <v-tooltip>
                   releaseNote: {{ datashow.item.releaseNote }}
                  </v-tooltip>
                  </font
                > -->
              </td>
              <td class="text-left subtitle-1">
                {{ datashow.item.appName }}
              </td>
              <td class="text-left subtitle-1">{{ datashow.item.version }}</td>
              <!-- <td class="text-left subtitle-1">
                <v-chip
                  small
                  dark
                  class="ma-2"
                  :color="getcolorType(datashow.item.owner)"
                >
                  <v-icon left>mdi-account</v-icon>{{ datashow.item.owner }}
                </v-chip>
              </td>   -->
              <td class="text-left subtitle-1">
                <v-chip
                  small
                  dark
                  class="ma-2"
                  :color="getcolorType(datashow.item.developer)"
                >
                  <v-icon left>mdi-account</v-icon>{{ datashow.item.developer }}
                </v-chip>
              </td>                            
              <td class="text-center subtitle-1">{{ datashow.item.date }}</td>
              <td class="text-center subtitle-1">
                               <font
                  v-if="datashow.item.desc != ''"
                  class="pl-5 caption"
                  color="green"
                  ><v-icon small color="primary">mdi-message</v-icon>
                  {{ datashow.item.desc }}</font
                >
              </td>
              <td
                class="text-center subtitle-1"
                :class="{
                  'orange lighten-4': datashow.item.status != 'Success',
                  'green lighten-4': datashow.item.status == 'Success',
                }"
              >
                <v-icon
                  left
                  v-if="datashow.item.status == 'Success'"
                  color="green"
                  >mdi-check</v-icon
                ><v-icon
                  left
                  v-if="datashow.item.status == 'Fail'"
                  color="orange"
                  > mdi-close</v-icon
                >
                <!-- {{ datashow.item.status }} -->
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
          text: "Domain",
          align: "start",
          sortable: true,
          value: "domain",
          width: "150px"
        },
        { text: "AppName", value: "appName", sortable: true, width: "100px"},
        { text: "Version", value: "version", width:"100px"},
        // { text: "Owner", value: "owner" },
        { text: "ผู้พัฒนา", value: "developer"},
        { text: "DeployDate", value: "date", align: "center", width:"115px"},       
        { text: "รายละเอียด", value: "desc", align: "center"}, 
        { text: "สถานะ", value: "status", align: "center", width:"90px" },       
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
    async getDeploy() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getDeploy",
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
      if (this.dataTableAll != null) {
        for (var i = 0; i < this.dataTableAll.length; i++) {
            var status = "";
            if (this.dataTableAll[i].status == 'success') {
              status = "Success";
            } else {
              status = "Fail";
            }
            moment.locale("th");
            var deployDate = new Date(this.dataTableAll[i].date);
            deployDate=deployDate.getFullYear()+'-'+(deployDate.getMonth()+1)+'-'+deployDate.getDate();
            deployDate=moment(deployDate).format("YYYY-MM-DD")
            var obj = {
              domain: this.dataTableAll[i].domain,
              appName: this.dataTableAll[i].appName,              
              desc: this.dataTableAll[i].desc,
              owner: this.dataTableAll[i].owner,            
              developer: this.dataTableAll[i].develop,
              version: this.dataTableAll[i].version,
              releaseNote: this.dataTableAll[i].releaseNote,
              date: deployDate,
              status: status,
            };

            this.datashow.push(obj);
        }
      }
    },
  },
  created() {
    this.getDeploy();
  },
  mounted() {
    //var mydataShow =[];
  },
};
</script>

<style lang="scss" scoped></style>
