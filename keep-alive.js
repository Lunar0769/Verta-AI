// Optional: Keep-alive service to prevent Render from sleeping
// You can run this separately or integrate it into your backend

const BACKEND_URL = 'https://your-backend-url.onrender.com'; // Replace with your actual URL
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (before 15-minute sleep timer)

async function pingBackend() {
    try {
        console.log(`🏓 Pinging backend at ${new Date().toISOString()}`);
        
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            headers: {
                'User-Agent': 'VERTA-KeepAlive/1.0'
            }
        });
        
        if (response.ok) {
            console.log('✅ Backend is alive');
        } else {
            console.log(`⚠️ Backend responded with status: ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ Ping failed: ${error.message}`);
    }
}

// Start keep-alive pings
console.log('🚀 Starting VERTA backend keep-alive service...');
console.log(`📡 Pinging every ${PING_INTERVAL / 1000 / 60} minutes`);

// Ping immediately
pingBackend();

// Set up interval
setInterval(pingBackend, PING_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Keep-alive service stopped');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Keep-alive service terminated');
    process.exit(0);
});