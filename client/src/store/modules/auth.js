import AuthService from "../../services/modules/authService";
import router from "../../router";
const user = JSON.parse(localStorage.getItem('user'));
const state = user
? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null };
const getters = {
  
};
const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.status.loggedIn = true;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  }
};
const actions = {
    async login({commit}, crenditials){
      try {
        const response = await AuthService.login(crenditials); 
          localStorage.setItem('user',JSON.stringify(response.data.accessToken));
          if(response.data.success){
            commit('loginSuccess', response);
            router.push('/dashboard');
            return response;
          }
      } catch (error) {
        commit('loginFailure', error);
        console.log(error.response.data.message || error);
      }
    },
    async register({commit}, crenditials){
      try {
        const response = await AuthService.register(crenditials);
        localStorage.setItem('user',JSON.stringify(response.data.accessToken));
        if(response.data.success){
          commit('registerSuccess');
          router.push('/dashboard');
          return response;
        }
      } catch (error) {
        commit('registerFailure');
        console.log(error.response.data.message || error);
      }
    },
    logout({commit}){
      localStorage.removeItem('user');
      commit('logout');
    }
};

export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions
}