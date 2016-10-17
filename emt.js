function emt(optionsObject) {
    var TOUCH_CLICK = '___github.com/richgieg/emt/___TOUCH_CLICK';
    var TOUCH_HOVER = '___github.com/richgieg/emt/___TOUCH_HOVER';
    var COORDINATES_KEY = '___github.com/richgieg/emt/___COORDINATES_KEY';
    var log;
    var ignoreAnchorOnce;

    function getLogFunction(options) {
        var body = $(document.body);

        if (options.consoleLogging || options.bodyLogging) {
            return function(str) {
                if (options.consoleLogging) {
                    console.log(str);
                }

                if (options.bodyLogging) {
                    body.append(str + '<br>');
                }
            }
        } else {
            return function() {}
        }
    }

    function touchStartHook(target) {
        target.on('touchstart', function() {
            $(this).data(TOUCH_CLICK, true);
            $(this).data(TOUCH_HOVER, true);
        });
    }

    function configureClick(target, options) {
        target.click(function(event) {
            var props;
            var suppressAnchor = false;

            if ($(this).data(TOUCH_CLICK)) {
                log('Touch click detected');
                props = options.touch || {};
                if (ignoreAnchorOnce && $(this).is('a')) {
                    var mouseenterCoords = $(this).data(COORDINATES_KEY);
                    var clickCoords = { x: event.clientX, y: event.clientY };
                    var coordsAreEqual = (mouseenterCoords.x == clickCoords.x &&
                        mouseenterCoords.y == clickCoords.y);

                    if (coordsAreEqual) {
                        $(this).data(COORDINATES_KEY, { x: -1, y: -1 });
                        suppressAnchor = true;
                    }
                }
            } else {
                log('Mouse click detected');
                props = options.mouse || {};
            }

            if (props.handler) {
                log('Calling click handler');
                props.handler.call(this, event);
            }

            if (suppressAnchor) {
                event.stopPropagation();
                event.preventDefault();
            }

            $(this).data(TOUCH_CLICK, false);
        });
    }

    function configureHover(target, options) {
        target.mouseenter(function(event) {
            var props;
            var triggerClick = false;

            if ($(this).data(TOUCH_HOVER)) {
                props = options.touch || {};
                log('Touch hover detected');
                if (ignoreAnchorOnce && $(this).is('a')) {
                    $(this).data(COORDINATES_KEY, { x: event.clientX, y: event.clientY });
                }
            } else {
                log('Mouse hover detected');
                props = options.mouse || {};
            }

            if (props.startHandler) {
                log('Calling hover start handler');
                props.startHandler.call(this, event);
            }

            if (props.cssClass) {
                log('Adding hover class: ' + props.cssClass);
                $(this).addClass(props.cssClass);
            }
        });

        target.mouseleave(function(event) {
            var props;

            if ($(this).data(TOUCH_HOVER)) {
                props = options.touch || {};
            } else {
                props = options.mouse || {};
            }

            if (props.endHandler) {
                log('Calling hover end handler');
                props.endHandler.call(this, event);
            }

            if (props.cssClass) {
                log('Removing hover class: ' + props.cssClass);
                $(this).removeClass(props.cssClass);
            }

            $(this).data(TOUCH_HOVER, false);
        });
    }

    function main(options) {
        var target = $(options.target);
        var clickOptions = options.click || {};
        var hoverOptions = options.hover || {};
        var clickTouchOptions = clickOptions.touch || {};

        ignoreAnchorOnce = clickTouchOptions.ignoreAnchorOnce;
        log = getLogFunction(options);
        touchStartHook(target);
        configureClick(target, clickOptions);
        configureHover(target, hoverOptions);
    }

    main(optionsObject || {});
}
