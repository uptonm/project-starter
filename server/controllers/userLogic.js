// This class handles the logic behind creating, viewing, updating, and deleting user accounts
const mongoose = require('mongoose');
const User = mongoose.model('User');

error = (code, message, parameters) => {
  return {
    status: code,
    message: message,
    parameters: parameters ? parameters : ""
  }
}

exports.getUser = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    res.status(200).send(exists);
  } else {
    res.status(404).send(error(404, "Couldn't find your profile. Try again later.", null));
  }
};

exports.putUser = async (req, res) => {
  const allowedParameters = ['first', 'last', 'gender', 'bio'];
  const exists = await User.findById(req.user._id);
  // User exists, check for body of request to make update
  if (exists) {
    // Loop through keys of body, populate array with values that arnt on the param whitelist
    let bannedParameters = Object.keys(req.body).filter(
      param => !allowedParameters.includes(param)
    );
    if (bannedParameters.length > 0) {
      res.status(400).send(error(400, 'The following parameters are not allowed at this endpoint', bannedParameters));
    } else {
      await User.findByIdAndUpdate(exists._id, req.body);
      res.send({
        user: exists._id,
        update: req.body
      });
    }
  } else {
    res.status(404).send(error(404, "Couldn't find your profile. Try again later.", null));
  }
};

exports.deleteUser = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    await User.findByIdAndDelete(exists._id);
  } else {
    res.status(404).send(error(404, "Couldn't find your profile. Try again later.", null));
  }
};