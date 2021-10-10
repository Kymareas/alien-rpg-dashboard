import Track from "./Track.class.js";

/**
 * TrackList
 * @class
 * @constructor
 * @public
 */
class TrackList {

    /**
     * The global AudioContext
     * @property {AudioContext}
     * @private
     */
    #context;

    /**
     * The track list
     * @property {Array<Track>}
     * @private
     */
    #tracks;

    /**
     * Current track index
     * @property {number}
     * @private
     */
    #playerHead;

    /**
     * TrackList class contructor
     * @param {AudioContext} context    - the global audio context
     * @param {Array<Track>} tracks     - the track list
     */
    constructor(context, tracks) {
        this.#context = context;
        this.#tracks = tracks;

        this.#playerHead = 0;

        for (let track of this.#tracks) {
            track.addEventListener('ended', () => {
                this.next();
            });
        }
    }

    /**
     * Get the current track
     * @returns {Track}
     */
    get currentTrack() {
        return this.#tracks[this.#playerHead];
    }

    /**
     * Load the track at the given index
     * @param {number} index    - the track index
     * @returns {Promise<Track>}
     */
    load(index) {
        return new Promise((resolve, reject) => {
            if (index in this.#tracks) {
                if (!this.#tracks[index].isLoaded) {
                    this.#tracks[index].load();

                    this.#tracks[index].addEventListener('loaded', () => {
                        resolve(this.#tracks[index]);
                    });
                }
                else {
                    resolve(this.#tracks[index]);
                }
            }
        });
    }

    /**
     * Start the playlist
     */
    start() {
        if (this.currentTrack.isLoaded) {
            this.currentTrack.start();
        }
        else {
            this.load(this.#playerHead).then(() => {
                this.currentTrack.start();
            });
        }
    }

    /**
     * Stop the playlist
     */
    stop() {
        this.currentTrack.stop();
    }

    /**
     * Jump to the next track in the list
     */
    next() {
        if (this.#playerHead + 1 in this.#tracks) {
            this.stop()
            this.#playerHead++;
            this.start();
        }
    }

    /**
     * Jmp to the previous track in the list
     */
    previous() {
        if (this.#playerHead - 1 in this.#tracks) {
            this.stop();
            this.#playerHead--;
            this.start();
        }
    }

    /**
     * Suffle the track order
     */
    shuffle() {
        let i = 0, j = 0, temp = null;

        for (i = this.#tracks.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.#tracks[i];
            this.#tracks[i] = this.#tracks[j];
            this.#tracks[j] = temp;
        }
    }
};

export default TrackList