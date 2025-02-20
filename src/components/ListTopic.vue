<template>
  <div>
    <h2>All Topics</h2>
    <router-link to="/add">
      <button style="margin-bottom: 10px;">Add New Topic</button>
    </router-link>

    <table border="1">
      <thead>
        <tr>
          <th>GUID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item) in paginatedTopics" :key="item.guid">
          <tr>
            <td>{{ item.guid }}</td>
            <td>{{ item.name }}</td>
            <td>
              <router-link :to="'/edit/' + item.guid">Edit</router-link>
              <button @click="deleteTopic(item.guid)" style="background: red; color: white; margin-left: 10px;">
                Delete
              </button>
              <button @click="toggleComments(item.guid)" style="margin-left: 10px;">
                {{ expandedTopic === item.guid ? 'Hide Comments' : 'View Comments' }}
              </button>
            </td>
          </tr>
          <tr v-if="expandedTopic === item.guid">
            <td colspan="3">
              <ul v-if="item.comments && item.comments.length">
                <li v-for="(comment, i) in item.comments" :key="i">
                  <strong>{{ comment.by }}</strong>: 
                  <span v-if="!comment.isEditing">{{ comment.comment }}</span>
                  <input v-else v-model="comment.editedText" />

                  <em>({{ comment.date }})</em>

                  <button v-if="!comment.isEditing" @click="editComment(item.guid, i)">Edit</button>
                  <button v-else @click="saveComment(item.guid, i)">Save</button>
                  <button @click="deleteComment(item.guid, i)" style="margin-left: 10px;">Delete</button>
                </li>
              </ul>
              <p v-else>No comments available.</p>

              <!-- Add new comment -->
              <div>
                <input v-model="newCommentText" placeholder="Write a comment..." />
                <input v-model="newCommentAuthor" placeholder="Your name" />
                <button @click="addComment(item.guid)">Add Comment</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div style="margin-top: 10px;">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span> Page {{ currentPage }} of {{ totalPages }} </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: JSON.parse(localStorage.getItem('topics')) || [],
      expandedTopic: null,
      currentPage: 1,
      perPage: 20, // Show 20 topics per page
      newCommentText: '',
      newCommentAuthor: '',
    };
  },
  computed: {
    sortedTopics() {
      return [...this.topics].reverse();
    },
    totalPages() {
      return Math.ceil(this.sortedTopics.length / this.perPage);
    },
    paginatedTopics() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedTopics.slice(start, start + this.perPage);
    }
  },
  methods: {
    deleteTopic(guid) {
      if (confirm("Are you sure you want to delete this topic?")) {
        this.topics = this.topics.filter(topic => topic.guid !== guid);
        this.saveTopics();
      }
    },
    toggleComments(guid) {
      this.expandedTopic = this.expandedTopic === guid ? null : guid;
    },
    addComment(guid) {
      if (!this.newCommentText.trim() || !this.newCommentAuthor.trim()) {
        alert("Please enter both comment and author.");
        return;
      }

      const topic = this.topics.find(topic => topic.guid === guid);
      if (topic) {
        topic.comments.push({
          comment: this.newCommentText,
          date: new Date().toISOString(),
          by: this.newCommentAuthor,
        });
        this.saveTopics();
      }

      this.newCommentText = '';
      this.newCommentAuthor = '';
    },
    editComment(guid, index) {
      const topic = this.topics.find(topic => topic.guid === guid);
      if (topic) {
        topic.comments[index].isEditing = true;
        topic.comments[index].editedText = topic.comments[index].comment;
      }
    },
    saveComment(guid, index) {
      const topic = this.topics.find(topic => topic.guid === guid);
      if (topic) {
        topic.comments[index].comment = topic.comments[index].editedText;
        topic.comments[index].isEditing = false;
        this.saveTopics();
      }
    },
    deleteComment(guid, index) {
      if (confirm("Are you sure you want to delete this comment?")) {
        const topic = this.topics.find(topic => topic.guid === guid);
        if (topic) {
          topic.comments.splice(index, 1);
          this.saveTopics();
        }
      }
    },
    saveTopics() {
      localStorage.setItem('topics', JSON.stringify(this.topics));
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>
