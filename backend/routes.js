const { PythonShell } = require('python-shell');
const Assessment = require('./Assessment');
const express = require('express');
const router = express.Router();
const { login } = require('./controllers/auth');

//Routes
router.get('/', (req, res)=> {
    res.send('HerHealth AI Backend is running');
});

router.get('/health', (req, res)=> {
    res.json({ status: 'Backend is live!' });
});

router.post('/auth/login', login);

//Create a new Assessment
router.post('/assessment', async (req, res)=> {
    try {
        const assessment = new Assessment(req.body);
        await assessment.save();
        res.status(200).send(assessment);
    } catch (error) {
       res.status(400).send(error);
    }
});

router.post('/predict', (req, res) => {
    const input = req.body;

    const options = {
        mode: 'json',
        pythonOptions: ['-u'],
        scriptPath: './',
        args: [JSON.stringify(input)]
    };

    PythonShell.run('run_predict.py', options, function (err, results) {
        if (err) return res.status(500).json({ error: err.message });

        const prediction = results[0].prediction;
        res.json({ prediction });
    });
});



//Get all Assessments
router.get('/assessment', async (req, res)=> {
    try {
        const assessments = await Assessment.find().sort({ createdAt: -1 });
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