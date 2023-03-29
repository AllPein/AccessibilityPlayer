import { formatTime } from '../helpers/time';

export class SeekControl {
  private readonly _videoContainer: HTMLVideoElement;
  private readonly _container: HTMLProgressElement;
  private readonly _tooltipContainer: HTMLElement;
  private readonly _progressBar: HTMLProgressElement;

  get videoContainer() {
    return this._videoContainer;
  }

  get container() {
    return this._container;
  }

  get progressBar() {
    return this._progressBar;
  }

  get tooltipContainer() {
    return this._tooltipContainer;
  }

  constructor(
    videoContainer: HTMLVideoElement,
    container: HTMLProgressElement,
    tooltipContainer: HTMLElement,
    progressBar: HTMLProgressElement,
  ) {
    this._container = container;
    this._videoContainer = videoContainer;
    this._tooltipContainer = tooltipContainer;
    this._progressBar = progressBar;

    this.container.addEventListener('mousemove', (e) =>
      this.updateSeekTooltip(e),
    );
    this.container.addEventListener('input', (e) => this.skipAhead(e));
  }

  updateSeekTooltip(event: any): void {
    const skipTo = Math.round(
      (event.offsetX / event.target?.clientWidth) *
        parseInt(event.target?.getAttribute('max'), 10),
    );
    this.container.setAttribute('data-seek', skipTo.toString());
    const t = formatTime(skipTo);
    this.tooltipContainer.textContent = `${t.minutes}:${t.seconds}`;
    const rect = this.videoContainer.getBoundingClientRect();
    this.tooltipContainer.style.left = `${event.pageX - rect.left}px`;
  }

  skipAhead(event: any): void {
    const skipTo = event.target.dataset.seek
      ? event.target.dataset.seek
      : event.target.value;
    this.videoContainer.currentTime = skipTo;
    this.progressBar.value = skipTo;
    this.container.value = skipTo;
  }
}
