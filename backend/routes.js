const Assessment = require('./Assessment');
const express = require('express');
const router = express.Router();

//Routes
router.get('/', (req, res)=> {
    res.send('HerHealth AI Backend is running');
});

router.get('/health', (req, res)=> {
    res.json({ status: 'Backend is live!' });
});

//Create a new Assessment
router.post('/assessment', async (req, res)=> {
    try {
        const assessment = new Assessment(req.body);
        await assessment.save();
        res.status(201).send(assessment);
    } catch (error) {
       res.status(400).send(error);
    }
});


//Get all Assessments
router.get('/assessment', async (req, res)=> {
    try {
        const assessments = await Assessment.find();
        res.status(201).send(assessments);
    } catch (error) {
        res.status(400).send(error);
    }
});


//Get one Assessment by ID
router.get('/assessment/:id', async (req, res)=> {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) return res.status(404).send();
        res.send(assessment);
    } catch (error) {
       res.status(400).send(error);
    }
})


module.exports = router;