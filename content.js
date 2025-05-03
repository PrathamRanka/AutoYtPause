let wasPlaying = false;
let playbackRate = 1;
let wasMuted = false;
let video;
let platform;
let enabled = true; // Default to true

// Function to get the main video element
function getVideo() {
  const videoElements = document.querySelectorAll("video");
  return videoElements.length > 0 ? videoElements[0] : null;
}

// Detect platform
function detectPlatform() {
  if (window.location.hostname.includes("youtube.com")) {
    return "youtube";
  }
}

// Monitor for video changes (e.g., dynamically loaded video)
function observeVideoChanges() {
  const observer = new MutationObserver(() => {
    video = getVideo();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Handle visibility change
document.addEventListener("visibilitychange", () => {
  if (!enabled) return;

  video = getVideo();
  if (!video) return;

  if (document.hidden) {
    wasPlaying = !video.paused;
    playbackRate = video.playbackRate;
    wasMuted = video.muted;
    if (wasPlaying) video.pause();
  } else {
    if (wasPlaying) {
      video.play().then(() => {
        video.playbackRate = playbackRate;
        video.muted = wasMuted;
      }).catch(err => {
        console.error("Playback resume failed:", err);
      });
    }
  }
});

// Initialize
chrome.storage.sync.get(["enabled"], (result) => {
  enabled = result.enabled !== false;
  platform = detectPlatform();
  observeVideoChanges();
  console.log("Detected platform: ", platform);
});
