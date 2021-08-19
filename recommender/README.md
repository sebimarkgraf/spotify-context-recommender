# Recommender using ONNX Model

## Onnx WASM backend
Copying WASM files to the output dir with CRA is not possible in a clean way. Take a look at package.json ``start``...
But we need the WASM backend to support higher ONNX version operators.