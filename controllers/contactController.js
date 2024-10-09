const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@accsess prvate
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get contact for id
//@route GET /api/contact/:id
//@accsess private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Create contacts
//@route POST /api/contacts
//@accsess private
const createContacts = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are manadatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Update contact for id
//@route PUT /api/contact/:id
//@accsess private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User doesnot have permission to update other user contacts."
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact for id
//@route DELETE /api/contact/:id
//@accsess private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User doesnot have permission to delete other user contacts."
    );
  }

  //await Contact.remove();it will not work in latest version
  //   await Contact.deleteOne({ _id: req.params.id });
  // OR
  await Contact.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContacts,
  updateContact,
  deleteContact,
};
