/**
 * IE 11 support
 *
 */
// import Promise from 'promise-polyfill';

export default class GoogleMapsApi {
  /**
   * Constructor set up config.
   *
   */
  constructor() {
    // api key for google maps
    this.apiKey = 'AIzaSyAX2ELMyoytfX4Ab-EN_qfDx1UcOmsLPJ0';

    // set a globally scoped callback if it doesn't already exist
    if (!window._GoogleMapsApi) {
      this.callbackName = ('_GoogleMapsApi.mapLoaded');
      window._GoogleMapsApi = this;
      window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    }
  }

  /**
   * Load the Google Maps API javascript
   *
   */
  load() {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        this.resolve = resolve;
        if (typeof window.google === 'undefined') {
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
          document.body.appendChild(script);
        } else {
          this.resolve();
        }
      });
    }

    return this.promise;
  }

  /**
   * Globally scoped callback for the map loaded
   *
   */
  mapLoaded() {
    if (this.resolve) {
      this.resolve();
    }
  }
}
