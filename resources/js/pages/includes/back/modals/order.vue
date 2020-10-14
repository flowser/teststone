<template>
  <div>
      <div class="modal fade " id="OrderModal" tabindex="-1" role="dialog" aria-labelledby="OrderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content" v-if="Order">
                    <form role="form" @submit.prevent="editmodeOrder ? updateOrder(orderform.id) : addOrder()" >
                        <div class="modal-body">
                            <alert-error :form="orderform" message="There were some problems with your input."></alert-error>
                            <h5 class="text-black text-3xl my-0" v-show="editmodeOrder" id="ClientModalLabel">Update Order</h5>
                            <h5 class="text-blue-300" v-show="!editmodeOrder" id="ClientModalLabel">Add New Order</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="relative pt-1">
                                        <label for="CustomerName" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Customer Name</label>
                                        <input v-model="orderform.CustomerName" id="CustomerName" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Customer Name" name="CustomerName" :class="{ 'is-invalid': orderform.errors.has('CustomerName') }"
                                            autofocus >
                                        <has-error style="color: #e83e8c" :form="orderform" field="CustomerName" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="relative pt-1">
                                       <label for="CustomerContactNo" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Customer Contact Number</label>
                                       <vue-tel-input name="CustomerContactNo" class="form-control h-16 pt-8 w-full rounded pl-1" v-if="!editmodeOrder"
                                            placeholder="Customer Contact Number" :class="{ 'is-invalid': orderform.errors.has('CustomerContactNo') }" @onInput="inputphone" >
                                        </vue-tel-input>
                                        <vue-tel-input name="CustomerContactNo" class="form-control h-16 pt-8 w-full rounded pl-1"  v-if="editmodeOrder" v-model="orderform.CustomerContactNo"
                                            placeholder="Customer Contact Number" :class="{ 'is-invalid': orderform.errors.has('CustomerContactNo') }" @onInput="inputphone" >
                                        </vue-tel-input>
                                        <div v-if="orderform.CustomerContactNo" class="text-blue-500 text-xs font-bold mt-1">
                                              <span>Is valid: <strong>{{phone.isValid}}</strong>,&nbsp;</span>
                                              <span>Country: <strong>{{phone.country}}</strong></span>
                                        </div>
                                        <has-error :form="orderform" field="CustomerContactNo"></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="OrderNo" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Order Number</label>
                                        <input v-model="orderform.OrderNo" id="OrderNo" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Order Number" name="OrderNo" :class="{ 'is-invalid': orderform.errors.has('OrderNo') }"
                                            autofocus >
                                        <has-error style="color: #e83e8c" :form="orderform" field="OrderNo" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="last_name" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Order Date </label>
                                       <v-date-picker mode="single"  v-model="orderform.RawOrderDate"  class="flex-grow">
                                            <!--Custom Input Slot-->
                                            <input id="OrderDate" slot-scope="{ inputProps, inputEvents}" placeholder="Please enter Order Date"
                                              :class="[`form-control h-16 pt-8 w-full rounded pl-1`, { 'is-invalid': orderform.errors.has('OrderDate') }]"
                                              v-bind="inputProps" v-on="inputEvents" @keyup.prevent="handleinput($event)">
                                        </v-date-picker>
                                        <p class="text-red text-xs italic mt-1" v-if="errorPreviousMessage">
                                          {{ errorPreviousMessage }}
                                        </p>
                                        <p class="text-blue-500 text-xs font-bold mt-1" v-else>
                                          We got it. Thanks!
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="Shipping" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Shipping</label>
                                        <input v-model="orderform.Shipping" id="Shipping" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Shipping" name="Shipping" :class="{ 'is-invalid': orderform.errors.has('Shipping') }"
                                             autofocus @keyup.prevent="handleShipping($event)">
                                        <has-error style="color: #e83e8c" :form="orderform" field="Shipping" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="ProductName" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Product Name</label>
                                        <input v-model="orderform.ProductName" id="ProductName" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Product Name" name="ProductName" :class="{ 'is-invalid': orderform.errors.has('ProductName') }"
                                            autofocus >
                                        <has-error style="color: #e83e8c" :form="orderform" field="ProductName" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="ProductCode" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Product Code</label>
                                        <input v-model="orderform.ProductCode" id="ProductCode" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Product Code" name="ProductCode" :class="{ 'is-invalid': orderform.errors.has('ProductCode') }"
                                            autofocus >
                                        <has-error style="color: #e83e8c" :form="orderform" field="ProductCode" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="Rate" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Rate</label>
                                        <input v-model="orderform.Rate" id="Rate" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Rate" name="Rate" :class="{ 'is-invalid': orderform.errors.has('Rate') }"
                                            autofocus @keyup.prevent="handleRate($event)">
                                        <has-error style="color: #e83e8c" :form="orderform" field="Rate" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="OrderTotal" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Order Total</label>
                                        <input v-model="orderform.OrderTotal" id="OrderTotal" type="number"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Order Total" name="OrderTotal" :class="{ 'is-invalid': orderform.errors.has('OrderTotal') }"
                                             autofocus readonly >
                                        <has-error style="color: #e83e8c" :form="orderform" field="OrderTotal" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="Qty" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Qty</label>
                                        <input v-model="orderform.Qty" id="Qty" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Qty" name="Qty" :class="{ 'is-invalid': orderform.errors.has('Qty') }"
                                             autofocus  @keyup.prevent="handleQty($event)">
                                        <has-error style="color: #e83e8c" :form="orderform" field="Qty" ></has-error>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <label for="LineTotal" class="uppercase text-blue-500 text-sx font-bold absolute pl-1 ">Line Total</label>
                                        <input v-model="orderform.LineTotal" id="LineTotal" type="text"
                                            class="form-control h-16 pt-8 w-full rounded pl-1"
                                            placeholder="Line Total" name="LineTotal" :class="{ 'is-invalid': orderform.errors.has('LineTotal') }"
                                             autofocus readonly>
                                        <has-error style="color: #e83e8c" :form="orderform" field="LineTotal" ></has-error>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="relative pt-1">
                                        <button  v-show="editmodeOrder" type="submit" class="w-full btn-success py-2 px-3 uppercase rounded text-blue-800 font-bold" :disabled="loading">
                                            <div class="lds-ring-container" v-if="loading">
                                                <div class="lds-ring">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            Update Order Details
                                        </button>
                                        <button  v-show="!editmodeOrder" type="submit" class="w-full btn-success py-2 px-3 uppercase rounded text-blue-800 font-bold" :disabled="loading">
                                            <div class="lds-ring-container" v-if="loading">
                                                <div class="lds-ring">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            Add New Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment'
import { Form, HasError, AlertError } from 'vform';
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
    name:'OrderModal',
    props: [
        'order',
        'item',
        'defaultmodeOrder'
        ],
    data(){
            return{
                editmodeOrder: false,
                loading: false,
                phone:{},
                orderDate:'',
                orderform: new Form({
                        id:'',
                        CustomerName:'',
                        CustomerContactNo:'',
                        ProductName:'',
                        ProductCode:'',
                        Rate:'',
                        OrderNo:'',
                        OrderDate:'',
                        RawOrderDate:'',
                        Shipping:'',
                        OrderTotal:'',
                        Qty:'1',
                        LineTotal:'',
                        customer_id:'',
                        product_id:'',
                        orderproduct_id:'',
                }),
            }
        },
        mounted(){
        },
        computed:{
            Order(){
                if(this.$props.defaultmodeOrder){
                    console.log()
                    this.editmodeOrder = this.$props.defaultmodeOrder;
                    this.orderform.id                 = this.$props.order.id;
                    this.orderform.CustomerName       = this.$props.order.customer.CustomerName;

                    this.orderform.ProductName        = this.$props.item.product.ProductName;
                    this.orderform.ProductCode        = this.$props.item.product.ProductCode;

                    this.orderform.OrderNo            = this.$props.order.OrderNo;
                    this.OrderDateUpdate(this.$props.order.OrderDate);

                    this.orderform.customer_id        = this.$props.order.customer_id;
                    this.orderform.product_id         = this.$props.item.product.id;
                    this.orderform.orderproduct_id    = this.$props.item.id;

                    let shipping = this.$props.order.Shipping;
                    let qty      = this.$props.item.Qty;
                    let rate     = this.$props.item.product.Rate;
                    this.OrderTotalling(rate, qty, shipping);

                    let data = {
                            number:{
                                national: this.$props.order.customer.CustomerContactNo,
                            },
                            isValid:true,
                            country:{
                                areaCodes: null,
                                dialCode: "254",
                                iso2: "KE",
                                name: "Kenya",
                                priority: 0,
                            }
                        }
                        this.inputphone(data);
                    return true;
                }else{
                    this.editmodeOrder = this.$props.defaultmodeOrder;
                    return true;
                }
            },
            errorPreviousMessage() {
              if (!this.orderform.OrderDate){
                   return 'Order Date is required.';
              }else{
                  return '';
              }
            },
        },
        methods:{
            handleinput(event){
                console.log(event.target.value)
            },
            inputphone({ number, isValid, country }){
                console.log("inputphone -> { number, isValid, country }", { number, isValid, country })
                this.orderform.CustomerContactNo  = number.national;
                this.phone.isValid                = isValid;
                this.phone.country                = country && country.name;
            },
            OrderDateUpdate(orderdate){
                this.orderform.RawOrderDate        = new Date (moment(orderdate, 'MM/DD/YYYY').format('YYYY-MM-DD'));
                this.orderform.OrderDate           = new Date (moment(orderdate, 'MM/DD/YYYY').format('YYYY-MM-DD'));
            },
            OrderTotalling(rate, qty, shipping){
                    this.orderform.Rate               = rate;
                    this.orderform.Qty                = qty;
                    this.orderform.Shipping           = shipping;
                    this.orderform.LineTotal          = rate * qty;
                    this.orderform.OrderTotal         = Number(shipping) + Number(rate * qty);
            },
            OrderEditingTotaling(rate, qty, shipping){
                this.orderform.LineTotal          = rate * qty;
                this.orderform.OrderTotal         = Number(shipping) + (Number(rate) * Number(qty));
            },
            handleShipping(event){
                this.orderform.Shipping               = event.target.value;
                this.OrderEditingTotaling(this.orderform.Rate, this.orderform.Qty, this.orderform.Shipping);
            },
            handleRate(event){
                this.orderform.Rate                   = event.target.value;
                this.OrderEditingTotaling(this.orderform.Rate, this.orderform.Qty, this.orderform.Shipping);
            },
            handleQty(event){
                this.orderform.Qty                    = event.target.value;
                this.OrderEditingTotaling(this.orderform.Rate, this.orderform.Qty, this.orderform.Shipping);
            },
            addOrder(){
                console.log("addOrder -> this.orderform", this.orderform)
                this.$store.dispatch("addOrder", this.orderform)
                    .then((response)=>{
                        $('#OrderModal').modal('hide');
                        this.orderform.id                ='';
                        this.orderform.CustomerName      ='';
                        this.orderform.CustomerContactNo ='';
                        this.orderform.ProductName       ='';
                        this.orderform.ProductCode       ='';
                        this.orderform.Rate              ='';
                        this.orderform.OrderNo           ='';
                        this.orderform.OrderDate         ='';
                        this.orderform.RawOrderDate      ='';
                        this.orderform.Shipping          ='';
                        this.orderform.OrderTotal        ='';
                        this.orderform.Qty               ='1';
                        this.orderform.LineTotal         ='';
                        this.orderform.customer_id       ='';
                        this.orderform.product_id        ='';
                        this.orderform.orderproduct_id   ='';
                    })
                    .catch((error)=>{
                    console.log("addOrder -> error", error)
                        $('#OrderModal').modal('show');
                    })
            },
            updateOrder(){
                this.OrderDateUpdate(this.orderform.RawOrderDate);
                this.$store.dispatch("updateOrder", this.orderform)
                     .then((response)=>{
                        $('#OrderModal').modal('hide');
                        this.orderform.id                ='';
                        this.orderform.CustomerName      ='';
                        this.orderform.CustomerContactNo ='';
                        this.orderform.ProductName       ='';
                        this.orderform.ProductCode       ='';
                        this.orderform.Rate              ='';
                        this.orderform.OrderNo           ='';
                        this.orderform.OrderDate         ='';
                        this.orderform.RawOrderDate      ='';
                        this.orderform.Shipping          ='';
                        this.orderform.OrderTotal        ='';
                        this.orderform.Qty               ='1';
                        this.orderform.LineTotal         ='';
                        this.orderform.customer_id       ='';
                        this.orderform.product_id        ='';
                        this.orderform.orderproduct_id   ='';
                    })
                    .catch((response)=>{
                        $('#OrderModal').modal('show');
                    })
            },
        },
}
</script>

<style>

</style>







