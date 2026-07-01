const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Data storage file paths
const DATA_DIR = path.join(__dirname, 'data');
const ENROLLMENTS_FILE = path.join(DATA_DIR, 'enrollments.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENROLLMENTS_FILE)) {
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
}

// Helper: read JSON file
function readJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Helper: write JSON file
function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ============================================================
// API ROUTES
// ============================================================

// POST /api/enroll - Handle course enrollment
app.post('/api/enroll', (req, res) => {
    const { name, email, phone, city, education, course, message } = req.body;

    // Validation
    if (!name || !email || !phone || !course) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields (Name, Email, Phone, Course).'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address.'
        });
    }

    const enrollment = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        name,
        email,
        phone,
        city: city || 'N/A',
        education: education || 'N/A',
        course,
        message: message || '',
        enrolledAt: new Date().toISOString(),
        status: 'pending'
    };

    const enrollments = readJSON(ENROLLMENTS_FILE);
    enrollments.push(enrollment);
    writeJSON(ENROLLMENTS_FILE, enrollments);

    console.log(`✅ New Enrollment: ${name} - ${course}`);

    res.status(201).json({
        success: true,
        message: `Enrollment successful! Welcome to ${course}, ${name}. We'll contact you shortly.`,
        enrollment: {
            id: enrollment.id,
            name: enrollment.name,
            course: enrollment.course,
            enrolledAt: enrollment.enrolledAt
        }
    });
});

// POST /api/contact - Handle contact form
app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields (Name, Email, Message).'
        });
    }

    const contact = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        name,
        email,
        phone: phone || 'N/A',
        subject: subject || 'General Inquiry',
        message,
        receivedAt: new Date().toISOString(),
        status: 'unread'
    };

    const contacts = readJSON(CONTACTS_FILE);
    contacts.push(contact);
    writeJSON(CONTACTS_FILE, contacts);

    console.log(`📩 New Contact: ${name} - ${subject || 'General'}`);

    res.status(201).json({
        success: true,
        message: `Thank you, ${name}! Your message has been received. We'll get back to you within 24 hours.`
    });
});

// GET /api/enrollments - View all enrollments (admin)
app.get('/api/enrollments', (req, res) => {
    const enrollments = readJSON(ENROLLMENTS_FILE);
    res.json({
        success: true,
        count: enrollments.length,
        enrollments
    });
});

// GET /api/contacts - View all contacts (admin)
app.get('/api/contacts', (req, res) => {
    const contacts = readJSON(CONTACTS_FILE);
    res.json({
        success: true,
        count: contacts.length,
        contacts
    });
});

// GET /api/stats - Basic statistics
app.get('/api/stats', (req, res) => {
    const enrollments = readJSON(ENROLLMENTS_FILE);
    const contacts = readJSON(CONTACTS_FILE);

    // Course-wise enrollment count
    const courseStats = {};
    enrollments.forEach(e => {
        courseStats[e.course] = (courseStats[e.course] || 0) + 1;
    });

    res.json({
        success: true,
        stats: {
            totalEnrollments: enrollments.length,
            totalContacts: contacts.length,
            courseBreakdown: courseStats,
            unreadContacts: contacts.filter(c => c.status === 'unread').length
        }
    });
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════════╗
    ║                                                  ║
    ║      🚀  D&H IT LABS (PRIVATE) LIMITED Server is Running! ║
    ║                                                  ║
    ║      🌐  http://localhost:${PORT}                  ║
    ║                                                  ║
    ║      📁  Static files served from: ./            ║
    ║      📊  API endpoints:                          ║
    ║          POST /api/enroll                        ║
    ║          POST /api/contact                       ║
    ║          GET  /api/enrollments                   ║
    ║          GET  /api/contacts                      ║
    ║          GET  /api/stats                         ║
    ║                                                  ║
    ╚══════════════════════════════════════════════════╝
    `);
});
