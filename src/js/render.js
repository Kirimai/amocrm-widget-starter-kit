window.tagosagoru.render.push(
	function(self){
		var w_code = self.get_settings().widget_code,
			area = self.system().area,
			twig = require('twigjs'),
			lang = self.i18n('userLang'),
			lang_s = self.i18n('settings'),
			settings = self.get_settings(),
			senders = [],
			cd = new Date,
			is_delayed = false,
			is_daytime = false,
			is_area = false,
			tpls = [];

		// self.prepare_settings();
		window.tagosagoru.calculate_data = [];

		var lists = settings.lists ? self.object2array(settings.lists) : [{daytime: 0, delayed: 0}];
		if(lists[0].delayed == '1'){
			is_delayed = true;
		}
		if(lists[0].daytime == '1'){
			is_daytime = true;
		}

		if (!settings.contacts_macros) {
			self.set_macros_names();
		}

		if ($.inArray(area, ['clist']) != -1) {
			is_area = true;
		}

		if(!$('*').is('#tagosago_select2')) {
			$('head').append('<link id = "tagosago_select2" rel="stylesheet" href="' + self.params.path + '/css/tagosago_select2.css">');
		}

		if(!$('*').is('#tagosago_style')) {
			$("head").append('<link id = "tagosago_style" type="text/css" rel="stylesheet" href="' + self.params.path + '/css/tagosago_style.css?' + settings.version + '">');
		}

		var tagosago_templates = [
			{
				id: -2,
				option: lang.templates
			}
		];

		tagosago_templates.push({
			option: lang.templates_editor,
			class_name: 'tagosago_edit_templates',
			id: -1
		});

		var tagosago_senders = [
			{
				id: -2,
				option: lang.err211
			}
		];

		// var time_items = [
		// 	{value: '00:00'}, {value: '00:30'}, {value: '01:00'}, {value: '01:30'},
		// 	{value: '02:00'}, {value: '02:30'}, {value: '03:00'}, {value: '03:30'},
		// 	{value: '04:00'}, {value: '04:30'}, {value: '05:00'}, {value: '05:30'},
		// 	{value: '06:00'}, {value: '06:30'}, {value: '07:00'}, {value: '07:30'},
		// 	{value: '08:00'}, {value: '08:30'}, {value: '09:00'}, {value: '09:30'},
		// 	{value: '10:00'}, {value: '10:30'}, {value: '11:00'}, {value: '11:30'},
		// 	{value: '12:00'}, {value: '12:30'}, {value: '13:00'}, {value: '13:30'},
		// 	{value: '14:00'}, {value: '14:30'}, {value: '15:00'}, {value: '15:30'},
		// 	{value: '16:00'}, {value: '16:30'}, {value: '17:00'}, {value: '17:30'},
		// 	{value: '18:00'}, {value: '18:30'}, {value: '19:00'}, {value: '19:30'},
		// 	{value: '20:00'}, {value: '20:30'}, {value: '21:00'}, {value: '21:30'},
		// 	{value: '22:00'}, {value: '22:30'}, {value: '23:00'}, {value: '23:30'}
		// ];

		var sending_input_val = lang.sending + ': ' + self.addZero(cd.getDate()) + '.' + self.addZero(cd.getMonth() + 1) + '.' + self.addZero(cd.getFullYear()) + ' ' + self.addZero(cd.getHours()) + ':' + self.addZero(cd.getMinutes());


		self.getTemplate('render', function (template) {
			self.render_template({
				caption: {
					class_name: 'js-ac-caption',
					html: ''
				},
				body: template.render({
					// templates: self.render_select('tagosago_templates', tagosago_templates, '', '', 'tagosago_templates'),
					// textarea: self.render_textarea('tagosago_textarea', lang.textSMS + '&hellip;', 'tagosago-textarea', 'tagosago_smsmes', ''),
					// senders: self.render_select('tagosago_senders', tagosago_senders, '', '', ''),
					// sending: self.render_input('tagosago_sending_input', '', sending_input_val, '', 'tagosago_sending_input', true),
					// delayed: self.render_checkbox('tagosago_delayed', lang_s.delayed, is_delayed, 'tagosago_delayed', 'tagosago_delayed'),
					// daytime: self.render_checkbox('tagosago_daytime', lang_s.daytime, is_daytime, 'tagosago_daytime', 'tagosago_daytime'),
					// date: self.date_field('tagosago_date', 'tagosago_sending_date'),
					// time: self.render_suggest(time_items, 'tagosago_time', 'tagosago_sending_time'),
					diagButton_pretext: lang.diagButton_pretext,
					button: self.render_button('', lang.textButton, '', 'tagosago_sendbtn', false),
					diagbutton_vin: self.render_button('', lang.diagButton_vin, 'tagosago_get_diagbtn', 'tagosago_get_diagbtn_vin', false),
					diagbutton_plate: self.render_button('', lang.diagButton_plate, 'tagosago_get_diagbtn', 'tagosago_get_diagbtn_plate', false),
					// all_contact: self.render_button('', lang.textAllButton, '', 'tagosago_get_all_contact', false),
					is_area: is_area,
					lang: {
						date: lang.date,
						time: lang.time,
					}
				}),
				render: ''
			});

			// var balans = self.get_balans();
			// if(balans){
			// 	self.build_balans(balans);
			// }

			// var vincode = self.get_vincode();
			// if(templates){
			// 	self.build_templates(templates);
			// }
			// var templates = self.get_templates();
			// if(templates){
			// 	self.build_templates(templates);
			// }
			// var senders = self.get_senders();
			// if(senders){
			// 	self.build_senders(senders);
			// }

			// self.get_vincode();

			// self.get_diags();

			// if($('#tagosago_delayed').closest('label').hasClass('is-checked')){
			// 	$('.tagosago-block-delayed').css('display', 'block');
			// } else {
			// 	$('.tagosago-block-delayed').css('display', 'none');
			// }

			// if($('#tagosago_daytime').closest('label').hasClass('is-checked')){
			// 	$('#tagosago_sending_wrapper').css('display', 'none');
			// } else {
			// 	$('#tagosago_sending_wrapper').css('display', 'block');
			// }

			// $('#tagosago-multiple-select').select2({
			// 	placeholder: lang.phonesList,
			// 	data: self.getContactList(),
			// 	tags: true,
			// 	width: '100%',
			// });

			// $("#tagosago-multiple-select").val(self.selectAllContacts()).trigger("change");
			// $('#tagosago-multiple-select').parent().find('.select2-selection__rendered').addClass('custom-scroll');

			// $('.multiple-select').on('select2:open', function () {
			// 	$('.select2-selection__rendered, .select2-results__options').addClass('custom-scroll');
			// });

			$('.card-widgets__widget[data-code="' + w_code + '"] .js-widget-caption-block').css('background', '#008f9c').css('background','linear-gradient(29.82deg,#286cca 0%,#4ad289 100%)');
			$('.card-widgets__widget[data-code="' + w_code + '"] .js-widget-caption-block').css('padding', '5px');
			$('.card-widgets__widget[data-code="' + w_code + '"] .card-widgets__widget__body').css({"background-color": "#fff","padding": "1px 15px 15px 15px"});

			// self.count_chars($('#tagosago_smsmes'));
		});

		// setTimeout(function() {
			// self.get_sms_status();
		// }, 1500);

		return true;
	}
);