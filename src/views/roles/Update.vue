<template>
  <div>
    <CRow v-can="'role-edit'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Update role</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/roles"
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
                v-model="role.name"
                type="text"
                label="role name"
                placeholder="role name"
                required
              />
              <div role="group" class="form-group">
                <label> Select roles </label>
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
    } else {
      this.Role();
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
    Role() {
      let id = this.$route.params.id;
      let perms = [];
      Service.Get("roles/" + id).then((response) => {
        if (response.status == 200) {
          this.role = response.data.data;
          response.data.data.permissions.forEach((permission) => {
            perms.push(permission.id);
          });
          this.role.permissions = perms;
        }
      });
    },
    updateTasks() {
      let id = this.$route.params.id;
      Service.Put("roles/" + id, this.role).then((response) => {
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
