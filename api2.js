'use strict';

const async = require('async');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
// URL images containing printed and handwritten text
const printedText     = 'https://moderatorsampleimages.blob.core.windows.net/samples/sample2.jpg';
const handwrittenText = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/handwritten_text.jpg';


// Perform text recognition and await the result
async function recognizeText(client, mode, url) {
  // To recognize text in a local image, replace client.recognizeText() with recognizeTextInStream() as shown:
  let result = await client.recognizeTextInStream(mode, () => createReadStream('./img3.jpg'));
  // let result = await client.recognizeText(mode, url);
  // Operation ID is last path segment of operationLocation (a URL)
  let operation = result.operationLocation.split('/').slice(-1)[0];

  // Wait for text recognition to complete
  // result.status is initially undefined, since it's the result of recognizeText
  while (result.status !== 'Succeeded') { await sleep(1000); result = await client.getTextOperationResult(operation); }
  return result.recognitionResult;
}
// Prints all text from OCR result
function printRecText(ocr) {
  if (ocr.lines.length) {
      console.log('Recognized text:');
      for (let line of ocr.lines) {
          console.log(line.words.map(w => w.text).join(' '));
      }
  }
  else { console.log('No recognized text.'); }
}

function computerVision() {
  async.series([
    async function () {
    	console.log('Recognizing printed text...', printedText.split('/').pop());
		var printed = await recognizeText(ComputerVisionClient, 'Printed', printedText);
		printRecText(printed);

		// Recognize text in handwritten image
		console.log('\nRecognizing handwritten text...', handwrittenText.split('/').pop());
		var handwriting = await recognizeText(ComputerVisionClient, 'Handwritten', handwrittenText);
		printRecText(handwriting);
		   },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });
}

computerVision();