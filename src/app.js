const mongoose=require("mongoose");
const validator=require("validator")
// creation of database and connection to mongodb
// end pr dat base ka name likha na or pora url dana ha 
mongoose.connect("mongodb://localhost:27017/latest").then(()=>{console.log("connection Successful")}).catch((err)=>console.log(err))

// we use built in validation there
// We can use cutom validation as well
// using validation by npm package

const latestSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    uppercase:true,
    trim:true
},

color:{
    type:String,
    required:true
},
email:{
    type:String,
     validate(value){
        if(!validator.isEmail(value))
        {
            throw new Error("Please write email in standard form")
        }
    }
}
,
age:{
    type:Number,
    // validate(value){
    //     if(value<0)
    //     {
    //         throw new Error("Age cannot be negative")
    //     }
    // }
    // we can use another way as well
    // validate:{
    //     validator:function(value){
    //         return value.lenghth<0;
    //     },
    //     message:"Age ko negative deinfe nae kr skata hain"
    // }
    
},
// default values bi add krska hain
date:{
type:Date,
default:Date.now
}
})

// we crate collection with th help of models

const Latest= new mongoose.model("Person",latestSchema)





// iss sara document ko jo create kiya ha us ko aik function ma likh daingain haam 

// const createDocument= async()=>
// {
// now we will create and insert a document
// ab models ko use kr ka documents banaye Gain
// try{
//     const sampleDocument=new Latest({
//         name:"Mike",
        
//         color:"Green"
//         ,
//         age:50
//         // yahahn pr date nae di kyo ka uski default value set ha
//     })
//     // now ap ko just save krna document ko
//     // jasa hi document insert horaha hota ha haam thora wait kr lain gain aysnc awiat sakyo ka ya promise return kr ha ha 
//     const result=await sampleDocument.save();
//     console.log(result)
// }
// catch(err){
// console.log(err)
// }

// }

// createDocument();

// Agr multiple document aik saat insert krwana ha us ka liya ya code ha InsertMAny haam Playlist Class sa mil raha hota hota to wo use kr lana wha whana

const createDocument= async()=>
{
// now we will create and insert a document
// ab models ko use kr ka documents banaye Gain
try{
    const firstDocument=new Latest({
        name:"Mike",
        
        color:"Green"
        ,
        age:-50,
        email:"yeyeye@gmail.com"
        // yahahn pr date nae di kyo ka uski default value set ha
    })
    const secondDocument=new Latest({
        name:"           Tiger",
        
        color:"yellow"
        ,
        age:-90,
        email:"shshsh@gmail.com"
        // yahahn pr date nae di kyo ka uski default value set ha
    })
    const thirdDocument=new Latest({
        name:"         Wollmer",
        
        color:"Black"
        ,
        age:-80,
        email:"yeyeye@gmail.com"
        // yahahn pr date nae di kyo ka uski default value set ha
    })
   
    // now ap ko just save krna document ko
    // jasa hi document insert horaha hota ha haam thora wait kr lain gain aysnc awiat sakyo ka ya promise return kr ha ha 
    const result=await Latest.insertMany([firstDocument,secondDocument,thirdDocument]);
    console.log(result)
}
catch(err){
console.log(err)
}

}

createDocument();

// to read the document we use another function

// const getDocument= async()=>{
//  const result=await Latest.find({name:"Mike"}).select({name:1,_id:0})
//  console.log(result);
// }
// getDocument()

// Now Read the document by comparison operator

// first gt greater than
// const getDocument= async()=>{
//  const result=await Latest.find({age:{$gt:50}}).select({name:1,_id:0})
//  console.log(result);
// }
// getDocument()

// first gte greater than
// const getDocument= async()=>{
//  const result=await Latest.find({age:{$gte:50}}).select({name:1,_id:0})
//  console.log(result);
// }
// getDocument()

// first lt greater than
// const getDocument= async()=>{
//     const result=await Latest.find({age:{$lt:90}}).select({name:1,_id:0})
//     console.log(result);
//    }
//    getDocument()

//    Muja ahsa document  chai ha jo mike or tiger dono k andr ata hoon
// const getDocument= async()=>{
//     const result=await Latest.find({name:{$in:["Mike","Tiger"]}})
//     console.log(result);
//    }
//    getDocument()
// Muja ahsa document  chai ha jo mike or tiger dono k andr na ata hoon
//    const getDocument= async()=>{
//     const result=await Latest.find({name:{$nin:["Mike","Tiger"]}})
//     console.log(result);
//    }
//    getDocument()



//    logical Operator jin ma ap multiple conditions ko aik saat add krskata ho
// Muja ahsa document  chai ha jin name Wollmer ho or color black ho we use and
// const getDocument= async()=>{
//     const result=await Latest.find({$and:[{name:"Wollmer"},{color:"Black"}]})
//     console.log(result);
//    }
//    getDocument()

//    we use or operator as well jis ma aik bi match ho skti ha

// const getDocument= async()=>{
//     const result=await Latest.find({$or:[{name:"Wollmer"},{color:"orange"}]})
//     console.log(result);
//    }
//    getDocument()


   // Hama data nae dekhna document nae dekhna just count chai ha to haam count use karain gain
//    we use countDouments method for this

// const getDocument= async()=>{
//     const result=await Latest.find({$or:[{name:"Wollmer"},{color:"orange"}]}).countDocuments()
//     console.log(result);
//    }
//    getDocument()


//    sorting krna ka liya haam sort method use karain gain jis ma haam 1 likha gain jo sort krda ga but agr kuch capital bi hain kuch samll bi hain to -1 likh do

// const getDocument = async () => {
//     const result = await Latest.find({ color: "Green" }).sort({ name: 1 });
//     console.log(result);
// }

// getDocument();



// most Important Updation in mongodb


// const updateDocument= async(_id)=>
// {
// // now we will create and insert a document
// // ab models ko use kr ka documents banaye Gain
// try{
        

   
//     // now ap ko just save krna document ko
//     const result=await Latest.updateOne({_id},{
//         $set:{
//             name:"Bob"
//         }
//     });
//     console.log(result)
// }
// catch(err){
// console.log(err)
// }

// }
// // we get an unique id pass it there and receive in funcion then update it accoridng to that
// updateDocument("6624bbde5896ddf893b80e07")
// ab agr dekhna kis document ko update kiya ha uski complete detail wagera we use findByIdAndUpdate iss ma id ko find kr ka document ko update krdaingain

// const updateDocument= async(_id)=>
// {
// // now we will create and insert a document
// // ab models ko use kr ka documents banaye Gain
// try{
        

   
//     // now ap ko just save krna document ko
//     // findByIdAndUpdate use krna sa console ma purana hi updated dta mila ga but agr compass ko refresh karain gain to update hojaya ga  agrap chat ho recently update ki wohi console pr mila just use new keyword and assign value true there
//     const result=await Latest.findByIdAndUpdate({_id},{
//         $set:{
//             name:"james"
//         }
//     }
//     ,
//     {
//         new:true
//     },
// );
//     console.log(result)
// }
// catch(err){
// console.log(err)
// }

// }
// // we get an unique id pass it there and receive in funcion then update it accoridng to that
// updateDocument("6624bbde5896ddf893b80e07")

// const deleteDocument= async(_id)=>
// {
// // now we will create and insert a document
// // ab models ko use kr ka documents banaye Gain
// try{
        

   
//     // now ap ko just save krna document ko
//     // findByIdAndUpdate use krna sa console ma purana hi updated dta mila ga but agr compass ko refresh karain gain to update hojaya ga  agrap chat ho recently update ki wohi console pr mila just use new keyword and assign value true there
//     const result=await Latest.deleteOne({_id},
// );
//     console.log(result)
// }
// catch(err){
// console.log(err)
// }

// }
// // we get an unique id pass it there and receive in funcion then update it accoridng to that
// deleteDocument("6624bbde5896ddf893b80e06")
// similarly haam agr document dekhna chat hain to del howa ho to findByIdAndDelete

// const deleteDocument= async(_id)=>
// {
// // now we will create and insert a document
// // ab models ko use kr ka documents banaye Gain
// try{
        

   
//     // now ap ko just save krna document ko
//     // findByIdAndUpdate use krna sa console ma purana hi updated dta mila ga but agr compass ko refresh karain gain to update hojaya ga  agrap chat ho recently update ki wohi console pr mila just use new keyword and assign value true there
//     const result=await Latest.findByIdAndDelete({_id},
// );
//     console.log(result)
// }
// catch(err){
// console.log(err)
// }

// }
// // we get an unique id pass it there and receive in funcion then update it accoridng to that
// deleteDocument("6624bbde5896ddf893b80e08")
