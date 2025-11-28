const express = require("express");
const Patient = require("../models/patientModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body,);
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req,res)=>{
    try{
        let patients=await Patient.find();
        res.json(patients)
    } catch(err){
         res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req,res)=>{
    let id=req.params.id;
    body=req.body
    console.log(id);
    await Patient.findByIdAndUpdate(id,body);
    console.log(req.params.id);
    console.log(req.body);
    newdata=new Patient(req.body);
    body=newdata;
    // await body.save();
     res.json({msg:"updated"});
}); 

router.delete("/:id", async (req,res)=>{
  let id=req.params.id;
    await Patient.findByIdAndDelete(id);
    console.log(id);
        res.json({msg:"deleted"});
}); 

router.put('/patients/:id', async (req, res) => {
  const updated = await Patient.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
