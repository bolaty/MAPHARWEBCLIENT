"use strict";

// Class definition
var KTUserEdit = function () {
	// Base elements
	var avatar;

	var initUserForm = function() {
		avatar = new KTImageInput('kt_user_edit_avatar');
		avatar = new KTImageInput('kt_user_edit_avatar_1');
	}

	return {
		// public functions
		init: function() {
			initUserForm();
		}
	};
}();

jQuery(document).ready(function() {
	KTUserEdit.init();
});
