
const express = require('express');
require("./conn");
const app = express();
const cors = require("cors");
const uploadImage = require('./category');
const cloudinary = require('./cloudinary');

const PORT = process.env.PORT || 8000;

 app.use(cors());
 app.use(express.json());

 app.post("/category", async (req,res)=>{
    console.log(req.body);
    const user = new uploadImage(req.body);
  await  user.save().then(()=>{
      res.status(201).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    })
  
  })
  
  
  app.get("/category", async (req,res)=>{
   
    try{ const user1 = await uploadImage.find().sort({_id:-1});
     
       res.status(201).send(user1);
   }catch(e){
       res.status(400).send(e);
     }
   
   });
  
  app.delete("/category/:id", async (req, res)=>{
    try{

      const user = await uploadImage.findById(req.params.id);

      if (!user) {
        return res.status(404).send("Category not found");
      }

      const url = user.imageId;
//       const parts = url.split('/');

//       let publicId = null;
// for (let i = 0; i < parts.length; i++) {
//   if (parts[i] === 'upload') {
//     publicId = parts[i + 1];
//     break;
//   }
// }

// console.log('publicId', publicId);

const publicId = url;
 
 const deleteResponse = await cloudinary.uploader.destroy(publicId);
 
 console.log('deletion reponse', deleteResponse);

const deleteCategory = await uploadImage.findByIdAndDelete(req.params.id);

if(!req.params.id){
        res.status(201).send();
      }
      res.send(deleteCategory);
    }catch(e){
       res.status(400).send(e);
    }
  })

  app.patch("/category/:id", async (req, res)=>{
    try{
      const _id = req.params.id;
      const updateCategory = await uploadImage.findByIdAndUpdate(_id, req.body,{
      new: true
      });
      res.send(updateCategory);
    }
    catch(e)
    {
      res.status(400).send(e);  
    }
  });


  app.use(express.static('web-build'));

 app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
