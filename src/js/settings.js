window.tagosagoru.settings.push(
	function(self){
		var lang = self.i18n('userLang');
		var widget = self.i18n('widget');
		var save_button = $('button.js-widget-save');
		var install_button = $('button.js-widget-install');

		// dop_field
		var dop_field = '<div class="widget_settings_block__item_field">' +
			self.render_checkbox('tagosago_confirm_ruls', lang.confirm_ruls, true, 'tagosago_confirm_ruls', 'tagosago_confirm_ruls') +
			'</div>';
		$('#widget_settings__fields_wrapper').prepend(dop_field);

		// err_field
		var err_field = '<div class="widget_settings_block__item_field">' +
			'<span id="tagosago_err_con"></span>' +
			'</div>';
		$('#widget_settings__fields_wrapper').append(err_field);

		// CSS
		$('[name="api_key"]').parent().css('width', '100%');
		$('[name="api_key"]').css('width', '100%');

		// self.set_macros_names();
		// self.get_settings();

		// self.settings_cf("to_card_id");
		// self.settings_cf("to_car_body");
		// self.settings_cf("to_car_document_date");
		// self.settings_cf("to_car_document_id");
		// self.settings_cf("to_car_document_organization");
		// self.settings_cf("to_car_document_series");
		// self.settings_cf("to_car_document_type_regtalon");
		// self.settings_cf("to_sended_to_eaisto");
		// self.settings_cf("to_car_frame");
		// self.settings_cf("to_car_mark");
		// self.settings_cf("to_car_max_weight");
		// self.settings_cf("to_car_mileage");
		// self.settings_cf("to_car_model");
		// self.settings_cf("to_car_plate");
		// self.settings_cf("to_car_vin");
		// self.settings_cf("to_car_weight");
		// self.settings_cf("to_car_year");
		// self.settings_cf("to_card_comment");
		// self.settings_cf("to_card_expires");
		// self.settings_cf("to_card_insurance_cost");
		// self.settings_cf("to_card_number");
		// self.settings_cf("to_card_price");
		// self.settings_cf("to_checkout_status");
		// self.settings_cf("to_first_name");
		// self.settings_cf("to_last_name");
		// self.settings_cf("to_middle_name");
		// self.settings_cf("to_send_data");
		// self.settings_cf("to_save_data");
		// self.settings_cf("to_tire_brand");
		// self.settings_cf("to_author_id");
		// self.settings_cf("to_fuel_id");
		// self.settings_cf("to_car_type_two_id");
		// self.settings_cf("to_car_type_id");
		// self.settings_cf("to_brakes_id");
		// self.settings_cf("to_expert_id");
		// self.settings_cf("to_inspect_point_id");
		// self.settings_cf("to_eaisto_id");
		// self.settings_cf("to_phone");
		// self.settings_cf("to_client_id");
		// self.settings_cf("to_company_id");
		// self.settings_cf("to_note");
		// self.settings_cf("to_pay_by_terminal");
		// self.settings_cf("to_office_id");
		// self.settings_cf("to_tachograph_serial_number");
		// self.settings_cf("to_for_six_months");
		// self.settings_cf("to_engine_type_id");
		// self.settings_cf("to_legal_entity_id");
		// self.settings_cf("to_tachograph_model");
		// self.settings_cf("to_tachograph_brand");
		// self.settings_cf("to_danger");
		// self.settings_cf("to_taxi");
		// self.settings_cf("to_spec");
		// self.settings_cf("to_studying");

		$('#widget_settings__fields_wrapper').append(err_field);




		// save
		save_button.on('click',function() {
			return $('#tagosago_confirm_ruls').prop('checked') || !!self.notifications(widget.name, lang.confirm_text);
		});

		install_button.on('click',function() {
			return $('#tagosago_confirm_ruls').prop('checked') || !!self.notifications(widget.name, lang.confirm_text);
		});

		return true;
	}
);