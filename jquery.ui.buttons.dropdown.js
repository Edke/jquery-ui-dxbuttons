/*!
 * DatagridToolbarDropdown v.1.0.0
 * Copyright 2010, Eduard Kracmar
 */

(function( $ ){

    var methods = {
        init : function( list ) {
            return this.each(function(){

                function initialization() {

                    $this.after(container);
                    $this.button({
                        icons: {
                            secondary: "ui-icon-triangle-1-s"
                        }
                    }).click(function(event){

                        container.toggle();
                        return false;
                    }).css('z-index', 2).mouseover(function(event){

                            cointainer.show();

                    });

                    var maxWidth = $this.width();

                    for ( var indx in list) {
                        var outer = $('<div></div>');
                        list[indx].mouseover(function(event){
                            container.show();
                        });
                        maxWidth = (list[indx].outerWidth(true) > maxWidth) ? list[indx].outerWidth(true) : maxWidth;
                        outer.append(list[indx]).mouseover(function(event){
                            container.show();
                        });
                        container.find('.inner').append(outer);
                    }
                    
                    container.css('width', maxWidth + 'px').hide().position({
                        "my": "left top",
                        "at": "left bottom",
                        "collision": "none",
                        "of": $this,
                        "offset": "0 -3"
                    }).mouseout(function(event){
                        container.hide();
                    });

                    
                    
                }

                /*




                $('#toggler').click(function(){
                    $('#main input').each(function(){
                        if( $(this).button('option', 'disabled') ) {
                            $(this).button('option', 'disabled', false);
                        } else {
                            $(this).button('option', 'disabled', true);
                        }
                    });

                    $('input[name=sar]').each(function(){
                        if( $(this).button('option', 'disabled') ) {
                            $(this).button('option', 'disabled', false);
                        } else {
                            $(this).button('option', 'disabled', true);
                        }
                    });

                    return false;
                })



                $('#other').button({
                    icons: {
                        secondary: "ui-icon-triangle-1-s"
                    }
                }).click(function(){
                    
                    return false;
                }).mouseover(function(){


                });


                $('span#main input').button('option', 'disabled', true);

                $("#dropdown").each(function(){

                    var dropdown = $(this);

                    dropdown.children().mouseover(function(){
                        dropdown.show();
                    });

                    if ( dropdown.width() < $('#other').width() ) {
                        dropdown.css('width', $('#other').css('width'));
                    }

                    dropdown.hide().position({
                        "my": "left top",
                        "at": "left bottom",
                        "of": "#other",
                        "collision": "none"
                    });

                    dropdown.mouseout(function(){
                        dropdown.hide();
                    });
                });
                */

                // setting defaults
                var $this = $(this),
                container = $('<div class="dropdown"><div class="inner"></div></div>');

                initialization();

            });
        }
    };

    $.fn.datagridToolbarDropdown = function( method ) {

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
