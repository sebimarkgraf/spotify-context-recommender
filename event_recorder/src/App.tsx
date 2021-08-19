import "./styles.css";
import * as React from "react";

import { InfluxConfig, Labels } from "./config";
import { InfluxDB, WriteApi, Point } from "@influxdata/influxdb-client";
import MobileDetect from "mobile-detect";
import {
  Select,
  MenuItem,
  Container,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Box
} from "@material-ui/core";
import Copyright from "./Copyright";

import { generateRandomString } from "./util";
import { Tags, EventRecorder } from "./types";

interface State {
  subject: string;
  label: string;
  recording: boolean;
  recordedEvents: number;
}

export default class App extends React.Component<{}, State> {
  private writeApi: WriteApi;
  private event_listener: EventRecorder[];
  private defaultTags: Tags;

  constructor(props: any) {
    super(props);
    const mobile = new MobileDetect(window.navigator.userAgent);

    this.defaultTags = {
      mobile: mobile.mobile() || "",
      browser: mobile.userAgent()
    };

    const client = new InfluxDB({
      url: InfluxConfig.url,
      token: InfluxConfig.token,
      writeOptions: {
        flushInterval: 5000
      }
    });
    this.writeApi = client.getWriteApi(InfluxConfig.org, InfluxConfig.bucket);

    this.state = {
      subject: generateRandomString(10),
      label: "testing",
      recording: false,
      recordedEvents: 0
    };
    this.devicemotion_listener = this.devicemotion_listener.bind(this);
    this.deviceorientation_listener = this.deviceorientation_listener.bind(
      this
    );
    this.event_listener = [
      { event: "deviceorientation", function: this.deviceorientation_listener },
      { event: "devicemotion", function: this.devicemotion_listener }
    ];
  }

  record = (
    eventtype: string,
    fields: object,
    tags: Tags,
    eventtime: number
  ) => {
    const point = new Point(eventtype);

    for (const [key, value] of Object.entries(fields)) {
      switch (typeof value) {
        case "number":
          point.floatField(key, value);
          break;
        default:
          point.stringField(key, value);
      }
    }

    point.tag("subject", this.state.subject);
    point.tag("label", this.state.label);

    point.timestamp(
      performance.timing.navigationStart * 1000000 + eventtime * 1000000
    );

    for (const [key, value] of Object.entries({
      ...this.defaultTags,
      ...tags
    })) {
      point.tag(key, value);
    }

    this.writeApi.writePoint(point);
    this.setState({ recordedEvents: this.state.recordedEvents + 1 });
  };

  onSubjectChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    this.stopRecording();
    this.setState({ subject: evt.target.value });
  };

  devicemotion_listener(evt: DeviceMotionEvent) {
    const { timeStamp, type } = evt;
    const { x: x0, y: y0, z: z0 } = evt.acceleration!;
    const { x, y, z } = evt.accelerationIncludingGravity!;
    const { alpha, beta, gamma } = evt.rotationRate!;
    this.record(
      type,
      { x0, y0, z0, x, y, z, alpha, beta, gamma },
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

    this.setState({ recording: true });

    // Handle iOS Permissions
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      const granted = await DeviceMotionEvent.requestPermission();
      if (granted !== "granted") {
        console.error("Permission not granted!");
        return;
      }
    }

    for (const listener of this.event_listener) {
      console.log("Start listener", listener.event);
      window.addEventListener(listener.event, listener.function, true);
    }
  };

  render() {
    const labels = Labels.map((label: any) => (
      <MenuItem value={label.value}>{label.name}</MenuItem>
    ));

    return (
      <div className={"root"}>
        <Container maxWidth="sm" className="content">
          <Typography variant="h2" component="h1" gutterBottom>
            Event Recorder
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
          </Box>
          <Box padding="10px" display="flex" flexDirection="column">
            <Typography variant="h4">Settings</Typography>

            <Select
              label="Label"
              value={this.state.label}
              disabled={this.state.recording}
              onChange={(evt) =>
                this.setState({ label: evt.target.value as string })
              }
            >
              {labels}
            </Select>

            <TextField
              label="Subject"
              disabled={this.state.recording}
              value={this.state.subject}
              onChange={(evt) => this.onSubjectChange(evt as any)}
            />
          </Box>
        </Container>
        <footer>
          <Copyright />
        </footer>
      </div>
    );
  }
}
