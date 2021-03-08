<template>
  <div id="app">
    <Navbar />
    <div class="ui-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name : "plaground",
  components:{
    Navbar
  },
  data(){}
}
</script>