App.View.Dashboard = Backbone.View.extend({

	events:{
		//"click button.submit" 		: "submit",
	},
	
	initialize: function(){
		var that = this;
	},
	
	build: function(){
		return ['.container',[
			new App.View.header(),
		]]
	},
	
	
});