import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store/index";
import Notifications from "vue-notification";
import VueConfirmDialog from "vue-confirm-dialog";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import VueFileAgent from "vue-file-agent";

Vue.use(VueFileAgent);
Vue.component("v-icon", Icon);
Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(Notifications);
Vue.use(VueConfirmDialog);
Vue.prototype.$log = console.log.bind(console);

Vue.directive("can", {
    bind: function(el, binding, vnode) {
        if (!JSON.parse(localStorage.getItem("permissions")).includes(
                binding.expression.replace(/'/g, "").replace(/"/g, "")
            )) {
            vnode.elm.style.display = "none";
        }
    },
});

new Vue({
    el: "#app",
    router,
    store,
    icons,
    template: "<App/>",
    components: {
        App,
    },
});