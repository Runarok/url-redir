async function fetchRedirects() {
    try {
        // Use the raw GitHub URL for redirects.json
        const response = await fetch('https://raw.githubusercontent.com/Runarok/Guides/refs/heads/main/Code%20Reference/url-redir/redirects.json?token=GHSAT0AAAAAAC6H6NSAR5FOMSMZ2GUXZIR22A2QRAA');

        // If the fetch fails, throw an error
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
    // Clear any existing content before appending new items
    container.innerHTML = '';

    for (const key in redirects) {
        const redirect = redirects[key];
        const isArray = Array.isArray(redirect.url);
        const urls = isArray ? redirect.url.join(', ') : redirect.url;
        const popupStatus = redirect.showPopup ? 'Yes' : 'No';

        // Capitalize the first letter of the key and display
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

        // Truncate long URLs and add tooltip for full URL
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
    const url = `https://runarok.github.io/url-redir/#${hash}`;
    
    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show a toast notification
    showToast(`URL copied: ${url}`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        document.body.removeChild(toast);
    }, 3000);
}

// Fetch redirects when the page loads
window.onload = fetchRedirects;
