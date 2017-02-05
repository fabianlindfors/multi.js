multi.js
=======

multi.js is a user-friendly replacement for select boxes with the multiple attribute. It has no dependencies, is mobile-friendly, and provides search functionality. multi.js is also easy to style with CSS and optionally supports jQuery.

Check out the [demo](http://fabianlindfors.se/multijs/).

![Preview of multi.js](http://fabianlindfors.se/multijs/images/preview.png)

Installation
-----
Clone or download the repository to your project and include both files in the dist directory.

```html
<link rel="stylesheet" type="text/css" href="multijs/dist/multi.min.css">
<script src="multijs/dist/multi.min.js"></script>
```

Usage
-----
multi.js can be applied to any select element with the multiple attribute enabled.

```javascript
var select_element = document.getElementById( 'your_select_element' );
multi( select_element );
```


To customize multi a few options can be passed with the function call. Below are all the default values.

```javascript
multi( select_element, {
    'enable_search': true,
    'search_placeholder': 'Search...',
});
```


multi.js is fully native Javascript but also has jQuery support. If you have jQuery included multi can be applied to a select element as follows:

```javascript
$( '#your_select_element' ).multi();
```

TODO
-----
* ~~Native Javascript, no jQuery~~
* Browser testing
* Support for optgroups
* Support for retrieving options by AJAX
* Tests

License
-----
multi.js is licensed under [MIT](https://github.com/Fabianlindfors/multi.js/blob/master/LICENSE).
