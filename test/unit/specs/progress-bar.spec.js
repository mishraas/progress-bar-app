import Vue from 'vue'
import ProgressBar from '@/components/progress-bar'

const mockedProgressBarService = {
  getBarsConfig: function () {
    return new Promise((resolve, reject) => {
      resolve({body: {'buttons': [20, 29, -26, -43], 'bars': [10, 22, 86, 34], 'limit': 100}})
    })
  }
}
let vm

describe('progress-bar.vue', () => {
  beforeEach(() => {
    let Constructor = Vue.extend(ProgressBar)
    vm = new Constructor({
      propsData: {
        progressBarService: mockedProgressBarService
      }
    })
    vm.$mount()
  })

  it('should render page', () => {
    expect(vm.$el.querySelector('h2').textContent)
      .to.equal('Progress Bars Playground')
  })

  it('should have component methods', (done) => {
    expect(typeof vm.loadData).to.equal('function')
    expect(vm.selectedBar).to.equal(0)
    expect(typeof vm.barConfig).to.equal('object')
    expect(typeof vm.changeBarValue).to.equal('function')
    Vue.nextTick(() => {
      vm.changeBarValue({target: {value: 10}})
      expect(vm.barConfig.bars[vm.selectedBar]).to.equal(20)
      done()
    })
  })

  it('should not allow the bar value go negative', (done) => {
    Vue.nextTick(() => {
      vm.changeBarValue({target: {value: -50}})
      expect(vm.barConfig.bars[vm.selectedBar]).to.equal(0)
      done()
    })
  })

  it('should allow the bar value go above 100%', (done) => {
    Vue.nextTick(() => {
      vm.changeBarValue({target: {value: 150}})
      expect(vm.barConfig.bars[vm.selectedBar]).to.equal(160)
      done()
    })
  })

  it('should show error message when data loading fails', (done) => {
    Vue.set(vm.progressBarService, 'getBarsConfig', function () {
      return new Promise((resolve, reject) => {
        reject(new Error("fail"))
      })
    })
    vm.loadData()
    Vue.nextTick(() => {
      expect(vm.barConfig.bars).to.equal(undefined)
      done()
    })
  })

})
