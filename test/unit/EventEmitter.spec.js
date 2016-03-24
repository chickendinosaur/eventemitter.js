var EventEmitter = require('./../../dist/EventEmitter').default;
var Event = require('./../../dist/Event').default;

// Create a custom event to test.
function CountEvent(type) {
    Event.call(this, type);

    this.increment = 1;
    this.count = 10;
}

CountEvent.prototype = Object.create(Event.prototype);

describe('EventEmitter', function() {
    var ee = new EventEmitter();
    var count = 0;
    var count2 = 0;

    function testScope() {}

    function testScope2() {}

    var ev1 = new CountEvent('count');

    var handler1 = function(e) {
        count += e.increment;
        count2 = e.count;
    };

    beforeEach(function() {
        ee = new EventEmitter();
        count = 0;
        count2 = 0;
    });

    describe('addEventListener', function() {
        it('Event references a function on one listener.', function() {
            ee.addEventListener('count', function() {});
            expect(typeof ee._eventListeners['count']).toBe('function');
        });
        it('Event references an array on more than one listener.', function() {
            ee.addEventListener('count', function() {});
            ee.addEventListener('count', handler1);
            expect(ee._eventListeners['count'].length).toBe(2);
        });
    });

    describe('on', function() {
        it('Provides an alias to addEventListener.', function() {
            ee.on('count', function() {});
            expect(typeof ee._eventListeners['count']).toBe('function');
        });
    });

    describe('getEventListenerCount', function() {
        it('Returns the number of listeners if type is Array.', function() {
            ee.addEventListener('count', function() {});
            ee.addEventListener('count', function() {});
            expect(ee.getEventListenerCount('count')).toBe(2);
        });
        it('Returns the number of listeners if type is Function.', function() {
            ee.addEventListener('count', function() {});
            expect(ee.getEventListenerCount('count')).toBe(1);
        });
        it('Returns the number of listeners if type is undefined.', function() {
            expect(ee.getEventListenerCount('count')).toBe(0);
        });
    });

    describe('removeEventListener', function() {
        it('Resets event handlers for an event back to undefined on one listener available.', function() {
            ee.addEventListener('count', function() {});
            ee.removeEventListener('count', handler1);
            expect(ee._eventListeners['count']).toBe(undefined);
        });
        it('Removes single handler from event listeners container.', function() {
            ee.addEventListener('count', function() {});
            ee.addEventListener('count', handler1);
            ee.removeEventListener('count', handler1);
            expect(ee._eventListeners['count'].length).toBe(1);
        });
    });

    describe('removeAllEventListeners', function() {
        it('Resets event handlers for an event back to undefined on one listener available.', function() {
            ee.addEventListener('count', function() {});
            ee.removeAllEventListeners('count');
            expect(ee._eventListeners['count']).toBe(undefined);
        });
        it('Removes all handlers from event listeners container.', function() {
            ee.addEventListener('count', function() {});
            ee.addEventListener('count', handler1);
            ee.removeAllEventListeners('count');
            expect(ee._eventListeners['count'].length).toBe(0);
        });
    });

    describe('triggerEvent', function() {
        it('Test base event propteries', function() {
            ee.addEventListener('count', function(event) {
                expect(this).toEqual(ee);
                expect(event.type).toBe('count');
            });
            ee.triggerEvent(ev1);
        });
        it('Execute listeners when only one for an event.', function() {
            ee.addEventListener('count', handler1);
            ee.triggerEvent(ev1);
            expect(count).toBe(1);
            expect(count2).toBe(10);
        });
        it('Execute all listeners when more than one for an event.', function() {
            ee.addEventListener('count', handler1);
            ee.addEventListener('count', handler1);
            ee.triggerEvent(ev1);
            expect(count).toBe(2);
            expect(count2).toBe(10);
        });
        // Trigger universal listeners.
        it('Execute universal listeners when only one for an event.', function() {
            ee.addEventListener(handler1);
            ee.triggerEvent(ev1);
            expect(count).toBe(1);
            expect(count2).toBe(10);
        });
        it('Execute all universal listeners when more than one for an event.', function() {
            ee.addEventListener(handler1);
            ee.addEventListener(handler1);
            ee.triggerEvent(ev1);
            expect(count).toBe(2);
            expect(count2).toBe(10);
        });
    });

    // Universal event listener tests.

    describe('_addEventCallback', function() {
        it('Event references a function on one listener.', function() {
            ee.addEventListener(function() {});
            expect(typeof ee._eventCallbacks).toBe('function');
        });
        it('Event references an array on more than one listener.', function() {
            ee.addEventListener(function() {});
            ee.addEventListener(handler1);
            expect(ee._eventCallbacks.length).toBe(2);
        });
    });

    describe('_removeEventCallback', function() {
        it('Resets event handlers for an event back to null on one listener available.', function() {
            ee.addEventListener(function() {});
            ee.removeEventListener(handler1);
            expect(ee._eventCallbacks).toBe(null);
        });
        it('Removes single handler from event listeners container.', function() {
            ee.addEventListener(function() {});
            ee.addEventListener(handler1);
            ee.removeEventListener(handler1);
            expect(ee._eventCallbacks.length).toBe(1);
        });
    });

    describe('removeAllEventListeners', function() {
        it('Resets event handlers for an event back to null on one listener available.', function() {
            ee.addEventListener(function() {});
            ee.removeAllEventListeners();
            expect(ee._eventCallbacks).toBe(null);
        });
        it('Removes all handlers from event listeners container.', function() {
            ee.addEventListener(function() {});
            ee.addEventListener(handler1);
            ee.removeAllEventListeners();
            expect(ee._eventCallbacks.length).toBe(0);
        });
    });
});
