import directive from "./directive.js"
import Apis from "@/core/api/apis.js"
import Common from "@/components/common"
import Global from "@/core/global/"
export default (Vue) => {
    //可以拿到一个Vue实例
    directive(Vue);
    Common(Vue);
    Vue.prototype.$eventBus = new Vue();
    Vue.prototype.$apis = Apis;
    Vue.prototype.$global = Global;
}