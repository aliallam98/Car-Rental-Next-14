import {Schema,model,models,Types} from "mongoose"

const brandSchema = new Schema({
    title:{type:String,required:true,unique:true},
    slug:String,
    imageUrl:{type:String,required:true},
    createdBy : {type:Types.objectId, ref:"User"},
    cars:[{type:Types.objectId, ref:"Car"}]
},{
    timeStamp:true,
    strict:true
})

const brandModel = models.Brand || model("Brand",brandSchema)


export default brandModel