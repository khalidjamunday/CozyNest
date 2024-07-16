//jo package ka naame req ke andar wo hi 
const express=require("express");
const app =express();
const mongoose  = require("mongoose");
const Listing = require("./models/listing");//../parent folder curr fold ka
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));//converts url enc data of form to js object(can be acc by req.body) wo this req.body undefined
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"public")));

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

app.get("/" , (req,res)=>{
    res.send("Root dir.");
    console.log("Root directory");
})

//INDEX ROUTE
app.get("/listings",async (req,res)=>{
    const alllistings = await Listing.find({});
    res.render("listings/index",{alllistings});//see route /listing toh error
})

//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})//show route ke neeche toh usse :id samjh rha h

//SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;//....DETSTRUCTING
    const listing = await Listing.findById(id);//toh obj aajayega idhar se
    res.render("listings/show.ejs",{listing});//key value both same {listing}
})

//CREATE ROUTE
//data send kr rha hu to db async
app.post("/listings",async(req,res)=>{
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();//see ss
    res.redirect("/listings");
})

//EDIT ROUTE
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
});

//UPDATE ROUTE
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;  // or const listingId = req.params.id; req params also a obj in itself
    //other method {}
    await Listing.findByIdAndUpdate(id,{...req.body.listing});//find that obj in array of obj by id 
    res.redirect(`/listings/${id}`);
})

//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let dellisting = await Listing.findByIdAndDelete(id);
    console.log(dellisting);
    res.redirect("/listings");
})

app.get("/testlisting",async (req,res)=>{
    let samplelisting = new Listing({
        title: "New Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute,Goa",
        country: "India",
    });

    await samplelisting.save();//async o/w .save().then() as .save() async sh1......
    console.log("sample saved");
    res.send("successful testing");
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})

/*sh1....
use CozyNest
switched to db CozyNest
CozyNest> show collections
listings
CozyNest> db.listings.find()
  {
    _id: ObjectId('668a61b487eb4f9049141bab'),
    title: 'New Villa',
    description: 'By the beach',
    price: 1200,
    location: 'Calangute,Goa',
    country: 'India',
    __v: 0
  }
]*/






