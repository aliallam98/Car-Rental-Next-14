import {Schema,model,models,Types} from "mongoose"

const brandSchema = new Schema({
    title:{type:String,required:true,unique:true},
    slug:String,
    imageUrl:{type:String,required:true},
    // createdBy : {type:Types.ObjectId, ref:"User"},
},{
    timeStamp:true,
    strict:true
})

const brandModel =  model("Brand",brandSchema)


export default brandModel