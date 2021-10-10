
/**
 * Custom event emitter
 * @class
 * @constructor
 * @public
 */
class EventEmitter {

    /**
     * The delegate document for custom events
     * @property {DocumentFragment}
     * @private
     */
    #delegate;

    /**
     * EvnentEmitter class constructor
     */
    constructor() {
        this.#delegate = document.createDocumentFragment();
    }

    /**
     * Registers an event handler of a specific event type on the EventTarget
     * @param {string} type                     - A case-sensitive string representing the event type to listen for
     * @param {function} listener               - The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs
     * @param {Object} [options={}]             - An options object specifies characteristics about the event listener
     * @param {boolean} [options.capture]       - A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
     * @param {boolean} [options.once]          - A boolean value indicating that the listener should be invoked at most once after being added
     * @param {boolean} [options.passive]       - A boolean value that, if true, indicates that the function specified by listener will never call preventDefault()
     * @param {AbortSignal} [options.signal]    - An AbortSignal
     * @param {boolean} [useCapture=false]      - A boolean value indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
     */
    addEventListener(type, listener, options = {}, useCapture = false) {
        this.#delegate.addEventListener(type, listener, options, useCapture);
    }

    /**
     * Dispatches an event to this EventTarget
     * @param  {Event} event        - the Event object to be dispatched
     * @param {Object} [options={}] - An options object specifies characteristics about the event listener
     */
    dispatchEvent(event) {
        this.#delegate.dispatchEvent(event);
    }

    /**
     * Removes an event listener from the EventTarget
     * @param {string} type                 - A case-sensitive string representing the event type to listen for
     * @param {function} listener           - The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs
     * @param {boolean} [options.capture]   - A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
     */
    removeEventListener(type, listener, options = {}) {
        this.#delegate.removeEventListener(type, listener, options);
    }
};

export default EventEmitter;