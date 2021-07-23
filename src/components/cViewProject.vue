<template>
  <div>
    <v-app>
      <v-main>
        <v-container fluid>
          <span v-for="(item, index) in projects" :key="index">
            <v-chip
              class="ma-2"
              color="green"
              outlined
              @click="getProjectId(index)"
            >
              {{ item.project }}
            </v-chip>
          </span>
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
      projects: [],
      // chip1: true,
      //   chip2: true,
      //   chip3: true,
      //   chip4: true,
    };
  },
  methods: {
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
      console.log(this.projects[index].id)
    }
  },
  mounted() {
    this.getProject();
  },
};
</script>
