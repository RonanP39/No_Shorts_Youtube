const SHORTS_PATH = '/shorts';

function hideShorts() {
    const selectors = [
        'ytd-rich-item-renderer',
        'ytd-rich-grid-row',
        'ytd-grid-video-renderer',
        'ytd-video-renderer',
        'ytd-compact-video-renderer',
        'ytd-watch-next-secondary-results-renderer',
        'ytd-channel-renderer',
        'ytd-video-preview'
    ];

    const nodes = document.querySelectorAll(selectors.join(','));

    nodes.forEach(node => {
        const anchors = Array.from(node.querySelectorAll('a')).filter(a => a.href);
        const hasShorts = anchors.some(anchor => {
            const url = anchor.href;
            return url.includes('/shorts/') || url.includes('shorts?') || url.includes('shorts&') || url.includes('?shorts');
        });
        if (hasShorts) {
            node.style.display = 'none';
        }
    });
}

function redirectShortsPage() {
    if (location.pathname.startsWith(SHORTS_PATH)) {
        const target = 'https://www.youtube.com/';
        if (location.href !== target) {
            location.replace(target);
        }
    }
}

function observePage() {
    hideShorts();
    redirectShortsPage();

    const observer = new MutationObserver(() => {
        hideShorts();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observePage);
} else {
    observePage();
}
