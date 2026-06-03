const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

// Serve static assets (images, videos) from /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve src files (html, css, js)
app.use(express.static(path.join(__dirname, 'src')));

// Catch-all → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ██████╗ ██╗██╗  ██╗ ██████╗ ██╗   ██╗ █████╗`);
  console.log(`  ██╔══██╗██║╚██╗██╔╝██╔═══██╗██║   ██║██╔══██╗`);
  console.log(`  ██████╔╝██║ ╚███╔╝ ██║   ██║██║   ██║███████║`);
  console.log(`  ██╔═══╝ ██║ ██╔██╗ ██║   ██║╚██╗ ██╔╝██╔══██║`);
  console.log(`  ██║     ██║██╔╝ ██╗╚██████╔╝ ╚████╔╝ ██║  ██║`);
  console.log(`  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝\n`);
  console.log(`  🔴 Pixova Studio running at → http://localhost:${PORT}\n`);
});
