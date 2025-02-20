<template>
  <div>
    <h2>Edit Topic</h2>
    <form @submit.prevent="updateTopic">
      <input v-model="editedTopicName" required />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['guid'],
  data() {
    return {
      topics: JSON.parse(localStorage.getItem('topics')) || [],
      editedTopicName: ''
    };
  },
  mounted() {
    console.log(this.guid);
    let topic = this.topics.find(t => t.guid === this.guid);
    if (topic) this.editedTopicName = topic.name;
  },
  methods: {
    updateTopic() {
      let topic = this.topics.find(t => t.guid === this.guid);
      if (topic) {
        topic.name = this.editedTopicName;
        localStorage.setItem('topics', JSON.stringify(this.topics));
        this.$router.push('/');
      }
    }
  }
};
</script>
