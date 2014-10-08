// Paint
// ----
// Module for importing and exporting Appsites themes. Methods for painting a theme to the DOM
// and exporting a theme to CSS.

var paint = function(jQuery){
  this.jQuery = jQuery;
  this.config = {};
  return this;
};

// paint.properties
// Map of theme properties to CSS properties and formatting methods.

paint.prototype.properties = [
  { property: "image",            use:  "image"                               },
  { property: "text",             use:  "text"                                },
  { property: "bgEffectsOpacity", use:  "eopacity"                            },
  { property: "bgEffectsColor",   use:  "ecolor"                              },
  { property: "marginTop",        use:  "px",        css: "margin-top"        },
  { property: "marginBottom",     use:  "px",        css: "margin-bottom"     },
  { property: "marginRight",      use:  "px",        css: "margin-right"      },
  { property: "marginLeft",       use:  "px",        css: "margin-left"       },
  { property: "bgImage",          use:  "bgimage",   css: "background-image"  },
  { property: "bgPattern",        use:  "bgpattern", css: "background-image"  },
  { property: "bgImageRepeat",    use:  "value",     css: "background-repeat" },
  { property: "bgImageSize",      use:  "value",     css: "background-size"   },
  { property: "bgColor",          use:  "hex",       css: "background-color"  },
  { property: "textStrong",       use:  "weight",    css: "font-weight"       },
  { property: "textItalic",       use:  "italic",    css: "font-style"        },
  { property: "textUnderline",    use:  "underline", css: "text-decoration"   },
  { property: "textAlign",        use:  "value",     css: "text-align"        },
  { property: "textFont",         use:  "value",     css: "font-family"       },
  { property: "textSize",         use:  "px",        css: "font-size"         },
  { property: "textHeight",       use:  "px",        css: "line-height"       },
  { property: "textColor",        use:  "hex",       css: "color"             },
  { property: "textShadow",       use:  "shadow",    css: "text-shadow"       }
];

// paint.dom()
// Accepts a theme element, a property, and a value and uses jQuery to apply given propertis to the DOM.

paint.prototype.dom = function(e,k,v){
  if(this.jQuery){
    var match = _.find(this.properties, function(o){
      return (k == o.property ? o : false);
    });
    if(match && match.use && typeof this[match.use] == "function" && match.css){
      var value = this[match.use](v);
      if(value){
        return this.jQuery('[swyg="' + e + '"]').css(match.css, value);
      }
    }
    else if(match && match.use == "image"){
      return this.jQuery('[swyg="' + e + '"] swyg-template-image').html('<img src="' + v + '" />');
    }
    else if(match && match.use == "text"){
      return this.jQuery('[swyg="' + e + '"] swyg-template-text').html(v);
    }
    else if(match && match.use == "ecolor"){
      return this.jQuery('[swyg="' + e + '"] [swyg-overlay]').css('background-color', this.hex(v));
    }
    else if(match && match.use == "eopacity"){
      return this.jQuery('[swyg="' + e + '"] [swyg-overlay]').css('opacity', this.decimal(v));
    }
  }
  else {
    return false;
  }
};

// paint.css()
// Exports a theme to raw CSS.

paint.prototype.css = function(){

};

// paint.value()
// Default value format.

paint.prototype.value = function(value){
  return value;
};

// paint.px()
// Formats a value with pixels.

paint.prototype.px = function(value){
  return new String(value).replace("px", "") + "px";
};

// paint.italic()
// Converts boolean italic format to italic or normal values.

paint.prototype.italic = function(value){
  return (value == "true" ? "italic" : "normal");
};

// paint.underline()
// Converts boolean underline formats to underline or none.

paint.prototype.underline = function(value){
  return (value == "true" ? "underline": "none");
};

// paint.hex()
// Ensures that hex values are prefixed with a hash.

paint.prototype.hex = function(value){
  return "#" + value.replace("#", "");
};

// paint.bgimage()
// Returns a background image URL format or none.

paint.prototype.bgimage = function(value){
  return (!value || value == "false" ? "none" : "url(" + value + ")");
};

// paint.bgpattern()
// Returns a background pattern.

paint.prototype.bgpattern = function(value){
  return (!value || value == "false" ? false : "url(" + value + ")");
};

// paint.decimal()
// Converts percentage value to a decimal.

paint.prototype.decimal = function(value){
  if(value){
    return "." + (value / 10);
  }
  return 0;
};

// paint.weight()
// Converts boolean weight (or number) values for font-weight.

paint.prototype.weight = function(value){
  if(value == "true"){
    return "bold";
  }
  else if(value == "false"){
    return "normal";
  }
  else {
    return value;
  }
};

// paint.shadow()
// Returns CSS shadow values from light/dark keywods.

paint.prototype.shadow = function(value){
  if(value == "light"){
    return "1px 1px 1px #FFF";
  }
  else if(value == "dark"){
    return "1px 1px 1px #000";
  }
  else {
    return "none";
  }
};


try {
  module.exports = function(){
    return new paint();
  };
}
catch(e){};
