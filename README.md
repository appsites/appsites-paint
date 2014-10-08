# Appsites Paint
Portable DOM module for importing and exporting themes to Appsites.

### Node

    npm install appsites-paint
    
    var paint = require("appsites-paint");
    paint.css(theme);
    
### DOM

    bower install appsites-paint
    
    var paint = new paint(jQuery);
    paint.dom("header", "bgColor", "#000000");