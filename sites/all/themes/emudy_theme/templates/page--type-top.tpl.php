<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
  global $base_path;
?>


<!--Menu-->
<?php if (!empty($page['main-menu'])): ?>
    <div class="main-header" id="js-header">
        <div class="ed-container">
            <div class="ed-item
                base-40
                tablet-15
                cross-center
                ">
                <a href="<?php echo $base_path;?>"><img src="<?php echo $base_path;?>sites/default/files/new_logo.png"
                class="logo"></a>
            </div>
            <div class="ed-item
                base-60
                tablet-25
                web-30
                cross-center
                ">
                <?php print render($page['header_1']); ?>
            </div>
            <div class="ed-item base-85 tablet-50  web-45 tablet-main-end
            web-45">
                <?php print render($page['main-menu']); ?>
            </div>
            <div class="ed-item base-15 tablet-10 web-10 main-end
            tablet-cross-center">
                <?php print render($page['header_2']); ?>
                <?php print render($user_profile); ?>
            </div>
        </div>
    </div>
<?php endif; ?>

<!--Banner-->
<?php if (!empty($page['banner'])): ?>
    <div id="banner">
        <div class="ed-container">
        <div class="ed-item">
            <?php print render($page['banner']); ?>
        </div>
        </div>
    </div>
<?php endif; ?>

<!-- Pre Content: Region a todo lo ancho del viewport -->
<?php if (!empty($page['pre-content'])): ?>
    <div id="pre-content">
        <div class="ed-container">
            <div class="ed-item">
		        <?php print render($page['pre-content']); ?>
            </div>
        </div>
    </div>
<?php endif; ?>
<!-- Pre Content: Region a todo lo ancho del viewport -->

    <?php print $messages; ?>

    <div id="main">
        <div class="ed-container web-80">
            <?php if (empty($page['sidebar_first']) && empty($page['sidebar_second']) ): ?>
                <div id="content" class="contenido caja no-sidebar">
            <?php endif; ?>
            <?php if (!empty($page['sidebar_first']) && !empty($page['sidebar_second']) ): ?>
                <div id="content" class="contenido caja web-50 two-sidebars">
            <?php endif; ?>
            <?php if (!empty($page['sidebar_first']) && empty($page['sidebar_second']) ): ?>
                <div id="content" class="contenido caja web-65 sidebar-first">
            <?php endif; ?>
            <?php if (empty($page['sidebar_first']) && !empty($page['sidebar_second']) ): ?>
                <div id="content" class="contenido caja web-65 sidebar-second">
            <?php endif; ?>
                <a id="main-content"></a>
                <?php print render($title_prefix); ?>
                <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
                <?php print render($title_suffix); ?>
                <?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
                <?php print render($page['help']); ?>
                <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
                <?php print render($page['content']); ?>
                <?php print $feed_icons; ?>
            </div>
            <?php if (!empty($page['sidebar_first'])): ?>
                <aside id="sidebar_first" class="sidebar caja web-35">
                    <?php print render($page['sidebar_first']); ?>
                </aside>
            <?php endif; ?>

            <?php if (!empty($page['sidebar_second'])): ?>
                <aside id="sidebar_second" class="sidebar caja web-35">
                    <?php print render($page['sidebar_second']); ?>
                </aside>
            <?php endif; ?>
        </div> <!-- /.section, /#content -->
    </div> <!-- /#main, /#main-wrapper -->


<!-- Post Content: Region a todo lo ancho del viewport -->
<?php if (!empty($page['post-content'])): ?>
    <div id="post-content">
		<?php print render($page['post-content']); ?>
    </div>
<?php endif; ?>
<!-- / Post Content: Region a todo lo ancho del viewport -->

<!--Añadir el footer-->

<?php if (!empty($page['footer'])): ?>
    <footer class="main-footer">
        <div class="ed-container">
            <div class="ed-item">
                <?php print render($page['footer']); ?>
            </div>
        </div>
    </footer>
<?php endif; ?>