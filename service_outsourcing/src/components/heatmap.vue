<template><div id="hmap">
</div>
</template>
<script>
export default {
  data () {
    return {
      option4: null,
      points: [[120.14322240845, 30.236064370321, 1], [120.14280555506, 30.23633761213, 1], [120.14307598649, 30.236125905084, 1], [120.14301682797, 30.236035316745, 1]]
    }
  },
  props: ['center'],
  mounted () {
    setTimeout(() => { this.my(1) })
  },
  methods: {
    /* eslint-disable */
    my (key) {
      var myChart4 = this.$echarts.init(document.getElementById('hmap'))
      myChart4.setOption(
        this.option4 = {
          animation: false,
          bmap: {
            center: this.center,
            zoom: 14,
            roam: true
          },
          visualMap: {
            show: false,
            top: 'top',
            min: 0,
            max: 5,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ['blue', 'blue', 'green', 'yellow', 'red']
            }
          },
          series: [{
            type: 'heatmap',
            coordinateSystem: 'bmap',
            data: this.points,
            pointSize: 5,
            blurSize: 6
          }]
        })
        if(!key)setTimeout(() => { this.my(1) }, 10)
    }
  }
}
</script>
<style scoped>
div{
  height: 100%;
}
</style>
