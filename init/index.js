const mongoose=require("mongoose");
const data=require("./data");
const listing = require("../models/listing");

const MONGO_URL="mongodb://127.0.0.1:27017/CozyNest";

async function main(){
    //connect method is async
    await mongoose.connect(MONGO_URL);
}

//calling main function
main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

//OR.... arrow fx const initdb = async()=>{}
async function initdb(){
    await listing.deleteMany({});
    await listing.insertMany(data);//param array of obj
    console.log("data was intialized");
};
//is file ko run kro data initialized..(do check later)
initdb();