<template>
  <div :class="{ darkmode: dark_mode }">
    <div class="ui-container">
      <nav class="navbar navbar-expand-lg">
        <a href="https://jaedsada.me"  class="navbar-brand text-dark" >Jaedsada.me</a>
        <div class="d-block d-lg-none">
          <a class="nav-link text-dark" href="javascript:void(0)" v-show="dark_mode != true" @click="darkmode('dark')">
              <i class="fas fa-moon"></i>
          </a>
          <a class="nav-link text-dark" href="javascript:void(0)" v-show="dark_mode == true" @click="darkmode('light')">
              <i class="fas fa-sun"></i>
          </a>
        </div>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="mr-auto"></ul>
          <a class="nav-link text-dark" href="javascript:void(0)" v-show="dark_mode != true" @click="darkmode('dark')">
            <i class="fas fa-moon"></i>
          </a>
          <a class="nav-link text-dark" href="javascript:void(0)" v-show="dark_mode == true" @click="darkmode('light')">
            <i class="fas fa-sun"></i>
          </a>
          <span></span>
          <a class="nav-link text-dark" href="https://jaedsada.me/example">Example</a>
          <a class="nav-link text-dark" href="https://jaedsada.me/me">Me</a>
        </div>
      </nav>
    </div>
  </div>
</template>
<style>
nav .nav-link{
  font-family: 'Staatliches', cursive !important;
}
.navbar{
  padding: 0;
}
.navbar-brand{
  font-family: 'Libre Barcode 128 Text', cursive;
  font-size: 50px;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<script>
export default {
  data() {
    return {
      datas: [],
      pageView: "",
      hightlight: [],
      suggest: [],
      dark_mode : false
    };
  },
  mounted(){
    // if(localStorage.getItem('mode')){
    //   if(localStorage.getItem('mode') == 'dark'){
    //     this.dark_mode = true
    //   }else{
    //     this.dark_mode = false
    //   }
    // }else{
    //   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //       this.dark_mode = true
    //   }
    // }
  },
  methods:{
    // darkmode(mode){
    //   localStorage.setItem('mode',mode)
    //   if(mode == 'dark'){
    //     this.dark_mode = true
    //   }else{
    //     this.dark_mode = false
    //   }
    // }
  },
};
</script>
