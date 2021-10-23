<template>
  <div>
    <CRow>
      <CCol md="12" v-can="'task-list'">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Task lists</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/tasks/add"
                  v-can="'task-create'"
                >
                  <v-icon name="plus-circle" />
                  Add New Task
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="tasks"
              :fields="tableFields"
              head-color="light"
              pagination
            >
              <td slot="#" class="text-center" slot-scope="{ index }">
                <div>{{ index + 1 }}</div>
              </td>
              <td slot="Task" class="text-center" slot-scope="{ item }">
                <div>{{ item.task_title }}</div>
              </td>

              <td slot="Employee" class="text-center" slot-scope="{ item }">
                <div>{{ item.employee.name }}</div>
              </td>
              <td slot="Start date" class="text-center" slot-scope="{ item }">
                {{ item.start_date }}
              </td>

              <td slot="End date" class="text-center" slot-scope="{ item }">
                {{ item.end_date }}
              </td>

              <td slot="Status" class="text-center" slot-scope="{ item }">
                {{ item.status }}
              </td>

              <td slot="Action" class="text-center" slot-scope="{ item }">
                <CButtonGroup>
                  <CButton
                    color="info"
                    router-link
                    :to="{ path: 'tasks/view/' + item.id }"
                  >
                    <v-icon name="eye" />
                  </CButton>
                  <CButton
                    color="primary"
                    v-can="'task-edit'"
                    router-link
                    :to="{ path: 'tasks/update/' + item.id }"
                  >
                    <v-icon name="pen" />
                  </CButton>
                  <CButton
                    v-can="'task-delete'"
                    color="danger"
                    @click="deleteTask(item.id)"
                  >
                    <v-icon name="trash-alt" />
                  </CButton>
                </CButtonGroup>
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Service from "../../services/user/user.service";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      tasks: [],
      tableFields: [
        { key: "#", _classes: "text-center" },
        { key: "Task", _classes: "text-center" },
        { key: "Employee", _classes: "text-center" },
        { key: "Start date", _classes: "text-center" },
        { key: "End date", _classes: "text-center" },
        { key: "Status", _classes: "text-center" },
        { key: "Action", _classes: "text-center" },
      ],
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
    }
  },
  methods: {
    Tasks() {
      Service.Get("taskSchedules").then((response) => {
        if (response.status == 200) {
          this.tasks = response.data.tasks;
        }
      });
    },
    deleteTask(id) {
      this.$confirm({
        title: "Confirm",
        message: "Are you sure you want to delete this task?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm) {
            Service.Delete("taskSchedules/" + id).then((response) => {
              if (response.status == 200) {
                this.Tasks();
                this.$notify({
                  group: "notify",
                  type: "success",
                  title: response.data.message,
                });
              }
            });
          }
        },
      });
    },
  },
};
</script>
