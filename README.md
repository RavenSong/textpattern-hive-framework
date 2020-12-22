# Hive website theme framework for Textpattern CMS

[![Build Status](https://travis-ci.com/philwareham/textpattern-hive-framework.svg)](https://travis-ci.com/philwareham/textpattern-hive-framework)

A collection of Textpattern CMS website theme modules using [Hive Framework](https://github.com/philwareham/hive-framework) as a scaffold. Requires Textpattern CMS version 4.8.4 or higher.

**Currently in development - not ready for production use yet!**

## Supported web browsers

* Chrome, Edge, Firefox, Safari and Opera the last two recent stable releases.
* Firefox ESR latest major point release.

Older versions of the above and other browsers may work, but these are the ones we verify.

## Instructions/installation/help/etc

TODO

## Image categories

For some of the images modules, you will need to create image categories within Textpattern and assign to the images you want to appear in the module. As follows:

1. `gallery` category, for images that are to appear in `gallery--xxx` image modules types.
2. `logo-wall` category, for images that are to appear in `logo-wall--xxx` image modules types.

## Shortcodes

Textpattern 4.7 introduced support for user-definable `<txp:output_form />` attributes (and also the short tags syntax `<txp::...>`), allowing for 'shortcodes' within articles and templates (**note:** remember to also use `notextile.` when these tags are used within Textile content).

This site uses the following tags:

### Image

To create a HTML5 image snippet:

    <txp::media_image id="" class="" dark-option="" set-width="" set-height="" />

`id` accepts either a single image ID, or comma separated image IDs if you want multiple images.

`class` is optional, for if you need to provide specific CSS class names for the image(s).

`dark-option` is optional (for a single image ID only), for if you need to provide an alternative image when website is in Dark Mode.

`set-width` and `set-height` are optional (for a single image ID), for if you need to provide explicit maximum dimensions (in pixels) for the image(s). Otherwise (when not set), images default to being fully responsive, expanding to fill their container, or up to 100% of their size—whichever is reached first (unless a class of `overstetch` is applied, in which case an image can expand beyond 100% if the container allows).

For example, comma separated image IDs:

    <txp::media_image id="41, 42, 50" />

For example, image with an alternative dark theme version and a set width and height in pixels:

    <txp::media_image id="51" dark-option="52" set-width="400" set-height="125" />

### Video

To create a HTML5 video snippet:

    <txp::media_video width="" height="" mp4-url="" webm-url="" poster-url="" name="" description="" duration-seconds=""/>

`poster-url`, `name`, `description` and `duration-seconds` are optional, but should be provided if possible to provide valid Schema.org microdata. If not used, remove those attributes from your shortcode.

For example:

    <txp::media_video width="640" height="480" mp4-url="/video/video1.mp4" webm-url="/video/video1.webm" poster-url="/video/video1-poster.png" name="Cat video" description="My great video of cats." duration-seconds="20" />

### File

To create a file download snippet:

    <txp::media_file category="" filename="" primary-button="" large-button="" />

`category` and `filename` are interchangeable (use one or the other, where appropriate)—if both are provided then `category` is used in preference and `filename` is ignored.

`primary-button` is optional. If set to `1`, this will render a more prominent button.

`large-button` is optional. If set to `1`, this will render a larger style button.

For example:

    <txp::media_file category="current-release-zip" primary-button="1" large-button="1" />

### Links

To create a link or list of links:

    <txp::links id="" category="" class="" rel="" target="" referrerpolicy="" />

`id` accepts either a single link ID, or comma separated link IDs if you want multiple links listed.

`id` and `category` are interchangeable (use one or the other, where appropriate)—if both are provided then `id` is used in preference and `category` is ignored.

`class` is optional, for if you need to provide specific CSS class names for the link anchors(s). For example, `class="button"` would render any links in the style of a button.

`rel` is optional, for if you need to provide a [rel attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) for the link anchors(s). For example, `rel="external"`.

`target` is optional, for if you need to provide a [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target) for the link anchors(s). For example, `target="_blank"`.

`referrerpolicy` is optional, for if you need to provide a [referrerpolicy attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy) for the link anchors(s). For example, `referrerpolicy="no-referrer"`.

For example:

    <txp::links id="1, 3, 11, 12" class="button button-primary" rel="external nofollow" />

## License

Textpattern templates licensed under GPLv2 license. Hive Framework licensed under MIT license.
