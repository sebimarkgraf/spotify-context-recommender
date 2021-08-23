import { FormControlLabel, makeStyles, Switch, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    events: {
        marginRight: theme.spacing(1)
    }
}));

export interface Props {
    recording: boolean;
    onRecordingChange: (newValue: boolean) => void;
    activity: string;
    recordedEvents: number;
}

export const RecordingControls = (props: Props) => {
    const classes = useStyles();
    const {activity, recording, onRecordingChange, recordedEvents} = props;
    return (
        <>
    <FormControlLabel
      control={
        <Switch
          size="small"
          checked={recording}
          onChange={() => onRecordingChange(!recording)}
        />
      }
      label="Recording"
    />
    <Typography className={classes.events}>Recorded Events: {recordedEvents}</Typography>
    <Typography>Current Activity: {activity}</Typography>
    </> ) 
}