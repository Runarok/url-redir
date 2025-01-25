# Code Appendix

# API Redirector Customization Guide

This guide explains how to customize the API Redirector HTML template for your use case. Below are the steps and areas that need to be modified.

### 1. **Favicon Icon URL**
   - **Location:** In the `<head>` section, inside the `<link rel="icon">` tag.
   - **Action:** Replace `YOUR_ICON_URL_HERE` with the URL of the icon you want to use for the page's favicon.
   - **Example:**
     ```html
     <link rel="icon" href="https://example.com/icon.png" type="image/png">
     ```

---

### 2. **Host Name**
   - **Location:** In the `.footer` section, inside the paragraph with the host information.
   - **Action:** Replace `YOUR_NAME_HERE` with the name of the person or entity hosting the page.
   - **Example:**
     ```html
     <p>Hosted by <strong>John Doe</strong></p>
     ```

---

### 3. **Repository Link**
   - **Location:** In the `.footer` section, inside the repository link.
   - **Action:** Replace `YOUR_REPOSITORY_URL_HERE` with the URL of your repository (e.g., GitHub repository URL), and `YOUR_REPOSITORY_NAME` with the name of your repository.
   - **Example:**
     ```html
     <p>Repository: <a href="https://github.com/johndoe/my-repo" target="_blank">my-repo</a></p>
     ```

---

### 4. **All Redirects Page Link**
   - **Location:** In the `.footer` section, inside the link to "All Redirects Present".
   - **Action:** Replace `YOUR_ALL_REDIRECTS_PAGE_URL_HERE` with the URL of the page where all the redirects are listed.
   - **Example:**
     ```html
     <p><a href="https://example.com/all-redirects" target="_self">All Redirects Present</a></p>
     ```

---

### 5. **Redirect JSON URL**
   - **Location:** Inside the `<script>` section, in the `fetch` function where the redirects JSON is fetched.
   - **Action:** Replace `YOUR_REDIRECT_JSON_URL_HERE` with the URL of your redirects JSON file.
   - **Example:**
     ```javascript
     const response = await fetch('https://example.com/redirects.json');
     ```

Once you've updated these placeholders, your HTML file will be customized for your use case.

---

## Main HTML for Hash-based Redirects

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Update the favicon icon URL here -->
    <link rel="icon" href="YOUR_ICON_URL_HERE" type="image/png">
    <title>API Redirector</title>
    <style>
        /* General reset for consistent styling */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #1e1e2f;
            color: #e0e0e0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            position: relative;
        }

        h1 {
            font-size: 2.5rem;
            color: #ffffff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h1 img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }

        .container {
            background-color: #2c2f3f;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
            max-width: 600px;
            width: 100%;
        }

        p {
            font-size: 1rem;
            margin-bottom: 10px;
        }

        a {
            color: #78c6e0;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .popup-button {
            background-color: #4a90e2;
            color: #121212;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s ease;
            margin-right: 10px;
        }

        .popup-button:hover {
            background-color: #3b7fb1;
        }

        .message-container {
            margin-top: 15px;
        }

        .footer {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #a0a0a0;
        }

        /* Toast Notification Style */
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4a90e2;
            color: white;
            padding: 15px;
            border-radius: 5px;
            display: none;
            font-size: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .toast.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>
            <!-- Update the icon URL to your own icon -->
            <img src="YOUR_ICON_URL_HERE" alt="URL Redirector Icon"> API Redirector
        </h1>
        <p>This page acts as an API redirector. If the URL hash matches a predefined fragment, you will be redirected.</p>
        <div class="message-container">
            <p id="message">Loading...</p>
        </div>
        <div class="footer">
            <!-- Update host name here -->
            <p>Hosted by <strong>YOUR_NAME_HERE</strong></p>
            <!-- Update repository link here -->
            <p>Repository: <a href="YOUR_REPOSITORY_URL_HERE" target="_blank">YOUR_REPOSITORY_NAME</a></p>
            <!-- Update the link to the page with all redirects -->
            <p><a href="YOUR_ALL_REDIRECTS_PAGE_URL_HERE" target="_self">All Redirects Present</a></p>
        </div>
    </div>

    <script>
        let redirectUrls = []; // Stores the URLs for the current hash

        async function fetchRedirects() {
            // Fetch the redirects JSON from your custom URL
            const response = await fetch('YOUR_REDIRECT_JSON_URL_HERE');
            const redirects = await response.json();
            handleRedirect(redirects);
        }

        function handleRedirect(redirects) {
            const hash = window.location.hash.substring(1).toLowerCase(); // Normalize hash to lowercase

            // Normalize the keys in redirects to lowercase
            const normalizedRedirects = Object.keys(redirects).reduce((acc, key) => {
                acc[key.toLowerCase()] = redirects[key];
                return acc;
            }, {});

            if (normalizedRedirects[hash]) {
                const redirect = normalizedRedirects[hash];

                // Support for multiple URLs in an array
                if (Array.isArray(redirect.url)) {
                    redirectUrls = redirect.url;
                } else {
                    redirectUrls = [redirect.url];
                }

                // Show popup or proceed based on the configuration
                if (redirect.showPopup) {
                    showPopup();
                } else {
                    openUrls();
                }
            } else {
                document.getElementById('message').innerText = `No redirect found for hash: ${hash}`;
            }
        }

        function showPopup() {
            const messageContainer = document.querySelector('.message-container');
            const urlList = redirectUrls.map(url => `<li>${url}</li>`).join('');
            const popupMessage = `
                <p>The following URLs are associated with this hash:</p>
                <ul>${urlList}</ul>
                <p>Do you want to proceed?</p>
                <button class="popup-button" onclick="openUrls()">Yes, Open All</button>
                <button class="popup-button" onclick="closeTab()">Close Tab</button>
            `;
            messageContainer.innerHTML = popupMessage;
        }

        function openUrls() {
            if (redirectUrls.length === 1) {
                // Load the single URL in the current tab
                window.location.href = redirectUrls[0];
            } else {
                // Open all URLs in new tabs
                redirectUrls.forEach((url, index) => {
                    window.open(url, `redirectTab_${index}`);
                });

                showToast('All URLs have been opened in new tabs.');
                closeTab();
            }
        }

        function closeTab() {
            if (window.close) {
                window.close();
            }
            showToast('If the tab does not close automatically, please close it manually.');
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.classList.add('toast', 'show');
            toast.innerText = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove('show');
                document.body.removeChild(toast);
            }, 3000); // Hide toast after 3 seconds
        }

        // Add keyboard shortcut (Ctrl + Shift + A) to trigger a specific redirect
        window.addEventListener('keydown', function(event) {
            if (event.shiftKey && event.key === 'A') {
                window.location.hash = '#All'; // Trigger the "All" redirect
            }
        });

        // Fetch redirects when the page is loaded
        window.onload = fetchRedirects;
    </script>
</body>
</html>
```

This HTML is responsible for handling all redirects using hash-based routing. When the hash in the URL changes, the corresponding page content is dynamically loaded.

> I used all here, but you can directly link the "All" redirect showcasing HTML.  
> Here: <pre> window.location.hash = '#All'; // Trigger the "All" redirect </pre>
> If this is used, the "All" tag should be present in `redirect.json` which will handle the redirection to that page.

## HTML Used to Showcase All Redirects

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="YOUR_ICON_URL_HERE" type="image/png"> <!-- Replace with your icon URL -->
    <title>API Redirector</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Body Styling */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #1e1e2f;
            color: #e0e0e0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            position: relative;
        }

        /* Container Styling */
        .container {
            background-color: #2c2f3f;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
            max-width: 800px;
            width: 100%;
        }

        /* Links Styling */
        a {
            color: #78c6e0;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Redirect Item Styling */
        .redirect-item {
            background-color: #3a3f53;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            position: relative;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .redirect-item:hover {
            background-color: #5f6975;
        }

        /* Toast Notification Styling */
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4a90e2;
            color: white;
            padding: 15px;
            border-radius: 5px;
            display: none;
            font-size: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .toast.show {
            display: block;
        }

        /* Handle long URLs */
        .redirect-item p {
            word-wrap: break-word;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            word-break: break-word;
        }

        .redirect-item h3 {
            font-size: 1.3rem;
            color: #ffffff;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>API Redirector - All Redirects</h1>
        <p>This page dynamically loads and displays all available redirects, their corresponding URLs, and popup status.</p>
        <div id="redirects-container" class="message-container">
            <p>Loading...</p>
        </div>
        <div class="footer">
            <p>Hosted by <strong>YOUR_NAME_HERE</strong></p> <!-- Replace with your name or entity -->
            
            <p>Repository: <a href="YOUR_REPOSITORY_URL_HERE" target="_blank">YOUR_REPOSITORY_NAME</a></p> <!-- Replace with your GitHub repo URL and name -->
            
            <p><a href="YOUR_ALL_REDIRECTS_PAGE_URL_HERE" target="_self">All Redirects Present</a></p> <!-- Replace with the URL to your redirects page -->
        </div>
    </div>

    <script>
        async function fetchRedirects() {
            try {
                const response = await fetch('YOUR_REDIRECT_JSON_URL_HERE'); <!-- Replace with your redirects JSON URL -->
                if (!response.ok) {
                    throw new Error("Failed to fetch redirects");
                }
                const redirects = await response.json();
                displayRedirects(redirects);
            } catch (error) {
                document.getElementById('redirects-container').innerHTML = `<p style="color: red;">Error loading redirects: ${error.message}</p>`;
            }
        }

        function displayRedirects(redirects) {
            const container = document.getElementById('redirects-container');
            container.innerHTML = '';

            for (const key in redirects) {
                const redirect = redirects[key];
                const isArray = Array.isArray(redirect.url);
                const urls = isArray ? redirect.url.join(', ') : redirect.url;
                const popupStatus = redirect.showPopup ? 'Yes' : 'No';

                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                const truncatedUrls = urls.length > 50 ? `${urls.substring(0, 50)}...` : urls;

                const redirectHtml = `
                    <div class="redirect-item" data-hash="${key}" title="Click to copy URL for ${capitalizedKey}" onclick="copyToClipboard(this)">
                        <h3>${capitalizedKey}</h3>
                        <p><strong>URLs:</strong><span title="${urls}">${truncatedUrls}</span></p>
                        <p><strong>Popup:</strong> ${popupStatus}</p>
                    </div>
                `;
                container.innerHTML += redirectHtml;
            }
        }

        function copyToClipboard(element) {
            const hash = element.getAttribute('data-hash');
            const url = `YOUR_REDIRECT_PAGE_URL_HERE/#${hash}`; <!-- Replace with your base redirect page URL -->

            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            showToast(`URL copied: ${url}`);
        }

        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast show';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.classList.remove('show');
                document.body.removeChild(toast);
            }, 3000);
        }

        window.onload = fetchRedirects;
    </script>
</body>
</html>
```

This HTML showcases all the available redirects currently implemented in the `redirect.json`. Each redirect corresponds to a hash in the URL that dynamically loads the appropriate content.
