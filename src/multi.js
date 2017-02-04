/**
 * multi.js
 * A user-friendly replacement for select boxes with multiple attribute enabled.
 *
 * Author: Fabian Lindfors
 * License: MIT
 */
var multi = (function() {

    // Helper function to trigger an event on an element
    var trigger_event = function( type, el ) {
        var e = document.createEvent( 'HTMLEvents' );
        e.initEvent( type, false, true );
        el.dispatchEvent( e );
    };


    // Refreshes an already constructed multi.js instance
    var refresh_select = function( select, settings ) {

        // Clear columns
        select.wrapper.selected.innerHTML = '';
        select.wrapper.non_selected.innerHTML = '';

        // Get search value
        if ( select.wrapper.search ) {
            var query = select.wrapper.search.value;
        }

        // Loop over select options and add to the non-selected and selected columns
        for ( var i = 0; i < select.options.length; i++ ) {

            // We wrap our code in a immediately invoked function to get a new scope for our variables
            // Without this the event handlers wouldn't work as option would be overriden each iteration
            (function() {

                var option = select.options[i];

                var value = option.value;
                var label = option.textContent || option.innerText;

                var row = document.createElement( 'a' );
                row.tabIndex = 0;
                row.className = 'item';
                row.innerHTML = label;
                row.setAttribute( 'role', 'button' );
                row.setAttribute( 'data-value', value );

                // Add row to selected column if option selected
                if ( option.selected ) {

                    row.className += ' selected';
                    var clone = row.cloneNode( true );

                    // Add click handler to mark option as not selected
                    clone.addEventListener( 'click', function() {
                        option.selected = false;
                        trigger_event( 'change', select );
                    });

                    // Add keyboard handler to mark option as not selected
                    clone.addEventListener( 'keypress', function(event) {
                        if (event.keyCode === 32 || event.keyCode === 13) {
                            // Prevent the default action to stop scrolling when space is pressed
                            event.preventDefault();

                            option.selected = false;
                            trigger_event( 'change', select );
                        }
                    });

                    select.wrapper.selected.appendChild( clone );

                }

                // Apply search filtering
                if ( query && query != '' && label.toLowerCase().indexOf( query.toLowerCase() ) === -1 ) {
                    return;
                }

                // Add click handler to mark option as selected
                row.addEventListener( 'click', function() {
                    option.selected = true;
                    trigger_event( 'change', select );
                });

                // Add keyboard handler to mark option as selected
                row.addEventListener( 'keypress', function(event) {
                    if (event.keyCode === 32 || event.keyCode === 13) {
                        // Prevent the default action to stop scrolling when space is pressed
                        event.preventDefault();

                        option.selected = true;
                        trigger_event( 'change', select );
                    }
                });

                select.wrapper.non_selected.appendChild( row );

            })();

        }

    };


    // Intializes and constructs an multi.js instance
    var init = function( select, settings ) {

        /**
         * Set up settings (optional parameter) and its default values
         *
         * Default values:
         * enable_search : true
         * search_placeholder : 'Search...'
         */
        settings = typeof settings !== 'undefined' ? settings : {};

        settings['enable_search'] = typeof settings['enable_search'] !== 'undefined' ? settings['enable_search'] : true;
        settings['search_placeholder'] = typeof settings['search_placeholder'] !== 'undefined' ? settings['search_placeholder'] : 'Search...';


        // Check if already initalized
        if ( select.dataset.multijs != null ) {
            console.log('Already init');
            return;
        }

        // Make sure element is select and multiple is enabled
        if ( select.nodeName != 'SELECT' || ! select.multiple ) {
            return;
        }

        // Hide select
        select.style.display = 'none';
        select.setAttribute( 'data-multijs', true );

        // Start constructing selector
        var wrapper = document.createElement( 'div' );
        wrapper.className = 'multi-wrapper';


        // Add search bar
        if ( settings.enable_search ) {
            var search = document.createElement( 'input' );
            search.className = 'search-input';
            search.type = 'text';
            search.setAttribute( 'placeholder', settings.search_placeholder );

            search.addEventListener( 'input', function() {
                refresh_select( select, settings );
            });

            wrapper.appendChild( search );
            wrapper.search = search;
        }

        // Add columns for selected and non-selected
        var non_selected = document.createElement( 'div' );
        non_selected.className = 'non-selected-wrapper';

        var selected = document.createElement( 'div' );
        selected.className = 'selected-wrapper';

        wrapper.appendChild( non_selected );
        wrapper.appendChild( selected );

        wrapper.non_selected = non_selected;
        wrapper.selected = selected;

        select.wrapper = wrapper;

        // Add multi.js wrapper after select element
        select.parentNode.insertBefore( wrapper, select.nextSibling );

        // Initialize selector with values from select element
        refresh_select( select, settings );

        // Refresh selector when select values change
        select.addEventListener( 'change', function() {
            refresh_select( select, settings );
        });

    };


    return init;

}());


// Add jQuery wrapper if jQuery is present
if ( typeof jQuery !== 'undefined' ) {
    (function($) {

        $.fn.multi = function( settings ) {

            settings = typeof settings !== 'undefined' ? settings : {};

            return this.each( function() {

                var $select = $(this);

                multi( $select.get(0), settings );

            });

        }

    })(jQuery);
}
