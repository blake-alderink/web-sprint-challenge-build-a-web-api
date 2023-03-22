// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if (projects !== 0)
       { res.status(200).json(projects)}
       else {
        res.status(200).json([])
       }
    })
})

router.get('/:id', async (req, res) => {
    const project = await Projects.get(req.params.id);
    try {
    if (project) {
        res.status(200).json(project)
    } else {
        res.status(404).json({
            message: "this project with this id is not found"
        })
    }
    } catch (err) {
        res.status(500).json({
            message: "this is an error message",
            error: err.message
        })
    }
})


router.post('/', (req, res) => {
    if (req.body.name && req.body.description) {
        Projects.insert(req.body)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => res.status(500).json({
            message: "500 error"
        }))
    } else {
        res.status(400).json({
            message: "name and description both required"
        })
    }
    
})

router.put('/:id', async (req, res) => {

if (!req.body.name || !req.body.description || !(req.body.completed === true || req.body.completed === false)) {
    res.status(400).json({
        message: "all required fields must be filled out"
    })
} else {
    Projects.update(req.params.id, req.body)
    .then(update => {
        if (!update) {
            res.status(404).json({
                message: "this project does not exist"
            })
        } else {
            res.status(201).json(update)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "oh noooo this is bad"
        })
    })
}
    
})

router.delete('/:id', async (req, res) => {
try {
    const project = await Projects.get(req.params.id)
if (!project) {
    res.status(404).json({
        message: "id not found"
    })
} else {
    await Projects.remove(req.params.id)
    res.status(201).json({
        message: "this was successfully deleted"
    })
    }
}

catch (err) {
    res.status(500).json({
        message: "this did not work"
    })
}
})


router.get('/:id/actions', async (req, res) => {
const actions = await Projects.getProjectActions(req.params.id)
if (actions.length > 0) {
    res.status(200).json(actions)
} else {
    res.status(200).json([])
}
})


module.exports = router;
