export interface Tags {
    [key: string]: string;
  }
  
  export interface EventRecorder {
    event: string;
    function: any;
  }
  

export interface AppState {
  recording: boolean;
  recordedEvents: number;
  activity: string;
}