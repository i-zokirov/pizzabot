class Timer {
    private timeoutID: NodeJS.Timeout | null;

    constructor() {
        this.timeoutID = null;
    }

    setUp(callback: () => void, time: number) {
        if (typeof this.timeoutID === "number") {
            this.cancel();
        }

        this.timeoutID = setTimeout(callback, time);
    }

    cancel() {
        clearTimeout(this.timeoutID as NodeJS.Timeout);
        this.timeoutID = null;
    }
}

export default Timer;
