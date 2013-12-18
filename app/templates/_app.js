var PrototypeModule = (function() {
	"use strict";

	var Module = {};

	Module.init = function() {
		console.log('Prototype Module Initialized!');
	};

	return Module;

	// put helper functions here

}());

(function() {
	"use strict";

	var proto = Object.create(PrototypeModule);
	proto.init();

}());