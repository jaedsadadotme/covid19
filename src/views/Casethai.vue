<template>
  <div class="ui-container">
    <div class="" style="padding-top: 10rem;">
      <router-link to="/" style="color:black;text-decoration: underline;padding-right: 1rem;">ทั้งหมด</router-link>
      <router-link to="/thai" style="color:black;text-decoration: underline;border-left: 2px solid #797070;padding-left: 1rem;">เคสไทย</router-link>
    </div>
    <div class="ui-contents">
      <h3 class="">Covid ในไทย</h3>
      <span>{{ thailand.UpdateDate }}</span> 
      <hr>
      <div class="row">
        <div class="col-lg-12">
          <div class="card totalcase">
            <div class="card-body">
              <p>เคสวันนี้</p>
              <h1>{{ thailand.Confirmed ? convert(thailand.Confirmed) : 0 }}</h1>
              <span>( + {{ thailand.NewConfirmed ? convert(thailand.NewConfirmed) : 0 }} )</span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mt-3">
          <div class="card totalrecovery">
            <div class="card-body">
              <p>ยอดรักษาหาย</p>
              <h1>{{ thailand.Recovered ? convert(thailand.Recovered) : 0 }}</h1>
              <span>( + {{ thailand.NewRecovered ? convert(thailand.NewRecovered) : 0 }} )</span>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mt-3">
          <div class="card totaldeath">
            <div class="card-body">
              <p>ยอดเสียชีวิต</p>
              <h1>{{ thailand.Deaths ? convert(thailand.Deaths) : 0 }}</h1>
              <span>( + {{ thailand.NewDeaths ? convert(thailand.NewDeaths) : 0 }} )</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-contents {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
@media screen and (max-width: 1220px) {
  .ui-container {
    padding: 1rem;
  }
}
.ui-table{
  height: 600px;
    overflow: scroll;
}
</style>

<script>
import Axios from "axios";

export default {
  name: "income",
  data() {
    return {
      all: {},
      thailand: {},
      country: [],
      sort: ""
    };
  },
  created() {},
  async mounted() {
    // let api = "http://127.0.0.1:9000"
    await Axios.get("/api/covid/all")
      .then((res) => (this.all = res.data))
      .catch((err) => alert(err));
    await Axios.get("/api/covid/thailand")
      .then((res) => (this.thailand = res.data))
      .catch((err) => alert(err));
    await Axios.get("/api/covid/allCountry")
      .then((res) => (this.country = res.data))
      .catch((err) => alert(err));
  },
  methods: {
    async save() {
      this.saving = true;
    },
    async selectSort(){
      this.country = []
    //   let api = "http://127.0.0.1:9000/"
      await Axios.get("/api/covid/allCountry?sort="+this.sort)
        .then((res) => (this.country = res.data))
        .catch((err) => alert(err));
      },
    convert(value) {
      return parseFloat(value).toLocaleString();
    },
  },
};
</script>