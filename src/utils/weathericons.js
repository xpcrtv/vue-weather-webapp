const ICONS_DIR = '/img/weather-icons';
const ICONS_CODES = [
  {
    filename: 'thunderstorm.svg',
    codes: [
      't01d',
      't01n',
      't02d',
      't02n',
      't03d',
      't03n',
      't04d',
      't04n',
      't04d',
      't04n',
      't04d',
      't04n',
      't05d',
      't05n',
    ],
  },
  {
    filename: 'rain.svg',
    codes: [
      'd01d',
      'd01n',
      'd02d',
      'd02n',
      'd03d',
      'd03n',
      'r01d',
      'r01n',
      'r02d',
      'r02n',
      'r03d',
      'r03n',
      'f01d',
      'f01n',
      'r04d',
      'r04n',
      'r05d',
      'r05n',
      'r06d',
      'r06n',
      'u00d',
      'u00n',
    ],
  },
  {
    filename: 'snow.svg',
    codes: [
      's01d',
      's01n',
      's02d',
      's02n',
      's03d',
      's03n',
      's04d',
      's04n',
      's05d',
      's05n',
      's05d',
      's05n',
      's01d',
      's01n',
      's02d',
      's02n',
      's06d',
      's06n',
    ],
  },
  {
    filename: 'fog.svg',
    codes: [
      'a01d',
      'a01n',
      'a02d',
      'a02n',
      'a03d',
      'a03n',
      'a04d',
      'a04n',
      'a05d',
      'a05n',
      'a06d',
      'a06n',
    ],
  },
  { filename: 'sun.svg', codes: ['c01d', 'c01n'] },
  {
    filename: 'clouds-with-sun.svg',
    codes: ['c01d', 'c01n', 'c02d', 'c02n', 'c02d', 'c02n', 'c03d', 'c03n'],
  },
  {
    filename: 'clouds.svg',
    codes: ['c04d', 'c04n'],
  },
];

const getIconFilename = (code) => ICONS_CODES.find((iconItem) => iconItem.codes.includes(code));

export default (code = 'c01d') => {
  const { filename } = getIconFilename(code);
  const iconPath = `${ICONS_DIR}/${filename}`;
  return iconPath;
};
