<template>
  <div id="addtask">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="1">
              <v-text-field
                name="name"
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
                width="30px"
                autocomplete="nope"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex flex-row align-center">
              <v-select
                class="mt-0 pt-0"
                :items="members"
                label="Developer Team"
                v-model="memberSelected"
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
                autocomplete="nope"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn small color="blue" @click="getProjectById()"
                >getProject</v-btn
              >
              <v-btn small color="success" @click="save()">save</v-btn>
            </v-col>
          </v-row>
          <v-card height="60%">
            <v-card-title primary-title>
              <v-container fluid>
                <v-row
                  class="d-flex flex-row align-center"
                  v-for="(item, index) in project.members"
                  :key="index"
                >
                  <v-col cols="12" class="d-flex flex-row align-center">
                    <span> Developer: {{ item.member }}</span>
                    <v-spacer></v-spacer>
                    <v-btn small color="error" @click="removeMember(index)"
                      >Remove Member</v-btn
                    >
                  </v-col>
                  <v-card height="60%">
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
      memberSelected: "",
      members: [],
      project: {
        members: [
          // {
          //   member: "",
          //   task: [
          //     // { name: "Code Review", desc: "CC" },
          //     // { name: "Coding", desc: "CCD" },
          //     // { name: "Coding", desc: "CCD" },
          //     // { name: "Coding", desc: "CCD" },
          //   ],
          // },
          // {
          //   // member: "ED1",
          //   task: [
          //     // { name: "Code Review", desc: "CC" },
          //     // { name: "Coding++", desc: "CCD" },
          //   ],
          // },
        ],
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
    save(){
      console.log(JSON.stringify(this.project))
    },
    setMember(member) {
      this.memberSelected = member;
      console.log(this.memberSelected);
    },
    addMemberToTask() {
      this.project.members.push({
        member: this.memberSelected,
        name: "test",
        tasks: [],
      });
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
      let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getProjectById",
          { id: "3C1Yt2zAWt9MuMDq5nfz" }
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
        console.log(JSON.stringify(result.data[0]));
        this.project = result.data[0];
      }
    },
  },
  mounted() {
    this.getAllMembers();
  },
};
</script>

<style></style>
