const express = require("express");
const Doctor = require("../models/doctorModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    console.log(doctor);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req,res)=>{
    try{
        let doctors=await Doctor.find();
        res.json(doctors)
    } catch(err){
         res.status(500).json({ error: "not Found" });
    }
});

router.put("/:id", async (req,res)=>{
    let id=req.params.id;
    body=req.body
    console.log(id);
    await Doctor.findByIdAndUpdate(id,body);
    console.log(req.params.id);
    console.log(req.body);
    newdata=new Doctor(req.body);
    body=newdata;
    // await body.save();
     res.json({msg:"updated"});
}); 

router.delete("/:id", async (req,res)=>{
  let id=req.params.id;
    await Doctor.findByIdAndDelete(id);
    console.log(id);
        res.json({msg:"deleted"});
}); 


module.exports = router;
