const mongoose = require('mongoose');

const dbconnection =async(URL)=>{
    try {
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,})
            console.log("Database connected !!!!!!!!!!!!!!!!")
    } catch (error) {
        console.log('Error in db connection !!!!!!!!!!!!! : ',error)
    }
   
}
module.exports =dbconnection