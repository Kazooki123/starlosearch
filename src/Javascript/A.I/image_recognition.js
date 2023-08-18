// AI/image_recognition.js

import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';

// Load the pre-trained model
async function loadModel(modelPath) {
  const model = await loadGraphModel(modelPath);
  return model;
}

// Perform image classification using the loaded model
async function classifyImage(model, imageUrl) {
  const img = new Image();
  img.src = imageUrl;
  await img.decode();

  const input = tf.browser.fromPixels(img);
  const resized = tf.image.resizeBilinear(input, [224, 224]);
  const normalized = resized.div(tf.scalar(255.0));
  const batched = normalized.reshape([1, 224, 224, 3]);

  const predictions = await model.predict(batched).data();
  return predictions;
}

export { loadModel, classifyImage };
