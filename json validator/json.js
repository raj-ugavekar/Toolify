const input = document.querySelector(".input");
const output = document.querySelector(".output");
const btnBeautify = document.querySelector(".btn-beautify");
const btnMinify = document.querySelector(".btn-minify");
const space = document.querySelector(".btn-space");
const btnValidate = document.querySelector(".btn-validate");
const btnXML = document.querySelector(".btn-toXML");
const btnCSV = document.querySelector(".btn-toCSV");
const btnURL = document.querySelector('.btn-URL');

//triggers when beautify is click calls function beautify 
btnBeautify.addEventListener("click",  () =>{
  beautify();
});

//function beautifys the input 
function beautify() {
  let tab=parseInt(space.value);
 const beautified = JSON.stringify(JSON.parse(input.value),null, tab);
 output.value = beautified;
}

//triggers function which minify the input
btnMinify.addEventListener("click", () => {
  const minified = JSON.stringify(JSON.parse(input.value));
  output.value = minified;
});

//function used validate the input code
function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

//triggers function to checks the input is correct or not
btnValidate.addEventListener("click", () => {
  const jsonData = input.value;
  if (isValidJSON(jsonData)) {
    alert('JSON data is valid.');
    beautify();
  } else {
    alert('Invalid JSON data. Please enter valid JSON.');
  }
});

//used  to generate tree viewer
function generateTree() {
  const jsonData = input.value;

  try {
    const parsedData = JSON.parse(jsonData);
    const treeViewer = createTreeView(parsedData);
    output.value = treeViewer; 
  } catch (error) {
    alert('Invalid JSON data. Please enter valid JSON.');
  }
}

//used to create tree
function createTreeView(data, depth = 0) {
  let result = '';

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const indent = ' '.repeat(depth * 2);
      result += `${indent}"${key}": `;

      if (typeof value === 'object' && value !== null) {
        result += `{\n${createTreeView(value, depth + 1)}}`;
      } else {
        result += `${JSON.stringify(value)}`;
      }

      result += ',\n';
    }
  }

  return result.slice(0, -2); 
}

//used to convert input into xml
function jsonToXml(jsonData, rootName = 'root') {
  let xml = '';

  const parseObject = (obj, indent) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        xml += `${indent}<${key}>`;
        if (typeof value === 'object') {
          xml += '\n';
          parseObject(value, indent + '  ');
          xml += `${indent}`;
        } else {
          xml += `${value}`;
        }
        xml += `</${key}>\n`;
      }
    }
  };

  xml += `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;
  parseObject(jsonData, '  ');
  xml += `</${rootName}>\n`;

  return xml;
}

//triggers the jsonTOXml
btnXML.addEventListener("click", () => {
  try {
    const jsonData = JSON.parse(input.value);
    const xmlData = jsonToXml(jsonData, 'data');
    output.value = xmlData;
  } catch (error) {
    alert('Invalid JSON data. Please enter valid JSON.');
  }
});


// Function to fetch data from an API link and display it in the input field
btnURL.addEventListener('click', () => {
  const apiLink = prompt('Enter the API link:');
  if (!apiLink) {
    return;
  }
  fetch(apiLink)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      input.value = JSON.stringify(data);
    })
    .catch(error => {
      alert('Error fetching or displaying data: ' + error.message);
    });
})

const inputCopy = document.querySelector("#inputCopy");
const outputCopy = document.querySelector("#outputCopy");
const inputClear = document.querySelector("#inputClear");

inputCopy.addEventListener("click",()=>{
    const content = input.value;  
    navigator.clipboard.writeText(content);
    alert("copied to clipboard!");
})

outputCopy.addEventListener("click",()=>{
  const content = output.value;  
  navigator.clipboard.writeText(content);
  alert("copied to clipboard!");
})

inputClear.addEventListener("click",()=>{
    input.value='';  
    output.value='';
})