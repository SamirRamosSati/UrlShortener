#🔗 URL Shortener

A simple and functional URL shortener built with TypeScript, Express.js, and EJS.

This application allows users to enter a full URL, generate a unique shortened version, and track how many times each shortened URL has been clicked. All data is stored persistently in a local JSON file, so links are preserved even after restarting the server.

#📸 Features
🔐 Generate unique short URLs using the shortid library.

📥 Store original URLs, short codes, and click counts.

🔁 Redirect users from the short URL to the original full URL.

📊 Track the number of clicks for each shortened link.

💾 Persistent local storage using data.json — no need for a database.

🧩 Built entirely with:

TypeScript for type safety

Express.js as the web framework

EJS for rendering server-side views

Node.js fs module for file I/O
