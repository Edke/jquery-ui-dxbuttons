/*!
 * DxButtons v.1.0.0
 * Copyright 2010, Eduard Kracmar
 */

(function( $ ){

    var methods = {
        init : function( options ) {
            return this.each(function(){
		
                function clickOutUpdate() {
                    clickOut.width($(window).width()).height($(window).height()).css('z-index', 98);
                }

                // initialization
                function initialization() {

                    // all inputs and buttons
                    $this.find('input[type=submit], button').each(function(){

                        var $this = $(this);

                        // create UI button
                        $this.button().css('z-index', 99);

                        // create sets collection
                        var set = $this.attr('buttonset');
                        if ( set ) {
                            if ( !setsArry[set]) {
                                setsArry[set] = [];
                            }
                            setsArry[set].push($this);
                        }

                        // create dropdowns collection
                        var dropdown = $this.attr('dropdown');
                        if ( dropdown != undefined ) {
                            if ( !dropdownsArry[dropdown]) {
                                dropdownsArry[dropdown] = {
                                    master : null,
                                    list : []
                                };
                            }

                            if ( dropdown == $this.attr('name')  ) {
                                var button= $('<button type="button">'+$this.attr('value')+'</button>');
                                button.attr('name', $this.attr('name'));
                                button.attr('dropdown', dropdown);

                                $this.after(button);
                                button.button();
                                $this.remove();
                                dropdownsArry[dropdown].master = button;
                            } else {
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
                clickOutUpdate();
                clickOut.hide();

                // on window resize update clickOut
                $(window).resize(function() {
                    clickOutUpdate();
                });

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
