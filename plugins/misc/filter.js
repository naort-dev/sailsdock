import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('D MMMM YY hh:mm')
  }
})
Vue.filter('dataSize', (size) => {
  if (isNaN(size)) size = 0

  if (size < 1024) return size + ' Bytes'

  size /= 1024

  if (size < 1024) return size.toFixed(2) + ' Kb'

  size /= 1024

  if (size < 1024) return size.toFixed(2) + ' Mb'

  size /= 1024

  if (size < 1024) return size.toFixed(2) + ' Gb'

  size /= 1024

  return size.toFixed(2) + ' Tb'
})
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
