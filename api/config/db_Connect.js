const mongoose = require("mongoose");


const connectDB=async()=>{
    try {
       await mongoose.connect("mongodb+srv://isra:isra123@cluster0.bygr3wq.mongodb.net/");
       console.log("database is connected");
    } catch (error) {
        console.log("database is not connected");
        console.error(error);
    }
}


module.exports=connectDB;