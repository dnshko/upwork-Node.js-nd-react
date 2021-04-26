/*module.exports = {
    url:"mongodb://root:12345@127.0.0.1:27017"
}*/

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Truck_Driver",{

useCreateIndex: true,
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
console.log("connection establis");

})
.catch(()=>{
    console.log("connection not establis");
    
    })
