

const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({


         firstName:{
            type:String,
            required:true,
            minlength:3,
            maxlength:45
         },
         lastName:{
            type:String,
            minlength:3,
            maxlength:45
         },
         emailId:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            validate(value){
               if(!validator.isEmail(value)){
                  throw new Error("Invalid email")
               }
            }
         },
         password:{
            type:String,
            required:true,
            validate(value){
               if(!validator.isStrongPassword(value)){
                  throw new Error("passsword is weak")
               }
            }
         },
         age:{
            type:Number,
            min:18,
            max:90
            
         },
         gender:{
            type:String,
            validate(value){
               if(!["male","female","others"].includes(value)){
                  throw new Error("Gender data is not valid")
               }
            }
         },     
         photoUrl:{
            type:String,
            default:"https://www.freeiconspng.com/thumbs/male-icon/male-icon-19.png",
            validate(value){
               if(!validator.isURL(value)){
                  throw new Error("Invalid url"+ value)
               }
            }
         },
         about:{
            type:String,
            default:"devloper of devTInder"
         },
         skills:{ 
            type:[String],
            validate(arr){
               if(arr.length>=20){
                  throw new Error("array cannot be so big")
               }

            }
         }




},{timestamps:true});

//never use a arrow function with this
userSchema.methods.getJWT = async function (){
  const user = this;
   const token = await jwt.sign({_id:this._id},"DEV@Tinder$790",{expiresIn:"1d"});

    return token;
}



userSchema.methods.validatePassword= async function(passwordByUser){
    const user = this;
    const passwordHash = this.password;
     const isPasswordValid =await bcrypt.compare(passwordByUser,passwordHash);
    return isPasswordValid;
}



const UserModel= mongoose.model("User",userSchema)
module.exports = UserModel;