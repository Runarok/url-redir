let redirectUrls = []; // Stores URLs for the current hash

async function fetchRedirects() {
    const response = await fetch('https://raw.githubusercontent.com/Runarok/Guides/refs/heads/main/Code%20Reference/url-redir/redirects.json');
    const redirects = await response.json();
    handleRedirect(redirects);
}

function handleRedirect(redirects) {
    // Convert the hash to lowercase before checking
    const hash = window.location.hash.substring(1).toLowerCase();

    // Convert all keys in redirects to lowercase
    const normalizedRedirects = Object.keys(redirects).reduce((acc, key) => {
        acc[key.toLowerCase()] = redirects[key];
        return acc;
    }, {});

    if (normalizedRedirects[hash]) {
        const redirect = normalizedRedirects[hash];

        // Support bulk URLs
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
        // If only one URL, load it in the current tab
        window.location.href = redirectUrls[0];
    } else {
        // For multiple URLs, open in new tabs (background if possible)
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

// Keyboard shortcut (Shift + A)
window.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'A') {
        window.location.href = 'Source.html'; // Redirect to Source.html
    }
});

window.onload = fetchRedirects;
