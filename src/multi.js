/**
 * multi.js
 * A user-friendly replacement for select boxes with multiple attribute enabled.
 * Requires jQuery.
 *
 * Author: Fabian Lindfors
 * License: MIT
 */
(function($) {

    function refresh_select( $select, settings ) {

        // Clear columns
        $select.wrapper.selected.html('');
        $select.wrapper.non_selected.html('');

        // Get search value
        if ( $select.wrapper.search ) {
            var query = $select.wrapper.search.val();
        }

        var options = [];

        // Find all select options
        $select.find( 'option' ).each( function() {
            var $option = $(this);

            var value = $option.prop('value');
            var label = $option.text();
            var selected = $option.is(':selected');

            options.push({
                value: value,
                label: label,
                selected: selected,
                element: $option,
            });
        });

        // Loop over select options and add to the non-selected and selected columns
        options.forEach(function(option) {
            var $row = $('<a tabindex="0" role="button" class="item"></a>').text(option.label).data('value', option.value);

            // Create clone of row and add to the selected column
            if ( option.selected ) {
                $row.addClass('selected');
                var $clone = $row.clone();

                // Add click handler to mark row as non-selected
                $clone.click(function() {
                    option.element.prop('selected', false);
                    $select.change();
                });

                // Add key handler to mark row as selected and make the control accessible
                $clone.keypress(function() {
                    if (event.keyCode === 32 || event.keyCode === 13) {
                    // Prevent the default action to stop scrolling when space is pressed
                    event.preventDefault();
                    option.element.prop('selected', false);
                    $select.change();
                    }
                });

                $select.wrapper.selected.append($clone);
            }

            // Add click handler to mark row as selected
            $row.click(function() {
                option.element.prop('selected', 'selected');
                $select.change();
            });

            // Add key handler to mark row as selected and make the control accessible
            $row.keypress(function() {
                if (event.keyCode === 32 || event.keyCode === 13) {
                  // Prevent the default action to stop scrolling when space is pressed
                  event.preventDefault();
                  option.element.prop('selected', 'selected');
                  $select.change();
                }
            });

            // Apply search filtering
            if ( query && query != '' && option.label.toLowerCase().indexOf( query.toLowerCase() ) === -1 ) {
                return;
            }

            $select.wrapper.non_selected.append($row);

        });

    }


    $.fn.multi = function( options ) {

        var settings = $.extend({
            'enable_search': true,
            'search_placeholder': 'Search...',
        }, options);


        return this.each( function() {

            var $select = $(this);

            // Check if already initalized
            if ( $select.data('multijs') ) {
                return;
            }

            // Make sure multiple is enabled
            if ( ! $select.prop('multiple') ) {
                return;
            }

            // Hide select
            $select.css('display','none');
            $select.data('multijs', true);

            // Start constructing selector
            var $wrapper = $('<div class="multi-wrapper">');

            // Add search bar
            if ( settings.enable_search ) {
                var $search = $('<input class="search-input" type="text" />').prop('placeholder', settings.search_placeholder);

                $search.on('input change keyup',function() {
                    refresh_select( $select, settings );
                })

                $wrapper.append( $search );
                $wrapper.search = $search;
            }

            // Add columns for selected and non-selected
            var $non_selected = $('<div class="non-selected-wrapper">');
            var $selected = $('<div class="selected-wrapper">');

            $wrapper.append( $non_selected );
            $wrapper.append( $selected );

            $wrapper.non_selected = $non_selected;
            $wrapper.selected = $selected;

            $select.wrapper = $wrapper;

            // Add multi.js wrapper after select element
            $select.after( $wrapper );

            // Initialize selector with values from select element
            refresh_select( $select, settings );

            // Refresh selector when select values change
            $select.change(function() {
                refresh_select( $select, settings );
            });

        });

    }

})(jQuery);
