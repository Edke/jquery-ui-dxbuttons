/*!
 * DatagridToolbar v.1.0.0
 * Copyright 2010, Eduard Kracmar
 */

(function( $ ){

    var methods = {
	init : function( options ) {
	    return this.each(function(){

		// initialization
		function initialization() {

		    // all inputs and buttons
		    $this.find('input[type=submit], button').each(function(){

			var $this = $(this);

			// create UI button
			$this.button().css('z-index', 99);

			// create sets collection
			var set = $this.attr('set');
			if ( set ) {
			    if ( !setsArry[set]) {
				setsArry[set] = [];
			    }
			    setsArry[set].push($this);
			}

			// create dropdowns collection
			var dropdown = $this.attr('dropdown');
			if ( dropdown ) {
			    if ( !dropdownsArry[dropdown]) {
				dropdownsArry[dropdown] = {
				    master : null,
				    list : []
				};
			    }

			    if ( this.tagName == 'BUTTON') {
				dropdownsArry[dropdown].master = $this;
			    } else if ( this.tagName == 'INPUT') {
				dropdownsArry[dropdown].list.push($this);
			    }
			}
		    });

		    // build buttonsets
		    for (var set in setsArry ) {
			var pointer = false;

			for (var setIndx in setsArry[set]) {
			    var button = setsArry[set][setIndx];

			    if ( setIndx == 0) {
				pointer = button;
				var container = $('<span></span>');
				button.after(container);
			    }
			    container.append(button);
			}
			if (pointer) {
			    container.buttonset();
			}
		    }

		    // build dropdowns
		    for (var dropdown in dropdownsArry) {
			dropdownsArry[dropdown].master.dxButtonsDropdown(dropdownsArry[dropdown].list );
		    }
		}


		// plugin settings
		var settings = {
		};

		// extending settings with options
		if ( options ) {
		    $.extend( settings, options );
		}

		// setting defaults
		var $this = $(this),
		setsArry = [],
		dropdownsArry = [];

		// clickout overlay
		var clickOut = $('#clickout');
		if ( !clickOut.length ) {
		    clickOut = $('<div id="clickout"></div>');
		    $('body').append(clickOut);
		}
		clickOut.width($(window).width()).height($(window).height()).css('z-index', 98).hide();

		// initianization
		initialization();
	    });
	}
    };

    $.fn.dxButtons = function( method ) {

	// Method calling logic
	if ( methods[method] ) {
	    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
	    return methods.init.apply( this, arguments );
	} else {
	    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	}
    };

})( jQuery );
