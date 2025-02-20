<template>
  <div>
    <h2>Add Topic</h2>
    <form @submit.prevent="addTopic">
      <input v-model="newTopicName" placeholder="Enter topic name" required />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTopicName: '',
      topics: JSON.parse(localStorage.getItem('topics')) || []
    };
  },
  methods: {
    addTopic() {
      if (!this.newTopicName.trim()) return;

      const newTopic = {
        name: this.newTopicName,
        guid: Math.random().toString(36).substr(2, 8), // Generate random GUID
        comments: []
      };

      this.topics.push(newTopic); // Add new topic
      localStorage.setItem('topics', JSON.stringify(this.topics)); // Save to storage

      this.$router.push('/'); // Redirect to list
    }
  }
};
</script>
