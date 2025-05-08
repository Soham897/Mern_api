import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    image:{type:String,require:true},
    user:{type:mongoose.Schema.Types.ObjectId,require:true},
    createdAt:{type:Date,default:Date.now}
})

export const blogmodel = mongoose.model("blog",blogSchema);