const tf = require('@tensorflow/tfjs-node');
const config = require('../config');
const fs = require('fs');
const path = require('path');

let model;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel(config.modelUrl);
  }
};

const predict = async (req, res) => {
  try {
    await loadModel();

    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const imageTensor = tf.node.decodeImage(imageBuffer, 3).resizeBilinear([224, 224]).expandDims();
    
    const predictions = model.predict(imageTensor);
    const result = predictions.arraySync();

    // Hapus file yang diunggah setelah diproses
    fs.unlinkSync(filePath);

    res.json({ result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { predict };
