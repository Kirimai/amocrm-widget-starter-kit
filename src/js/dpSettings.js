window.tagosagoru.dpSettings.push(
	function(self){
		var area = AMOCRM.getWidgetsArea();
		var w_code = self.get_settings().widget_code;
		var twig = require('twigjs');
		var settings = self.get_settings();
		var lang = self.i18n('settings');
		var userLang = self.i18n('userLang');
		var _ = require('underscore');

		self.set_macros_names();

		var api_key_dp = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=api_key_dp]");
		var api_key_dp_label = api_key_dp.parent().parent();
		api_key_dp.val(self.get_settings().api_key);
		api_key_dp.attr({type: 'hidden', class: ''});

		var message = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=message]");
		var message_label = message.parent().parent();
		var value_message = message.val();
		message_label.find('[title =' + lang.message + ']').hide();
		message.attr({type: 'hidden', class: ''});

		var sender = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=sender]");
		var label_sender = sender.parent().parent();
		var value_sender = sender.val();
		label_sender.find('[title =' + lang.from + ']').hide();
		sender.attr({type: 'hidden', class: ''});

		var recipients = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=recipients]");
		var label_recipients = recipients.parent().parent();
		var value_recipient = recipients.val();
		if(!value_recipient){
			recipients.val(1);
		}
		label_recipients.find('[title =' + lang.recipients + ']').hide();
		recipients.attr({type: 'hidden', class: ''});

		var only_main = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=only_main]");
		var label_only_main = only_main.parent().parent();
		var value_only_main = only_main.val();
		label_only_main.find('[title =' + lang.only_main + ']').hide();
		only_main.attr({type: 'hidden', class: ''});

		if(!value_only_main || value_only_main == 0){
			is_checked = false;
		} else {
			is_checked = true;
		}

		var daytime_dp = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=daytime_dp]");
		var label_daytime_dp = daytime_dp.parent().parent();
		var value_daytime_dp = daytime_dp.val();
		label_daytime_dp.find('[title =' + lang.daytime_dp + ']').hide();
		daytime_dp.attr({type: 'hidden', class: ''});

		if(!value_daytime_dp || value_daytime_dp == 0){
			is_checked_dd = false;
		} else {
			is_checked_dd = true;
		}

		var translit_dp = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=translit]");
		var label_translit_dp = translit_dp.parent().parent();
		var value_translit_dp = translit_dp.val();
		label_translit_dp.find('[title =' + lang.translit + ']').hide();
		translit_dp.attr({type: 'hidden', class: ''});

		if(!value_translit_dp || value_translit_dp == 0){
			is_checked_trans = false;
		} else {
			is_checked_trans = true;
		}

		$(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find('#widget_settings__fields_wrapper').css('display', 'none');

		var tagosago_templates = [
			{
				id: 0,
				option: 'Выберите шаблон'
			}
		];

		tagosago_templates.push({
			option: 'Редактор шаблонов',
			class_name: 'tagosago_edit_templates',
			id: -1
		});

		var tagosago_senders = [
			{
				id: 0,
				option: 'Выберите отправителя'
			}
		];

		var tagosago_recipients = [
			{
				id: 1,
				option: 'Контакты'
			},
			{
				id: 2,
				option: 'Ответственный'
			},
			{
				id: 3,
				option: 'Контакты/Ответственный'
			},
		];

		var macros_block = '<div id="tagosago_tp_macroses" class="custom-scroll">';
		var macros_tpl = '<div class="tag_osago_tpl_markers">' +
			'<div class="tag_osago_tpl_markers__title">' +
			'{{ macros_title }}' +
			'</div>' +
			'{% for item in macroses %}' +
			'<p class="marker-list__row"><span class="marker-list__tag-bot" data-marker="{{ item.macros }}">' +
			'<span class="tagosago_dp_marker_label">{{ item.macros }}</span></span>' +
			'<span class="marker-list__tag-descr"> - {{ item.title }} </span></p>' +
			'{% endfor %}' +
			'</div>';

		if (_.contains(['leads', 'leads-dp'], AMOCRM.data.current_entity)) {
			macros_block += self.render({data: macros_tpl}, {macroses: settings.leads_macros, macros_title: userLang.leadsMacroses})
		}
		if (_.contains(['customers', 'customers-dp'], AMOCRM.data.current_entity)) {
			macros_block += self.render({data: macros_tpl}, {macroses: settings.customers_macros, macros_title: userLang.customersMacroses})
		}
		if (_.contains(['leads', 'leads-dp', 'customers', 'customers-dp', 'contacts'], AMOCRM.data.current_entity)) {
			macros_block += self.render({data: macros_tpl}, {macroses: settings.contacts_macros, macros_title: userLang.contactsMacroses})
		}
		macros_block += self.render({data: macros_tpl}, {macroses: settings.companies_macros, macros_title: userLang.companyMacroses})

		macros_block += '</div>';

		var dp_content_block = '<div class="tagosago-form-dp">' +

			'<div class="tagosago-form-margin" id = "tagosago_wrap_tpl">' + self.render_select('tagosago_templates', tagosago_templates, '', '', 'tagosago_templates') + '</div>' +

			'<div class="tagosago-form-margin">' +
			self.render_textarea('tagosago_textarea', userLang.textSMS + '&hellip;', 'tagosago_dp_message', 'tagosago_dp_message', value_message) +
			'<input disabled=disabled id="tagosago_char_count">' +
			'</div>' +

			'<div class="tagosago-form-margin">'+ self.render_checkbox('tagosago_trans', userLang.ttTranslit, is_checked_trans, 'tagosago_trans', 'tagosago_trans_dp') +'</div>' +

			'<div class="tagosago-form-margin">Отправитель:</div>' +

			'<div class="tagosago-form-margin" id="tagosago_ss_cr">' + self.render_select('tagosago_senders', tagosago_senders, value_sender, '', 'tagosago_senders') + '</div>' +

			'<div class="tagosago-form-margin">Получатель:</div>' +

			'<div class="tagosago-form-margin">' + self.render_select('tagosago_recipients', tagosago_recipients, value_recipient, '', 'tagosago_dp_recipients') + '</div>' +

			'<div class="tagosago-form-margin" id = "tagosago_only_main_wrap">' + self.render_checkbox('tagosago_only_main', userLang.only_main, is_checked, '', 'tagosago_only_main') + '</div>' +

			'<div class="tagosago-form-margin">' + self.render_checkbox('tagosago_daytime_dp', userLang.daytime_dp, is_checked_dd, '', 'tagosago_daytime_dp') + '</div>' +

			'<div class="tagosago-form-margin">' + macros_block + '</div>' +

			'</div>';

		$(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find('#widget_settings__fields_wrapper').after(dp_content_block);

		if(value_recipient == 2){
			$("#tagosago_only_main_wrap").css('display', 'none');
		}

		var templates = self.get_templates();
		if(templates){
			self.build_templates(templates);
		}
		var senders = self.get_senders();
		if(senders){
			self.build_senders(senders);
		}

		self.count_chars($('#tagosago_dp_message'));

		return true;
	}
);