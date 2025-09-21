const Resturant = require("../models/resturantModel");

// Create Resturant Controller
exports.postCreateResturant = async (req, res) => {
  try {
    const {
      resturantName,
      imageUrl,
      foodsOption,
      resturantTime,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    } = req.body;
    if (!resturantName || !coords) {
      return res.status(400).send({
        success: false,
        message: "Resturant Name and Coords are required"
      });
    }
    // Make Resturant Object
    const newResturant = new Resturant({
      resturantName,
      imageUrl,
      foodsOption,
      resturantTime,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    });
    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "Resturant Created Successfully",
      newResturant
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating resturant",
      error
    });
  }
};

// Get all resturant Controller
exports.getAllResturants = async (req, res) => {
  try {
    const resturants = await Resturant.find();
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No resturants found"
      });
    }
    res.status(200).send({
      success: true,
      message: "All Resturants Fetched",
      resturants
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting resturants",
      error
    });
  }
};

// Get single resturant Controller
exports.getSingleResturant = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: "Resturant ID is required"
      });
    }
    // Find resturant by Id
    const resturant = await Resturant.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No resturant found"
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant Fetched",
      resturant
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting resturant",
      error
    });
  }
};

// Delete Resturant Controller
exports.deleteResturant = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if(!resturantId){
      return res.status(400).send({
        success : false,
        message : "Resturant ID is required"
      })
    }
    await Resturant.findByIdAndDelete(resturantId);
    res.status(200).send({
      success : true,
      message : 'Resturant Deleted Successfully',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting resturant",
      error
    });
  }
};
