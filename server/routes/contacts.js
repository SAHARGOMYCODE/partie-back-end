const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

//get
router.get("/hello", (req, res) => {
  res.send("hello routing");
});
//post http://localhost:5000/api/contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    if (!req.body.email) {
      res.status(400).send({ message: "email is required check again" });
      return;
    }
    const response = await newContact.save();
    res.send({ response: response, message: "use is required" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "can not save" });
  }
});

//@methode get
//get all contact
// @path : http://localhost:5000/api/contact/
router.get("/", async (req, res) => {
  try {
    const result = await Contact.find();
    res.send({ response: result, message: "getting contact successfuly" });
  } catch (error) {
    res.status(400).send({ message: "can not get contact" });
  }
});

//@methode get
//get one contact
// @path : http://localhost:5000/api/contact/:id
//@param id
router.get("/:id", async (req, res) => {
  try {
    const result = await Contact.findOne({ _id: req.params.id });
    res.send({ response: result, message: "getting contact successfuly" });
  } catch (error) {
    res.status(400).send({ message: "there is no contact with this id" });
  }
});

//@methode delete
//delete one contact by id
//non n'est pas format json
// @path : http://localhost:5000/api/contact/:id
//@param id

router.delete("/:id", async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params.id });
    result.n
      ? res.send({ response: "users deleted" })
      : res.send("there is no users with id");
  } catch (error) {
    res.send("there is no id");
  }
});

//@methode put(update)
//update a contact by id
// @path : http://localhost:5000/api/contact/:id
//@param id body

router.put("/:id", async (req, res) => {
  try {
    const result = await Contact.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    console.log(result);

    result.nModified
      ? res.send({ message: "user update" })
      : res.send({ message: "contact already updated" });
  } catch (error) {
    res.status(400).send("not updated");
  }
});

module.exports = router;
