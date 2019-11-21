import Vue from 'vue'
import Vuex from 'vuex'
import Store from "storejs"
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
      city:"上海",
      showNav:true,
      showUser:false,
      cartList:Store.get("cartList") || [],
  },
  mutations: {
      add(state,data){
          //判断是否已有
        var bool = true;

        state.cartList.map((item)=>{
            if(item.ID === data.ID){
                if(data.num > 1){
                    item.num += data.num;
                    bool = false;
                }
                item.num++;
                bool = false;
            }
        })
        if(bool){
            //新增数据
            data.num = data.num || 1;
            state.cartList.push(data);
        }
        Store.set("cartList",state.cartList);
    },
    clearAll(state){
        state.cartList = []
        Store.set("cartList",state.cartList);
      },
  },
  actions: {
  },
  modules: {
  }
})
