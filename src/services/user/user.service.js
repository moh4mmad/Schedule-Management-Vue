import authHeader from "./token.services";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Notifications from "vue-notification";

Vue.use(VueAxios, axios);
Vue.use(Notifications);

var Api = Vue.axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: authHeader(),
});

class UserService {
    async Get(end_point) {
        try {
            const response = await Api.get(end_point);
            return response;
        } catch (error) {
            if (error.response.status == 401) {
                localStorage.removeItem("user");
                window.location.replace("/auth");
            }
            for (let field of Object.keys(error.response.data.errors)) {
                Vue.prototype.$notify({
                    group: "notify",
                    type: "error",
                    title: error.response.data.errors[field][0],
                });
            }
            return error.response;
        }
    }

    async Post(end_point, data) {
        try {
            const response = await Api.post(end_point, data);
            return response;
        } catch (error) {
            if (error.response.status == 401) {
                localStorage.removeItem("user");
                window.location.replace("/auth");
            }
            for (let field of Object.keys(error.response.data.errors)) {
                Vue.prototype.$notify({
                    group: "notify",
                    type: "error",
                    title: error.response.data.errors[field][0],
                });
            }
            return error.response;
        }
    }

    async Put(end_point, data) {
        try {
            const response = await Api.put(end_point, data);
            return response;
        } catch (error) {
            if (error.response.status == 401) {
                localStorage.removeItem("user");
                window.location.replace("/auth");
            }
            for (let field of Object.keys(error.response.data.errors)) {
                Vue.prototype.$notify({
                    group: "notify",
                    type: "error",
                    title: error.response.data.errors[field][0],
                });
            }
            return error.response;
        }
    }

    async Delete(end_point, data = []) {
        try {
            const response = await Api.delete(end_point, data);
            return response;
        } catch (error) {
            if (error.response.status == 401) {
                localStorage.removeItem("user");
                window.location.replace("/auth");
            }
            for (let field of Object.keys(error.response.data.errors)) {
                Vue.prototype.$notify({
                    group: "notify",
                    type: "error",
                    title: error.response.data.errors[field][0],
                });
            }
            return error.response;
        }
    }
}

export default new UserService();