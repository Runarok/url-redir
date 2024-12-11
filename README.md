# URL Redirector

A simple and customizable URL redirector that can be hosted on GitHub Pages. This tool reads redirection rules from a JSON file, allowing you to redirect users based on URL fragments (hashes). You can also configure the redirects to display a confirmation popup, providing users with the option to proceed or cancel the redirect.

---

## Features

- **Dynamic Redirection**: Redirect users to custom URLs based on the hash in the URL.
- **Popup Confirmation**: Optionally show a confirmation popup before redirecting users.
- **Cancel and Undo**: Allow users to cancel the redirect, with the option to undo the cancellation and proceed with the redirection.
- **Customizable Redirect Rules**: Easily add, remove, or modify redirect rules in a separate JSON file.
- **Responsive and Dark-Themed UI**: A clean, user-friendly interface with a modern dark theme.

---

## How It Works

1. **Redirection Based on URL Hash**: 
   - When a user visits `https://your-site-url.com/#<hash>`, the application checks the URL fragment (`<hash>`).
   - If a matching redirect rule is found in the `redirects.json` file, the user is either redirected immediately or prompted with a confirmation popup.

2. **Popup Confirmation**: 
   - If configured in the `redirects.json` file, a popup appears with a message asking if the user wants to proceed to the redirect URL. The user can either click **Yes, Redirect** or **Cancel**.
   - If canceled, a toast notification will appear with an **Undo** button. Clicking **Undo** takes the user back to the original redirect location.

3. **Customizing Redirect Rules**: 
   - All redirection rules are stored in a separate `redirects.json` file. This file contains the hash values (URL fragments) and corresponding URLs. You can also specify whether a popup should appear or not.

---

## How to Set Up and Use

### 1. Clone the Repository
To set up this redirector on your own GitHub Pages site:

"""
git clone https://github.com/Runarok/url-redir.git
cd url-redir
"""

### 2. Update `redirects.json`

In the `redirects.json` file, you can add or update redirect rules in the following format:

"""
{
    "Uhyss": {
        "url": "https://github.com/TempestAethel/Design-and-implementation-of-Antenna",
        "showPopup": false
    },
    "AnotherRedirect": {
        "url": "https://example.com",
        "showPopup": true
    }
}
"""

- **`<hash>`**: The URL fragment used to trigger the redirection (e.g., `#Uhyss`).
- **`url`**: The destination URL to redirect to.
- **`showPopup`**: Whether to show a popup before redirecting. Set to `true` or `false`.

### 3. Customize the Look & Feel

- You can modify the **UI** by editing the CSS styles within the `<style>` tag in `index.html`.
- The default theme is dark-themed, but you can adjust colors, fonts, and other UI elements to fit your needs.

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

### Cancel & Undo

- If a user cancels the redirect, a toast message appears informing them that the redirect was canceled.
- The toast also contains an **Undo** button that, when clicked, brings the user back to the redirect URL to proceed with the redirection.

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
