const fs = require('fs');

// List of JSON file names
const jsonFiles = ['arbitrum.json', 'aurora.json', 'avalanche.json', 'BNB.json', 'Ethereum.json', 'fantom.json', 'klaytn.json', 'Optimism.json', 'Polygon.json'];

// Object to store the merged data
const mergedData = {};

// Iterate through each JSON file
jsonFiles.forEach((fileName) => {
  try {
    // Read the contents of the JSON file
    const fileContents = fs.readFileSync(fileName, 'utf8');

    // Parse the JSON data
    const jsonData = JSON.parse(fileContents);

    // Check for duplicate symbols and add "chains" property
    jsonData.forEach((item) => {
      const existingItem = mergedData[item.symbol];
      if (existingItem) {
        // Duplicate symbol found
        existingItem.chains[fileName.replace('.json', '')] = item.address;
      } else {
        // New symbol, add it to the merged data
        mergedData[item.symbol] = { ...item, chains: { [fileName.replace('.json', '')]: item.address } };
      }
    });
  } catch (error) {
    console.error(`Error reading or parsing ${fileName}:`, error.message);
  }
});

// Write the merged data to a new JSON file
const outputFileName = 'AllTokens.json';
fs.writeFileSync(outputFileName, JSON.stringify(Object.values(mergedData), null, 2));

console.log(`${outputFileName} created successfully.`);
