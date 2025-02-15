
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({


   fromUserId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",// ref to the collection
     required:true
   },
   toUserId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",// ref to the collection
     required:true
   },
   status:{
      type: String,
      required:true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: ` {VALUE} is not valid `
      }

   }






},{
    timestamps:true
})




// compound index to make the  queries faster

connectionRequestSchema.index({fromUserId:1,toUserId:1});



connectionRequestSchema.pre("save",function(next){

  const connectionRequest = this;
// check if the fromUserId is equal to toUserId

 if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
   throw new Error("you cannot send connection request to yourself");
 }

 next();


})



const ConnectionRequestModel = new mongoose.model("connectionRequest",connectionRequestSchema);
 
module.exports = ConnectionRequestModel;





