export class Notification {
  private readonly _container: HTMLElement =
    document.getElementById('notification')!;

  get container() {
    return this._container;
  }

  constructor(notificationText: string) {
    this.container.classList.add('visible');
    this.container.innerText = notificationText;

    setTimeout(() => {
      this.removeNotification();
    }, 5000);
  }

  removeNotification(): void {
    this.container.classList.remove('visible');
    this.container.innerText = '';
  }
}
