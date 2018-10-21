import GoogleMapsApi from '../lib/GoogleMapsAPI';

class Contacts {
  constructor() {
    this.block = document.querySelector('.contacts');

    if (!this.block) return;

    this.init();
  }

  init() {
    this.buildMap();
  }

  buildMap() {
    const gmapApi = new GoogleMapsApi();

    gmapApi.load().then(() => {
      const mapContainer = this.block.querySelector('.contacts__map'),
        zoom = parseInt(mapContainer.dataset.zoom),
        lat = parseFloat(mapContainer.dataset.centerLat),
        lng = parseFloat(mapContainer.dataset.centerLng),
        markerIcon = mapContainer.dataset.markerIcon,
        mapCoords =  { lat, lng };

      const mapStyle = [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "saturation": 36
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 40
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              },
              {
                "weight": 1.2
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 21
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 29
              },
              {
                "weight": 0.2
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 18
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 19
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              }
            ]
          }
        ];

      const map = new google.maps.Map(mapContainer, {
        zoom: zoom,
        center: mapCoords,
        disableDefaultUI: true,
        styles: mapStyle
      });

      const icon = {
        url: markerIcon,
        // scaledSize: new google.maps.Size(44, 68)
      };

      const marker = new google.maps.Marker({
        position: { lat: parseFloat(mapContainer.dataset.markerLat), lng: parseFloat(mapContainer.dataset.markerLng) },
        map: map,
        icon: icon,
        clickable: false
      });

    });

    return this;
  }
}

export default new Contacts();
