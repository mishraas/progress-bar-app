import Vue from 'vue'
import ProgressBarService from '@/services/progress-bar-service'

let service

describe('progress-bar-service', () => {
  beforeEach(() => {
    service = new Vue(ProgressBarService)
  })

  it('should initialize service', (done) => {
    expect(typeof service).to.equal('object')
    expect(typeof service.$options.getBarsConfig).to.equal('function')
  )

})
