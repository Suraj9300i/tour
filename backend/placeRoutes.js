const express = require("express");
const { findOne, findById } = require("./models/place");
const PlaceModel = require("./models/place");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

async function createNewPlace(req, res) {
  // const id = "p" + (DUMMY_PLACES.length + 1);
  // const data = Object.assign({ id: id }, req.body);
  // DUMMY_PLACES.push(data);

  const createdPlace = new PlaceModel({
    title: req.body.title,
    description: req.body.description,
    image:
      req.body.imageUrl ||
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: req.body.address,
    location: {
      lat: (Math.random() * 100).toFixed(2),
      lan: (Math.random() * 100).toFixed(2),
    },
    creator: req.body.creator,
  });

  try {
    await createdPlace.save();
  } catch {
    (err) => {
      return res.status(404).json({
        status: "fail",
        message: "not able to write data in db",
      });
    };
  }

  res.status(200).json({
    status: "success",
    createdPlace,
  });
}

async function retrieveAllPlaceOfUser(req, res) {
  const id = req.params.uid;
  // console.log(id);
  // const places = DUMMY_PLACES.filter((item) => item.creator === id);

  let places;

  try {
    places = await PlaceModel.find({ creator: id });
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong!",
      });
    };
  }

  if (!places || places.length === 0) {
    return res.status(500).json({
      status: "fail",
      message: "Invalid user id",
    });
  }

  res.status(200).json({
    status: "success",
    totalElements: places.length,
    data: places,
  });
}

async function getPlace(req, res) {
  const id = req.params.pid;
  // const place = DUMMY_PLACES.find((item) => item.id === id);

  let place;
  try {
    place = await PlaceModel.findById(id);
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong!",
      });
    };
  }

  if (!place) {
    return res.status(404).json({
      status: "fail",
      message: "place not found",
    });
  }

  res.status(200).json({
    status: "success",
    place,
  });
}

async function updatePlace(req, res) {
  const id = req.params.pid;
  // let placeIndex = -1;
  // const places = DUMMY_PLACES.find((item, index) => {
  //   placeIndex = index;
  //   return item.id === id;
  // });
  const { title, description, image, address, location } = req.body;

  let place;
  try {
    place = await PlaceModel.findById(id);
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong",
      });
    };
  }

  if (!place) {
    res.status(400).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  // DUMMY_PLACES[placeIndex] = { ...DUMMY_PLACES[placeIndex], ...req.body };
  place.title = title || place.title;
  place.description = description || place.description;
  place.image = image || place.image;
  place.address = address || place.address;
  place.location = location || place.location;

  try {
    await place.save();
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong",
      });
    };
  }

  res.status(200).json({
    status: "success",
    data: place,
  });
}

async function deletePlace(req, res) {
  const id = req.params.pid;
  // let placeIndex = -1;
  // const places = DUMMY_PLACES.find((item, index) => {
  //   placeIndex = index;
  //   return item.id === id;
  // });

  let place;
  try {
    place = await PlaceModel.findById(id);
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong",
      });
    };
  }

  if (!place) {
    res.status(400).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  try {
    await place.remove();
  } catch {
    (err) => {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong",
      });
    };
  }

  // const removedPlace = DUMMY_PLACES.splice(placeIndex, 1);

  res.status(200).json({
    status: "success",
    // removedPlace,
  });
}

const router = express.Router();

router.route("/").post(createNewPlace);

router.route("/user/:uid").get(retrieveAllPlaceOfUser);

router.route("/:pid").get(getPlace).patch(updatePlace).delete(deletePlace);

module.exports = router;
