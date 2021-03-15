<template>
  <div>
    <v-app>
      <v-main>
        <v-container fluid>          
          <v-row no-gutters>
            <v-col cols="12">
              <v-layout row wrap justify-center>
                <span v-for="(item, index) in project.member" :key="index">
                  <v-row class="pa-1 ma-0">
                    <v-card>                      
                      <span>{{item.member}}</span>
                      <span v-for="(items, indexs) in item.task" :key="indexs">
                        <v-button class="success" @click="addTask(indexs)">addTask</v-button>
                        {{items.name}}
                      </span>
                    </v-card>
                  </v-row>
                </span>
              </v-layout>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        member: [
          {
            member: "ED",
            task: [
              { name: "Code Review", desc: "CC" },
              { name: "Coding", desc: "CCD" }
            ]
          },
          {
            member: "ED1",
            task: [
              { name: "Code Review", desc: "CC" },
              { name: "Coding", desc: "CCD" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    addTask(index) {
      console.log(index)
      this.project.menber.task[index].push({ name: "ed", desc: "ssss" });
    }
  }
};
</script>

<style>
</style>