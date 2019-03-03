class Geolocation {
  constructor() {
    this.coordinates = {
      latitude: 0,
      longitude: 0,
    };
  }

  async getCoordinatesByIp() {
    await fetch('/mocks/geo.json')
      .then(response => response.json())
      .then((data) => {
        this.coordinates.latitude = Number(data.latitude);
        this.coordinates.longitude = Number(data.longitude);
      });
    return this.coordinates;
  }

  getCoordinatesByDevice() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.coordinates.latitude = position.coords.latitude;
          this.coordinates.longitude = position.coords.longitude;
          return resolve(position);
        });
      }
      return reject;
    });
  }
}

export default Geolocation;
