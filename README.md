Slings events. 

---  

# Author  

John Pittman  
john@chickendinosaur.com  

# Getting Started  

## Installation

#### npm  

npm install @chickendinosaur/eventemitter  

## Usage

### Event
```javascript  
import Event from '@chickendinosaur/eventemitter/Event';

const pauseEvent = new Event('pause');
const errorEvent = new Event(404);
```

### EventEmitter
```javascript 
import EventEmitter from '@chickendinosaur/eventemitter';
import Event from '@chickendinosaur/eventemitter/Event';

class ComicEvent extends Event{
    constructor(type) {
        super(type);

        this.superhero = 'The Nameless Man';
        this.sidekick = null;
    }
}
     
const eventemitter = new EventEmitter();
  
const comicEvent = new ComicEvent('comic');
comicEvent.superhero = 'Batman';  
comicEvent.sidekick = 'Robin';
comicEvent.target = window || this;  

eventemitter.addEventListener('bang', function(e) {
    console.log(`this = ${this}`);
    console.log(`Event: ${e.type}`);
    console.log(`Event target: ${e.target}`);
    console.log(`${e.superhero} (POW!), ${e.sidekick} (BOOM!)`);
});

// emitEvent is meant to take an Event object which should be extended
// for a custom event.
  
eventemitter.emitEvent(ev);
eventemitter.removeAllEventListeners('bang');
eventemitter.emitEvent(ev);
```
---  

# Development  

## Installation  

From the project root:

* npm install
* npm run build

## Commands  

#### Local

npm run:

build, clean, compile, help, init, start, test, compress, publish, update, documentation, set-access, set-author, set-description, set-dist, set-global, set-keywords, set-license, set-main, set-name, set-private, set-repository, set-src, set-test, set-version

---  

# License  

The MIT License (MIT)

Copyright (c) 2016 John Pittman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
