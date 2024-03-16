import {Schema,model,models,Types} from "mongoose"

const categorySchema = new Schema({
    title:{type:String,required:true,unique:true},
    slug:String,
    imageUrl:{type:String,required:true},
    createdBy : {type:Types.objectId, ref:"User"},
    cars:[{type:Types.objectId, ref:"Car"}]
},{
    timeStamp:true,
    strict:true
})

const categoryModel = models.Category || model("Category",categorySchema)


export default categoryModel