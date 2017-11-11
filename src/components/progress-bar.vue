<template>
<div>
  <h2>Progress Bars Playground</h2>
  <div class="bar-section">
    <div class="box" v-for="(bar, index) in barConfig.bars" :key=index>
      <span v-bind:class="{'text-value':true, 'over-limit-text':bar>100}">{{bar+'%'}}</span>
      <span v-bind:style="{width: bar < 0 ? 0 : (bar > 100 ? 100 : bar) + '%'}"
            v-bind:class="{'progress-indicator':true, 'over-limit':bar>100}">&nbsp;</span>
    </div>
  </div>

  <div class="bar-button-section" v-if="barConfig.bars">
    <div class="bar-selector">
      <select v-model="selectedBar">
        <option v-for="(bar, index) in barConfig.bars" :value=index :key=index>Progress Bar: #{{index+1}}</option>
      </select>
    </div>
    <div class="change-section">
      <button v-for="(value, index) in barConfig.buttons" :value=value :key=index @click="changeBarValue">{{value}}</button>
    </div>
  </div>
  <div v-else>
    We are crunching the latest data for you...
  </div>

</div>
</template>

<script>
import Vue from 'vue'
import progressBarService from '../services/progress-bar-service'

export default {
  name: 'ProgressBar',
  data () {
    return {
      barConfig: {},
      selectedBar: 0
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      // can integrate axios like third party library for handling ajax/fetch; not needed for simple use cases
      this.progressBarService.getBarsConfig().then((response) => {
        this.barConfig = response.body
      }, (err) => {
        this.barConfig = {}
        console.log(err)
      })
    },
    changeBarValue (e) {
      let barValue = this.barConfig.bars[this.selectedBar]
      let newValue = Math.floor(parseInt(barValue) + ((parseInt(e.target.value) * 100) / this.barConfig.limit))
      if (newValue < 0) {
        newValue = 0
      }
      Vue.set(this.barConfig.bars, this.selectedBar, newValue)
    }
  },
  props: {
    progressBarService: {
      default: function () {
        return progressBarService
      }
    }
  }
}
</script>

<style scoped lang="scss">

.box {
  border: 2px solid #000;
  border-radius: 5px;
  height:20px;
  width:100%;
  margin-bottom:10px;

  .progress-indicator {
    background: linear-gradient(-90deg, #06d172, #0d2544);
    display:inline-block;
    float:left;
    line-height:20px;
  }

  .over-limit {
    background: linear-gradient(-90deg, #FF0000, #0d2544);
  }

  .over-limit-text {
    color: #FFF;
  }

  .text-value {
    position: absolute;
  }
}
</style>
