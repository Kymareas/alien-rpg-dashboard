
/**
 * Custom event emitter
 * @class
 * @constructor
 * @public
 */
class EventEmitter {

    /**
     * EvnentEmitter class constructor
     */
    constructor() {
        let delegate = document.createDocumentFragment();
        
        [
            'addEventListener',
            'dispatchEvent',
            'removeEventListener'
        ].forEach(f =>
            this[f] = (...args) => delegate[f](...args)
        );
    }
};

/**
 * @name EventEmitter#addEventListener
 * @function
 * @memberof EventEmitter
 * @description Registers an event handler of a specific event type on the EventTarget
 * @param {string} type                     - A case-sensitive string representing the event type to listen for
 * @param {function} listener               - The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs
 * @param {Object} [options={}]             - An options object specifies characteristics about the event listener
 * @param {boolean} [options.capture]       - A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 * @param {boolean} [options.once]          - A boolean value indicating that the listener should be invoked at most once after being added
 * @param {boolean} [options.passive]       - A boolean value that, if true, indicates that the function specified by listener will never call preventDefault()
 * @param {AbortSignal} [options.signal]    - An AbortSignal
 * @param {boolean} [useCapture=false]      - A boolean value indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 */

/**
 * @name EventEmitter#dispatchEvent
 * @function
 * @memberof EventEmitter
 * @description Dispatches an event to this EventTarget
 * @param  {Event} event        - the Event object to be dispatched
 * @param {Object} [options={}] - An options object specifies characteristics about the event listener
 */

/**
 * @name EventEmitter#removeEventListener
 * @function
 * @memberof EventEmitter
 * @description Removes an event listener from the EventTarget
 * @param {string} type                 - A case-sensitive string representing the event type to listen for
 * @param {function} listener           - The object that receives a notification (an object that implements the Event interface) when an event of the specified type occurs
 * @param {boolean} [options.capture]   - A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree
 */

export default EventEmitter;