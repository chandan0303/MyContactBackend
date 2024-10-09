const express = require("express");
const {
  getContacts,
  getContact,
  createContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

//we will use validateToken as a middleware for all the routes 
router.use(validateToken)//this is the way if all the routes are protected routes

//TWO WAYS

// Use router.route() when:

//      You have multiple HTTP methods (GET, POST, PUT, DELETE) for the same route.

//      You want to keep related route handlers grouped together for better organization.

router.route("/").get(getContacts);

// Use individual methods (router.get(), router.post(), etc.) when:

//       You have only one HTTP method for a route.

//       You prefer explicit, separate route definitions for clarity.

//router.get("/",getContacts)

router.route("/:id").get(getContact);

router.route("/").post(createContacts);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
