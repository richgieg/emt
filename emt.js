function emt(optionsObject) {
    function log(str) {
        if (loggingEnabled) {
            var body = $(document.body);
            console.log(str);
            body.append(str + '<br>');
        }
    }

    function configureClick(collection, options) {
        var key = '___@@@emt_click_isTouch';

        collection.on('touchstart', function() {
            $(this).data(key, true);
        });

        collection.on('click', function(event) {
            var props;
            if ($(this).data(key)) {
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

            $(this).data(key, false);
        });
    }

    function configureHover(collection, options) {
        var key = '___@@@emt_hover_isTouch';

        collection.on('touchstart', function() {
            $(this).data(key, true);
        });

        collection.on('mouseenter', function(event) {
            var props;
            if ($(this).data(key)) {
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
            if ($(this).data(key)) {
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

            $(this).data(key, false);
        });
    }

    var options = optionsObject || {};
    var collection = $(options.jQueryCollection);
    var clickOptions = options.clickOptions || {};
    var hoverOptions = options.hoverOptions || {};
    var loggingEnabled = options.loggingEnabled;
    configureClick(collection, clickOptions);
    configureHover(collection, hoverOptions);
}
