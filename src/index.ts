import '../styles/video.css';
import '../styles/notification.css';
import { PlayerView } from './player/player';
import { IPlayerControls } from './types';

// Selectors
const videoWorks = !!document.createElement('video').canPlayType;

const video: HTMLVideoElement = document.getElementById(
  'video',
)! as HTMLVideoElement;

const pipButton: HTMLButtonElement = document.getElementById(
  'pip-button',
)! as HTMLButtonElement;

const videoControls = document.getElementById('video-controls')!;

const controls: IPlayerControls = {
  videoControls,
  playButton: document.getElementById('play')!,
  playbackIcons: document.querySelectorAll('.playback-icons use')!,
  featureToggle: document.getElementById('feature-toggle')! as HTMLInputElement,
  timeElapsed: document.getElementById('time-elapsed')!,
  duration: document.getElementById('duration')!,
  progressBar: document.getElementById('progress-bar')! as HTMLProgressElement,
  seek: document.getElementById('seek')! as HTMLProgressElement,
  seekTooltip: document.getElementById('seek-tooltip')!,
  volumeButton: document.getElementById('volume-button')!,
  volumeIcons: document.querySelectorAll('.volume-button use')!,
  volumeMute: document.querySelector('use[href="#volume-mute"]')!,
  volumeLow: document.querySelector('use[href="#volume-low"]')!,
  volumeHigh: document.querySelector('use[href="#volume-high"]')!,
  playbackAnimation: document.getElementById('playback-animation')!,
};

// Functions

if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
} else {
  alert('Cannot play video!');
}

async function togglePip() {
  try {
    if (video !== document.pictureInPictureElement) {
      pipButton.disabled = true;
      await video.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  } catch (error) {
    console.error(error);
  } finally {
    pipButton.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  pipButton.addEventListener('click', togglePip);

  if (!('pictureInPictureEnabled' in document)) {
    pipButton.removeEventListener('click', togglePip);

    pipButton.classList.add('hidden');
  }
});

window.onload = async () => {
  const player = new PlayerView(video, controls);

  player.init();
};
