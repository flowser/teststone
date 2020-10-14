//order module

const state = {
    orders: [],
    order: [],
    pagination: [],
};
const getters = {
    Orders(state) {
        return state.orders;
    },
    Order(state) {
        return state.order;
    },
    OrderPagination() {
        return state.pagination;
    },
};
const actions = {
    orders(context, url) { //permission.index route laravel
        if (context.rootGetters.loggedIn) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
            return new Promise((resolve, reject) => {
                axios.get(url)
                    .then((response) => {
                        context.commit('orders', response.data.orders.data);
                        console.log("orders -> response.data.orders.data", response.data.orders.data)
                        context.commit('pagination', response.data.orders);
                        console.log("orders -> response.data.orders", response.data.orders)
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error, 'error');
                        reject(error);
                    });
            });
        }
    },
    importOrder(context, payload) {
        if (context.rootGetters.loggedIn) {
            console.log(payload,'load')
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
            return new Promise((resolve, reject) => {
                payload.submit('post', '/api/order/import', {
                  transformRequest: [
                      function (data, headers) {
                        return objectToFormData(data)
                      }
                  ],
                })
                    .then((response) => {
                        context.dispatch('orders', '/api/order');
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
            });
        }
    },
    addOrder(context, payload){
        return new Promise((resolve, reject) =>{
            if (context.rootGetters.loggedIn) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
                payload.patch("/api/order/")
                .then((response)=>{
                    context.commit('addorder', response.data.order);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error, 'error')
                    reject(error);
                });
            }
        });
    },
    updateOrder(context, payload){
        return new Promise((resolve, reject) =>{
            if (context.rootGetters.loggedIn) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
                payload.patch("/api/order/update/" + payload.id)
                .then((response)=>{
                    // context.commit('updateorder', response.data.order);
                    context.dispatch('orders', '/api/order');
                    resolve(response);
                })
                .catch(error => {
                    console.log(error, 'error')
                    reject(error);
                });
            }
        });
    },
    deleteOrder(context, payload){
        return new Promise((resolve, reject) =>{
            if (context.rootGetters.loggedIn) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
                axios.get("/api/order/delete/" + payload)
                .then((response)=>{
                    context.commit('deleteorder', response.data.order);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error, 'error')
                    reject(error);
                });
            }
        });
    },
    orderById(context, id){
        return new Promise((resolve, reject) =>{
            if(context.rootGetters.loggedIn){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.login.accessToken;
                axios.get("/api/order/" + id)
                .then((response)=>{
                console.log("orderById -> response", response)
                    context.commit('order', response.data.order);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error, 'error')
                    reject(error);
                });
            }
        });
    },
}
const mutations = {
    orders(state, data) {
        return state.orders = data;
    },
    order(state, data) {
        return state.order = data;
    },
    addorder(state, data) {
        return state.orders.push(data);
    },
    updateorder(state, data){
        const index = state.orders.findIndex(order => order.id === data.id);
        return state.orders.splice(index, 1, data);
    },
    deleteorder(state, data){
        const index = state.orders.findIndex(order => order.id === data.id);
        return state.orders.splice(index, 1);
    },
    pagination(state, data) {
        var pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            from: data.from,
            to: data.to,
            total: data.total,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url,
        }
        return state.pagination = pagination;
    },
};

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
};








