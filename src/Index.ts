import { Guid } from './utils/Guid';

export class Index {
  constructor() { }

  private _guid: string = new Guid().toString();
  private serviceWorkerAvailable: boolean = false;
  private deviceIsOnline: boolean = false;

  public hellowWorld(): Index {
    console.log(`Component Id: ${this._guid}`);

    if ('serviceWorker' in navigator) {
      this.serviceWorkerAvailable = true;
      console.log('Service Worker Available');
    } else {
      console.log('Service Worker is NOT Available');
    }

    if (navigator.onLine) {
      this.deviceIsOnline = true;
      console.log('Internet Connection Available');
    } else {
      console.log('No Internet Connection');
    }

    return this;
  }

  public render(): void {
    document.write(`
        <div id"${this._guid}">
            <h1>Browser test</h1>
            <ul>
                <li>
                    <label for="serviceWorkedAvailable">ServiceWorkers are available for use? </label>
                    <span id="serviceWorkedAvailable">${this.serviceWorkerAvailable}. </span>
                </li>
                <li>
                    <label for="deviceIsOnline">Device is online? </label>
                    <span id="deviceIsOnline">${this.deviceIsOnline}.</span>
                </li>
            </ul>
        </div>
    `);
  }
}

let index = new Index().hellowWorld().render();
