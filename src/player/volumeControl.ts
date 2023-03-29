export class VolumeControl {
  private _videoContainer: HTMLVideoElement;
  private _volume: HTMLProgressElement = document.getElementById(
    'volume',
  )! as HTMLProgressElement;
  private _volumeButton: HTMLElement;

  get videoContainer() {
    return this._videoContainer;
  }

  get container() {
    return this._volume;
  }

  get volumeButton() {
    return this._volumeButton;
  }

  constructor(videoContainer: HTMLVideoElement, volumeButton: HTMLElement) {
    this._videoContainer = videoContainer;
    this._volumeButton = volumeButton;

    this.container.addEventListener('input', () => this.updateVolume());
    this.volumeButton.addEventListener('click', () => this.toggleMute());

    document.addEventListener('keyup', (e) => this.keyboardShortcuts(e));
  }

  keyboardShortcuts(event: any) {
    const { key } = event;
    switch (key) {
      case 'm':
        this.toggleMute();
        break;
    }
  }

  updateVolume(): void {
    if (this.videoContainer.muted) {
      this.videoContainer.muted = false;
    }

    this.videoContainer.volume = this.container.value;
  }
  toggleMute(): void {
    this.videoContainer.muted = !this.videoContainer.muted;

    if (this.videoContainer.muted) {
      this.container.setAttribute(
        'data-volume',
        this.container.value.toString(),
      );
      this.container.value = 0;
    } else {
      this.container.value = Number(this.container.dataset.volume || '0');
    }
  }
}
