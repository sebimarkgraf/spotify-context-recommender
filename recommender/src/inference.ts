import { Tensor, InferenceSession } from "onnxruntime-web";
import { InferenceConfig } from "./config";
import { ValueStore } from "./time-buffer";



export interface Features {
    [key: string]: Tensor;
}

export class Model {
  session: InferenceSession | undefined;
  static _instance: Model;

  constructor(model_location: string) {
    InferenceSession.create(model_location, {executionProviders: ['wasm']}).then(session => {
      this.session = session;
      console.log(session);
    })
  }

  static getInstance() {
    if (!Model._instance) {
      Model._instance = new Model(InferenceConfig['model']);
    }
    return Model._instance;
  }

  calculate_features(values: ValueStore) {
    const features: Features = {};
    for (const [key, value] of Object.entries(values)) {
      features[`min_${key}`] = new Tensor('float32', [Math.min(...value)]);
      features[`max(${key}`] = new Tensor('float32', [Math.max(...value)], );
      let mean = value.reduce((a, b) => a + b, 0) / value.length
      features[`mean_${key}`] = new Tensor('float32', [mean]);
      features[`var_sample_${key}`] =new Tensor('float32', [Math.sqrt(value.reduce((a, b) => a + b * b, 0) / value.length - mean * mean)]);
    }
    return features;
  }

  async infer(features: Features) {
    if (!this.session) {
      console.warn("Model not initialized");
      return;
    }
    return this.session.run(features);
  }
}

