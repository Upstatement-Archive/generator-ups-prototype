var PrototypeModule = (function() {
	"use strict";

	var Module = {};

	Module.init = function(options) {
		options = options || {};

		console.log('Prototype Module Initialized!');
	};

	Module.teardown = function() {
		// detach event handlers when destroying an 
		// instance of this obj

		// ex: $('body').off('click');
	};

	return Module;

	// put helper functions here

}());

(function() {
	"use strict";

	var proto = Object.create(PrototypeModule);
	proto.init();

}());