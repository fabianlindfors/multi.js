multi.js
=======

multi.js is a user-friendly replacement for select boxes with the multiple attribute. It is mobile-friendly, easy to use, and provides search functionality. multi.js is also easy to customize and style with CSS.

Requires jQuery 1.6+.

![Preview of multi.js](http://fabianlindfors.se/multijs/images/preview.png)

Installation
-----
Clone or download the repository to your project and include both files in the dist directory. Make sure to include jQuery before including multi.

```html
<!-- Include jQuery -->

<link rel="stylesheet" type="text/css" href="multijs/dist/multi.min.css">
<script src="multijs/dist/multi.min.js"></script>
```

Usage
-----
multi.js can be applied to any select element with the multiple attribute enabled.

```javascript
$('.your-select-element').multi();
```

To customize multi a few options can be passed with the function call. Below are all the default values.

```javascript
$('.your-select-element').multi({
    'enable_search': true,
    'search_placeholder': 'Search...',
});
```

License
-----
multi.js is licensed under MIT.
