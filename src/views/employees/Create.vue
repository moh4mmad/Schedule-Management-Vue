<template>
  <div>
    <CRow v-can="'employee-create'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Add new employee</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/employees"
                >
                  <v-icon name="arrow-circle-left" />
                  Employee lists
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <form name="form" @submit.prevent="newEmployee">
            <CCardBody>
              <CInput
                v-model="user.name"
                type="text"
                label="Employee name"
                placeholder="Employee name"
                required
              />

              <CInput
                v-model="user.designation"
                type="text"
                label="Employee designation"
                placeholder="Employee designation"
                required
              />

              <CInput
                v-model="user.address"
                type="text"
                label="Employee address"
                placeholder="Employee address"
                required
              />

              <CInput
                v-model="user.phone_number"
                type="text"
                label="Employee phone number"
                placeholder="Employee phone number"
                required
              />

              <CInput
                v-model="user.password"
                type="text"
                label="Password"
                placeholder="Password"
                required
              />

              <div role="group" class="form-group">
                <label> Select role </label>
                <select class="form-control" v-model="user.roles">
                  <option
                    v-for="perm in roles"
                    :value="perm.id"
                    :key="perm.id"
                    >{{ perm.name }}</option
                  >
                </select>
              </div>

              <div role="group" class="form-group">
                <label for="description" class=""> Status </label>
                <select class="form-control" v-model="user.status">
                  <option value="1">Active</option>
                  <option value="0">Deactivate</option>
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
      roles: [],
      user: {
        name: "",
        designation: "",
        address: "",
        phone_number: "",
        status: "",
        password: "",
        roles: [],
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
    this.Roles();
  },
  methods: {
    Roles() {
      Service.Get("roles").then((response) => {
        if (response.status == 200) {
          this.roles = response.data.roles;
        }
      });
    },
    newEmployee() {
      Service.Post("employees", this.user).then((response) => {
        if (response.status == 200) {
          this.$router.push("/employees").catch(() => {});
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
