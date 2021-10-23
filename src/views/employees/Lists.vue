<template>
  <div>
    <CRow v-can="'employee-list'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Employee lists</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  v-can="'employee-create'"
                  color="info"
                  class="float-right"
                  router-link
                  to="/employees/add"
                >
                  <v-icon name="plus-circle" />
                  Add New Employee
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="employees"
              :fields="tableFields"
              head-color="light"
              pagination
            >
              <td slot="#" class="text-center" slot-scope="{ index }">
                <div>{{ index + 1 }}</div>
              </td>
              <td slot="Name" class="text-center" slot-scope="{ item }">
                <div>{{ item.name }}</div>
              </td>
              <td slot="Designation" class="text-center" slot-scope="{ item }">
                <div>{{ item.designation }}</div>
              </td>

              <td slot="Phone" class="text-center" slot-scope="{ item }">
                <div>{{ item.phone_number }}</div>
              </td>

              <td slot="Action" class="text-center" slot-scope="{ item }">
                <CButtonGroup>
                  <CButton
                    color="info"
                    router-link
                    :to="{ path: 'employees/view/' + item.id }"
                  >
                    <v-icon name="eye" />
                  </CButton>
                  <CButton
                    v-can="'employee-edit'"
                    color="primary"
                    router-link
                    :to="{ path: 'employees/update/' + item.id }"
                  >
                    <v-icon name="pen" />
                  </CButton>
                  <CButton
                    v-can="'employee-delete'"
                    color="danger"
                    @click="deleteEmployee(item.id)"
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
      employees: [],
      tableFields: [
        { key: "#", _classes: "text-center" },
        { key: "Name", _classes: "text-center" },
        { key: "Designation", _classes: "text-center" },
        { key: "Phone", _classes: "text-center" },
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
    deleteEmployee(id) {
      this.$confirm({
        title: "Confirm",
        message: "Are you sure you want to delete this employee?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm) {
            Service.Delete("employees/" + id).then((response) => {
              if (response.status == 200) {
                this.Employees();
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
