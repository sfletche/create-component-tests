const fs = require('fs');

function getPropObject(propData) {
  // input "signer={signerName}"
  const splitProp = propData.split('=');
  return {
    name: splitProp[0],
    value: splitProp[1].replace(/[{}]/g, ""),
  };
}

function getComponentObject(data) {
  // input "Signer  signer={signerName}"
  const splitData = data.split(/\s+/);
  const componentName = splitData[0];
  const props = splitData.slice(1);
  return {
    componentName,
    props: props.map(getPropObject),
  }
}

function getRenderedComponents(pathToComponent) {
  const matches = [];
  let componentObject;
  const myRegexp = RegExp('<([A-Z].*)\/>','g');
  try {
    const data = fs.readFileSync(pathToComponent, 'utf8');
    match = myRegexp.exec(data);
    while (match != null) {
      // separate component name from attributes
      // Signer signer={signerName} becomes
      // { componentName: Signer, props: [{ name: signer, value: signerName }] }
      componentObject = getComponentObject(match[1].trim());
      matches.push(componentObject);
      match = myRegexp.exec(data);
    }
    return matches;
  } catch(e) {
    console.log('Error:', e.stack);
  }
}

module.exports = getRenderedComponents;
