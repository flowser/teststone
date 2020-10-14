<template>
  <div>
      <div class="modal fade " id="ImportOrderModal" tabindex="-1" role="dialog" aria-labelledby="ImportOrderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content" >
                    <form role="form" @submit.prevent="importOrder()" >
                        <div class="modal-body">
                            <alert-error :form="orderimportform" message="There were some problems with your input."></alert-error>
                            <h5 class="text-blue-300" id="ImportOrderModalLabel">Import Orders in CSV file</h5>
                            <div class="row" >
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name" class="uppercase col-form-label">Import Orders in CSV file </label>
                                        <input  type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-success">Import</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform';
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
    name:'ImportOrderModal',
    data(){
            return{
                editmodeOrder: false,
                orderimportform: new Form({
                        file:'',
                }),
            }
        },
        mounted(){
        },
        computed:{

        },
        methods:{
            addFile(){
                 this.$refs.file.click();
            },
            handleFileUpload(){
              this.orderimportform.file = this.$refs.file.files[0];
              console.log("this.orderimportform", this.orderimportform);
            },
            importOrder(){
                this.$store.dispatch("importOrder", this.orderimportform)
                    .then((response)=>{
                        $('#ImportOrderModal').modal('hide');
                        Swal.fire(
                            'Imported Successfully',
                            'Your file has been Imported Successfully.',
                            'success'
                        )
                        console.log("imported successfull", response)
                    })
                    .catch((error)=>{
                    console.log("addOrder -> error", error)
                        $('#ImportOrderModal').modal('show');
                    })
            },
        },
}
</script>

<style>

</style>







