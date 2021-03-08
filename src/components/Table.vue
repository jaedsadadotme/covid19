<template>
<div class="ui-contents">
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">เรียงโดย</label>
            <select class="form-control" id="exampleFormControlSelect1" @change="selectSort" v-model="sort">
              <option value="" selected></option>
              <option value="cases">ผู้ติดเชื้อทั้งหมด</option>
              <option value="todayCases">ผู้ติดเชื้อวันนี้</option>
            </select>
          </div>
        </div>
      </div>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">ประเทศ</th>
            <th scope="col">ผู้ติดเชื้อทั้งหมด</th>
            <th scope="col">รักษาหาย</th>
            <th scope="col">รักษาหาย</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in country" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ data.Country }}</td>
            <td>{{ convert(data.Cases) }} (+{{ data.TodayCases }})</td>
            <td>{{ convert(data.Recovered) }} (+{{ data.TodayRecovered }})</td>
            <td>{{ convert(data.Deaths) }} (+{{ data.TodayDeaths }})</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import EventBus from '../eventbus'
import Axios from "axios";

export default {
    data () {
        return {
            country: {},
            sort: ""
        }
    },
    mounted(){
        EventBus.$on('DATA_PUBLISHED', async(payload) => {
            console.log(payload)
            this.country = payload
        })
    },
    methods: {
        async selectSort() {
            console.log("http://127.0.0.1:9000/api/covid/allCountry?sort=" + this.sort)
            await Axios.get("http://127.0.0.1:9000/api/covid/allCountry?sort=" + this.sort)
                .then((res) => this.country = res.data)
            
            // EventBus.$emit("DATA_PUBLISHED", data);
        },
        convert(value) {
            return parseFloat(value).toLocaleString();
        }
    }
}
</script>