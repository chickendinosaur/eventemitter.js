var EventEmitter = require('./../../dist/EventEmitter').default;
var Event = require('./../../dist/Event').default;

// Create a custom event to test.
function CountEvent(type) {
	Event.call(this, type);

	this.increment = 1;
	this.count = 10;
}

CountEvent.prototype = Object.create(Event.prototype);

describe('EventEmitter', function () {
	var ee = new EventEmitter();
	var count = 0;
	var count2 = 0;

	function testScope() {}

	function testScope2() {}

	var ev1 = new CountEvent('count');

	var handler1 = function (e) {
		count += e.increment;
		count2 = e.count;
	};

	beforeEach(function () {
		ee = new EventEmitter();
		count = 0;
		count2 = 0;
	});

	describe('addEventListener', function () {
		it('Event references a function on one listener.', function () {
			ee.addEventListener('count', function () {});
			expect(typeof ee._eventHandlers['count']).toBe('function');
		});
		it('Event references an array on more than one listener.', function () {
			ee.addEventListener('count', function () {});
			ee.addEventListener('count', handler1);
			expect(ee._eventHandlers['count'].length).toBe(2);
		});
	});

	describe('on', function () {
		it('Provides an alias to addEventListener.', function () {
			ee.on('count', function () {});
			expect(typeof ee._eventHandlers['count']).toBe('function');
		});
	});

	describe('getEventListenerCount', function () {
		it('Returns the number of listeners if type is Array.', function () {
			ee.addEventListener('count', function () {});
			ee.addEventListener('count', function () {});
			expect(ee.getEventListenerCount('count')).toBe(2);
		});
		it('Returns the number of listeners if type is Function.', function () {
			ee.addEventListener('count', function () {});
			expect(ee.getEventListenerCount('count')).toBe(1);
		});
		it('Returns the number of listeners if type is undefined.', function () {
			expect(ee.getEventListenerCount('count')).toBe(0);
		});
	});

	describe('removeEventListener', function () {
		it('Resets event handlers for an event back to undefined on one listener available.', function () {
			ee.addEventListener('count', function () {});
			ee.removeEventListener('count', handler1);
			expect(ee._eventHandlers['count']).toBe(undefined);
		});
		it('Removes single handler from event listeners container.', function () {
			ee.addEventListener('count', function () {});
			ee.addEventListener('count', handler1);
			ee.removeEventListener('count', handler1);
			expect(ee._eventHandlers['count'].length).toBe(1);
		});
	});

	describe('removeAllEventListeners', function () {
		it('Resets event handlers for an event back to undefined on one listener available.', function () {
			ee.addEventListener('count', function () {});
			ee.removeAllEventListeners('count');
			expect(ee._eventHandlers['count']).toBe(undefined);
		});
		it('Removes all handlers from event listeners container.', function () {
			ee.addEventListener('count', function () {});
			ee.addEventListener('count', handler1);
			ee.removeAllEventListeners('count');
			expect(ee._eventHandlers['count'].length).toBe(0);
		});
	});

	describe('triggerEvent', function () {
		it('Test base event propteries', function () {
			ee.addEventListener('count', function (event) {
				expect(this).toEqual(ee);
				expect(event.type).toBe('count');
			});
			ee.triggerEvent(ev1);
		});
		it('Execute listeners when only one for an event.', function () {
			ee.addEventListener('count', handler1);
			ee.triggerEvent(ev1);
			expect(count).toBe(1);
			expect(count2).toBe(10);
		});
		it('Execute all listeners when more than one for an event.', function () {
			ee.addEventListener('count', handler1);
			ee.addEventListener('count', handler1);
			ee.triggerEvent(ev1);
			expect(count).toBe(2);
			expect(count2).toBe(10);
		});
		// Trigger universal listeners.
		it('Execute universal listeners when only one for an event.', function () {
			ee.pipe(handler1);
			ee.triggerEvent(ev1);
			expect(count).toBe(1);
			expect(count2).toBe(10);
		});
		it('Execute all universal listeners when more than one for an event.', function () {
			ee.pipe(handler1);
			ee.pipe(handler1);
			ee.triggerEvent(ev1);
			expect(count).toBe(2);
			expect(count2).toBe(10);
		});
	});

	// Universal event listener tests.

	describe('pipe', function () {
		it('Event references a function on one listener.', function () {
			ee.pipe(function () {});
			expect(typeof ee._pipedEventHandlers).toBe('function');
		});
		it('Event references an array on more than one listener.', function () {
			ee.pipe(function () {});
			ee.pipe(handler1);
			expect(ee._pipedEventHandlers.length).toBe(2);
		});
	});

	describe('unpipe', function () {
		it('Resets event handlers for an event back to null on one listener available.', function () {
			ee.pipe(function () {});
			ee.unpipe(handler1);
			expect(ee._pipedEventHandlers).toBe(null);
		});
		it('Removes single handler from event listeners container.', function () {
			ee.pipe(function () {});
			ee.pipe(handler1);
			ee.unpipe(handler1);
			expect(ee._pipedEventHandlers.length).toBe(1);
		});
	});

	describe('unpipeAll', function () {
		it('Resets event handlers for an event back to null on one listener available.', function () {
			ee.pipe(function () {});
			ee.unpipeAll();
			expect(ee._pipedEventHandlers).toBe(null);
		});
		it('Removes all handlers from event listeners container.', function () {
			ee.pipe(function () {});
			ee.pipe(handler1);
			ee.unpipeAll();
			expect(ee._pipedEventHandlers.length).toBe(0);
		});
	});

	describe('getPipedEventListenerCount', function () {
		it('Returns the number of listeners if type is Array.', function () {
			ee.pipe(function () {});
			ee.pipe(function () {});
			expect(ee.getPipedEventListenerCount()).toBe(2);
		});
		it('Returns the number of listeners if type is Function.', function () {
			ee.pipe(function () {});
			expect(ee.getPipedEventListenerCount()).toBe(1);
		});
		it('Returns the number of listeners if type is undefined.', function () {
			expect(ee.getPipedEventListenerCount()).toBe(0);
		});
	});
});
