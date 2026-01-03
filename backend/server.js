const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

// --- INDUSTRY STANDARD MIDDLEWARE ---
// This allows your frontend (wherever it is) to talk to this backend
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// --- DATA FILE PATHS ---
// Using path.join ensures it works on both Windows and Render (Linux)
const DATA_DIR = path.join(__dirname, 'data');
const FILES = {
    users: path.join(DATA_DIR, 'users.json'),
    health: path.join(DATA_DIR, 'healthData.json'),
    plans: path.join(DATA_DIR, 'carePlans.json')
};

// --- INITIALIZE FILES ---
// This creates the files if they don't exist so the server doesn't crash
const initDB = () => {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
    Object.values(FILES).forEach(file => {
        if (!fs.existsSync(file)) fs.outputJsonSync(file, []);
    });
};
initDB();

const readData = (file) => fs.readJsonSync(file, { throws: false }) || [];
const writeData = (file, data) => fs.writeJsonSync(file, data);

// --- API ROUTES ---

// 1. User Registration
app.post('/api/register', (req, res) => {
    try {
        const users = readData(FILES.users);
        const newUser = { id: uuidv4(), ...req.body };
        users.push(newUser);
        writeData(FILES.users, users);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ message: "Error saving user" });
    }
});

// 2. User Login
app.post('/api/login', (req, res) => {
    const users = readData(FILES.users);
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if (user) res.json(user);
    else res.status(401).json({ message: "Invalid email or password" });
});

// 3. Update Health Stats (User Dashboard)
app.post('/api/health-stats', (req, res) => {
    const stats = readData(FILES.health);
    const newStat = { id: uuidv4(), ...req.body };
    const index = stats.findIndex(s => s.userId === req.body.userId);
    
    if (index > -1) stats[index] = { ...stats[index], ...req.body };
    else stats.push(newStat);
    
    writeData(FILES.health, stats);
    res.json({ message: "Stats updated successfully" });
});

// 4. Specialist: Get all Patients
app.get('/api/specialist/users', (req, res) => {
    res.json(readData(FILES.health));
});

// 5. AI ADVICE GENERATOR (Smart Template - No API Key Needed)
app.post('/api/generate-ai-advice', (req, res) => {
    const { name, age, weight, height, issue, healthCondition, preventionGoal } = req.body;

    // This ensures no "undefined" appears even if data is missing
    const pName = name || "Patient";
    const pIssue = issue || "general health concerns";
    const pGoal = preventionGoal || "better wellness";
    const pWeight = weight || "N/A";

    const advice = `
WELLCARE AI CONSULTATION REPORT
-----------------------------------------
PATIENT: ${pName} | AGE: ${age || '--'}
GOAL: ${pGoal}

CLINICAL ANALYSIS:
Based on your reported issue of "${pIssue}", our AI has analyzed your condition (${healthCondition || 'General Vitals'}). 

PERSONALIZED CARE STEPS:
1. DIETARY GUIDANCE: Considering your weight of ${pWeight}kg, maintain a balanced caloric intake. Focus on hydration (3L/day) and low-sodium meals.
2. LIFESTYLE ADVICE: To reach your goal of "${pGoal}", we recommend 20 minutes of moderate activity 4 times a week.
3. MONITORING: Track your symptoms daily. If the ${pIssue} persists for more than 7 days, please book a physical examination.

NOTE: This is an AI-generated draft. Review and modify before finalizing.
    `;

    res.json({ advice: advice.trim() });
});

// 6. Specialist: Submit Final Plan
app.post('/api/submit-plan', (req, res) => {
    const plans = readData(FILES.plans);
    plans.push({ 
        id: uuidv4(), 
        ...req.body, 
        date: new Date().toLocaleDateString() 
    });
    writeData(FILES.plans, plans);
    res.json({ success: true });
});

// 7. User: Get My Care Plan
app.get('/api/my-plan/:userId', (req, res) => {
    const plans = readData(FILES.plans);
    const userPlan = plans.filter(p => p.userId === req.params.userId).reverse();
    res.json(userPlan[0] || { message: "No care plan assigned yet." });
});

// --- DYNAMIC PORT FOR RENDER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 WellCare Server Running on Port ${PORT}`));