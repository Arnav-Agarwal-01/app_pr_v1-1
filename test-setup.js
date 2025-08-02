const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Testing College Event Management App Setup...\n');

// Test 1: Check if backend dependencies are installed
console.log('1. Checking backend dependencies...');
try {
    require('./backend/package.json');
    console.log('✅ Backend package.json found');

    // Check if node_modules exists
    const fs = require('fs');
    if (fs.existsSync('./backend/node_modules')) {
        console.log('✅ Backend dependencies installed');
    } else {
        console.log('❌ Backend dependencies not installed');
    }
} catch (error) {
    console.log('❌ Backend setup incomplete');
}

// Test 2: Check if frontend dependencies are installed
console.log('\n2. Checking frontend dependencies...');
try {
    require('./frontend/package.json');
    console.log('✅ Frontend package.json found');

    const fs = require('fs');
    if (fs.existsSync('./frontend/node_modules')) {
        console.log('✅ Frontend dependencies installed');
    } else {
        console.log('❌ Frontend dependencies not installed');
    }
} catch (error) {
    console.log('❌ Frontend setup incomplete');
}

// Test 3: Check configuration files
console.log('\n3. Checking configuration files...');
const fs = require('fs');

if (fs.existsSync('./backend/.env')) {
    console.log('✅ Backend environment configuration found');
} else {
    console.log('❌ Backend .env file missing');
}

if (fs.existsSync('./frontend/config/environment.js')) {
    console.log('✅ Frontend environment configuration found');
} else {
    console.log('❌ Frontend environment configuration missing');
}

if (fs.existsSync('./backend/config/database.js')) {
    console.log('✅ Database configuration found');
} else {
    console.log('❌ Database configuration missing');
}

console.log('\n4. Project structure verification...');
const requiredFiles = [
    './backend/server.js',
    './frontend/App.js',
    './frontend/app.json',
    './package.json'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
    }
});

console.log('\n🎉 Setup verification complete!');
console.log('\nNext steps:');
console.log('- Run "npm run backend:dev" to start the backend server');
console.log('- Run "npm run frontend:dev" to start the frontend app');
console.log('- Or run "npm run dev" to start both simultaneously');