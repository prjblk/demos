const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Vulnerable CORS configuration
app.use(cors({
    origin: false, // Reflects the request origin
    credentials: true // Allows cookies to be sent
}));

app.use(cookieParser());
app.use(express.json());

// Mock user database
const users = [
    { id: 1, username: 'admin', password: 'password123' }
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.cookie('session', 'fake-session-cookie', { secure: true, httpOnly: true, sameSite: 'none' });
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected endpoint
app.get('/protected', (req, res) => {
    const sessionCookie = req.cookies.session;

    if (sessionCookie === 'fake-session-cookie') {
        res.json({ message: 'You have access to protected data!' });
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
