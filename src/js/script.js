define(['jquery'], function($){
	var CustomWidget = function () {
		var widget = this,
			system = widget.system();

		// gulp include example
		//=require utils.js
		
		this.callbacks = {
			render: function(){
				if (typeof (AMOCRM.data.current_card) != 'undefined' && AMOCRM.data.current_card.id == 0) {
					return false; // // do not render on contacts/add || leads/add if needed
				}

				// simple layout
				var html = '<div class="tag-osago-widget">Цена ОСАГО = Базовый тариф x ТК x КБМ x КВС x ОК x КМ x КС x КН x КП</div>' +
				'<link type="text/css" rel="stylesheet" href="' + widget.params.path + '/style.css">';

				widget.render_template({
					caption: {
						class_name: "tag-osago-container"
					},
					body: html,
					render: ''
				});

				// template load example 1
				utils.getTemplate(
					'container',
					function(template) {
						$('.tag-osago-widget').append(
							template.render(
								{
									model: { 
										kbm: 0.9 
									}
								}
							)
						);
					}
				   );
				
				// template load example 2
				utils.getTemplate(
					'osago_result',
					function(template) {
						$('.tag-osago-widget').append(
							template.render(
								{
									id: 'osago_result',
									items: [
										{
											id: "osago_alfa", 
											url: "#", 
											name: "АльфаСтрахование",
											summ: 'osago_base*osago_tk*osago_kbm*osago_kvs*osago_ok*osago_km*osago_ks*osago_kn*osago_kp',
											osago_base: "",
											osago_tk: "",
											osago_kbm: "",
											osago_kvs: "",
											osago_ok: "",
											osago_km: "",
											osago_ks: "",
											osago_kn: "",
											osago_kp: ""
										}
									]
								}
							)
						);
					}
				);

				return true;
			},
			init: function(){

				console.log('init');
				return true;
			},
			bind_actions: function(){
				console.log('bind_actions');
				return true;
			},
			settings: function(){

				return true;
			},
			onSave: function(){
				alert('click');
				return true;
			},
			destroy: function(){
				
			},
			loadPreloadedData: function() {
				
				return true;
			},
			loadElements: function() {
				
				return true;
			},
			linkCard: function() {
				
				return true;
			},
			searchDataInCard: function() {
				
				return true;
			}
		};
		return this;
	};

return CustomWidget;
});