<template>
  <div id="goout"></div>
</template>

<script>
export default {
  data () {
    setTimeout(() => {
      this.myChart = this.$echarts.init(document.getElementById('goout'))
      this.option = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            //  data
            this.source.ontime,
            this.source.bick,
            this.source.cars,
            this.source.onfoot,
            this.source.underground,
            this.source.bus
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      }
      this.myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1
          this.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
      this.myChart.setOption(this.option)
    })
    if (this.option && typeof this.option === 'object') {
      this.myChart.setOption(this.option, true)
    }
    return {
      option: null,
      myChart: null,
      source: {
        ontime: ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
        bick: ['bick', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
        cars: ['cars', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
        onfoot: ['foot', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
        underground: ['subway', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
        bus: ['bus', 51.2, 61.1, 63.2, 64.4, 60.9, 42.1]
      }
    }
  },
  updated () {
  },
  methods: {}
}
</script>

<style scoped>
div{
  height: 100%;
}
</style>
