import {Schema , model, models,Types} from "mongoose"


const carSchema = new Schema({
    title:{type:String,required:true},
    slug:String,
    imagesUrl:[{type:String,required:true}],
    color:String,
    modelYear:{type:Number,required:true},
    seater:{type:Number,required:true},
    powerHorsel:{type:Number,required:true},
    KilometersIncluded:{type:Number,required:true},
    rentalCost:{type:Number,required:true},
    relatedVideo:String,
    createdBy : {type:Types.objectId, ref:"User"},
    categoryId: { type:Types.objectId, ref:"Category"},
    brandId: { type:Types.objectId, ref:"Brand"},
},{
    timeStamp:true,
    strict:true
})

const carModel = models.Car || model("Car",carSchema)


export default carModel