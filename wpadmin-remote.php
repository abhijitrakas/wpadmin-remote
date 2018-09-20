<?php
/*
Plugin Name:  WP Admin Remote
Plugin URI:   https://github.com/abhijitrakas/wpadmin-remote
Description:  The plugin help user to navigate easily in WordPress admin panel
Version:      1.0.0
Author:       Abhijit Rakas
Author URI:   https://developer.wordpress.org/
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  wpadminremote
Domain Path:  /languages
*/

if ( ! defined( 'WP_ADMIN_REMOTE' ) ) {
	define( 'WP_ADMIN_REMOTE', '1.0.0' );
}


/**
 * Function to load plugin assets.
 */
function wpadminremote_load_scripts() {

	wp_enqueue_style( 'wpadminremote-admin-css', plugin_dir_url( __FILE__ ) . '/assets/css/style.css', false, WP_ADMIN_REMOTE );

	wp_register_script( 'wpadminremote-admin-js', plugin_dir_url( __FILE__ ) . '/assets/js/bundle.js', false, WP_ADMIN_REMOTE );

	$urls = [
		'po'     => admin_url( 'edit.php' ),
		'poid'   => admin_url( 'post.php?post=%id%&action=edit' ),
		'pon'    => admin_url( 'post-new.php' ),
		'pos'    => admin_url( 'edit.php?s=%s%&post_type=post' ),
		'poc'    => admin_url( 'edit-tags.php?taxonomy=category' ),
		'pot'    => admin_url( 'edit-tags.php?taxonomy=post_tag' ),
		'md'     => admin_url( 'upload.php' ),
		'mdn'    => admin_url( 'media-new.php' ),
		'pg'     => admin_url( 'edit.php?post_type=page' ),
		'pgn'    => admin_url( 'post-new.php?post_type=page' ),
		'pgs'    => admin_url( 'edit.php?s=%s%&post_type=page' ),
		'cm'     => admin_url( 'edit-comments.php' ),
		'wc'     => admin_url( 'edit.php?post_type=shop_order' ),
		'wcos'   => admin_url( 'edit.php?s=%s%&post_type=shop_order' ),
		'wcn'    => admin_url( 'post-new.php?post_type=shop_order' ),
		'wcc'    => admin_url( 'edit.php?post_type=shop_coupon' ),
		'wccn'   => admin_url( 'post-new.php?post_type=shop_coupon' ),
		'wcro'   => admin_url( 'admin.php?page=wc-reports' ),
		'wcrc'   => admin_url( 'admin.php?page=wc-reports&tab=customers' ),
		'wcrs'   => admin_url( 'admin.php?page=wc-reports&tab=stock' ),
		'wcrt'   => admin_url( 'admin.php?page=wc-reports&tab=taxes' ),
		'wcs'    => admin_url( 'admin.php?page=wc-settings' ),
		'wcsp'   => admin_url( 'admin.php?page=wc-settings&tab=products' ),
		'wcstx'  => admin_url( 'admin.php?page=wc-settings&tab=tax' ),
		'wcss'   => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
		'wcspyt' => admin_url( 'admin.php?page=wc-settings&tab=checkout' ),
		'wcsap'  => admin_url( 'admin.php?page=wc-settings&tab=account' ),
		'wcse'   => admin_url( 'admin.php?page=wc-settings&tab=email' ),
		'wcsa'   => admin_url( 'admin.php?page=wc-settings&tab=advanced' ),
		'wcst'   => admin_url( 'admin.php?page=wc-status' ),
		'wcstt'  => admin_url( 'admin.php?page=wc-status&tab=tools' ),
		'wcstl'  => admin_url( 'admin.php?page=wc-status&tab=logs' ),
		'wce'    => admin_url( 'admin.php?page=wc-addons' ),
		'wces'   => admin_url( 'admin.php?page=wc-addons&section=helper' ),
		'wcp'    => admin_url( 'edit.php?post_type=product' ),
		'wcps'   => admin_url( 'edit.php?s=%s%&post_type=product' ),
		'wcpn'   => admin_url( 'post-new.php?post_type=product' ),
		'wcpc'   => admin_url( 'edit-tags.php?taxonomy=product_cat&post_type=product' ),
		'wcpt'   => admin_url( 'edit-tags.php?taxonomy=product_tag&post_type=product' ),
		'wcpa'   => admin_url( 'edit.php?post_type=product&page=product_attributes' ),
		'at'     => admin_url( 'themes.php' ),
		'ac'     => admin_url( 'customize.php?return=%2Fwp-admin%2Fthemes.php' ),
		'aw'     => admin_url( 'widgets.php' ),
		'am'     => admin_url( 'nav-menus.php' ),
		'aml'    => admin_url( 'nav-menus.php?action=locations' ),
		'ae'     => admin_url( 'theme-editor.php' ),
		'pi'     => admin_url( 'plugins.php' ),
		'pn'     => admin_url( 'plugin-install.php' ),
		'pe'     => admin_url( 'plugin-editor.php' ),
		'ua'     => admin_url( 'users.php' ),
		'un'     => admin_url( 'user-new.php' ),
		'up'     => admin_url( 'profile.php' ),
		'ta'     => admin_url( 'tools.php' ),
		'ti'     => admin_url( 'import.php' ),
		'te'     => admin_url( 'export.php' ),
		'tepd'   => admin_url( 'tools.php?page=export_personal_data' ),
		'teepd'  => admin_url( 'tools.php?page=remove_personal_data' ),
		'sg'     => admin_url( 'options-general.php' ),
		'sw'     => admin_url( 'options-writing.php' ),
		'sr'     => admin_url( 'options-reading.php' ),
		'sd'     => admin_url( 'options-discussion.php' ),
		'sm'     => admin_url( 'options-media.php' ),
		'sp'     => admin_url( 'options-permalink.php' ),
		'spr'    => admin_url( 'privacy.php' ),
	];

	wp_localize_script(
		'wpadminremote-admin-js',
		'wpadminremoteAdminJs',
		[
			'urls' => $urls,
		]
	);

	wp_enqueue_script( 'wpadminremote-admin-js' );

}
add_action( 'admin_enqueue_scripts', 'wpadminremote_load_scripts' );

/**
 * Function to load HTML in WordPress admin panel.
 */
function wpadminremote_add_html() {

	$cmd_sign = apply_filters( 'wpadminremote_cmd_sign', '$' );

	?>
		<div id="wpnbfooter">
			<span id="wpnb_command_sign" class="wpnb_cmd">
				<?php echo esc_attr( $cmd_sign ); ?>
			</span>
			<input type="text" id="wpnb_command" class="wpnb_cmd" name="wpnb_command" autofocus="autofocus">
		</div>
	<?php

}
add_action( 'admin_footer', 'wpadminremote_add_html' );
