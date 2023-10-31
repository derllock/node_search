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
const SkillSchema = new mongoose.Schema({
    technical_skill: String,
    location: String,
    experience: Number,
});
const Skill = mongoose.model('Skill',SkillSchema);

// Serve an HTML form with a dropdown for skill selection
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission and fetch data from MongoDB
app.post('/search', async (req, res) => {
    const selected = [req.body.skill, req.body.location, req.body.experience];
    try {
        const results = await Skill.find({
            technical_skill: selected[0],
            location: selected[1],
            experience: selected[2],
        });
        if(!results)res.send('No results found');
        else res.render('results',{ results });
    } catch (err) {
        console.error(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
