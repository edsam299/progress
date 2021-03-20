<template>
  <div id="addtask">
    <v-app>
      <v-main>
        <v-container fluid>
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
            <v-col cols="4">
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
            <v-col cols="1">
              <v-btn small color="success" @click="addMemberToTask()"
                >+Developer</v-btn
              >
            </v-col>
            <v-col cols="2">
              <v-text-field
                name="name"
                label="id"
                id="id"
                ref="idproject"
                v-model="idproject"
                autocomplete="autocomplete"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn small color="blue" @click="getProjectById()"
                >getProject</v-btn
              >
              <v-btn small color="success" @click="save()">save</v-btn>
              <v-btn small color="error" @click="clear()">X</v-btn>
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
                    <v-btn small color="error" @click="removeMember(index)"
                      >Remove Member</v-btn
                    >
                  </v-col>
                  <v-card outlined>
                    <v-btn small color="success" @click="addTask(index)"
                      >Add Task</v-btn
                    >
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
                            <v-btn
                              small
                              color="error"
                              @click="removeTask(index, indexs)"
                              >remove task</v-btn
                            >
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
    setsnackbar(text, icon, title, color, timeout) {
      console.log(timeout);
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
        this.addProject();
      } else {
        this.updateProject();
      }
    },
    setMember(member) {
      this.memberSelected = member;
      console.log(this.memberSelected);
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
      console.log(index);
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
      console.log(index);
      this.project.members.splice(index, 1);
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
            "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getProjectById",
            { id: this.idproject }
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
        console.log(result.data);
        if (result.data.length > 0) {
          this.project = result.data[0];
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
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/addProject",
          this.project
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
      if (result.data != null) {
        this.setsnackbar(
          "save success",
          "mdi-checkbox-marked-circle-outline",
          "Success",
          "success",
          5000
        );
        this.project = [];
      }
    },

    async updateProject() {
      this.setsnackbar("กำลังจัดเก็บ", "mdi-database", "save", "info", 5000);
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/updateProject",
          this.project
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
    this.getAllMembers();
  },
};
</script>

<style></style>
