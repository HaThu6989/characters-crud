const router = require("express").Router();
const Character = require("../models/Character.model");

const axios = require("axios");
const { response } = require("../app");

// READ : list characters
router.get("/", (req, res, next) => {

  axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(response => {
      res.render("characters/characters-list", { characters: response.data });
    })
    .catch(err => console.log('Error getting characters from DB...', err));


  // Character.find()
  //   .then( charactersFromDB => {
  //     res.render("characters/characters-list", {characters: charactersFromDB});
  //   })
  //   .catch(err => {
  //     console.log('Error getting characters from DB...', err);
  //   })
});

// CREAT: display form
router.get("/create", (req, res, next) => {
  res.render("characters/character-create");
});

// CREAT: process form
router.post('/create', (req, res, next) => {

  const characterDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }
  axios.post("https://ih-crud-api.herokuapp.com/characters", characterDetails)
    .then(() => {
      // console.log("data     :   ", response.data);
      res.redirect("/characters");
    })
    .catch(err => console.log('Error creating new character in the API', err));

  // Character.create(characterDetails)
  //   .then(character => {
  //     res.redirect("/characters");
  //   })
  //   .catch(err => {
  //     console.log('Error creating new character...', err);
  //   })
})

// READ : character detail
router.get("/:characterId", (req, res, next) => {
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then(response => {
      // console.log('data  :   ', response.data)
      res.render("characters/character-details", response.data);

    })
    .catch(err => {
      console.log('Error getting character details from API', err);
    })


  // Character.findById(req.params.characterId)
  //   .then(character => {
  //     res.render("characters/character-details", character);
  //   })
  //   .catch();
});

// UPDATE: display form
router.get("/:characterId/edit", (req, res, next) => {

  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.characterId}`)
    .then((response) => {
      res.render("characters/character-edit", response.data);
    })
    .catch(err => console.log('Error getting character details from API', err));

  // Character.findById(req.params.characterId)
  //   .then((characterDetails) => {
  //     res.render("characters/character-edit", characterDetails);
  //   })
  //   .catch(err => {
  //     console.log("Error getting character details from DB...", err);
  //   });
});

// UPDATE: process form
router.post("/:characterId/edit", (req, res, next) => {
  const characterId = req.params.characterId;

  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
  }

  // PUT  /characters/:id
  axios.put(`https://ih-crud-api.herokuapp.com/characters/${characterId}`, newDetails)
    .then(() => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch(err => console.log('Error updating character in API', err))

  // Character.findByIdAndUpdate(characterId, newDetails)
  //   .then( () => {
  //     res.redirect(`/characters/${characterId}`);
  //   })
  //   .catch( err => {
  //     console.log("Error updating character...", err);
  //   });
});


// DELETE
router.post("/:characterId/delete", (req, res, next) => {
  const id = req.params.characterId
  axios.delete('https://ih-crud-api.herokuapp.com/characters/' + id)
    .then(() => {
      res.redirect("/characters");
    })
    .catch(err => console.log('Error deleting character in the API', err));


  // Character.findByIdAndDelete(req.params.characterId)
  //   .then(() => {
  //     res.redirect("/characters");
  //   })
  //   .catch(err => {
  //     console.log("Error deleting character...", err);
  //   });

});

module.exports = router;
