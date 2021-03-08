<template>
  <div class="ui-container pt-5">
      <div id="mapid" class="carder mb-5"></div>
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
#mapid { height: 100vh; }
.carder{
    border: 1px solid;
    box-shadow: rgb(0, 0, 0) 5px 4px 4px;
    border-radius: 5px;
    outline: none;
}
</style>

<script>
import axios from "axios";
import Chart from "chart.js"
export default {
  name: "income",
  data() {
    return {
      ww: {},
      thai: {},
      thaiTimeLine: {},
      thaiSumCase: {},
      totalWW: {}
    };
  },
  async mounted(){
    this.initMap()
    this.ww = await this.caseWW()
    this.thai = await this.caseThai()
    this.thaiTimeLine = await this.timeLine()
    this.thaiSumCase = await this.thaiSum()
    this.vacine = await this.vacineList();

    this.graph1()
    this.graph2()
    this.graph3()
  },
  methods: {
    async initMap(){
      var mymap = L.map('mapid').setView([15, 100], 13);
      // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //     maxZoom: 5,
      //     id: 'mapbox/streets-v11',
      //     tileSize: 512,
      //     zoomOffset: -1,
      //     animate: true,
      //     accessToken: 'your.mapbox.access.token'
      // }).addTo(mymap);
      L.tileLayer('https://api.mapbox.com/styles/v1/jaedsada/ckk0tqe6i1umy17tl2vtvroan/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFlZHNhZGEiLCJhIjoiY2trMHRwajY1MGhlYTJ3cGI1bzg1b3hpZSJ9.XA7Mc9UdbmDW0l9nfRnN_A',
        {
          foo: 'bar', 
          maxZoom: 5,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          animate: true,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      )
      .addTo(mymap);

      let country = await axios.get("https://corona.lmao.ninja/v2/countries")
      country.data.map(data=>{
        if(data.country == "Thailand"){
          console.log(data);
        }
          let color = "";
          let radius = 0;
          if(data.cases <= 5000){
              color = "#17a2b8"
              radius = data.cases
          }else if(data.cases > 5000 && data.cases <= 50000){
              color = "#ffc107"
              radius = data.cases * 10
          }else{
              color = "#dc3545"
              radius = data.cases / 10
          }

        L.circle([data.countryInfo.lat, data.countryInfo.long], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: radius
        })
        .bindPopup(`
          <p><b>${data.country}</b></p>
          <hr>
          <b>Case</b> : ${data.cases.toLocaleString()}
          <br>
          <b>Today Case</b> : ${data.todayCases.toLocaleString()}
        `)
        .openPopup()
        .addTo(mymap);
      })
    },
    async caseWW(){
      let {data} = await axios.get("https://corona.lmao.ninja/v2/all")
      return data
    },
    async caseThai(){
      let {data} = await axios.get("https://covid19.th-stat.com/api/open/today")
      return data
    },
    async timeLine(){
      let {data} = await axios.get("https://covid19.th-stat.com/api/open/timeline")
      return data
    },
    async thaiSum(){
      let {data} = await axios.get("https://covid19.th-stat.com/api/open/cases/sum")
      return data
    },
    async vacineList(){
      let {data} = await axios.get("https://disease.sh/v3/covid-19/vaccine")
      return data
    },
    convert(value) {
      return parseFloat(value).toLocaleString();
    },
    graph1(){
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: Object.entries(this.thaiSumCase.Province).filter((data,index) => index <= 5 && data[1] != 0).map(data=>data[0]),
              datasets: [{
                  label: 'เคสแต่ละจังหวัดทั้งหมด',
                  data: Object.entries(this.thaiSumCase.Province).filter((data,index) => index <= 5 && data[1] != 0).map(data=>data[1]),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    },
    graph2(){
      var ctx = document.getElementById('myChart2').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.thaiTimeLine.Data.filter(data=> new Date(data.Date).getFullYear() == new Date().getFullYear() ).map(info => info.Date),
              datasets: [{
                  label: 'เคสต่อวัน',
                  data: this.thaiTimeLine.Data.filter(data=> new Date(data.Date).getFullYear() == new Date().getFullYear() ).map(info=> info.NewConfirmed ),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    },
    graph3(){
      var ctx = document.getElementById('graph3').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels: Object.entries(this.thaiSumCase.Gender).filter((data,index) => index <= 5 && data[1] != 0).map(data=>data[0]),
              datasets: [{
                  label: 'เคสตามเพศ',
                  data: Object.entries(this.thaiSumCase.Gender).filter((data,index) => index <= 5 && data[1] != 0).map(data=>data[1]),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
    },
  },
  filters:{
    
  }
};
</script>