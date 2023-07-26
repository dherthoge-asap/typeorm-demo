const { log } = require("console")

let a = {
 one: true,
 two: "hi"
}
log(a)
let b ={one: false}
a = b
log(a)