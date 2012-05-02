/** Custom extensions to Backbone.js. */

/** Extend Backbone.View with some base functionality. */
Backbone.View = Backbone.View.extend({
	// Override render to use build() to produce a markup array that Creatable can consume.
	render: function() {
		$(this.el).empty().append(create(this.build()));
		this.trigger("rendered");
		return this;
	},

	build: function() {
		return null;
	},

	forward: function(events, context) {
		var that = this;
		events.map(function(e) {
			that.bind(e, function() {
				var args = Array.prototype.slice.apply(arguments);
				context.trigger.apply(context, [e].concat(args));
			});
		});
		return this;
	}
});

/** Override Backbone.sync to submit a normal FORM POST instead of a request with contentType JSON. */
Backbone.sync = function(method, model, options, changedAttributes) {
	// helper function to get a URL from a Model or Collection as a property or as a function
	// must be reproduced from Backbone source since since it's not public
	
	var getUrl = function(object) {
		if (!(object && object.url)) return null;
		return _.isFunction(object.url) ? object.url() : object.url;
	  };

	var methodMap = {
		'create': 'POST',
		'update': 'PUT',
		'delete': 'DELETE',
		'read'  : 'GET'
	};
	
	var customRequestParams = function(){
		if(method === 'update'){
			return {
				type: methodMap[method],
				url: options.url || getUrl(model),
				data: RJS.filterObject(changedAttributes, function(key,val){
					return !(key == model.idAttribute);
				})
			};
		}
		return {
			type: methodMap[method],
			url: options.url || getUrl(model),
			data: model.toJSON()
		};
	};

    var params = _.extend(customRequestParams(), options);

	return $.ajax(params);
};
