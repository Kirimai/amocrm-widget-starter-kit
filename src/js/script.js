window.tagosagoru = {};
window.tagosagoru.render = [];
window.tagosagoru.init = [];
window.tagosagoru.initSettings = [];
window.tagosagoru.initReport = [];
window.tagosagoru.initSignatures = [];
window.tagosagoru.initReg = [];
window.tagosagoru.bind_actions = [];
window.tagosagoru.settings = [];
window.tagosagoru.onSave = [];
window.tagosagoru.dpSettings = [];
window.tagosagoru.destroy = [];
window.tagosagoru.contacts = [];
window.tagosagoru.customers = [];
window.tagosagoru.leads = [];
window.tagosagoru.tasks = [];
window.tagosagoru.card = [];
window.tagosagoru.settings = [];
window.tagosagoru.advanced_settings = [];
window.tagosagoru.macros = [];
window.tagosagoru.calculate_data = [];
window.tagosagoru.mergeresult = [];


window.tagosagoru.execute = function(event, widget){
	var result = true;
	for(var i = 0; i < window.tagosagoru[event].length; i++){
		if(result){
			result = result && window.tagosagoru[event][i](widget);
		}
	}
	return result;
};


/*define([
	'jquery',
	'underscore',
	'lib/components/base/modal',
	'./plugins/fn.js',
	'moment',
	'./plugins/select2.min.js',
	'jquery-ui',
	'./js/settings.js?' + Date.now(),
	'./js/bind_actions.js?' + Date.now(),
	'./js/dpSettings.js?' + Date.now(),
	'./js/render.js?' + Date.now(),
	'./js/onSave.js?' + Date.now(),
	'./js/contacts.js?' + Date.now(),
	'./js/customers.js?' + Date.now(),
	'./js/leads.js?' + Date.now(),
], function($, _, Modal, Fn, moment){*/

define([
	'jquery',
	'underscore',
	'lib/components/base/modal',
	'twigjs',
	'./plugins/fn.js',
	'moment',
	'./plugins/select2.min.js',
	'jquery-ui',
	'./js/settings.js?' + Date.now(),
	'./js/advanced_settings.js?' + Date.now(),
	'./js/bind_actions.js?' + Date.now(),
	'./js/dpSettings.js?' + Date.now(),
	'./js/render.js?' + Date.now(),
	'./js/onSave.js?' + Date.now(),
	'./js/contacts.js?' + Date.now(),
	'./js/customers.js?' + Date.now(),
	'./js/leads.js?' + Date.now()

	], function ($, _, Twig, Modal, moment) {

	var CustomWidget = function () {
		var self = this,
			system = self.system,
			version = '0.0.3',
			area = AMOCRM.getWidgetsArea(),
			twig = require('twigjs'),
			cd = new Date();

		// var Modal = require('lib/components/base/modal');

		window.tagosagoObject = {
			value: 0,
			contacts: [],
		};


		this.getTemplate = function (template, callback) {
			template = template || '';
			return self.render({
				href: '/templates/' + template + '.twig',
				base_path: self.params.path,
				v: version,
				load: callback
			}, {});

		};


		this.object2array = function (obj) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		};

		this.array2object = function (arr) {
			return arr.reduce(function (acc, cur, i) {
				acc[i] = cur;
				return acc;
			}, {});
		};

		// this.prepare_settings = function() {
		// 	var settings = self.get_settings();

		// 	var lists = settings.lists ? self.object2array(settings.lists) : [];

		// 	if(lists.length === 0){
		// 		self.save_all_settings(settings, [
		// 			{delayed: 0},
		// 			{daytime: 0}
		// 		]);
		// 	}
		// };

		// this.save_all_settings = function (settings, o) {
		// 	var obj = JSON.stringify(self.array2object(o));

		// 	var savedata = [{
		// 		'widget_code': settings.widget_code,
		// 		'settings': {
		// 			'api_key': settings.api_key,
		// 			'lists': obj
		// 		}
		// 	}];


		// 	$.ajax({
		// 		type: 'POST',
		// 		dataType: 'json',
		// 		url: '/private/api/v2/json/widgets/set',
		// 		data: JSON.stringify({
		// 			'request': {
		// 				'widgets': {
		// 					'install': savedata
		// 				}
		// 			}
		// 		}),
		// 		success: function (data) {
		// 			return data;
		// 		}
		// 	});

		// 	self.set_settings({lists: o});

		// 	AMOCRM.widgets.clear_cache();
		// };

		this.create_macros_names = function (entity_type, entity_fields) {
			var lang = self.i18n('userLang'),
				ms = [],
				default_ms = [
					{
						macros: '{{'+entity_type+'.responsible_user}}',
						title: lang.macrosResp
					},
					{
						macros: '{{'+entity_type+'.responsible_user_phone}}',
						title: lang.macrosRespPhone
					},
					{
						macros: '{{'+entity_type+'.responsible_user_email}}',
						title: lang.macrosRespMail
					},
					{
						macros: '{{'+entity_type+'.id}}',
						title: 'Id'
					}
				];

			_.each(entity_fields, function (field) {
				ms.push({
					macros: '{{'+entity_type+'.cf.'+field.id+'}}',
					title: field.name
				});
			});
			default_ms = default_ms.concat(ms);

			return default_ms;
		};

		this.set_macros_names = function () {
			// if (!window.tagosagoru.macroses_set) {

				$.ajax({
					type: 'GET',
					url: '/private/api/v2/json/accounts/current',
					dataType: 'json',
					success: function (data) {
						var macroses = [], field, cf = data.response.account.custom_fields;

						for (field in cf) {
							switch (field) {
								case 'companies':
									macroses[0] = [{
										macros: '{{company_name}}',
										title: self.i18n('userLang').macrosTitle
									}];
									macroses[0] = macroses[0].concat(self.create_macros_names(field, cf[field]));
									break;
								case 'contacts':
									macroses[1] = [{
										macros: '{{contact_name}}',
										title: self.i18n('userLang').macrosTitle
									}];
									macroses[1] = macroses[1].concat(self.create_macros_names(field, cf[field]));
									break;
								case 'leads':
									macroses[2] = [
										{
											macros: '{{lead_name}}',
											title: self.i18n('userLang').macrosTitle
										},
										{
											macros: '{{leads.price}}',
											title: self.i18n('userLang').macros_leads_price
										}
									];
									macroses[2] = macroses[2].concat(self.create_macros_names(field, cf[field]));
									break;
								case 'customers':
									macroses[3] = [
										{
											macros: '{{customer_name}}',
											title: self.i18n('userLang').macrosTitle
										},
										{
											macros: '{{customers.next_price}}',
											title: self.i18n('userLang').macros_customers_next_price
										},
										{
											macros: '{{customers.next_date}}',
											title: self.i18n('userLang').macros_customers_next_date
										}
									];
									macroses[3] = macroses[3].concat(self.create_macros_names(field, cf[field]));
									break;
							}
						}

						self.set_settings({
							companies_macros: macroses[0],
							contacts_macros: macroses[1],
							leads_macros: macroses[2],
							customers_macros: macroses[3],
							account_users: data.response.account.users
						});
						// window.tagosagoru.macroses_set = true;
					}
				});
			// }
			// return window.tagosagoru.macroses_set;
		};

		this.render_select = function(name, items, selected, class_name, id) {
			return twig({
				ref: '/tmpl/controls/select.twig'
			}).render({
				name: name,
				items: items,
				selected: selected,
				class_name: class_name,
				id: id,
				need_escape: true
			});
		};

		this.render_textarea = function(name, placeholder, class_name, id, value) {
			return twig({
				ref: '/tmpl/controls/textarea.twig'
			}).render({
				name: name,
				id: id,
				placeholder: placeholder,
				class_name: class_name,
				value: value
			});
		};

		this.render_input = function(name, placeholder, value, class_name, id, readonly) {
			return twig({
				ref: '/tmpl/controls/input.twig'
			}).render({
				name: name,
				value: value,
				placeholder: placeholder,
				class_name: class_name,
				id: id,
				readonly: readonly
			});
		};

		this.render_checkbox = function(name, text, checked, class_name, id) {
			return twig({
				ref: '/tmpl/controls/checkbox.twig'
			}).render({
				name: name,
				id: id,
				text: text,
				checked: checked,
				class_name: class_name
			});
		};

		this.render_button = function(name, text, class_name, id, disabled) {
			return twig({
				ref: '/tmpl/controls/button.twig'
			}).render({
				id: id,
				name: name,
				text: text,
				class_name: class_name,
				disabled: disabled
			});
		};
		
		this.render_diag_card_transfer = function(callback) {
			return self.render({
				href: '/templates/diag_card_transfer.twig',
				base_path: self.params.path,
				v: this.get_version(),
				load: callback
			}, {});
		};


		this.date_field = function(id, class_name) {
			return twig({
				ref: '/tmpl/controls/date_field.twig'
			}).render({
				id: id,
				class_name: class_name
			});
		};

		this.render_suggest = function(items, id, class_name) {
			return twig({
				ref: '/tmpl/controls/suggest.twig'
			}).render({
				items: items,
				id: id,
				class_name: class_name
			});
		};

		this.addZero = function (i) {
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		};

		this.getContactList = function () {
			var area = self.system().area;
			var $selector,
				contacts_collection = [],
				selected_phones = [];
			if ($.inArray(area, ['ccard', 'comcard', 'lcard', 'cucard']) != -1) {
				$selector = $('[data-pei-code=phone] input[type=text]');
				$selector.each(function () {
					if ($(this).val().trim().match(/^\+?(?:[- ()]*\d[- ()]*){10,15}$/) &&
						$.inArray($(this).val().replace(/[^0-9]/ig, ""), selected_phones) === -1) {
						selected_phones.push($(this).val().replace(/[^0-9]/ig, ""));
						contacts_collection.push({
							id: $(this).val(),
							text: $(this).val()
						});
					}
				});
			}

			return contacts_collection;
		};

		this.get_settings_field_id = function(fieldname) {
			if (!fieldname) return false;
			var area = self.system().area;
			// console.log('gettin '+fieldname+"'s value");
			if ($.inArray(area, ['lcard', 'llist']) != -1) {
				window.tagosagoru.card.vin = false;
				settings = self.get_settings();
				settings_val = settings[fieldname];
				if (!settings_val) return false;
				settings_field_id = settings_val.replace(/\{|\}|(\.cf\.)|(leads)|(contacts)/g, '');
				settings_field_id = parseInt(settings_field_id);
				var is_contact = (settings_val.includes("contacts") ? true : false);
				var is_lead = (settings_val.includes("leads") ? true : false);
				if (is_lead) {
					if ( settings_field_id ) {
						result = $('[name="CFV['+settings_field_id+']"]').val();
					} else {
						result = $('[name="CFV['+settings_field_id+']"]').val();
					}
					window.tagosagoru.calculate_data[fieldname] = result;
					return window.tagosagoru.calculate_data[fieldname];
				}
				if (is_contact) {
					

					if ( settings_field_id ) {
						$('[name="CFV['+settings_field_id+']"]').each(
							function(index, item) {
								if ( $(item).val() ) {
									current_val = $(item).val();
									window.tagosagoru.calculate_data['contacts'][index][fieldname] = current_val;
								} else {
									return false;
								}
							}
						);
					} else {
						$('[name="CFV['+settings_field_id+']"]').each(function(index, item) {
							if ( $(item).val() ) {
								current_val = $(item).val();
								window.tagosagoru.calculate_data['contacts'][index][fieldname] = current_val;
							} else {
								return false;
							}
						});
					}
					if (window.tagosagoru.calculate_data['contacts'] && window.tagosagoru.calculate_data['contacts'][0][fieldname]) {
						return window.tagosagoru.calculate_data['contacts'][0][fieldname];
					} else {
						return false;
					}
				}
			}
		}

		this.set_settings_field_id = function(fieldname, newval) {
			try {

 				var moment = require('moment'); // require

				
				if ( moment(newval, "YYYY-MM-DD", true).isValid() ) {
					newval = moment(newval).format('DD.MM.YYYY');
					console.log('DATE FIELD!! '+newval);
				}
				
				var area = self.system().area;

				if ($.inArray(area, ['lcard', 'llist']) != -1) {
					window.tagosagoru.card.vin = false;
					settings = self.get_settings();
					settings_val = settings[fieldname];
					if (!settings_val) {
						return false;
					}
					settings_field_id = settings_val.replace(/\{|\}|(\.cf\.)|(leads)|(contacts)/g, '');
					settings_field_id = parseInt(settings_field_id);
					var is_contact = (settings_val.includes("contacts") ? true : false);
					var is_lead = (settings_val.includes("leads") ? true : false);
					if (is_lead) {
						if ( settings_field_id ) {
							result = $('[name="CFV['+settings_field_id+']"]').val(newval).trigger('change');
						} else {
							result = $('[name="CFV['+settings_field_id+']"]').val(newval).trigger('change');
						}
						window.tagosagoru.calculate_data[fieldname] = result;
						return window.tagosagoru.calculate_data[fieldname];
					}
					if (is_contact) {
						if ( settings_field_id ) {
							$('[name="CFV['+settings_field_id+']"]').each(function(index, item) {
								window.tagosagoru.calculate_data['contacts'][index][fieldname] = $(item).val(newval).trigger('change');
							});
						} else {
							$('[name="CFV['+settings_field_id+']"]').each(function(index, item) {
								window.tagosagoru.calculate_data['contacts'][index][fieldname] = $(item).val(newval).trigger('change');
							});
						}
						return window.tagosagoru.calculate_data['contacts'][0][fieldname] = $(item).val(newval).trigger('change');
					}
				}
			} catch (e) {
			   // инструкции для обработки ошибок
			   console.log(e); // передать объект исключения обработчику ошибок
			}
		}

		this.settings_cf = function(fieldname) {

			self.set_macros_names();
			settings = self.get_settings();

			// while	(settings != true ) {
			// 	settings = self.get_settings();
			// }

			
			if (!settings || !settings.select_leads_cf) {
				settings.select_leads_cf = self.params.leads_macros;
				settings.select_leads_cf = settings.select_leads_cf.map( function( val, i ) {
					return {
						'additional_data': val.macros,
						'id': val.macros,
						'option': val.title,
					}
				});
			}

			if (!settings || !settings.select_contacts_cf) {
				settings.select_contacts_cf = self.params.contacts_macros;
				settings.select_contacts_cf = settings.select_contacts_cf.map( function( val, i ) {
					return {
						'additional_data': val.macros,
						'id': val.macros,
						'option': val.title,
					}
				});
			}

			vinselect_lead = self.render_select(
				fieldname+'_select_lead', 
				settings.select_leads_cf, 
				$('input[name="'+fieldname+'"]').val(), 
				fieldname+'_select_lead control--select widget-settings__avito-chats-ads-item', 
				fieldname+'_select_lead'
			);
			$('input[name="'+fieldname+'"]').after(vinselect_lead);
			$(fieldname+'_select_lead').prepend('<div>Сделка:</div>');
			$('#'+fieldname+'_select_lead').on('change', function(event) {
				$('input[name="'+fieldname+'"]').val( event.currentTarget.value );
				$('input[name="'+fieldname+'"]').trigger ( 'change' ) ;
			});

			vinselect_contact = self.render_select(
				fieldname+'_select_contact', 
				settings.select_contacts_cf, 
				$('input[name="'+fieldname+'"]').val(), 
				fieldname+'_select_contact control--select widget-settings__avito-chats-ads-item', 
				fieldname+'_select_contact'
			);
			$('input[name="'+fieldname+'"]').after(vinselect_contact);
			$(fieldname+'_select_contact').prepend('<div>Контакт:</div>');
			$('#'+fieldname+'_select_contact').on('change', function(event) {
				$('input[name="'+fieldname+'"]').val( event.currentTarget.value );
				$('input[name="'+fieldname+'"]').trigger ( 'change' ) ;
			});
			
			
		}

		this.get_templates = function() {
			// var settings = self.get_settings();
			// var lang = self.i18n('userLang');
			// if(settings.templates){
			//     return settings.templates;
			// } else {
			//     $.ajax({
			//         type: 'GET',
			//         url: 'https://sms.ru/amocrm_templates/get?api_id='+settings.api_key+'&json=1',
			//         success: function (data) {
			//             if(data.status === "OK" && data.templates){
			//                 var templates = []
			//                 $.each(data.templates, function(i, item){
			//                     templates.push({
			//                         tpid: i,
			//                         template_name: item.template_name,
			//                         template_text: item.template_text,
			//                     });
			//                 });
			//                 self.set_settings({templates: templates});
			//                 self.build_templates(templates);
			//             }
			//         },
			//         error: function() {
			//             self.notifications(lang.sendSmsError, lang.sendSmsErrorSmthWrong);
			//         }
			//     });
			//     return false;
			// }
			//
			return false;
		};

		this.build_templates = function(templates) {
			var area = self.system().area;
			if ($.inArray(area, ['ccard', 'comcard', 'lcard', 'cucard', 'clist', 'llist', 'digital_pipeline', 'culist']) != -1) {
				var tagosago_templates = [
					{
						id: -2,
						option: 'Выберите шаблон'
					}
				];
				$.each(templates, function(i, item){
					tagosago_templates.push({
						id: i,
						option: item.template_name
					});
				});
				tagosago_templates.push({
					option: 'Редактор шаблонов',
					class_name: 'tagosago_edit_templates',
					id: -1
				});
				var temp_html = self.render_select('tagosago_templates', tagosago_templates, '-2', '', 'tagosago_templates');
				$('#tagosago_wrap_tpl').html(temp_html);
			}
		};


		this.callbacks = {
			spiner: '<div id="amocrm-spinner" style="both:clear;"><span style="width: 20px;height: 20px;margin: 0 auto;display: block;position: static;" class="pipeline_leads__load_more__spinner spinner-icon spinner-icon-abs-center"></span></div>',
			modalForm: null,
			initSettings: function(){
				return window.tagosagoru.execute('initSettings', self);
			},
			initReport: function(){
				return window.tagosagoru.execute('initReport', self);
			},
			initSignatures: function(){
				return window.tagosagoru.execute('initSignatures', self);
			},
			initReg: function(){
				return window.tagosagoru.execute('initReg', self);
			},
			render: function(){
				return window.tagosagoru.execute('render', self);
			},
			init: function(){
				return window.tagosagoru.execute('init', self);
			},
			bind_actions: function(){
				return window.tagosagoru.execute('bind_actions', self);
			},
			settings: function(){
				return window.tagosagoru.execute('settings', self);
			},
			advancedSettings: function() {
				return window.tagosagoru.execute('advanced_settings', self);
			},
			onSave: function(){
				return window.tagosagoru.execute('onSave', self);
			},
			dpSettings: function(){
				return window.tagosagoru.execute('dpSettings', self);
			},
			destroy: function(){
				return window.tagosagoru.execute('destroy', self);
			},
			contacts: {
				selected: function(){
					return window.tagosagoru.execute('contacts', self);
				}
			},
			customers: {
				selected: function(){
					return window.tagosagoru.execute('customers', self);
				}
			},
			leads: {
				selected: function(){
					return window.tagosagoru.execute('leads', self);
				}
			},
			tasks: {
				selected: function(){
					return window.tagosagoru.execute('tasks', self);
				}
			}
		};
		return this;
	};

	return CustomWidget;
});