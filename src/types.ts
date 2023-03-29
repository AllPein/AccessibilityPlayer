import { ActionType } from './enums/actions';

export interface IPlayerControls {
  playbackIcons: NodeListOf<Element>;
  playButton: HTMLElement;
  featureToggle: HTMLInputElement;
  videoControls: HTMLElement;
  timeElapsed: HTMLElement;
  duration: HTMLElement;
  progressBar: HTMLProgressElement;
  seek: HTMLProgressElement;
  seekTooltip: HTMLElement;
  volumeButton: HTMLElement;
  volumeIcons: NodeListOf<Element>;
  volumeMute: Element;
  volumeLow: Element;
  volumeHigh: Element;
  playbackAnimation: HTMLElement;
}

export interface IPlayerView {
  container: HTMLVideoElement;
  actions: Action[];
  controls: IPlayerControls;

  updatePlayButton(): void;
  init(): Promise<void>;
  initializeVideo(): void;
  updateTimeElapsed(): void;
  updateProgress(): void;
  keyboardShortcuts(event: any): void;
  updateVolumeIcon(): void;
  togglePlay(): void;
  animatePlayback(): void;
  showControls(): void;
  hideControls(): void;
  updatePlayButton(): void;
}

export type Action = {
  startTime: number;
  endTime?: number;
  actions: ActionType[];
};
