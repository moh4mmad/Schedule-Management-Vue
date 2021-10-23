<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">View task</h4>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="info" class="float-right" router-link to="/tasks">
              <v-icon name="arrow-circle-left" />
              Task lists
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CRow>
        <div class="col-md-12 ml-3">
          <h5>{{ task.task_title }}</h5>
          <p class="text-justify pt-1 mr-4" v-html="task.tast_description"></p>
          <p>{{ task.start_date }}</p>
          <p>{{ task.end_date }}</p>
          <p>{{ task.status }}</p>
        </div>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import Service from "../../services/user/user.service";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      task: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.UserAuth.status.loggedIn;
    },
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push("/auth").catch(() => {});
    } else {
      this.Task();
    }
  },
  methods: {
    Task() {
      let id = this.$route.params.id;
      Service.Get("taskSchedules/" + id).then((response) => {
        if (response.status == 200) {
          this.task = response.data.task;
        }
      });
    },
  },
};
</script>
