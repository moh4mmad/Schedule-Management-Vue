<template>
  <div>
    <CRow v-can="'task-edit'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Update task</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/tasks"
                >
                  <v-icon name="arrow-circle-left" />
                  Tasks lists
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <form name="form" @submit.prevent="updateTasks">
            <CCardBody>
              <CInput
                v-model="task.end_date"
                type="date"
                label="task end date"
                placeholder="task end date"
                required
              />

              <div role="group" class="form-group">
                <label for="description" class=""> Status </label>
                <select class="form-control" v-model="task.status">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" color="success"
                ><v-icon name="check-circle" /> Submit</CButton
              >
            </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Service from "../../services/user/user.service";
export default {
  data() {
    return {
      employees: [],
      task: {
        employee_id: "",
        task_title: "",
        tast_description: "",
        start_date: "",
        end_date: "",
        status: "",
      },
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
      this.Tasks();
      this.Employees();
    }
  },
  methods: {
    Employees() {
      Service.Get("employees").then((response) => {
        if (response.status == 200) {
          this.employees = response.data.users;
        }
      });
    },
    Tasks() {
      let id = this.$route.params.id;
      Service.Get("taskSchedules/" + id).then((response) => {
        if (response.status == 200) {
          this.task = response.data.task;
        }
      });
    },
    updateTasks() {
      let id = this.$route.params.id;
      Service.Put("taskSchedules/" + id, this.task).then((response) => {
        if (response.status == 200) {
          this.$router.push("/tasks").catch(() => {});
          this.$notify({
            group: "notify",
            type: "success",
            title: response.data.message,
          });
        }
      });
    },
  },
  mounted() {},
};
</script>
