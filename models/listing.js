 /*listing could be apar. flat house villa*/
 const mongoose = require("mongoose");
 const Schema = mongoose.Schema; //jisse baar baar an likhna pade

 //creating listing schema
 const listingSchema = new Schema({
    title:{
        type : String,
        required : true,//remove comma no need
    },
    description : String,
    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1719861032503-225fac307c59?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        filename: {
            type: String,
            default: "listingimage"
        },
    },
    price: Number,
    location: String,
    country: String
 }); 

//creating model using this lisschema
//(collection name, schema)
const Listing = mongoose.model("Listing" , listingSchema);//m.model return js obj
module.exports = Listing;
/* m.exp we can export function,classes and obj{key:value  v}/instance (new class_name),array and [{},{}....] array of objs also */
//module.export=add or {add,sub} dono hi function hai
/*mongoose.model returns a Mongoose model, which is a constructor function
 that you can use to create, read, update, and delete documents in the MongoDB collection defined by the schema. */