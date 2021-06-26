<template>
  <div>
    <v-app>
      <v-main>
        <v-container fluid>
          <v-card> </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {    
    data() {
        return {
            project:[]            
        }
    },
    methods: {
        getProject(){
            let result = await axios
        .post(
          "https://us-central1-fir-api-514b9.cloudfunctions.net/api/getdocument",
          {"collection":"project","criteria":"where","where":{"key":"statusCode", "value":"active","operator":"=="}, "orderby":false}
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
            // this.renderTable();
            console.log(result)
        }
            return result;
        }
    },
}
</script>