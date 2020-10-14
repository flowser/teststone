<template>
  <div>
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
          <!-- Left navbar links -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
             <router-link :to="{ name:'Dashboard'}" class="nav-link">Home</router-link>
            </li>
          </ul>

          <!-- Right navbar links -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a v-if="loggedIn"   href="#"  class="nav-link" title="Logout" @click.prevent="logout()" >
                <i class="fa fa-unlock"></i> Logout
              </a>
            </li>
          </ul>
        </nav>
  </div>
</template>

<script>
export default {
    name:'backheader',
    components:{
         },
         data(){
            return{
            };
        },
        mounted() {
        },
        computed:{
            loggedIn() {
              return this.$store.getters.loggedIn;
            },
        },
        methods:{
            logout() {
              if (this.$store.getters.loggedIn) {
                this.$store.dispatch("logout")
                    .then((response)=>{
                        console.log(response, 'response')
                        window.location.replace('/');
                    })
              } else {
                window.location.replace('/');
              }
            }
        }


}
</script>

<style>

</style>
