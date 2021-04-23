import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     id:0,
     name:'',
     role:[1,2],
     user:Object.assign({},JSON.parse(sessionStorage.getItem('user')))||{},
     length:0,
     //要设置的初始属性值
   };
const getters = {   //实时监听state值的变化(最新状态)
    getChangedNum(state){  //承载变化的changebleNum的值
       return state.id
    },
    getName(state){  //承载变化的changebleNum的值
      return state.name
   },
   getRole(state){
      return state.role
   },
   getUser(state) {
      return state.user
   },  
   getLength(state) {
      return state.length
   } 
};
const mutations = {
    newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
       state.id=sum;
    },
    newName(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
      state.name=sum;
   },
   newRole(state,sum){
      state.role=sum;
   },
   setUser(state, user) {
      let data = Object.assign({},state.user,user); 
      // 将state.personInfo指向新对象的引用地址
      state.user = data
      sessionStorage.user = JSON.stringify(user) //同步存储token至localStorage
    },
   setLength(state, length) {
      state.length = length
    },
};
 const actions = {
    getNewNum(context,num){   //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('newNum',num)
     },
    getNewName(context,num){   //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
      context.commit('newName',num)
   },
   getNewRole(context,num){
      context.commit('newRole',num)
   },
   getNewUser(context,num){
      context.commit('setUser',num)
   },
   getNewLength(context,num){
      context.commit('setLength',num)
   }
};
  const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store;