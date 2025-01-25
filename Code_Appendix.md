# Code Appendix

## Customization Guide for the API Redirector

This guide will help you customize the HTML file for different users. Below are the sections of the file that require customization.

### 1. **Icon URL**
   - **Where to change:** In the `<head>` section, inside the `<link>` tag.
   - **What to change:** Replace `YOUR_ICON_URL_HERE` with the URL of the icon you want to use for your page's favicon.
   - **Example:**     
     ```html
     <link rel="icon" href="https://example.com/icon.png" type="image/png">
     ```

### 2. **Host Name**
   - **Where to change:** In the `.footer` section, inside the paragraph with the host information.
   - **What to change:** Replace `YOUR_NAME_HERE` with the name of the person or entity hosting the page.
   - **Example:**
     ```html
     <p>Hosted by <strong>John Doe</strong></p>
     ```

### 3. **Repository Link**
   - **Where to change:** In the `.footer` section, inside the repository link.
   - **What to change:** Replace `YOUR_REPOSITORY_URL_HERE` with the URL of your repository (e.g., GitHub repository URL), and `YOUR_REPOSITORY_NAME` with the name of your repository.
   - **Example:**
     ```html
     <p>Repository: <a href="https://github.com/johndoe/my-repo" target="_blank">my-repo</a></p>
     ```

### 4. **Redirect JSON URL**
   - **Where to change:** Inside the `<script>` section, in the `fetch` function where the redirects JSON is fetched.
   - **What to change:** Replace `YOUR_REDIRECT_JSON_URL_HERE` with the URL of the JSON file containing your redirects data.
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
    <link rel="icon" href="YOUR_ICON_URL_HERE" type="image/png"> <!-- Change this to your icon URL -->
    <title>API Redirector</title>
    <style>
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
        <h1>API Redirector - All Redirects</h1>
        <p>This page dynamically loads and displays all available redirects and their corresponding URLs and popup status.</p>
        <div id="redirects-container" class="message-container">
            <p>Loading...</p>
        </div>
        <div class="footer">
            <p>Hosted by <strong>YOUR_NAME_HERE</strong></p> <!-- Replace with the name of the host -->
            <p>Repository: <a href="YOUR_REPOSITORY_URL_HERE" target="_blank">YOUR_REPOSITORY_NAME</a></p> <!-- Replace with the link to your repository -->
        </div>
    </div>

    <script>
        let redirectUrls = [];

        async function fetchRedirects() {
            const response = await fetch('YOUR_REDIRECT_JSON_URL_HERE'); <!-- Replace with your JSON URL -->
            const redirects = await response.json();
            handleRedirect(redirects);
        }

        function handleRedirect(redirects) {
            const hash = window.location.hash.substring(1).toLowerCase();
            const normalizedRedirects = Object.keys(redirects).reduce((acc, key) => {
                acc[key.toLowerCase()] = redirects[key];
                return acc;
            }, {});

            if (normalizedRedirects[hash]) {
                const redirect = normalizedRedirects[hash];

                if (Array.isArray(redirect.url)) {
                    redirectUrls = redirect.url;
                } else {
                    redirectUrls = [redirect.url];
                }

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
                window.location.href = redirectUrls[0];
            } else {
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
            }, 3000);
        }

        window.addEventListener('keydown', function(event) {
            if (event.shiftKey && event.key === 'A') {
                window.location.hash = '#All';
            }
        });

        window.onload = fetchRedirects;
    </script>
</body>
</html>

```

This HTML is responsible for handling all redirects using hash-based routing. When the hash in the URL changes, the corresponding page content is dynamically loaded.

## HTML Used to Showcase All Redirects

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="YOUR_ICON_URL_HERE" type="image/png"> <!-- Replace YOUR_ICON_URL_HERE with your icon's URL -->
    <title>API Redirector</title>
    <style>
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
        }

        .container {
            background-color: #2c2f3f;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
            max-width: 800px;
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

        #redirects-container {
            max-height: 400px;
            overflow-y: auto;
            padding-right: 10px;
        }

        .footer {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #a0a0a0;
        }

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
        <h1>
            <img src="YOUR_ICON_URL_HERE" alt="URL Redirector Icon"> API Redirector <!-- Replace YOUR_ICON_URL_HERE with your icon's URL -->
        </h1>
        <p>This page acts as an API redirector. If the URL hash matches a predefined fragment, you will be redirected.</p>
        <div id="redirects-container">
            <div class="message-container">
                <p id="message">Loading...</p>
            </div>
        </div>
        <div class="footer">
            <p>Hosted on GitHub Pages by <strong>YOUR_NAME_HERE</strong></p> <!-- Replace YOUR_NAME_HERE with the name of the host -->
            <p>Repository: <a href="YOUR_REPOSITORY_URL_HERE" target="_blank">YOUR_REPOSITORY_NAME</a></p> <!-- Change YOUR_REPOSITORY_URL_HERE to your repository's URL, and YOUR_REPOSITORY_NAME to your repository's name -->
            <p><a href="YOUR_REDIRECT_JSON_URL_HERE" target="_self">All Redirects Present</a></p> <!-- Replace YOUR_REDIRECT_JSON_URL_HERE with the URL of the JSON file that contains the redirects -->
        </div>
    </div>

    <script>
        async function fetchRedirects() {
            try {
                // Replace YOUR_REDIRECT_JSON_URL_HERE with the URL of your JSON file containing redirects
                const response = await fetch('YOUR_REDIRECT_JSON_URL_HERE');

                if (!response.ok) {
                    throw new Error("Failed to fetch redirects");
                }

                const redirects = await response.json();
                displayRedirects(redirects);
            } catch (error) {
                document.getElementById('redirects-container').innerHTML = ` 
                    <p style="color: red;">Error loading redirects: ${error.message}</p>
                `;
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
                        <p>
                            <strong>URLs:</strong>
                            <span title="${urls}">${truncatedUrls}</span>
                        </p>
                        <p><strong>Popup:</strong> ${popupStatus}</p>
                    </div>
                `;
                container.innerHTML += redirectHtml;
            }
        }

        function copyToClipboard(element) {
            const hash = element.getAttribute('data-hash');
            // Replace YOUR_REDIRECTOR_DOMAIN_HERE with your redirector URL
            const url = `YOUR_REDIRECTOR_DOMAIN_HERE/#${hash}`;
            
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

This HTML showcases all the available redirects currently implemented in the system. Each redirect corresponds to a hash in the URL that dynamically loads the appropriate content.
