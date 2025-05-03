# Auto Pause & Resume YouTube Extension

## 🚀 Introduction

The **Auto Pause & Resume YouTube Extension** is a Chrome extension designed to automatically pause and resume YouTube videos when switching between tabs. This extension helps in reducing unnecessary video playback when the user is not watching, thus conserving system resources and data usage. It automatically resumes the video from the exact point where the user left off once they return to the tab.

---

## 🎯 Features

- **Auto Pause**: Automatically pauses the YouTube video when the tab is switched or minimized.
- **Auto Resume**: Automatically resumes the video from the exact point it was paused once the user returns to the tab.
- **Seamless Experience**: Users can switch between tabs without worrying about videos continuing to play in the background.
- **User-Friendly**: The extension runs silently in the background, with no UI required (unless needed for configuration).

---

## 🛠 System Architecture

### **System Architecture Overview**

The architecture of this extension involves the following major components:
1. **Chrome Extension**: The core functionality of the extension runs within the Chrome browser.
2. **Content Script**: A JavaScript content script injected into the page to monitor video playback and handle pausing and resuming.
3. **Visibility Monitoring**: Uses the `visibilitychange` event to track when a tab is switched or minimized.
4. **Platform Detection**: The extension detects when YouTube is being used and applies the correct logic to pause or resume the video.

#### **Logic Diagram**

```plaintext
+--------------------------------------------+
|                Chrome Extension            |
|                                            |
| +----------------------------------------+  |
| |              Content Script           |  |
| |  1. Detects if the video is playing   |  |
| |  2. Detects tab visibility changes    |  |
| |  3. Pauses/Resumes video accordingly |  |
| +----------------------------------------+  |
|                                            |
+--------------------------------------------+
                   |
                   v
           +---------------------+
           |   YouTube Platform   |
           +---------------------+
                   |
                   v
      +---------------------------+
      |   Auto Pause & Resume     |
      |     on Tab Switch         |
      +---------------------------+
