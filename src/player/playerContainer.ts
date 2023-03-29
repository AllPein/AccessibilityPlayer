export class PlayerContainer {
  private readonly _videoContainer: HTMLElement =
    document.getElementById('video-container')!;
  private readonly _fullscreenButton: HTMLButtonElement =
    document.getElementById('fullscreen-button')! as HTMLButtonElement;

  private readonly _fullscreenIcons: NodeListOf<SVGUseElement> =
    this._fullscreenButton?.querySelectorAll('use')!;

  get videoContainer() {
    return this._videoContainer;
  }

  get fullscreenButton() {
    return this._fullscreenButton;
  }

  get fullscreenIcons() {
    return this._fullscreenIcons;
  }

  constructor(container: HTMLVideoElement) {
    this.fullscreenButton.addEventListener('click', () =>
      this.toggleFullScreen(),
    );
    container.addEventListener('dblclick', () => this.toggleFullScreen());
    this.videoContainer.addEventListener('fullscreenchange', () =>
      this.updateFullscreenButton(),
    );

    document.addEventListener('keyup', (e) => this.keyboardShortcuts(e));
  }

  toggleFullScreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      //@ts-ignore
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      //@ts-ignore
      document.webkitExitFullscreen();
      //@ts-ignore
    } else if (this.videoContainer.webkitRequestFullscreen) {
      // Need this to support Safari
      //@ts-ignore
      this.videoContainer.webkitRequestFullscreen();
    } else {
      this.videoContainer.requestFullscreen();
    }
  }

  keyboardShortcuts(event: any) {
    const { key } = event;
    switch (key) {
      case 'f':
        this.toggleFullScreen();
        break;
    }
  }

  updateFullscreenButton(): void {
    this.fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

    if (document.fullscreenElement) {
      this.fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
    } else {
      this.fullscreenButton.setAttribute('data-title', 'Full screen (f)');
    }
  }
}
