CSS and SASS
============

We will use `SASS/SCSS` for this. It'll make everything easier.

To *install* `SASS` you need `rubygems` and then, you simply do:

    $ gem install sass

Using SASS
----------

I'd recommend to keep a lot of `sass` and `scss` files in the `css/` folder and include all of them using `main.sass` and the `@import` syntax. Example:

    // to import the file "article.sass" or "article.sass" we use
    @import "article"

To *compile* the `SASS` files into a `CSS` every time something is changed, we use:

	(from the css/ folder)
    $ sass --watch main.sass:styles.css

And it'll watch changes in every `SASS` and `SCSS` files and update the CSS output. We only include `styles.css` in our HTML. *`styles.css` should not be commited into the repository.*