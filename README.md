# Spotify Context Recommender

This project was done for the lecture "Kontextsensitive Systeme 2021" at KIT.
The idea lies in creating a full stack from recording the events during context, through training a classifier and finally integrating the 
context classifier into a working application.

## Links

The deployed recommender can be found [here](https://sebimarkgraf.de/spotify-context-recommender/).
The event recorder can be accessed on [codesandbox](https://8og7k.csb.app/).
The Influx DB is the influx db of the [lecture](https://css21.teco.edu).


## Idea
Finding the right music to your current activity is always a tedious process and involves clicking through potentially a big amount of spotify submenus.
This can be speed up significantly by detecting a activity and searching for this activity.
For a first prototype, I decided on a list of activities and tried to classify between them.


## Technology Stack
The implementation of this topic diverges in some minor ways from the implementation shown in the lecture itself:
* The event collector was written using React
* All analysis steps and training was performed with Python, therefore using the PySpark instead of R interface of Spark
* [PMML](http://dmg.org/pmml/pmml-faq.html) was exchanged for [ONNX](https://onnx.ai/)

### Python vs R
As the author of this project is familiar with Python, the decision was made due to this preference.

### ONNX vs PMML
While PMML is published by the "Data Mining Group", ONNX is a community driven effort.
PMML was first published in 1998 and already has many versions published. ONNX on the other hand
was founded in 2017 and tries to unify the many deep learning frameworks into a set of common operators.
The difference in age can be seen in the formats as well: PMML was built with XML, while ONNX uses a binary file format, but
can be read with many viewer like [Netron](https://netron.app/).
Additionally, ONNX has the support of many big players and especially Microsoft invests by building a [runtime](https://github.com/microsoft/onnxruntime) for different platforms. This includes a webversion on top of Web Assembly of WebGL.
To export from Python the [onnxmltools](https://github.com/onnx/onnxmltools) can be used.

### React as Event Collector
As the final application can be more easily written with a component based framework, it was natural to use a framework for the collector as well.
Using the same framework for both the collector and the final application allows to share components where necessary / possible.


### Zeppelin?
This project tested Zeppelin as a frontend for Python / PySpark due to the enhanced Spark Integration.
But the biggest weakpoint was installing additional packages as the onnxmltools would have been necessary to export the finally trained model.


## ToDO
- [ ] Enhance Activity Recognition through data gathering
- [X] Make sure classes are balanced in train / test set --> Introduced CV
- [X] Deploy the final application, e.g. on GitHub Pages
- [ ] Deploy the collector using GitHub Pages or similar
- [ ] Integrate Feature Calculation into Spark Pipeline as Transformer

