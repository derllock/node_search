const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Define a MongoDB model
const Skill = mongoose.model('Skill', {
    technical_skill: String,
    location: String,
    experience: String,
});

// Serve an HTML form with a dropdown for skill selection
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission and fetch data from MongoDB
app.post('/search', async (req, res) => {
    const selectedSkill = req.body.skill;

    try {
        const results = await Skill.find({ technical_skill: selectedSkill });
        res.render('results', { results });
    } catch (err) {
        console.error(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
