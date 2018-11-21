<?php

/**
 * Variables preprocess function for the "page" theming hook.
 */
function emudy_theme_preprocess_page(&$vars) {

    // Do we have a node?
    if (isset($vars['node'])) {

        // Ref suggestions cuz it's stupid long.
        $suggests = &$vars['theme_hook_suggestions'];

        // Get path arguments.
        $args = arg();
        // Remove first argument of "node".
        unset($args[0]);

        // Set type.
        $type = "page__type_{$vars['node']->type}";

        // Bring it all together.
        $suggests = array_merge(
            $suggests,
            array($type),
            theme_get_suggestions($args, $type)
        );

        // if the url is: 'http://domain.com/node/123/edit'
        // and node type is 'blog'..
        //
        // This will be the suggestions:
        //
        // - page__node
        // - page__node__%
        // - page__node__123
        // - page__node__edit
        // - page__type_blog
        // - page__type_blog__%
        // - page__type_blog__123
        // - page__type_blog__edit
        //
        // Which connects to these templates:
        //
        // - page--node.tpl.php
        // - page--node--%.tpl.php
        // - page--node--123.tpl.php
        // - page--node--edit.tpl.php
        // - page--type-blog.tpl.php          << this is what you want.
        // - page--type-blog--%.tpl.php
        // - page--type-blog--123.tpl.php
        // - page--type-blog--edit.tpl.php
        //
        // Latter items take precedence.
    }
}