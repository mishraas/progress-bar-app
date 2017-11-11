import Vue from 'vue'

const BARS_API_URL = 'http://pb-api.herokuapp.com/bars'

export default {
  getBarsConfig () {
    return Vue.http.get(BARS_API_URL)
  }
}
