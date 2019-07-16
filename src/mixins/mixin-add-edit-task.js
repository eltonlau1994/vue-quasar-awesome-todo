export default {
  methods: {
    onSubmit() {
      console.log("onSubmit");
      this.$refs.modalTaskName.$refs.name.validate()
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    }
  }
}
