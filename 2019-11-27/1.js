process.nextTick(() => {
    console.log('nextTick')
})
Promise.resolve()
.then(() => {
    console.log('then')
})
setImmediate(() => {
    console.log('setImmediate')
})
console.log('end')