//login
namespaced: true;

const state = {
        accessToken: localStorage.getItem('accessToken') || null,
        user: localStorage.getItem('storeduser') || null,
        userid: localStorage.getItem('storeduserid') || null ,
        roles: localStorage.getItem('storedroles') || null,
        permissions: localStorage.getItem('storedpermissions') || null,
        emailreviews: '',
    },
    getters = {
        Token(state) {
            return state.accessToken;
        },
        loggedIn(state) {
            return state.accessToken !== null;
        },
        LoggedUser(state) {
            return state.user;
        },
        Userid(state) {
            return state.userid;
        },
        UserRoles(state) {
            return state.roles;
        },
        UserPermissions(state) {
            return state.permissions;
        },
        Useremailreviews(state) {
            return state.emailreviews;
        }
    };
const actions = {
    login({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', credentials)
                .then(response => {
                    console.log(credentials, response);
                    localStorage.setItem('accessToken', response.data.access_token);
                    commit('updateAccessToken', response.data.access_token);
                    resolve(response)
                })
                .catch(error => {
                    commit('updateAccessToken', null);
                    console.log(error, 'error');
                    reject(error);
                });
        });
    },
    register({ commit }, payload) {
        return new Promise((resolve, reject) => {
            payload.patch('/api/patient')
                .then(response => {
                console.log("register -> response vues", response)
                    localStorage.setItem('accessToken', response.data.access_token);
                    commit('updateAccessToken', response.data.access_token);
                    resolve(response)
                })
                .catch(error => {
                console.log("register -> error vues ", error)
                    commit('updateAccessToken', null);
                    console.log(error, 'error');
                    reject(error);
                });
        });
    },
    getUser(context) {
        console.log(context.state.accessToken, 'token')
        console.log(context.getters.loggedIn, 'loggedin')
        if (context.getters.loggedIn) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken;
            return new Promise((resolve, reject) => {
                axios.get('/api/user')
                    .then((response) => {
                        console.log('rolesraw', response.data.user);
                        localStorage.setItem('storeduserid', response.data.user.id);
                        localStorage.setItem('storeduser', response.data.user);
                        localStorage.setItem('storedroles', response.data.roles);
                        localStorage.setItem('storedpermissions', response.data.permissions);
                        console.log("getUser -> localStorage", localStorage)

                        context.commit('userid', response.data.user.id);
                        context.commit('user', response.data.user);
                        context.commit('roles', response.data.roles);
                        context.commit('permissions', response.data.permissions);
                        //  context.dispatch('syncmails');
                        // context.dispatch('MailByUserId', response.data.user.id);

                        // backend
                        resolve(response);
                    })
                    .catch(error => {
                        context.commit('destroyToken');
                        context.commit('destroyUser');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('storeduserid');
                        localStorage.removeItem('storeduser');
                        localStorage.removeItem('storedroles');

                        reject(error);
                    });
            });
        }
    },
    fetchAccessToken(context, dispatch) {
        context.commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    fetchUserId(context, dispatch) {
        context.commit('getuserid', localStorage.getItem('storeduserid'));
    },
    fetchUser(context, dispatch) {
        context.commit('user', localStorage.getItem('storeduser'));
    },
    fetchUserRoles(context, dispatch) {
        context.commit('roles', localStorage.getItem('storedroles'));
    },
    fetchUserPermissions(context, dispatch) {
        context.commit('permissions', localStorage.getItem('storedpermissions'));
    },
    logout(context) { //done only whne logged in
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken;
        if (context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout')
                    .then(response => {
                        context.commit('destroyToken');
                        context.commit('destroyUser');
                        // localStorage.removeItem('accessToken');
                        // localStorage.removeItem('storeduserid');
                        // localStorage.removeItem('storeduser');
                        // localStorage.removeItem('storedroles');
                        localStorage.clear();
                        context.dispatch('DestroyStoredOganisation');
                        resolve(response);
                    })
                    .catch(error => {
                        context.commit('destroyToken');
                        context.commit('destroyUser');
                        // localStorage.removeItem('accessToken');
                        // localStorage.removeItem('storeduserid');
                        // localStorage.removeItem('storeduser');
                        // localStorage.removeItem('storedroles');
                        localStorage.clear();
                        context.dispatch('DestroyStoredOganisation');
                        reject(error);
                    });
            });
        }
    },
    Check(context, roleName){
        if (context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
            let Roles = context.getters.UserRoles;
            console.log("Check -> roleName", roleName)
            console.log("Check -> Roles", Roles)

                if (Array.isArray(roleName) == true) {
                    resolve(roleName.some(ele => Roles.includes(ele)));
                } else {
                    resolve(Roles.indexOf(roleName) !== -1);
                }
            })
        }
    },
    RolesCheck(context, payload){
        if (context.getters.loggedIn){
            return new Promise((resolve, reject) => {
                const Roles = context.getters.UserRoles;
                const RolesArray = Roles.split(',');
                var result = RolesArray.indexOf(payload) !== -1;
                // var Role = RolesArray[0];
                // var role = Role.toLowerCase();
                var rolefilter= {
                    role: RolesArray[0],
                    status: result,//false/true
                };
                console.log("RolesCheck -> rolefilter", rolefilter)
                resolve(rolefilter);
            })
        }
    },
};
const mutations = {
    updateAccessToken: (state, accessToken) => {
        state.accessToken = accessToken;
    },
    getuserid: (state, data) => {
        state.userid = data;
    },
    destroyToken(state) {
        state.accessToken = null;
    },
    user(state, data) {
        state.user = data;
    },
    userid(state, data) {
        state.userid = data;
    },
    roles(state, data) {
        state.roles = data;
    },
    permissions(state, data) {
        state.permissions = data;
    },
    destroyUser(state) {
        state.user = null;
        state.roles = null;
        state.permissions = null;
    },
    emailreviews(state, data) {
        state.emailreviews = data;
    },
};
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
