import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Notifications from "vue-notification";
import authHeader from "./token.services";

Vue.use(VueAxios, axios);
Vue.use(Notifications);

const apiUrl = "http://127.0.0.1:8000/api/";

class AuthService {
    async login(user) {
        try {
            let data = {
                phone_number: user.phone_number,
                password: user.password,
            };
            const response = await Vue.axios.post(apiUrl + "auth/login", data);
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem(
                    "permissions",
                    JSON.stringify(response.data.permissions)
                );
                Vue.directive("can", {
                    bind: function(el, binding, vnode) {
                        if (!JSON.parse(localStorage.getItem("permissions")).includes(
                                binding.expression.replace(/'/g, "").replace(/"/g, "")
                            )) {
                            vnode.elm.style.display = "none";
                        }
                    },
                });
            }
            return response;
        } catch (error) {
            Vue.prototype.$notify({
                group: "notify",
                type: "error",
                title: error.response.data.message,
            });
            return error.response;
        }
    }

    async logout() {
        let token = authHeader();
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
        try {
            const response = await Vue.axios.post(apiUrl + "auth/logout", [], {
                headers: token,
            });
            return response;
        } catch (error) {
            Vue.prototype.$notify({
                group: "notify",
                type: "error",
                title: error.response.data.message,
            });

            return error.response;
        }
    }
}

export default new AuthService();