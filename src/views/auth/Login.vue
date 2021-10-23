<template>
  <div class="c-app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body">
                <form name="form" @submit.prevent="handleLogin">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <div role="group" class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <CIcon name="cil-user" />
                        </span>
                      </div>
                      <input
                        v-model="user.phone_number"
                        type="text"
                        placeholder="Phone"
                        autocomplete="phone"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div role="group" class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"
                          ><CIcon name="cil-lock-locked"
                        /></span>
                      </div>
                      <input
                        v-model="user.password"
                        type="password"
                        placeholder="Password"
                        autocomplete="curent-password"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="text-left col-6">
                      <button
                        type="submit"
                        class="btn px-4 btn-primary"
                        :disabled="loading"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              class="card text-center py-5 d-md-down-none bg-primary text-white"
            >
              <div class="card-body">
                <div class="card-body">
                  <h2>Lorem ipsum</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.UserAuth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/tasks");
    }
  },
  methods: {
    handleLogin() {
      if (this.user.phone_number && this.user.password) {
        this.loading = true;
        this.$store.dispatch("UserAuth/login", this.user).then((response) => {
          if (response.status == 200) {
            this.$router.push("/tasks");
          } else {
            this.loading = false;
          }
        });
      } else {
        this.$notify({
          group: "notify",
          type: "error",
          title: "Phone number & Password is required",
        });
      }
    },
  },
};
</script>
