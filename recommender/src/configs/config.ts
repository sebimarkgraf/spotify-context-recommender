export const Labels = [
    { name: "Testing", value: "testing" },
    { name: "Studying", value: "studying" },
    { name: "Talking", value: "talking" },
    { name: "Jogging", value: "jogging" },
    { name: "Driving", value: "driving" },
    { name: "Sleeping", value: "sleeping" }
  ];
  

export const InferenceConfig = {
  model: `${window.location.href}/ks_context.onnx`,
  timeWindow: 2000, 
}

export const indexToLabel = (index: number) => {
  // Apparently onnxruntime-web does currently not supported string tensors. Therefore, we cannot use the IndexToString COmponent in spark to directly convert the prediction back to a label
  return ['studying', 'driving', 'standing', 'sleeping', 'jogging'][index]
}

export const SpotifyConfig = {
  clientId: "***REMOVED***",
  clientSecret: '***REMOVED***'
}

export const externalLinks = {
  "repository": "https://github.com/sebimarkgraf/spotify-context-recommender"
}
