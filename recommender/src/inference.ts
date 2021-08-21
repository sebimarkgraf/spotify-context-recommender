import { Tensor, InferenceSession } from "onnxruntime-web";
import { indexToLabel, InferenceConfig } from "./config";
import { ValueStore } from "./time-buffer";



export interface Features {
    [key: string]: Tensor;
}

export class Model {
  session: InferenceSession | undefined;
  static _instance: Model;

  constructor(model_location: string) {
    console.log("Loading Model: " + model_location);
    InferenceSession.create(model_location, {executionProviders: ['wasm'], logVerbosityLevel: 4, logSeverityLevel: 0}).then(session => {
      this.session = session;
      console.log(session);
    }).catch(err => {
      console.error("Failed loading model", err);
    });
  }

  static getInstance() {
    if (!Model._instance) {
      Model._instance = new Model(InferenceConfig['model']);
    }
    return Model._instance;
  }

  calculate_features(values: ValueStore) {

    Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const features: Features = {};
    for (const [key, value] of Object.entries(values)) {
      features[`min_${key}`] = new Tensor(Float32Array.from([Math.min(...value)]), [1, 1]);
      features[`max_${key}`] = new Tensor(Float32Array.from([Math.max(...value)]), [1, 1]);
      let mean = value.reduce((a, b) => a + b, 0) / value.length
      features[`avg_${key}`] = new Tensor(Float32Array.from([mean]), [1, 1]);
      features[`sum_${key}`] = new Tensor(Float32Array.from([value.reduce((a, b) => a + b, 0)]), [1, 1]);
      features[`var_samp_${key}`] = new Tensor(Float32Array.from([Math.sqrt(value.reduce((a, b) => a + b * b, 0) / value.length - mean * mean)]), [1, 1]);
    }
    return features;
  }

  async infer(features: Features) {
    if (!this.session) {
      console.warn("Model not initialized");
      return;
    }
    const prediction: any = await this.session.run(features, {logVerbosityLevel: 4});
    if (prediction === undefined) {
      return;
    }
    const label = indexToLabel(prediction["prediction"].data[0])
    return label;
  }
}

