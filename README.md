# URL Redirector

A simple and customizable URL redirector that can be hosted on GitHub Pages. This tool reads redirection rules from a JSON file, allowing you to redirect users based on URL fragments (hashes). You can also configure the redirects to display a confirmation popup, providing users with the option to proceed or cancel the redirect.

---
## Hosted as GitHub Pages

This project is hosted using [GitHub Pages](https://runarok.github.io/url-redir/) which allows you to serve your project directly from a GitHub repository. Once you push the project to a GitHub repository, you can configure GitHub Pages to make it accessible to anyone via a public URL.

---

## Features

- **Dynamic Redirection**: Redirect users to custom URLs based on the hash in the URL.
- **Popup Confirmation**: Optionally show a confirmation popup before redirecting users.
- **Background Opening for Bulk URLs**: Open multiple URLs in the background, with the last URL loaded into the current tab.
- **Customizable Redirect Rules**: Easily add, remove, or modify redirect rules in a separate JSON file.
- **Responsive and Dark-Themed UI**: A clean, user-friendly interface with a modern dark theme.
- **Toast Notifications**: Non-intrusive feedback for actions, such as URLs being opened.

---

## How It Works

1. **Redirection Based on URL Hash**: 
   - When a user visits `https://your-site-url.com/#<hash>`, the application checks the URL fragment (`<hash>`).
   - If a matching redirect rule is found in the `redirects.json` file, the user is redirected accordingly.

2. **Popup Confirmation**: 
   - If configured in the `redirects.json` file, a popup appears asking if the user wants to proceed to the redirect URL. The user can either click **Yes, Redirect** or **Close Tab**.

3. **Bulk URL Handling**: 
   - If multiple URLs are provided in the `redirects.json` file, they are opened in new tabs in the background. The last URL is loaded in the current tab to ensure smooth single-URL functionality.

4. **Customizing Redirect Rules**: 
   - All redirection rules are stored in a separate `redirects.json` file. This file contains the hash values (URL fragments) and corresponding URLs. You can also specify whether a popup should appear or not.

---
## About `Source.html`

`Source.html` is the core page for the URL Redirector application. It is responsible for fetching the `redirects.json` file, processing the redirection rules, and displaying the content to the user. This page dynamically handles redirections based on the hash provided in the URL, showing confirmation popups when necessary, and opening URLs in new tabs as defined in the configuration.

### How `Source.html` Works

- **Dynamic Redirection**: When a user navigates to a URL with a fragment (`#<hash>`), such as `https://your-site-url.com/#SingleRedirect`, `Source.html` reads the hash and looks for the corresponding redirection rule in the `redirects.json` file.
  
- **Popup Confirmation**: If the `showPopup` flag is set to `true` for the selected redirection rule, a confirmation popup will appear, asking the user whether they want to proceed with the redirect.

- **Bulk URL Handling**: If multiple URLs are listed in the `redirects.json` for a given hash, they will be opened in new tabs in the background, with the last one loaded in the current tab.

- **Toast Notifications**: After a successful redirect or a bulk URL opening, a toast message is shown to inform the user about the action.

### Key Features of `Source.html`

- **Responsive and Dark-Themed UI**: The user interface of `Source.html` is designed to be clean, modern, and mobile-friendly with a dark theme, ensuring a smooth user experience.
- **Integration with `redirects.json`**: All redirection rules and their settings (URLs, popup options) are managed in the `redirects.json` file. This allows for easy configuration and updating of redirect rules without modifying the HTML or JavaScript code directly.

### Customization

- **UI Customization**: You can modify the look and feel of `Source.html` by editing the embedded CSS within the `<style>` tag.
- **Redirect Rules**: Update the `redirects.json` file to add, remove, or modify redirect rules. Each rule contains the hash fragment, the URL(s) for redirection, and the option to show a confirmation popup.


---

## How to Set Up and Use

### 1. Clone the Repository
To set up this redirector on your own GitHub Pages site:

```
git clone https://github.com/Runarok/url-redir.git
cd url-redir
```

### 2. Update `redirects.json`

In the `redirects.json` file, you can add or update redirect rules in the following format:

```
{
    "SingleRedirect": {
        "url": "https://example.com/single",
        "showPopup": false
    },
    "BulkRedirect": {
        "url": [
            "https://example.com/first",
            "https://example.com/second",
            "https://example.com/third"
        ],
        "showPopup": true
    }
}
```

- **`<hash>`**: The URL fragment used to trigger the redirection (e.g., `#SingleRedirect`).
- **`url`**: The destination URL to redirect to. For bulk redirects, use an array of URLs.
- **`showPopup`**: Whether to show a popup before redirecting. Set to `true` or `false`.

### 3. Customize the Look & Feel

- Modify the **UI** by editing the CSS styles within the `<style>` tag in `index.html`.
- Adjust colors, fonts, and other UI elements to fit your needs.

### 4. Deploy to GitHub Pages

1. Create a repository on GitHub, and push the `url-redir` folder to it.
2. In the GitHub repository, go to **Settings** > **Pages**.
3. Set the **Source** to the branch (usually `main` or `master`) and the folder to `/root` (if it's the main project folder).
4. Your site will be live at `https://<your-username>.github.io/<your-repo-name>`.

---

## Features in Detail

### Dynamic Redirection

- Based on the fragment in the URL (`#hash`), the redirector checks for a matching rule in `redirects.json`.
- If a match is found, the user is either immediately redirected to the target URL or shown a confirmation popup.

### Popup Confirmation

- You can configure redirects to show a confirmation dialog before proceeding.
- This feature is controlled via the `showPopup` field in `redirects.json`. Set it to `true` for redirects that need confirmation.

### Bulk URL Handling

- For multiple URLs, the tool opens all URLs in new background tabs.
- The last URL in the list will load in the current tab.

### Toast Notifications

- Replaces traditional alerts for a smoother user experience.
- Example: After bulk redirects, a toast message like "All URLs have been opened in new tabs" is displayed.

---

## Contribution Guidelines

1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Make changes and add tests if applicable.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request and describe your changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- This project was created with care and love by **Runarok**.
- Hosted on GitHub Pages with ❤️.

---

## Contact

For any questions, feel free to open an issue on the [GitHub repository](https://github.com/Runarok/url-redir).
