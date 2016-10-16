#EMT.js

Easy Mouse & Touch Handling for Web Sites


##What is it?

EMT.js is a JavaScript helper library that allows you to easily toggle CSS classes and run code based on whether incoming click and hover events are coming from the mouse or via touch. Requires jQuery.


##How is it used?

###Download `emt.js` and reference it in your HTML after jQuery:
```
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="emt.js"></script>
```

###Call the `emt` function, passing in an `optionsObject`:
```
emt({});
```

The `optionsObject` should contain options, but `emt` will gladly accept an empty object without complaining. It's easy-going like that.

For a more realistic example, let's assume you want a CSS class called `mouse-hover` to be added to anchor tags when the mouse hovers over them. But that's not all... you also want a class called `touch-hover` to be added to anchor tags when a touchscreen user triggers a hover event on them (i.e., touching an anchor tag but then not touching anything else). The following call to `emt` gets the job done:

```
emt({
    target: 'a',
    hover: {
        mouse: {
            cssClass: 'mouse-hover'
        },
        touch: {
            cssClass: 'touch-hover'
        }
    }
});
```

Here's a complete example that shows all of the options that the `optionsObject` currently supports. Of course, your event handlers will be so much more useful than these:
```
emt({
    target: 'a',
    click: {
        mouse: {
            handler: function(event) { console.log('Mouse click YAY!', this); }
        },
        touch: {
            handler: function(event) { console.log('Touch click YAY!', this); }
        }
    },
    hover: {
        mouse: {
            cssClass: 'mouse-hover',
            startHandler: function(event) { console.log('Mouse hover started!', this); },
            endHandler: function(event) { console.log('Mouse hover ended!', this); }
        },
        touch: {
            cssClass: 'touch-hover',
            startHandler: function(event) { console.log('Touch hover started!', this); },
            endHandler: function(event) { console.log('Touch hover ended!', this); }
        }
    },
    logging: true,
});
```

##`optionsObject` Argument Descriptions

- **`target`**: Defines the target(s) that will have your options applied. Accepts anything that the `jQuery` function accepts (which includes other jQuery objects).
- **`click`**: Contains `mouse` and `touch` objects that define desired behavior for click activity.
- **`hover`**: Contains `mouse` and `touch` objects that define desired behavior for hover activity.
- **`mouse`**: Contains properties that define desired behavior for mouse click or mouse hover activity, depending on the parent object it is in.
- **`touch`**: Contains properties that define desired behavior for touch click or touch hover activity, depending on the parent object it is in.
- **`handler`**: Handler function for mouse click or touch click, depending on the parent object it is in.
- **`cssClass`**: String that defines the CSS class to toggle when a mouse hover or touch hover event occurs, depending on the parent object it is in.
- **`startHandler`**: Handler function for the beginning of a mouse hover or touch hover, depending on the parent object it is in.
- **`endHandler`**: Handler function for the end of a mouse hover or touch hover, depending on the parent object it is in.
- **`consoleLogging`**: A boolean that determines whether logging information will be sent to the console.
- **`bodyLogging`**: A boolean that determines whether logging information will be appended to the `body` element.
