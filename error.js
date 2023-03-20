
//for errors in node, outside of express

setTimeout(() => {
    throw new Error('oops')
}, 300)

process.on('uncaughtException', () => {

})

//catching asynchronous errors 
process.on('uncaughtRejection', () => {
    
})