const {
  login,
  register,
  getAllUsers,
  setAvatar,
  setBadWordsCount,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/set-bad-word/:id", setBadWordsCount);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
