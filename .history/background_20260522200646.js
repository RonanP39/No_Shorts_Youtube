chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete' || !tab.url) {
        return;
    }

    chrome.storage.sync.get('blockerEnabled', (result) => {
        const enabled = result.blockerEnabled !== false;
        if (enabled && tab.url.includes('youtube.com/shorts')) {
            chrome.scripting.executeScript({
                target: { tabId },
                func: () => {
                    window.location.replace('https://www.youtube.com/');
                }
            });
        }
    });
});
