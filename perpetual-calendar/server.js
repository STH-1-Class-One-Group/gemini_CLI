const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

// 1. In-memory "database" for users and sessions
const users = {
    "testuser": {
        password: "password123",
        name: "Test User",
        email: "test@example.com"
    }
};
const sessions = {}; // sessionId -> username

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.sessionId;
    const username = sessions[sessionId];

    // API Routes
    if (pathname === '/login' && req.method === 'POST') {
        handleLogin(req, res);
    } else if (pathname === '/api/user' && req.method === 'GET') {
        handleGetUser(req, res, username);
    } else if (pathname === '/api/user' && req.method === 'POST') {
        handleUpdateUser(req, res, username);
    } else if (pathname === '/calendar-data' && req.method === 'GET') { // Renamed from /calendar
        handleCalendarData(req, res, parsedUrl);
    }
    // Page Routes
    else if (pathname === '/') {
        serveStaticFile(res, '/index.html', 'text/html');
    } else if (['/login', '/edit-profile', '/calendar'].includes(pathname)) {
        serveStaticFile(res, `${pathname}.html`, 'text/html');
    }
    // Static file serving (CSS, JS)
    else if (pathname.startsWith('/public/') || path.extname(pathname)) {
        serveStaticFile(res, pathname);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// --- API Handlers ---

function handleLogin(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        const { username, password } = JSON.parse(body);
        const user = users[username];

        if (user && user.password === password) {
            const newSessionId = Date.now().toString();
            sessions[newSessionId] = username;
            res.writeHead(200, {
                'Set-Cookie': `sessionId=${newSessionId}; HttpOnly; Path=/`,
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: 'Login successful' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid username or password' }));
        }
    });
}

function handleGetUser(req, res, username) {
    if (!username || !users[username]) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    const { name, email } = users[username];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ username, name, email }));
}

function handleUpdateUser(req, res, username) {
    if (!username || !users[username]) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        const { name, email } = JSON.parse(body);
        if (name) users[username].name = name;
        if (email) users[username].email = email;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User updated successfully' }));
    });
}

function handleCalendarData(req, res, parsedUrl) {
    const year = parseInt(parsedUrl.query.year, 10);
    const month = parseInt(parsedUrl.query.month, 10);

    if (isNaN(year) || isNaN(month)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid year or month' }));
        return;
    }
    const calendarData = generateCalendar(year, month);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(calendarData));
}


// --- Utility Functions ---

function serveStaticFile(res, reqPath, forceContentType) {
    const staticPath = path.join(__dirname, 'public', reqPath.replace('/public/', ''));
    
    let contentType = forceContentType;
    if (!contentType) {
        const extname = path.extname(staticPath);
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            default: contentType = 'text/html'; break;
        }
    }

    fs.readFile(staticPath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found.');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

function parseCookies(cookieHeader = '') {
    const list = {};
    cookieHeader.split(';').forEach(cookie => {
        let [name, ...rest] = cookie.split('=');
        name = name?.trim();
        if (!name) return;
        const value = rest.join('=').trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
    return list;
}

function generateCalendar(year, month) {
    const date = new Date(year, month - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    let weeks = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
        let week = [];
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayIndex) || day > daysInMonth) {
                week.push(null);
            } else {
                week.push(day++);
            }
        }
        weeks.push(week);
        if (day > daysInMonth) break;
    }
    return { year, month, monthName, weeks };
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});