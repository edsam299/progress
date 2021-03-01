<template>
  <div>
        <v-btn color="grey" @click="send"><v-icon small left>mdi-plus</v-icon> update</v-btn>
        <input type="number" @onTest="onTest" v-model="taskvalue" size="3" style="width:100px;">
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue:0
    }
  },
  props:["p_data"],
  methods: {
    send(){
      console.log(this.taskvalue)
      this.$emit("test",this.taskvalue)
      console.log(this.p_data)
    },
    onTest(){
      this.$emit("test",this.taskvalue)
    }
  },
}
</script>

<style>

</style>