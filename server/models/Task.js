const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  hour: {
    type: Number,
    required: true,
    trim: true
  }
},{
  versionKey: false
});

taskSchema.virtual('fecha')
  .set(function (fecha) {
    console.log("fecha insertando ", fecha)
    this.date = new Date(fecha);
  }) 

  .get(function () {
    return this.date.toISOString().substring(0,10)
  })

const Task = model('Task', taskSchema);

module.exports = Task;
