const baseGeoUrl = process.env.VUE_APP_GEO_API_URL;

const getCurrentPosition = (...args) => {
  const position = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(...args, resolve, reject);
  });
  return position;
};

const formatCoordinate = (coordinate) => Number(parseFloat(coordinate).toFixed(2));

export default class {
  constructor() {
    this.longitude = 0;
    this.latitude = 0;
  }

  async getLocationByIp() {
    await fetch(baseGeoUrl)
      .then((response) => response.json())
      .then((data) => {
        this.longitude = formatCoordinate(data.longitude);
        this.latitude = formatCoordinate(data.latitude);
      });
    return this;
  }

  async getLocationByDevice() {
    await getCurrentPosition().then((position) => {
      const { coords } = position;
      this.longitude = formatCoordinate(coords.longitude);
      this.latitude = formatCoordinate(coords.latitude);
    });
    return this;
  }
}
