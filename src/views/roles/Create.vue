<template>
  <div>
    <CRow v-can="'role-create'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Add new role</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/roles"
                >
                  <v-icon name="arrow-circle-left" />
                  Role lists
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <form name="form" @submit.prevent="newRole">
            <CCardBody>
              <CInput
                v-model="role.name"
                type="text"
                label="role name"
                placeholder="role name"
                required
              />
              <div role="group" class="form-group">
                <label> Select permissions </label>
                <select
                  class="form-control"
                  v-model="role.permissions"
                  multiple
                >
                  <option
                    v-for="perm in permissions"
                    :value="perm.id"
                    :key="perm.id"
                    >{{ perm.name }}</option
                  >
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
      permissions: [],
      role: {
        name: "",
        permissions: [],
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
    }
    this.Permissions();
  },
  methods: {
    Permissions() {
      Service.Get("permissions").then((response) => {
        if (response.status == 200) {
          this.permissions = response.data.permissions;
        }
      });
    },
    newRole() {
      let data = new FormData();

      data.append("name", this.role.name);
      this.role.permissions.forEach((role) => {
        data.append("permission[]", role);
      });

      Service.Post("roles", data).then((response) => {
        if (response.status == 200) {
          this.$router.push("/roles").catch(() => {});
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
