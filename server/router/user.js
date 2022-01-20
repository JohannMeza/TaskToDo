const { Router } = require('express');
const User = require('../models/User.js');
const router = Router();
const multer = require('multer')
const path = require('path')

router.get('/user', async (req, res) => {
  const user = await User.find();
  res.json(user)
})

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) return res.status(404).json({"Not Found": "User Not Found"})
    res.json(user)
  } catch (err) {
    return res.status(500).send(err)
  }
})

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '..', 'public/storage'),
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, file.originalname)
//   }
// })


router.post('/user', async (req, res) => {
  const { name, lastname, description, imgUrl } = req.body;
  if (!name, !description) return res.status(400).json({"Not Found": "Incomplete Data"});
  const user = new User({ name, lastname, description, imgUrl });
  await user.save();
  res.json(user);
})

const upload = multer({ dest: path.join(__dirname, '..', 'public/storage')})
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req)
  res.send("Imagen")
})

router.put('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({"Not Found": "User Not Found"});
    res.json(user)
  } catch (err) {
    return res.status(500).send(err)
  }
})

router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({"Not Found": "User Not Found"});
    res.json(user)
  } catch (err) {
    return res.status(500).send(err);
  }
})

module.exports = router;