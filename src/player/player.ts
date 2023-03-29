import { formatTime } from '../helpers/time';
import { SeekControl } from './seekControl';
import { PlayerContainer } from './playerContainer';
import { VolumeControl } from './volumeControl';
import { actionsMap, generateCurrentActions } from '../helpers/actions';
import { Action, IPlayerControls, IPlayerView } from '../types';
import { ActionType } from '../enums/actions';

export class PlayerView implements IPlayerView {
  private _container: HTMLVideoElement;
  private _controls: IPlayerControls;
  private _actions: Action[] = [];
  private _featureEnabled: boolean;

  get container() {
    return this._container;
  }

  set container(value: HTMLVideoElement) {
    this._container = value;
  }

  get featureEnabled() {
    return this._featureEnabled;
  }

  set featureEnabled(value: boolean) {
    this._featureEnabled = value;
  }

  get actions() {
    return this._actions;
  }

  set actions(actions: Action[]) {
    this._actions = actions;
  }

  get controls() {
    return this._controls;
  }

  set controls(value: IPlayerControls) {
    this._controls = value;
  }

  constructor(container: HTMLVideoElement, controls: IPlayerControls) {
    this.container = container;
    this.controls = controls;
    this.featureEnabled = controls.featureToggle.checked;

    new SeekControl(
      container,
      controls.seek,
      controls.seekTooltip,
      controls.progressBar,
    );

    new PlayerContainer(container);
    new VolumeControl(container, controls.volumeButton);

    this.container.addEventListener('play', () => this.updatePlayButton());
    this.container.addEventListener('pause', () => this.updatePlayButton());
    this.container.addEventListener('loadedmetadata', () =>
      this.initializeVideo(),
    );
    this.container.addEventListener('timeupdate', () =>
      this.updateTimeElapsed(),
    );
    this.container.addEventListener('timeupdate', () => this.updateProgress());
    this.container.addEventListener('volumechange', () =>
      this.updateVolumeIcon(),
    );
    this.container.addEventListener('click', () => this.togglePlay());
    this.container.addEventListener('click', () => this.animatePlayback());
    this.container.addEventListener('mouseenter', () => this.showControls());
    this.container.addEventListener('mouseleave', () => this.hideControls());

    this.controls.videoControls.addEventListener('mouseenter', () =>
      this.showControls(),
    );
    this.controls.videoControls.addEventListener('mouseleave', () =>
      this.hideControls(),
    );
    this.controls.featureToggle.addEventListener('change', () =>
      this.updateFeatureToggle(),
    );

    document.addEventListener('keyup', (e) => this.keyboardShortcuts(e));
  }

  async init(): Promise<void> {
    const response = await fetch(
      'https://c6e8-178-70-176-177.eu.ngrok.io/v1/videos/output',
    );
    const res = await response.json();

    this.actions = res.data;
  }

  keyboardShortcuts(event: any): void {
    const { key } = event;
    switch (key) {
      case ' ':
        this.togglePlay();
        this.animatePlayback();
        if (this.container.paused) {
          this.showControls();
        } else {
          setTimeout(() => {
            this.hideControls();
          }, 2000);
        }
        break;
    }
  }

  applyFilters(currentActions: ActionType[]): void {
    Object.keys(actionsMap).forEach((key: ActionType) => {
      if (currentActions.includes(key)) {
        actionsMap[key].applyFilter(this.container);
      } else {
        actionsMap[key].removeFilter(this.container, key);
      }
    });
  }

  initializeVideo(): void {
    const videoDuration = Math.round(this.container.duration);
    this.controls.seek.setAttribute('max', videoDuration.toString());
    this.controls.progressBar.setAttribute('max', videoDuration.toString());
    const time = formatTime(videoDuration);
    this.controls.duration.innerText = `${time.minutes}:${time.seconds}`;
    this.controls.duration.setAttribute(
      'datetime',
      `${time.minutes}m ${time.seconds}s`,
    );
  }

  updateFeatureToggle(): void {
    this.featureEnabled = this.controls.featureToggle.checked;
  }

  updateTimeElapsed(): void {
    const time = formatTime(Math.round(this.container.currentTime));
    this.controls.timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    this.controls.timeElapsed.setAttribute(
      'datetime',
      `${time.minutes}m ${time.seconds}s`,
    );
  }

  updateProgress(): void {
    const timeElapsed = this.container.currentTime;

    if (this.featureEnabled) {
      const currentActions: ActionType[] = generateCurrentActions(
        this.actions,
        timeElapsed,
      );

      this.applyFilters(currentActions);
    } else {
      this.applyFilters([]);
    }

    this.controls.seek.value = Math.round(timeElapsed);
    this.controls.progressBar.value = Math.round(timeElapsed);
  }

  updateVolumeIcon(): void {
    this.controls.volumeIcons.forEach((icon) => {
      icon.classList.add('hidden');
    });

    this.controls.volumeButton.setAttribute('data-title', 'Mute (m)');

    if (this.container.muted || this.container.volume === 0) {
      this.controls.volumeMute.classList.remove('hidden');
      this.controls.volumeButton.setAttribute('data-title', 'Unmute (m)');
    } else if (this.container.volume > 0 && this.container.volume <= 0.5) {
      this.controls.volumeLow.classList.remove('hidden');
    } else {
      this.controls.volumeHigh.classList.remove('hidden');
    }
  }

  togglePlay(): void {
    if (this.container.paused || this.container.ended) {
      this.container.play();
    } else {
      this.container.pause();
    }
  }

  animatePlayback(): void {
    this.controls.playbackAnimation.animate(
      [
        {
          opacity: 1,
          transform: 'scale(1)',
        },
        {
          opacity: 0,
          transform: 'scale(1.3)',
        },
      ],
      {
        duration: 500,
      },
    );
  }

  showControls(): void {
    this.controls.videoControls.classList.remove('hide');
  }

  hideControls(): void {
    if (this.container.paused) {
      return;
    }

    this.controls.videoControls.classList.add('hide');
  }

  updatePlayButton(): void {
    this.controls.playbackIcons.forEach((icon) =>
      icon.classList.toggle('hidden'),
    );

    if (this.container.paused) {
      this.controls.playButton.setAttribute('data-title', 'Play (k)');
    } else {
      this.controls.playButton.setAttribute('data-title', 'Pause (k)');
    }
  }
}
