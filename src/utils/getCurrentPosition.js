export default (...args) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(...args, resolve, reject);
  });
}