<template>
  <div>
    <CRow v-can="'permission-edit'">
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" class="card-title mb-0">Edit permission</h4>
              </CCol>
              <CCol sm="7" class="d-none d-md-block">
                <CButton
                  color="info"
                  class="float-right"
                  router-link
                  to="/permissions"
                >
                  <v-icon name="arrow-circle-left" />
                  Permission lists
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <form name="form" @submit.prevent="updatePermission">
            <CCardBody>
              <CInput
                v-model="permission.name"
                type="text"
                label="permission name"
                placeholder="permission name"
                required
              />
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
      permission: {
        name: "",
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
    this.Permission();
  },
  methods: {
    Permission() {
      let id = this.$route.params.id;
      Service.Get("permission/" + id).then((response) => {
        if (response.status == 200) {
          this.permission = response.data.permission;
        }
      });
    },

    updatePermission() {
      let id = this.$route.params.id;
      Service.Put("permission/" + id, this.permission).then((response) => {
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
