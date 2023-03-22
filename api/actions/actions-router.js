// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model')

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        if (actions !== 0)
       { res.status(200).json(actions)}
       else {
        res.status(404).json([])
       }
    })
})

router.get('/:id', async (req, res) => {
const action = await Actions.get(req.params.id)

if (!action) {
    res.status(404).json({ message: "no action with this id"})
} else {
    res.status(200).json(action)
}

})


router.post('/', (req, res) => {
    if (req.body.notes && req.body.description && req.body.project_id) {
        Actions.insert(req.body)
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

router.put('/:id', (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes || !(req.body.completed === true || req.body.completed === false)) {
        res.status(400).json({
            message: "all required fields must be filled out"
        })
    } else {
        Actions.update(req.params.id, req.body)
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
        const action = await Actions.get(req.params.id)
    if (!action) {
        res.status(404).json({
            message: "id not found"
        })
    } else {
        await Actions.remove(req.params.id)
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

module.exports = router;