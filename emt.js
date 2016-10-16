function emt(optionsObject) {
    var TOUCH_CLICK = '___github.com/richgieg/emt/___TOUCH_CLICK';
    var TOUCH_HOVER = '___github.com/richgieg/emt/___TOUCH_HOVER';
    var log;

    function getLogFunction(loggingEnabled) {
        if (loggingEnabled) {
            var body = $(document.body);

            return function(str) {
                console.log(str);
                body.append(str + '<br>');
            }
        } else {
            return function() {}
        }
    }

    function is_iOSDevice() {
        var device = navigator.userAgent.toLowerCase();
        return device.match(/(iphone|ipod|ipad)/) !== null;
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

            if ($(this).data(TOUCH_CLICK)) {
                log('Touch click detected');
                props = options.touch;
            } else {
                log('Mouse click detected');
                props = options.mouse;
            }

            if (props) {
                if (props.handler) {
                    log('Calling click handler');
                    props.handler.call(this, event);
                }                 
            }

            $(this).data(TOUCH_CLICK, false);
        });
    }

    function configureHover(target, options, iosDevice) {
        var is_iOS = is_iOSDevice();

        if (is_iOS) {
            log('iOS device detected');
        }

        target.mouseenter(function(event) {
            var props;
            var triggerClick = false;

            if ($(this).data(TOUCH_HOVER)) {
                log('Touch hover detected');
                props = options.touch;
                if (is_iOS) {
                    triggerClick = true;
                }
            } else {
                log('Mouse hover detected');
                props = options.mouse;
            }

            if (props) {
                if (props.startHandler) {
                    log('Calling hover start handler');
                    props.startHandler.call(this, event);
                }

                if (props.cssClass) {
                    log('Adding hover class: ' + props.cssClass);
                    $(this).addClass(props.cssClass);
                }                    
            }

            if (triggerClick) {
                log('Triggering click to compensate for iOS behavior');
                $(this).click();
            }
        });

        target.mouseleave(function(event) {
            var props;

            if ($(this).data(TOUCH_HOVER)) {
                props = options.touch;
            } else {
                props = options.mouse;
            }

            if (props) {
                if (props.endHandler) {
                    log('Calling hover end handler');
                    props.endHandler.call(this, event);
                }

                if (props.cssClass) {
                    log('Removing hover class: ' + props.cssClass);
                    $(this).removeClass(props.cssClass);
                }                    
            }

            $(this).data(TOUCH_HOVER, false);
        });
    }

    function main(options) {
        var target = $(options.target);
        var clickOptions = options.click || {};
        var hoverOptions = options.hover || {};

        log = getLogFunction(options.logging);
        touchStartHook(target);
        configureClick(target, clickOptions);
        configureHover(target, hoverOptions);
    }

    main(optionsObject || {});
}
