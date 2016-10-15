function emt(optionsObject) {
    var TOUCH_CLICK = '___@@@emt_click_isTouch';
    var TOUCH_HOVER = '___@@@emt_hover_isTouch';

    function log(str) {
        if (loggingEnabled) {
            var body = $(document.body);
            console.log(str);
            body.append(str + '<br>');
        }
    }

    function touchStartHook(collection) {
        collection.on('touchstart', function() {
            $(this).data(TOUCH_CLICK, true);
            $(this).data(TOUCH_HOVER, true);
        });
    }

    function configureClick(collection, options) {
        collection.on('click', function(event) {
            var props;
            if ($(this).data(TOUCH_CLICK)) {
                log('Touch click detected ');
                props = options.touchOptions;
            } else {
                log('Mouse click detected');
                props = options.mouseOptions;
            }

            if (props) {
                if (props.handler) {
                    log('Calling click handler');
                    props.handler(event);
                }                 
            }

            $(this).data(TOUCH_CLICK, false);
        });
    }


    function configureHover(collection, options) {
        collection.on('mouseenter', function(event) {
            var props;
            if ($(this).data(TOUCH_HOVER)) {
                log('Touch hover detected');
                props = options.touchOptions;
            } else {
                log('Mouse hover detected');
                props = options.mouseOptions;
            }

            if (props) {
                if (props.startHandler) {
                    log('Calling hover start handler');
                    props.startHandler(event);
                }

                if (props.hoverClass) {
                    log('Adding hover class: ' + props.hoverClass);
                    $(this).addClass(props.hoverClass);
                }                    
            }
        });

        collection.on('mouseleave', function(event) {
            var props;
            if ($(this).data(TOUCH_HOVER)) {
                props = options.touchOptions;
            } else {
                props = options.mouseOptions;
            }

            if (props) {
                if (props.endHandler) {
                    log('Calling hover end handler');
                    props.endHandler(event);
                }

                if (props.hoverClass) {
                    log('Removing hover class: ' + props.hoverClass);
                    $(this).removeClass(props.hoverClass);
                }                    
            }

            $(this).data(TOUCH_HOVER, false);
        });
    }

    var options = optionsObject || {};
    var collection = $(options.jQueryCollection);
    var clickOptions = options.clickOptions || {};
    var hoverOptions = options.hoverOptions || {};
    var loggingEnabled = options.loggingEnabled;
    touchStartHook(collection);
    configureClick(collection, clickOptions);
    configureHover(collection, hoverOptions);
}
