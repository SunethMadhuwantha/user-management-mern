const User = require("../Models/UserModel");

// Get all users
const getAllUsers = async (req, res, next) => {
  let Users;

  try {
    Users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!Users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ Users });
};

// Add users
const addUsers = async (req, res, next) => {
  const { name, gmail, age, address } = req.body;
  let users;

  try {
    users = new User({ name, gmail, age, address });
    await users.save();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "Unable to add user" });
  }
  return res.status(200).json({ users });
};

// Get user by ID
const getByID = async (req, res, next) => {
  const id = req.params.id;
  console.log("Received ID:", id); // Log the received ID

  let Users;
  try {
    Users = await User.findById(id);
  } catch (err) {
    console.log("Error fetching user:", err);
  }

  if (!Users) {
    return res.status(404).json({ message: "User not found for the given ID" });
  }
  return res.status(200).json({ Users });
};

// Update user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  console.log("Updating User with ID:", id); // Log the received ID
  const { name, gmail, age, address } = req.body;
  let users;

  try {
    users = await User.findByIdAndUpdate(id, { name, gmail, age, address });
    users = await users.save();
  } catch (err) {
    console.log("Error updating user:", err);
  }

  if (!users) {
    return res.status(404).json({ message: "Unable to update user" });
  }
  return res.status(200).json({ users });
};

// Delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log("Error deleting user:", err);
  }

  if (!user) {
    return res.status(404).json({ message: "Unable to delete user" });
  }
  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getByID = getByID;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
