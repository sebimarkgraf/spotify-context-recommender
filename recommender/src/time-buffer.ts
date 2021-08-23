export interface ValueStore {
    [key: string]: number[];
}

export type InferenceCallback = (values: ValueStore, timestamp: number) => void;

export class TimeBuffer {
    private values: ValueStore;
    private timeWindow: number;
    private callback: InferenceCallback;
    timer: NodeJS.Timeout;

    constructor(timeWindow: number, callback: InferenceCallback) {
        this.timeWindow = timeWindow;
        this.values = {};
        this.callback = callback;
        this.flush = this.flush.bind(this)
        this.timer = setInterval(() => this.flush(), timeWindow);
    }

    push(key: string, value: number) {  
        if (!this.values[key]) {
            this.values[key] = [];
        }
        this.values[key].push(value);
    }

    flush() {
        if (Object.keys(this.values).length === 0) return;
        this.callback(this.values, Date.now());
        this.values = {};
    }
}