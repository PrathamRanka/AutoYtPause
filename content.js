let wasPlaying = false;
let playbackRate = 1;
let wasMuted = false;
let video;
let platform;

// Function to get the main video element
function getVideo() {
  const videoElements = document.querySelectorAll("video");
  return videoElements.length > 0 ? videoElements[0] : null; // Only handle the first video
}

// Detect platform
function detectPlatform() {
  if (window.location.hostname.includes("youtube.com")) {
    return "youtube";
  } else if (window.location.hostname.includes("netflix.com")) {
    return "netflix";
  } else if (window.location.hostname.includes("vimeo.com")) {
    return "vimeo";
  } else {
    return "unknown";
  }
}

// Monitor for video changes (e.g., dynamically loaded video)
function observeVideoChanges() {
  const observer = new MutationObserver(() => {
    video = getVideo();
    if (video && video.paused !== undefined) {
      handleVisibilityChange(true); // Ensure visibility change logic is applied
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Handle visibility change
function handleVisibilityChange(enabled) {
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
}

// Auto-detect platform and handle visibility changes
chrome.storage.sync.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  platform = detectPlatform();
  handleVisibilityChange(enabled);
  observeVideoChanges(); // Ensure we observe video changes dynamically
});

console.log("Detected platform: ", platform);
