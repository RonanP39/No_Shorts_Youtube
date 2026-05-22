const toggleSwitch = document.getElementById('toggleSwitch');
const statusDiv = document.getElementById('status');

// Carregar estado salvo
chrome.storage.sync.get('blockerEnabled', (result) => {
    const enabled = result.blockerEnabled !== false;
    toggleSwitch.checked = enabled;
    updateStatus(enabled);
});

// Listener para mudanças
toggleSwitch.addEventListener('change', () => {
    const enabled = toggleSwitch.checked;
    chrome.storage.sync.set({ blockerEnabled: enabled });
    updateStatus(enabled);
    
    // Recarregar todas as abas do YouTube
    reloadYouTubeTabs();
});

function updateStatus(enabled) {
    statusDiv.textContent = enabled ? '✓ Bloqueador ativo' : '✗ Bloqueador desativo';
    statusDiv.className = 'status ' + (enabled ? 'enabled' : 'disabled');
}

function reloadYouTubeTabs() {
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id);
        });
    });
}
