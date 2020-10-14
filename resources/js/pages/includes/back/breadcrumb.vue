<template>
  <div>
      <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-md-6">
                    <h1 class="m-0 text-blue-500">{{currentroute | upText}}</h1>
                </div><!-- /.col -->
                <div class="col-md-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"> <router-link :to="{ name:homeroute.name}" >Home</router-link></li>
                        <li class="breadcrumb-item text-blue-500">{{currentroute | upText}}</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
      </section>
  </div>
</template>

<script>
export default {
    name:'backendbreadcrumb',
    components:{
         },
         data(){
            return{
                dashboardroute:false,
                currentroute:'',
                home:{
                    name:'Dashboard'
                },
            };
        },
        mounted() {
            this.currentroute = this.$route.name;
        },
        computed:{
            homeroute(){
                return this.home;
            },
        },
        methods:{
        },
        watch: {
            $route(to, from) {

            }
        }
}
</script>

<style>

</style>
