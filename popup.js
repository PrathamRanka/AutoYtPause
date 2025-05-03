const toggle = document.getElementById("toggle");
const statusText = document.getElementById("status");

// Load saved setting
chrome.storage.sync.get(["enabled"], (result) => {
  const isEnabled = result.enabled !== false;
  toggle.checked = isEnabled;
  statusText.textContent = isEnabled ? "Enabled" : "Disabled";
});

// Toggle setting
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  statusText.textContent = enabled ? "Enabled" : "Disabled";
});
