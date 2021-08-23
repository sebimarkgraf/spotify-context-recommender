export const Labels = [
    { name: "Testing", value: "testing" },
    { name: "Studying", value: "studying" },
    { name: "Talking", value: "talking" },
    { name: "Jogging", value: "jogging" },
    { name: "Driving", value: "driving" },
    { name: "Sleeping", value: "sleeping" }
  ];
  

export const InferenceConfig = {
  "model": "ks_context.onnx"
}

export const indexToLabel = (index: number) => {
  // Apparently onnxruntime-web does currently not supported string tensors. Therefore, we cannot use the IndexToString COmponent in spark to directly convert the prediction back to a label
  return ['studying', 'driving', 'standing', 'sleeping', 'jogging'][index]
}

export const SpotifyConfig = {
  clientId: "***REMOVED***",
  clientSecret: '***REMOVED***'
}


