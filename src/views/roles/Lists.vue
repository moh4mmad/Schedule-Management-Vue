<template>
  <div>
    <CRow>
      <CCol md="6" v-can="'role-list'">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Role lists</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  v-can="'role-create'"
                  class="float-right"
                  router-link
                  to="/roles/add"
                >
                  <v-icon name="plus-circle" />
                  Add New Role
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="roles"
              :fields="tableFields"
              head-color="light"
              pagination
            >
              <td slot="#" class="text-center" slot-scope="{ index }">
                <div>{{ index + 1 }}</div>
              </td>
              <td slot="Role" class="text-center" slot-scope="{ item }">
                <div>{{ item.name }}</div>
              </td>

              <td slot="Action" class="text-center" slot-scope="{ item }">
                <CButtonGroup>
                  <CButton
                    v-can="'role-edit'"
                    color="primary"
                    router-link
                    :to="{ path: 'roles/update/' + item.id }"
                  >
                    <v-icon name="pen" />
                  </CButton>
                  <CButton
                    v-can="'role-delete'"
                    color="danger"
                    @click="deleteRole(item.id)"
                  >
                    <v-icon name="trash-alt" />
                  </CButton>
                </CButtonGroup>
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="6" v-can="'permission-list'">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Permission lists</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  v-can="'permission-create'"
                  class="float-right"
                  router-link
                  to="/permission/add"
                >
                  <v-icon name="plus-circle" />
                  Add New Permission
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="permissions"
              :fields="permissionFields"
              head-color="light"
              pagination
            >
              <td slot="#" class="text-center" slot-scope="{ index }">
                <div>{{ index + 1 }}</div>
              </td>
              <td slot="Name" class="text-center" slot-scope="{ item }">
                <div>{{ item.name }}</div>
              </td>

              <td slot="Action" class="text-center" slot-scope="{ item }">
                <CButtonGroup>
                  <CButton
                    v-can="'permission-edit'"
                    color="primary"
                    router-link
                    :to="{ path: 'permissions/update/' + item.id }"
                  >
                    <v-icon name="pen" />
                  </CButton>
                  <CButton
                    v-can="'permission-delete'"
                    color="danger"
                    @click="deletePermissions(item.id)"
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
      roles: [],
      permissions: [],
      tableFields: [
        { key: "#", _classes: "text-center" },
        { key: "Role", _classes: "text-center" },
        { key: "Action", _classes: "text-center" },
      ],
      permissionFields: [
        { key: "#", _classes: "text-center" },
        { key: "Name", _classes: "text-center" },
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
      this.Roles();
      this.Permissions();
    }
  },
  methods: {
    Permissions() {
      Service.Get("permissions").then((response) => {
        if (response.status == 200) {
          this.permissions = response.data.permissions;
        }
      });
    },
    Roles() {
      Service.Get("roles").then((response) => {
        if (response.status == 200) {
          this.roles = response.data.roles;
        }
      });
    },
    deleteRole(id) {
      this.$confirm({
        title: "Confirm",
        message: "Are you sure you want to delete this role?",
        button: {
          yes: "Yes",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm) {
            Service.Delete("roles/" + id).then((response) => {
              if (response.status == 200) {
                this.Roles();
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
