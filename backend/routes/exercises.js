const router = require('express').Router()
const Exercise = require('../models/exercise.model')

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error : '+err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({username, description, duration, date})

    newExercise.save()
    .then(() => res.json('Exercise added successfully'))
    .catch(err => res.status(400).json('Error : '+ err))

})

router.route('/:id').get((req, res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error : '+ err))
})

router.route('/:id').delete((req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Exercise deleted successfully'))
    .catch(err => res.status(400).json('Error : '+ err))
})

router.route('/update/:id').post((req, res)=>{
    Exercise.findById(req.params.id)
    .then(ex => {
        ex.username = req.body.username,
        ex.description = req.body.description,
        ex.duration = Number(req.body.duration),
        ex.date = Date.parse(req.body.date)

        ex.save()
        .then(() => res.json('Exercise updated successfully'))
        .catch(err => res.status(400).json('Error : '+ err))

    })
    .catch(err => res.status(400).json('Error : '+ err))
})

module.exports = router