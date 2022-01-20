const { Router } = require('express');
const Task = require('../models/Task.js');
const router = Router();

router.get('/tasks/home/:day', async (req, res) => {
  let date = req.params.day.split('-');
  let año = date[2],
    mes = `0${date[0]}`.substr(-2),
    dia = `0${date[1]}`.substr(-2);

  const task = await Task.aggregate([
    {$match: { date: { $gte: `${año}-${mes}-${dia}` } }},
    {$group: { _id: "$title", hora: {$sum: "$hour"} }}
  ])

  res.json(task)
})

router.get('/tasks/:title/:day/:page', async (req, res) => {
  let perpage = 5;
  let page = req.params.page || 1;
  
  let date = req.params.day.split('-');
  let año = date[2],
    mes = `0${date[0]}`.substr(-2),
    dia = `0${date[1]}`.substr(-2);
  
  const task = await Task.find(
    {
      date: { $gte: `${año}-${mes}-${dia}` },
      title: { $eq: req.params.title }
    }
  )
  .skip((page * perpage) - perpage)
  .limit(perpage);

  const count = await Task.find(
    { 
      date: { $gte:  `${año}-${mes}-${dia}` },
      title: { $eq: req.params.title }
    },
  ).count();

  console.log(count)
    
  res.json({ 
    "task": task,
    "cant": count
   });
})

router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) res.status(404).json({ "Task": "Task not Found" });
    res.send(task);
  } catch (error) {
    return res.status(500).send(error)
  }
})

router.post('/task', async (req, res) => {
  const { title, description, date, hour } = req.body;
  if (!title, !description, !date, !hour) return res.status(400).json({ 'Not found': "Data incomplete" });
  const task = new Task({ title, date, hour, description });
  await task.save();
  res.json(task);
})

router.put('/task/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ "task": "Task not found" });
    res.json(task);
  } catch (err) {
    return res.status(500).send(err)
  }
})

router.delete('/task/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ "task": "Task not found" });
    res.json(task);
  } catch (err) {
    return res.status(500).send(err)
  }
})

module.exports = router;