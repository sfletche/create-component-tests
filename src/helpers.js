const _ = require('lodash');
const path = require('path');

function getFileNameFromPath(pathToComponent) {
  return path.parse(pathToComponent).base;
}

function getPathWithoutFileName(pathToComponent) {
  return path.parse(pathToComponent).dir;
}

function getKebabCase(pathToComponent) {
  const fileName = getFileNameFromPath(pathToComponent);
  return _.kebabCase(fileName.split('.')[0]);
}

function getPascalCase(pathToComponent) {
  const fileName = getFileNameFromPath(pathToComponent);
  return _.startCase(fileName.split('.')[0]).replace(/\s/g, '');
}

function getDestinationPath({ pathToComponent, pathToUnitTest }) {
  const kebabCase = getKebabCase(pathToComponent);
  return `${pathToUnitTest}/${kebabCase}-test.js`;
}

module.exports = {
  getKebabCase,
  getPascalCase,
  getDestinationPath,
  getPathWithoutFileName,
};
