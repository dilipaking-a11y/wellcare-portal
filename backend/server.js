const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

const FILES = {
    users: './data/users.json',
    health: './data/healthData.json',
    plans: './data/carePlans.json'
};

// Ensure data folder and files exist
const readData = (file) => {
    if (!fs.existsSync(file)) fs.outputJsonSync(file, []);
    return fs.readJsonSync(file);
};
const writeData = (file, data) => fs.writeJsonSync(file, data);

// ROUTES
app.post('/api/register', (req, res) => {
    const users = readData(FILES.users);
    const newUser = { id: uuidv4(), ...req.body };
    users.push(newUser);
    writeData(FILES.users, users);
    res.json(newUser);
});

app.post('/api/login', (req, res) => {
    const users = readData(FILES.users);
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (user) res.json(user);
    else res.status(401).json({ message: "Invalid credentials" });
});

app.post('/api/health-stats', (req, res) => {
    const stats = readData(FILES.health);
    const newStat = { id: uuidv4(), ...req.body };
    const index = stats.findIndex(s => s.userId === req.body.userId);
    if (index > -1) stats[index] = newStat;
    else stats.push(newStat);
    writeData(FILES.health, stats);
    res.json({ message: "Success" });
});

app.get('/api/specialist/users', (req, res) => res.json(readData(FILES.health)));

// --- MOCK AI LOGIC (No API Key Needed) ---
app.post('/api/generate-ai-advice', (req, res) => {
    const { name, issue, healthCondition, preventionGoal, weight } = req.body;
    
    // Dynamic Mock Template (Industry Standard Demo)
    const mockAdvice = `MEDICAL CONSULTATION SUMMARY
-----------------------------------
Patient: ${name}
Target Goal: ${preventionGoal}

ANALYSIS:
Based on your reported issue of "${issue}", our AI analysis suggests this is related to ${healthCondition}. 

RECOMMENDATIONS:
1. DIETARY: Since your current weight is ${weight}kg, we recommend a high-protein, low-sodium diet to support your goal of ${preventionGoal}.
2. ACTIVITY: Incorporate 30 minutes of low-impact stretching daily.
3. HYDRATION: Minimum 3.5 Liters of water daily to improve recovery.

This plan has been customized for your specific vitals. Please follow for 14 days and report back.`;

    res.json({ advice: mockAdvice });
});

app.post('/api/submit-plan', (req, res) => {
    const plans = readData(FILES.plans);
    plans.push({ id: uuidv4(), ...req.body, date: new Date().toLocaleDateString() });
    writeData(FILES.plans, plans);
    res.json({ success: true });
});

app.get('/api/my-plan/:userId', (req, res) => {
    const plans = readData(FILES.plans);
    const userPlan = plans.filter(p => p.userId === req.params.userId).reverse();
    res.json(userPlan[0] || {});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));