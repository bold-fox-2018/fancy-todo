var a = '2018-02-28T17:00:00.000Z'
// var b = new Date(a.getFullYear(), new Date().getMonth()).toDateString()
var b = a.toLocaleDateString()
console.log(b);