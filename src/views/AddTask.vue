<template>
  <div id="addtask">
    <v-app>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-text-field
                name="name"
                label="Project"
                id="id"
              ></v-text-field>              
            </v-col>
            <v-col cols="2">
              <v-btn block color="success">Add Member</v-btn>
            </v-col>
          </v-row>
          <v-card>
            <v-card-title primary-title>
              <v-container>
                <v-row
                  class="d-flex flex-row align-center"
                  v-for="(item, index) in project.member"
                  :key="index"
                >
                <v-col cols="12" class="d-flex flex-row align-center">
                  <span> {{ item.member }}</span>
                  <v-spacer></v-spacer>
                  <v-btn color="error">Remove Member</v-btn>
                </v-col>
                <v-card>
                  <v-card-title primary-title>
                      <v-btn color="success">AddTask</v-btn> 
                     <v-container grid-list-xs>                      
                       <v-col cols="12">
                         <v-text-field
                           name="name"
                           label="task"
                           id="id"
                         ></v-text-field>
                         <v-text-field
                           name="name"
                           label="task"
                           id="id"
                         ></v-text-field>
                       </v-col>
                     </v-container>
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
  </div>
</template>

<script>
export default {
  name: "addtask",
  data() {
    return {
      project: {
        member: [
          {
            member: "ED",
            task: [
              { name: "Code Review", desc: "CC" },
              { name: "Coding", desc: "CCD" },
            ],
          },
          {
            member: "ED1",
            task: [
              { name: "Code Review", desc: "CC" },
              { name: "Coding", desc: "CCD" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    addTask(index) {
      console.log(index);
      this.project.menber.task[index].push({ name: "ed", desc: "ssss" });
    },
  },
};
</script>

<style></style>
