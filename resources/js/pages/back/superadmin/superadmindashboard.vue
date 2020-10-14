<template>
  <div>
    <div  class="card">
        <div class="card-body p-1">
            <div class="row mb-2">
                <div class="col-12">

                </div>
            </div>
            <div class="flex justify-between pt-2 pb-1">
                <h1  class="text-blue text-center mt-2 mb-2">Orders Table</h1>
                <button class="btn btn-success float-right ml-2"  @click.prevent="importOrdersModal()"><i class="fas fa-plus fw mr-2">Import Orders (CSV)</i></button>
                <!-- <button class="btn btn-success float-right ml-2"  @click.prevent="newOrderModal()"> <i class="fas fa-plus fw mr-2">New Order</i></button> -->
            </div>
            <table id="example2" class="table table-bordered table-hover">
               <thead>
                 <tr>
                    <!-- <th scope="col " class="text-danger  p-1 pt-1 pb-1">S1</th> -->
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Order No</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Order Date</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Customer Name</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Contact No.</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Shipping ($)</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Total ($)</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Product Code</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Product Name</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Qty</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Rate ($)</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Line Total ($)</th>
                    <th scope="col " class="text-danger  p-1 pt-1 pb-1">Action</th>
                 </tr>
               </thead>
               <tbody v-for="order in Orders" :key="order.id">
                    <tr  v-for="(item, index) in order.orderproducts" :key="index">
                        <!-- <td class="pl-1 pr-1 pt-1 pb-1 p-0" >{{index+1}}</td> -->
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" >{{order.OrderNo}}</h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" >{{order.OrderDate}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" v-if="order.customer">{{order.customer.CustomerName}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" v-if="order.customer">{{order.customer.CustomerContactNo}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" >{{order.Shipping}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" >{{order.OrderTotal}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" v-if="item.product" >{{item.product.ProductCode}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" v-if="item.product" >{{item.product.ProductName}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm"  >{{item.Qty}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" v-if="item.product" >{{item.product.Rate}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                            <h2 class="pt-0 pl-1 p-0 h-6 text-blue-600 text-base text-sm" >{{item.LineTotal}} </h2>
                        </td>
                        <td  class="pl-1 pr-1 pt-1 pb-1 p-0" >
                             <div class="flex-column" >
                                <i class="far fa-edit text-blue" @click.prevent="editOrderModal(order, item)"></i>
                                <i class="fas fa-trash text-red" @click.prevent="deleteOrder(order, item)"></i>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="Pagination" >
               <div class="clearfix" style="font-weight:bold;font-size:0.7em;">
                    <span class="float-left" style="margin-bottom:-0.5em" >
                       <div style="margin-bottom:0.25em">
                           Between <span style="color:#9a009a;"> {{Pagination.from}} </span>
                           & <span style="color:#9a009a;"> {{Pagination.to}} </span>
                           out of <span style="color:#9a009a;"> {{Pagination.total}} </span> Orders
                       </div>
                         <button class="btn btn-info mb-2" v-on:click="fetchPaginatedOrders(Pagination.prev_page_url)" :disabled="!Pagination.prev_page_url">Prev</button>
                    </span>
                    <span class="float-right" style="margin-bottom:-0.5em" >
                       <div style="margin-bottom:0.25em">
                           Page <span style="color:#9a009a;"> {{Pagination.current_page}} </span>
                           of <span style="color:#9a009a;"> {{Pagination.last_page}} </span>
                       </div>
                       <button class="btn btn-info mb-2" v-on:click="fetchPaginatedOrders(Pagination.next_page_url)" :disabled="!Pagination.next_page_url">Next</button>
                    </span>
               </div>
            </div>
        </div>
    </div>
    <ImportOrderModal />
    <OrderModal :order="order" :item="item" :defaultmodeOrder="defaultmodeOrder" />
  </div>
</template>

<script>
import ImportOrderModal from '../../includes/back/modals/orderimport';
import OrderModal from '../../includes/back/modals/order';
export default {
        name:"orders",
        components: {
            ImportOrderModal,
            OrderModal,
        },
        data(){
            return{
                url:'/api/order',
                defaultmodeOrder: false,
                order:'',
                item:'',
            }
        },
        mounted() {
            this.ViewUnPrintedOrders();
        },
        computed:{
            Orders(){
                return this.$store.getters.Orders
            },
            Pagination(){
                return this.$store.getters.OrderPagination
            }
        },
        methods:{
            ViewUnPrintedOrders(){
                this.printedclass = 'btn btn-danger';
                this.unprintedclass = 'btn btn-success';
                this.url = '/api/order';
                this.loadOrders();
            },
            ViewPrintedOrders(){
                this.printedclass = 'btn btn-success';
                this.unprintedclass = 'btn btn-danger';
                this.url = '/api/order/printed';
                this.loadOrders();
            },
            loadOrders(){
                this.$store.dispatch( "orders", this.url)
                 .then((response)=>{
                })
                .catch(()=>{
                })
            },
            fetchPaginatedOrders(url){
                this.url = url;
                this.loadOrders();
            },
            importOrdersModal(){
                 this.defaultmodeOrder= false;
                 $('#ImportOrderModal').modal('show')
            },
            newOrderModal(){
                 this.defaultmodeOrder= false;
                 $('#OrderModal').modal('show')
            },
            editOrderModal(order, item){
                 this.defaultmodeOrder = true;
                 this.order = order;
                 this.item = item;
                 $('#OrderModal').modal('show')
            },
            deleteOrder(order){
                Swal.fire({
                importance: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch("deleteOrder", order.id)
                            .then((response)=>{
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                        })
                        .catch((error)=>{
                            Swal.fire({
                                importance: 'Error!',
                                text: error.response.data.msg,
                                icon: 'error',
                                confirmButtonText: 'Cool'
                                })
                        })
                    }
                })
             }
        },
    }
</script>

<style>

</style>



