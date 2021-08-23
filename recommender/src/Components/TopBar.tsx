import { AppBar, makeStyles, Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import { RecordingControls } from "./RecordingControls";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    }
}));

interface Props {
    state: {
        recording: boolean;
        recordedEvents: number;
        activity: string;
    };
    startRecording: () => void;
    stopRecording: () => void;
}


export const TopBar = (props: Props) => {
    const classes = useStyles();
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
    return (<AppBar position="sticky">
        <Toolbar>
        {matches ? <Typography variant="h4" component="h1">Spotify Recommender</Typography> : null}
        <div className={classes.grow} />
        <RecordingControls {...props.state} onRecordingChange={(changeTo) => {
            if (changeTo) {
              props.startRecording();
            } else {
              props.stopRecording();
            }
          }
        }/>
        </Toolbar>
      </AppBar>)
}