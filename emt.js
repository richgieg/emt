function emt(optionsObject) {
    var TOUCH_CLICK = '___github.com/richgieg/emt/___click_isTouch';
    var TOUCH_HOVER = '___github.com/richgieg/emt/___hover_isTouch';
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

    function touchStartHook(target) {
        target.on('touchstart', function() {
            $(this).data(TOUCH_CLICK, true);
            $(this).data(TOUCH_HOVER, true);
        });
    }

    function configureClick(target, options) {
        target.on('click', function(event) {
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

    function configureHover(target, options) {
        target.on('mouseenter', function(event) {
            var props;
            if ($(this).data(TOUCH_HOVER)) {
                log('Touch hover detected');
                props = options.touch;
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
        });

        target.on('mouseleave', function(event) {
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
