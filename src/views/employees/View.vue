<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">View employee</h4>
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
      <CRow>
        <div class="col-md-12 ml-3 mt-2">
          <h5>{{ employee.name }}</h5>
          <p>
            <span class="mr-1"
              ><strong>{{ employee.designation }}</strong></span
            >
          </p>
          <p>
            <span class="mr-1"
              ><strong>{{ employee.address }}</strong></span
            >
          </p>
          <p>
            <span class="mr-1"
              ><strong>{{ employee.phone_number }}</strong></span
            >
          </p>
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
      employee: [],
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
      this.Employee();
    }
  },
  methods: {
    Employee() {
      let id = this.$route.params.id;
      Service.Get("employees/" + id).then((response) => {
        if (response.status == 200) {
          this.employee = response.data.user;
        }
      });
    },
  },
};
</script>
