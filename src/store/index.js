import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS({ isCompression: false });



export default createStore({
  state: {
    user: null,
    saltKey: "booklike12339209"
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    }

  },
  getters: {
    _isAuthenticated: state => state.user !== null,
    _getCurrentUser(state) {
      const user = state.user;

      //   if(user !== null && user.hasOwnProperty("password")){
      //       delete user.password;
      //   }
      // delete user?.password;  ile if içindeki işlemi yapabiliyorum

      delete user?.password;
      return user;
    },
    _userLikes: state => state.user?.likes || [],
    _userBookmarks: state => state.user?.bookmarks || [],
    _currentUserId: state => state?.user?.id,
    _saltKey: state => state.saltKey,
  },

  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => secureLs.get(key),
        setItem: (key, value) => secureLs.set(key, value),
        removeItem: key => secureLs.remove(key),
      },
    }),
  ],
})
