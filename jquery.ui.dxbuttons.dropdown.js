/*!
 * DxButtonsDropdown v.1.0.0
 * Copyright 2010, Eduard Kracmar
 */

(function( $ ){

    var methods = {
        init : function( list ) {
            return this.each(function(){

                function initialization() {

		    clickOut.click(function(event){
			container.hide();
			clickOut.hide();
		    });

                    $this.after(container);
                    $this.button({
                        icons: {
                            secondary: "ui-icon-triangle-1-s"
                        }
                    }).click(function(event){
                        container.toggle();
			if ( container.is(':visible')) {
			    clickOut.show();
			}
                        return false;
                    }).css('z-index', 100);

                    var maxWidth = $this.width();

                    for ( var indx in list) {
                        var outer = $('<div></div>');
                        maxWidth = (list[indx].outerWidth(true) > maxWidth) ? list[indx].outerWidth(true) : maxWidth;
                        outer.append(list[indx]);
                        container.find('.inner').append(outer);
                    }
                    
                    container.css('width', maxWidth + 'px').css('z-index', 99).hide().position({
                        "my": "left top",
                        "at": "left bottom",
                        "collision": "none",
                        "of": $this,
                        "offset": "0 -3"
                    });
                }

                // setting defaults
                var $this = $(this),
                container = $('<div class="dropdown"><div class="inner"></div></div>'),
		clickOut = $('#clickout');

                initialization();
            });
        }
    };

    $.fn.dxButtonsDropdown = function( method ) {

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
