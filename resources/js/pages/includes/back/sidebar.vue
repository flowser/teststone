<template>
  <div>
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <!-- Brand Logo -->
          <a href="../../index3.html" class="brand-link">
            <img src="/assets/img/AdminLTELogo.png"
                 alt="AdminLTE Logo"
                 class="brand-image img-circle elevation-3"
                 style="opacity: .8">
            <span class="brand-text font-weight-light">AdminLTE 3</span>
          </a>

          <!-- Sidebar -->
          <div class="sidebar">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
              <div class="image">
                <img src="/assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
              </div>
              <div class="info">
                <router-link :to="{ name:'Dashboard'}" class="d-block">{{User.full_name}}</router-link>
              </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                   <router-link :class="active('Dashboard')" :to="{ name:'Dashboard'}" class="nav-link">
                    <i class="nav-icon fas fa-tachometer-alt"></i>
                    <p> Dashboard</p>
                  </router-link>
                </li>
              </ul>
            </nav>
            <!-- /.sidebar-menu -->
          </div>
          <!-- /.sidebar -->
        </aside>
  </div>
</template>

<script>
export default {
    name:'backendsidebar',
    components:{
         },
         data(){
            return{
                dashboardroute:false,
            };
        },
        mounted() {
            this.loadUser();
        },
        computed:{
            User(){
                return this.$store.getters.LoggedUser;
            }
        },
        methods:{
            loadUser(){
                this.$store.dispatch('getUser');
            },
            loadLogo(logo){
                if (logo) {
                         return "/assets/organization/img/" + logo;
                } else {
                     return "/assets/organization/img/logo.png";
                }
            },
            active(route){
                return  this.$route.name == route ? 'active bg-green-600' : '';
            }
        },
        watch: {
            $route(to, from){
            }
        }

}
</script>

<style>

</style>
