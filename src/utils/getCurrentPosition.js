export default (...args) => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(...args, resolve, reject);
});
