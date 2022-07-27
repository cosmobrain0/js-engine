# js-engine
A basic work-in-progress 2D pure JS Game Engine.  
# Contents
[Basic Usage](#basic-usage)  
[Event Handling](#event-handling)  
[Time](#time)  
[Planned Updates](#planned-updates)  

# Basic Usage
include all files in `engine` in your `index.html` before any other code, like so:
```html
<script src="js/engine/matter.js"></script>
<script src="js/engine/vector.js"></script>
<script src="js/engine/helper-functions.js"></script>
<script src="js/engine/ui.js"></script>
<script src="js/engine/setup.js"></script>
<script src="js/engine/globals.js"></script>
```
the files outside of `engine` are not required.
redefine the functions `init`, `calc` and `draw` to suit your needs. `init` is run once when the page has loaded (resources like audio and images may not be ready yet. A future update will deal with resource loading.) `calc` is run once every frame (while the game is not paused), and `draw` is run *at least* once every frame. Right now, `draw` is always called once every frame after `calc`, but in future updates `draw` may be called multiple times between `calc` or before `calc`, at any point in time.  
> Note: `init`, `calc` and `draw` have already been declared, so you can't use `let` or a `function` statement to redefine them.
> Use *arrow function syntax* instead (e.g. `init = () => { /* function body here */ }`)

`init` is intended to set the inital game state and event handlers. `calc` is intended to update the game state. `draw` is intended to only *draw to the screen*. **Don't update the game state at all in `draw`**, as future versions of this engine may not allow that.  

# Event Handling
Use the global `events` object to handle events. It has multiple properties:
* mousemove
* mousedown
* mouseup
* keydown
* keyup
* wheel
which are all arrays of callback functions (`Function[]`) Modify these arrays however you like, whenever you like. When an event is triggered, every function in the relevant array of callback functions (e.g. `events.mousemove` for a `mousemove` event) is called and given relevant data. In a future update, they will be given *all* function data, and touch-based events will also be added.

# Time
> Note: This documentation is incomplete

# Planned Updates
* Event handling functions should be given all event info
* touch based event handlers
* Level / Scene system and transition system
