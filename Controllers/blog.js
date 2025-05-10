
import { blogmodel } from "../Models/Blog.js";

export const addBlog = async (req,res)=>{
    const {title,description,image} = req.body;

    if(title == "" || description == ""||image==""){
        return res.status(400).json({message:"All fields are required" ,success:false})
    }

    const blog = await blogmodel.create({title,description,image,user:req.User._id});

    res.status(201).json({message:"Blog created",blog,success:true
    })
}

export const myBlog = async (req,res)=>{
    const user = req.User._id;

    const blogs = await blogmodel.find({user});

    res.status(200).json({blogs})
}

export const updateBlog = async (req,res)=>{
    const {title,description,image} = req.body;

    const id = req.params.id;
    if(title == "" || description == ""||image==""){
        return res.status(400).json({message:"All fields are required" ,success:false})
    }

    let blog =await blogmodel.findById(id);
    if(!blog){
        return res.status(404).json({message:"Blog Not Found" ,success:false})
    }
   blog.title = title;
   blog.image=image;
   blog.description= description;

   blog.save();

   res.status(200).json({message:"Blog updated",blog,success:true})

}

export const deleteBlog = async (req,res)=>{
    const id = req.params.id;

    let blog =await blogmodel.findById(id);
    if(!blog){
        return res.status(404).json({message:"Blog Not Found" ,success:false})
    }

    await blog.deleteOne();

    res.status(200).json({message:"Blog deleted",success:true})
}

export const allblogs = async (req,res)=>{
    let blogs = await blogmodel.find();

    if(!blogs) {
        return res.status(404).json({message:"Blogs Not Found" ,success:false})
    }
    res.status(200).json({message:"Blogs found",blogs,success:true})
}
export const blogbyid = async (req,res)=>{
    const id = req.params.id;

    let blog = await blogmodel.findById(id)

    if(!blog){
        return res.status(404).json({message:"Blog Not Found" ,success:false})
    }
    res.status(200).json({message:"Blog found",blog,success:true})
}
