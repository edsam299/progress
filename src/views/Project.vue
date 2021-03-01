<template>
  <v-app>
    <v-form>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <v-layout row wrap justify-center>
              <v-flex>
                <v-text-field
                  v-model="text"
                  label="Project"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-btn color="success">+</v-btn>
            </v-layout>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {};
  },
};
</script>

<style></style>
