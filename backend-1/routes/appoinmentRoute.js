const express = require("express");
const Appoinment = require("../models/appoinmentModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const appoinment = new Appoinment(req.body);
    await appoinment.save();
    res.json(appoinment);
  } catch (err) {
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req,res)=>{
    try{
        let appoinments=await Appoinment.find();
        res.json(appoinments)
    } catch(err){
         res.status(500).json({ error: "error" });
    }
});

router.put("/:id", async (req,res)=>{
    let id=req.params.id;
    body=req.body
    console.log(id);
    await Appoinment.findByIdAndUpdate(id,body);
    console.log(req.params.id);
    console.log(req.body);
    newdata=new Appoinment(req.body);
    body=newdata;
    // await body.save();
     res.json({msg:"updated"});
}); 

router.delete("/:id", async (req,res)=>{
  let id=req.params.id;
    await Appoinment.findByIdAndDelete(id);
    console.log(id);
        res.json({msg:"deleted"});
}); 


module.exports = router;
