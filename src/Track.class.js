/**
 * Track
 * @class
 * @constructor
 * @public
 */
class Track {

    /**
     * The global AudioContext
     * @property {AudioContext}
     * @private
     */
    #context;

    /**
     * The audio file url
     * @property {string}
     * @private
     */
    #src;

    /**
     * If true, load the file at initialization
     * @property {boolean}
     * @private
     */
    #preload;

    /**
     * If true, loop the audio
     * @property {boolean}
     * @private
     */
    #loop;

    /**
     * The audio source
     * @property {AudioBufferSourceNode}
     * @private
     */
    #bufferSourceNode

    /**
     * The gain node
     * @property {GainNode}
     * @private
     */
    #gainNode

    /**
     * Tel if the audio source is loaded
     * @property {boolean}
     * @private
     */
    #loaded;

    /**
     * Callbacks triggered on event
     * @property {Object}
     * @private
     */
    #callbacks;

    /**
     * Track start time
     * @property {number}
     * @private
     */
    #startTime;

    /**
     * Track class constructor
     * @param {AudioContext} context            - the global audio context
     * @param {string} src                      - the audio file url
     * @param {Object} options                  - track options
     * @param {boolean} [options.preload=false] - load the file at initialization if true
     * @param {boolean} [options.loop=false]    - loop the audio if true
     */
    constructor(context, src, options = {preload: false, loop: false}) {
        this.#context = context;
        this.#src = src;
        this.#preload = options.preload;
        this.#loop = options.loop;
        this.#loaded = false;
        this.#startTime = 0;

        this.#callbacks = {
            onLoad: () => {},
            onEnd: () => {}
        };

        this.#bufferSourceNode = this.#context.createBufferSource();
        this.#gainNode = this.#context.createGain();

        this.#bufferSourceNode.loop = this.#loop;

        this.#bufferSourceNode.connect(this.#gainNode);
        this.#gainNode.connect(this.#context.destination);

        this.#bufferSourceNode.onended = () => {
            this.#callbacks.onEnd(this);
        };

        if (this.#preload === true) {
            this.load();
        }
    }

    /**
     * Set the event triggered when the file is loaded
     * @param {Function} callback   - Callback triggered when the audio file is loaded
     */
    set onLoad(callback) {
        this.#callbacks.onLoad = callback;
    }

    /**
     * Set the event triggered when the audio track end
     * @param {Function} callback   - Callback triggered when the audio track end
     */
    set onEnd(callback) {
        this.#callbacks.onEnd = callback;
    }

    /**
     * Set the audio volume
     * @param {number} volume   - The volume value, between 0 and 1
     */
    set volume(volume) {
        this.#gainNode.gain.setTargetAtTime(volume, this.#context.currentTime, 0.1);
    }

    /**
     * Check if the audio file is loaded
     * @returns {boolean}
     */
    get isLoaded() {
        return this.#loaded;
    }

    /**
     * Give the current playing time
     * @returns {number}
     */
    get currentTime() {
        return this.#startTime + this.#context.currentTime;
    }

    /**
     * Load the audio file
     */
    load() {
        let request = new XMLHttpRequest();
        request.responseType = 'arraybuffer';

        request.onload = () => {

            this.#context.decodeAudioData(request.response).then(audioBuffer => {
                this.#bufferSourceNode.buffer = audioBuffer;
                this.#loaded = true;
                this.volume = 0;
                this.#callbacks.onLoad(this);
            });
        }

        request.open('GET', this.#src, true);
        request.send();
    }

    /**
     * Play the audio file at the given time
     */
    start() {
        if (this.isLoaded) {
            this.#startTime = 0 - this.#context.currentTime;
            this.#bufferSourceNode.start(this.#startTime + this.#context.currentTime);
            this.volume = 1;
        }
    }

    /**
     * Stop the audio player
     */
    stop() {
        if (this.isLoaded) {
            if (this.#context.state == 'running') {
                this.volume = 0;
                this.#bufferSourceNode.stop();
                this.#startTime = 0;
            }
        }
    }
};

export default Track;