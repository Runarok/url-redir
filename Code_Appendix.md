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

```

This HTML is responsible for handling all redirects using hash-based routing. When the hash in the URL changes, the corresponding page content is dynamically loaded.

## HTML Used to Showcase All Redirects

```

```

This HTML showcases all the available redirects currently implemented in the system. Each redirect corresponds to a hash in the URL that dynamically loads the appropriate content.
