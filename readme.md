#EMT.js

Easy Mouse & Touch Handling for Web Sites


##What is it?

EMT.js is a JavaScript helper library that allows you to easily toggle CSS classes and run code based on whether incoming click and hover events are coming from the mouse or via touch. jQuery is required.


##How is it used?

####Download `emt.js` and reference it in your HTML after jQuery:
```
<script src="http://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script src="emt.js"></script>
```

Call the `emt` function, passing in an `optionsObject`:
```
emt({});
```

The `optionsObject` should contain options, but `emt` will gladly accept an empty object without complaining. It's easy-going like that.

For a more realistic example, let's assume you want a CSS class called `mouse-hover` to be added to anchor tags when the mouse hovers over them. But that's not all... you also want a class called `touch-hover` to be added to anchor tags when a touchscreen user triggers a hover event on them (i.e., touching an anchor tag but then not touching anything else). The following call to `emt` gets the job done:

```
emt({
  jQueryCollection: $('a'),
  hoverOptions: {
    mouseOptions: {
      hoverClass: 'mouse-hover'
    },
    touchOptions: {
      hoverClass: 'touch-hover'
    }
  }
});
```

Here's a complete example that shows all of the options that the `optionsObject` currently supports. Of course, your event handlers will be so much more useful than these:
```
emt({
    jQueryCollection: $('a'),
    clickOptions: {
        mouseOptions: {
            handler: function(event) { console.log('Mouse click YAY!', event); }
        },
        touchOptions: {
            handler: function(event) { console.log('Touch click YAY!', event); }
        }
    },
    hoverOptions: {
        mouseOptions: {
            hoverClass: 'mouse-hover',
            startHandler: function(event) { console.log('Mouse hover started!', event); },
            endHandler: function(event) { console.log('Mouse hover ended!', event); }
        },
        touchOptions: {
            hoverClass: 'touch-hover',
            startHandler: function(event) { console.log('Touch hover started!', event); },
            endHandler: function(event) { console.log('Touch hover ended!', event); }
        }
    },
    loggingEnabled: true,
});
```

