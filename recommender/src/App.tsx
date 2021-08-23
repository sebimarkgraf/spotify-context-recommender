import "./styles.css";
import * as React from "react";

import {
  CssBaseline,
  MenuItem,
  Container,
  Typography,
  FormControlLabel,
  Switch,
  Box
} from "@material-ui/core";
import Copyright from "./Copyright";


import { Tags, EventRecorder } from "./types";
import { TimeBuffer, ValueStore } from "./time-buffer";
import { Model } from "./inference";
import { SpotifyPanel } from "./SpotifyPanel";
import { requestIOSPermissions } from "./util";

interface State {
  recording: boolean;
  recordedEvents: number;
  activity: string;
}

export default class App extends React.Component<{}, State> {
  event_listener: EventRecorder[];
  timebuffer: TimeBuffer;
  model: Model | undefined = undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      recording: false,
      recordedEvents: 0,
      activity: "unknown"
    };
    this.devicemotion_listener = this.devicemotion_listener.bind(this);
    this.deviceorientation_listener = this.deviceorientation_listener.bind(
      this
    );
    this.event_listener = [
      { event: "deviceorientation", function: this.deviceorientation_listener },
      { event: "devicemotion", function: this.devicemotion_listener }
    ];
    

    this.timebuffer = new TimeBuffer(1000, this.inferenceCallback)
  }


  inferenceCallback = (values: ValueStore, timestamp: number) => {
    if (this.model === undefined) return;
    const features = this.model.calculate_features(values, timestamp);
    this.model.infer(features).then(outputs => {
      if (outputs !== undefined) {
        this.setState({"activity": outputs});
      }
    });
  }

  record = (
    eventtype: string,
    fields: object,
    tags: Tags,
    eventtime: number
  ) => {
    let point: any = {};
    for (const [key, value] of Object.entries(fields)) {      
      this.timebuffer.push(`${key}_${eventtype}_`, value);
    }

    let timestamp = performance.timing.navigationStart * 1000000 + eventtime * 1000000;

    this.setState({ recordedEvents: this.state.recordedEvents + 1 });
    point["timestamp"] = timestamp;

  };


  devicemotion_listener(evt: DeviceMotionEvent) {
    const { timeStamp, type } = evt;
    const { x, y, z } = evt.accelerationIncludingGravity!;
    const { alpha, beta, gamma } = evt.rotationRate!;
    this.record(
      type,
      { x, y, z, alpha, beta, gamma },
      {},
      timeStamp
    );
  }

  deviceorientation_listener(evt: DeviceOrientationEvent) {
    const { alpha, beta, gamma, type, timeStamp } = evt;
    this.record(type, { alpha, beta, gamma }, {}, timeStamp);
  }

  stopRecording = () => {
    for (const listener of this.event_listener) {
      console.log("Stopping", listener.event);
      window.removeEventListener(listener.event, listener.function, true);
    }

    this.setState({ recording: false });
  };

  startRecording = async () => {
    if (this.state.recording === true) return;

    console.log("Loading Model");
    this.model = Model.getInstance();
    console.log("Model loaded")

    // Handle iOS Permissions
    if (!await requestIOSPermissions()) {
      return;
    }

    for (const listener of this.event_listener) {
      console.log("Start listener", listener.event);
      window.addEventListener(listener.event, listener.function, true);
    }

    this.setState({ recording: true });

  };

  render() {
    return (
      <CssBaseline>
      <div className={"root"}>
        <Container maxWidth="sm" className="content">
          <Typography variant="h2" component="h1" gutterBottom>
            Recommender
          </Typography>

          <Box bgcolor="lightgrey" border="1 px solid grey" padding="10px">
            <Typography variant="h3">Controls</Typography>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={this.state.recording}
                  onChange={() => {
                    if (this.state.recording) {
                      this.stopRecording();
                    } else {
                      this.startRecording();
                    }
                  }}
                />
              }
              label="Recording"
            />
            <div>Recorded Events: {this.state.recordedEvents}</div>
            <div>Current Activity: {this.state.activity}</div>
          </Box>  
        </Container>
        <SpotifyPanel activity={this.state.activity}/>
        <footer>
          <Copyright />
        </footer>
      </div>
      </CssBaseline>
    );
  }
}


