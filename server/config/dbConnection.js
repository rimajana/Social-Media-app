import mongoose from "mongoose";
// main().catch(err => console.log(err));

const connectDb= async ()=>{
    try{
        const connect=  await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Database Connected: ",connect.connection.host,connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDb;
// module.exports= connectDb;