<template>
  <div id="addtask">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row>
            <span v-for="(item, index) in projects" :key="index">
              <v-chip
                class="ma-2"
                color="green"
                text-color="blue"
                outlined
                @click="getProjectId(index)"
              >
                {{ item.project }}
              </v-chip>
            </span>
          </v-row>
          <v-row no-gutters>
            <v-col cols="1">
              <v-text-field
                name="id"
                label="Project"
                v-model="project.project"
                id="id"
                autocomplete="nope"
                width="10px"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="name"
                label="Description"
                v-model="project.description"
                id="id"
                autocomplete="nope"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex flex-row align-center">
              <v-select
                class="mt-0 pt-0"
                :items="members"
                label="Developer Team"
                v-model="memberSelected"
                ref="developer"
                @change="setMember(memberSelected)"
                width="10%"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="success" @click="addMemberToTask()"
                      ><v-icon>mdi-account-plus</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>Add Developer</span>
              </v-tooltip>
                            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="success" @click="save()"
                      ><v-icon>mdi-database-plus</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>Save</span>
              </v-tooltip>
              <v-btn small color="error" @click="clear()">X</v-btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="success" to="/dashboard"
                      ><v-icon>mdi-home</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>Home</span>
              </v-tooltip>
            </v-col>
            <!-- <v-col cols="2">
              <v-text-field
                name="name"
                label="id"
                id="id"
                ref="idproject"
                v-model="idproject"
                autocomplete="autocomplete"
              ></v-text-field>
            </v-col> -->
            <!-- <v-col cols="2"> -->
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="blue" @click="getProjectById()"
                      ><v-icon>mdi-file-find</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>GetProjectId</span>
              </v-tooltip> -->
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="success" @click="save()"
                      ><v-icon>mdi-database-plus</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>Save</span>
              </v-tooltip>
              <v-btn small color="error" @click="clear()">X</v-btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-btn small color="success" to="/dashboard"
                      ><v-icon>mdi-home</v-icon></v-btn
                    ></span
                  >
                </template>
                <span>Home</span>
              </v-tooltip> -->
            <!-- </v-col> -->
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
          <v-card outlined>
            <v-card-title primary-title>
              <v-container fluid>
                <v-row
                  class="d-flex flex-row align-center"
                  v-for="(item, index) in project.members"
                  :key="index"
                >
                  <v-col cols="12" class="d-flex flex-row align-center">
                    <v-col cols="3">
                      <span> Developer: {{ item.member }}</span>
                    </v-col>
                    <v-col cols="1">
                      <v-text-field
                        dense
                        label="Mandays"
                        v-model="item.manday"
                        autocomplete="nope"
                      ></v-text-field>
                    </v-col>

                    <!-- <v-spacer></v-spacer> -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn
                            small
                            color="error"
                            @click="removeMember(index)"
                            ><v-icon>mdi-account-remove</v-icon></v-btn
                          ></span
                        >
                      </template>
                      <span>Remove Developer</span>
                    </v-tooltip>
                  </v-col>
                  <v-card outlined>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn small color="success" @click="addTask(index)"
                            ><v-icon>mdi-tag-plus</v-icon></v-btn
                          ></span
                        >
                      </template>
                      <span>Add Task</span>
                    </v-tooltip>

                    <v-card-title primary-title>
                      <v-row
                        v-for="(items, indexs) in project.members[index].tasks"
                        :key="indexs"
                      >
                        <v-container grid-list-xs>
                          <v-col cols="12">
                            <v-text-field
                              autofocus
                              name="name"
                              label="task"
                              id="id"
                              autocomplete="nope"
                              v-model="items.task"
                            ></v-text-field>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <span v-bind="attrs" v-on="on">
                                  <v-btn
                                    small
                                    color="error"
                                    @click="removeTask(index, indexs)"
                                    ><v-icon>mdi-tag-remove</v-icon></v-btn
                                  ></span
                                >
                              </template>
                              <span>Remove Task</span>
                            </v-tooltip>
                             {{items.value}} %
                          </v-col>
                        </v-container>
                      </v-row>
                    </v-card-title>
                  </v-card>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
    <Snackbar :snackbarcomponent="snackbarcomponent" />
  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
import Snackbar from "@/components/cSnackbar.vue";
export default {
  name: "addtask",
  components: {
    Snackbar,
  },
  data() {
    return {
      projects:[],
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
      statuswait: false,
      idproject: null,
      memberSelected: "",
      members: [],
      project: {
        enddate: "",
        startdate: "",
        kickoff: null,
        statusCode: "active",
        members: [],
      },
    };
  },
  methods: {
    resetproject() {
      this.project.description = "";
      this.project.project = "";
      this.project.enddate = "";
      this.project.starttaskdate = "";
      this.project.kickoff = null;
      this.project.statusCode = "active";
      this.project.members = [];
      this.memberSelected = "";
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
    clear() {
      this.project = [];
      this.idproject = "";
    },
    save() {
      if (typeof this.project.id === "undefined") {
        if (this.project.members.length > 0) {
          this.addProject();
        } else {
          this.setsnackbar(
            "Cannot save project cause empty developer",
            "mdi-checkbox-marked-circle-outline",
            "Error",
            "error",
            3000
          );
        }
      } else {
        this.updateProject();
      }
    },
    setMember(member) {
      this.memberSelected = member;
    },
    addMemberToTask() {
      if (this.memberSelected == "") {
        this.setsnackbar(
          "Please select developer",
          "mdi-checkbox-marked-circle-outline",
          "not found",
          "error",
          1500
        );
        this.$refs.developer.focus();
      } else {
        this.project.members.push({
          member: this.memberSelected,
          percentageadd: 0,
          actuallyday: 0,
          manday: this.manday,
          lastupd: "",
          updActuallyday: "",
          starttaskdate: null,
          addremark: 0,
          remark: "",
          tasks: [],
        });
      }
    },
    addTask(index) {
      this.project.members[index].tasks.push({
        task: "",
        lastupd: "ssss",
        color: "primary",
        value: 0,
        upd: "0",
      });
    },
    removeTask(memberIndex, taskIndex) {
      this.project.members[memberIndex].tasks.splice(taskIndex, 1);
    },
    removeMember(index) {
      this.project.members.splice(index, 1);
    },
    async getAllMembers() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getdocument",
          {
            collection: "member",
            criteria: "allOrderby",
            orderby: { key: "piority", value: "asc" },
          }
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
      async getProject() {
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getdocument",
          {
            collection: "project",
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
        // this.statuswait = false;
        // this.dataTableAll = result.data;
        this.projects = result.data;
        // this.renderTable();
      }
      return result;
    },
    getProjectId(index){
      // console.log(this.projects[index].id)
      this.idproject = this.projects[index].id
      this.getProjectById()
    },
    async getProjectById() {
      if (this.idproject == null) {
        this.setsnackbar(
          "Please insert idproject",
          "mdi-checkbox-marked-circle-outline",
          "not found",
          "error",
          5000
        );
        this.$refs.idproject.focus();
      } else {
        this.statuswait = true;
        let result = await axios
          .post(
            "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getdocument",
            { collection: "project", criteria: "id", id: this.idproject }
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
        if (result.data.success) {
          this.project = result.data.data;
          this.statuswait = false;
        } else {
          this.statuswait = false;
          this.setsnackbar(
            "search not found",
            "mdi-checkbox-marked-circle-outline",
            "not found",
            "error",
            5000
          );
        }
      }
    },

    async addProject() {
      this.setsnackbar("กำลังจัดเก็บ", "mdi-database", "save", "info", 5000);
      let result = await axios
        .post("https://us-central1-fir-api-514b9.cloudfunctions.net/api/save", {
          collection: "project",
          criteria: "save",
          data: this.project,
        })
        .catch((err) => {
          this.setsnackbar(
            "Load Project " + err,
            "mdi-database",
            "Fail",
            "error",
            5000
          );
        });

      if (result.data != null) {
        this.resetproject();
        this.setsnackbar(
          "save success",
          "mdi-checkbox-marked-circle-outline",
          "Success",
          "success",
          5000
        );
        //this.project = [];
      }
    },

    async updateProject() {
      this.setsnackbar("กำลังจัดเก็บ", "mdi-database", "save", "info", 5000);
      let result = await axios
        .post("https://us-central1-fir-api-514b9.cloudfunctions.net/api/save", {
          collection: "project",
          criteria: "update",
          data: this.project,
        })
        .catch((err) => {
          this.setsnackbar(
            "Load Project " + err,
            "mdi-database",
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
          5000
        );
        this.project = [];
        this.idproject = "";
      }
    },
  },
  mounted() {
    if (!this.$store.getters.getAuthen) {
      this.$router.push("dashboard");
    } else {
      this.getAllMembers();
      this.getProject()
    }
  },
};
</script>

<style></style>
