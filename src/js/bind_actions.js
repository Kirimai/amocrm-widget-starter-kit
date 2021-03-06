window.tagosagoru.bind_actions.push(
	function(self) {
		var area = AMOCRM.getWidgetsArea(),
			lang = self.i18n('userLang'),
			settings = self.get_settings(),
			temp_tpl = settings.templates,
			tpid = 0,
			w_code = self.get_settings().widget_code,
			twig = require('twigjs');

		$(document).off('click', '.select2-selection__choice__remove').on('click', '.select2-selection__choice__remove', function (e) {
			e.stopPropagation();
			e.preventDefault();
		});

		$(document).on('change' + self.ns, '#tagosago_date', function () {
			var date = $(this).val(),
				time = $('#tagosago_time').val();
			result = lang.sending + ': ' + date + ' ' + time;
			if (date !== '') {
				$('#tagosago_sending_input').val(result);
			}
		});

		$(document).on('blur' + self.ns, '#tagosago_time', function () {
			var date = $('#tagosago_date').val(),
				time = $(this).val();
			result = lang.sending + ': ' + date + ' ' + time;
			if (date !== '' && time !== '') {
				$('#tagosago_sending_input').val(result);
			}
		});

		$(document).off('click', '.tagosago_sending_field').on('click', '.tagosago_sending_field', function (e) {
			var $popup = $('.tagosago_sending_popup');
			if ($popup.css('display') != 'block') {
				$popup.show();
				var firstClick = true;
				$(document).bind('click.closeEvent', function (e) {
					if (!firstClick && $(e.target).closest($popup).length == 0) {
						$popup.hide();
						$(document).unbind('click.closeEvent');
					}
					firstClick = false;
				});
			}
			e.preventDefault();
		});

		$(document).off('click', '.tagosago_edit_templates').on('click', '.tagosago_edit_templates', function (e) {
			var lang = self.i18n('userLang'), settings = self.get_settings();
			self.templates_editor(settings, lang);

			$('input#tagosago_templates').attr('value', -2);
			$('input#tagosago_templates').trigger('controls:change');
			$('input#tagosago_templates').trigger('controls:change:visual');
		});

		$(document).on('keyup' + self.ns, '#tagosago_smsmes', function () {
			var lang = self.i18n('userLang');
			var trans_template = self.render_checkbox('tagosago_trans', lang.ttTranslit, false, 'tagosago_trans', 'tagosago_trans');
			if ($(this).val().length > 0 && $('#tagosago_trans').length == 0) {
				$(".tagosago-block-translit").html(trans_template);
			} else if ($(this).val().length == 0 && $('#tagosago_trans').length != 0) {
				$(".tagosago-block-translit").html('');
			}
			self.count_chars($('#tagosago_smsmes'));
		});

		$(document).on('click' + self.ns, '#tagosago_sendbtn', function () {
			var phones = $('#tagosago-multiple-select').val();
			self.send_sms(phones, settings, lang);
		});

		$(document).on('change' + self.ns, '#tagosago_templates', function () {
			var selector = self.system().area == 'digital_pipeline' ? $('#tagosago_dp_message') : $('#tagosago_smsmes');
			sender_num = $('div#tagosago_wrap_tpl li.control--select--list--item-selected').data('value');

			if (sender_num == -1 && $('div.smscru-modal-window')){
				$('button.js-trigger-save').click();
			}

			self.get_sms_text(sender_num, selector);
		});

		$(document).on('click' + self.ns, '.tagosago_dp_marker_label', function (e) {
			var sms_msg_input = $('#tagosago_dp_message');
			self.insertTextAtCursor(document.getElementById('tagosago_dp_message'), $(this).text());
			sms_msg_input.keyup();
		});

		$(document).on('keyup paste', '#tagosago_dp_message', function () {
			var element = this;
			var message = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=message]");
			if ($(this).data('timeout')) {
				clearTimeout($(this).data('timeout'));
			}
			$(this).data('timeout', setTimeout(function () {
				message.val($(element).val()).change();
			}, 100));

			self.count_chars($('#tagosago_dp_message'));
		});

		$(document).on('change', '#tagosago_senders', function(){
			var area = self.system().area;
			if ($.inArray(area, ['digital_pipeline']) != -1) {
				var value = $(this).val();
				var sender = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=sender]");
				sender.val(value);
			}
		});

		$(document).on('change', '#tagosago_dp_recipients', function(){
			var value = $(this).val();
			if(value == 2){
				$("#tagosago_only_main_wrap").css('display', 'none');
			} else {
				$("#tagosago_only_main_wrap").css('display', 'block');
			}
			var recipients = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=recipients]");
			recipients.val(value);
		});

		$(document).on('change', '#tagosago_only_main', function(){
			var only_main = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=only_main]");
			if($(this).closest('label').hasClass('is-checked')){
				only_main.val(1);
			} else {
				only_main.val(0);
			}
		});

		$(document).on('change', '#tagosago_daytime_dp', function(){
			var daytime_dp = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=daytime_dp]");
			if($(this).closest('label').hasClass('is-checked')){
				daytime_dp.val(1);
			} else {
				daytime_dp.val(0);
			}
		});

		$(document).on('change', '#tagosago_trans_dp', function(){
			var trans_dp = $(".digital-pipeline__short-task_widget-style_" + w_code).parent().parent().find("input[name=translit]");
			if($(this).closest('label').hasClass('is-checked')){
				trans_dp.val(1);
			} else {
				trans_dp.val(0);
			}
		});

		$(document).on('change', '#tagosago_delayed', function(){
			var delayed = settings.lists ? settings.lists[0].delayed : 0;
			var daytime = settings.lists ? settings.lists[0].daytime : 0;
			if($(this).closest('label').hasClass('is-checked')){
				$('.tagosago-block-delayed').css('display', 'block');
				delayed = 1;
			} else {
				$('.tagosago-block-delayed').css('display', 'none');
				delayed = 0;
			}
			self.save_all_settings(settings, [{delayed: delayed, daytime: daytime}]);
		});

		$(document).on('change', '#tagosago_daytime', function(){
			var delayed = settings.lists ? settings.lists[0].delayed : 0;
			var daytime = settings.lists ? settings.lists[0].daytime : 0;
			if($(this).closest('label').hasClass('is-checked')){
				$('#tagosago_sending_wrapper').css('display', 'none');
				daytime = 1;
			} else {
				$('#tagosago_sending_wrapper').css('display', 'block');
				daytime = 0;
			}
			self.save_all_settings(settings, [{delayed: delayed, daytime: daytime}]);
		});

		$(document).off('click', '#tagosago_get_all_contact').on('click', '#tagosago_get_all_contact', function(){
			$('#tagosago_get_all_contact').trigger('button:load:start');

			var current_area;
			var search_area;

			var is_card_company = 0;
			var str_url = location.href;
			if(str_url.indexOf("companies") != -1 && str_url.indexOf("list") != -1){
				is_card_company = 1;
			}

			if(is_card_company) {
				current_area = 'company';
				search_area = 'companies';
			} else {
				current_area = 'contacts';
				search_area = 'contacts';
			}

			var Modal = require('lib/components/base/modal');

			var data ='<div class="modal-body__inner tagosago_progress">' +
				'<h2 class="modal-body__caption head_2 progress__header">Получение контактов...</h2>' +
				'<div class="progress__messages"></div>' +
				'<div class="progress__inner">' +
				'<div class="progress__status">' +
				'<div class="progress__filler" style="width: 0%;"></div>' +
				'<span class="progress__status-text">0%</span>' +
				'</div>' +
				'<div class="progress__bar-wrapper">' +
				'<div class="progress__bar" style="width: 0%;"></div>' +
				'</div>' +
				'</div>' +
				'</div>';

			modal = new Modal({
				class_name: 'modal modal-list modal-progress',
				can_centrify: !1,
				can_destroy: !1,
				disable_overlay_click: !0,
				init: function ($modal_body) {
					var $this = $(this);
					$modal_body
						.trigger('modal:loaded')
						.html(data)
						.trigger('modal:centrify')
						.append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span>');
				},
				destroy: function () {
				}
			});

			$('.tagosago_progress').closest('.modal-body').find('.modal-body__close').remove();
			$('.tagosago_progress').closest('.modal-scroller').css('pointer-events', 'none');

			var pagen = 1;

			tagosagoObject.value = 0;
			tagosagoObject.contacts = [];

			progres(pagen);

			function progres(pagen){
				var count_contact_text = $('.list-top-search__summary-text').text();
				var count_contact_text_arr = count_contact_text.split(' ');
				var count_contact = count_contact_text_arr[0];

				var xmlhttp = self.getXmlHttp();
				var body = '';
				var system = self.system();

				$.ajax({
					url: "/ajax/contacts/list/"+search_area+"/?json=1",
					type: "GET",
					dataType: "json",
					data: {
						ELEMENT_COUNT: 500,
						PAGEN_1: pagen,
					}
				}).done(function(data) {
					if(data.response.items && Object.keys(data.response.items).length > 0){
						var response = data.response.items;

						$.each(response, function(i, item){
							tagosagoObject.contacts.push({
								id: item.id,
								name: item.name.text,
								custom_fields: item.custom_fields,
							});
						});

						tagosagoObject.value = Number(tagosagoObject.value) + Number(response.length);
						var percent = Math.round(tagosagoObject.value * 100 / count_contact);

						$('.progress__filler').css('width', percent+'%');
						$('.progress__status-text').text(percent+'%');
						$('.progress__bar').css('width', percent+'%');
						if(percent < 100){
							pagen++;
							progres(pagen);
						} else {
							setTimeout(function() {
								modal.destroy();
								self.prepareSearch(current_area);
							}, 1000);
						}
					} else {
						setTimeout(function() {
							modal.destroy();
							self.prepareSearch(current_area);
						}, 1000);
					}
				});
			}
		});

		
		
		

		// Перенос ДК из программы в АМО
		$(document).off('click', '.tagosago_dk_pop').on('click', '.tagosago_dk_pop', function (e) {
			var Modal = require('lib/components/base/modal');
			new Modal({
				 // собственный класс для модального окна,
				 // если нужно в нем поменять какие-то стили
				 class_name: 'tagosago_dk_pop__modal modal-entity-merge modal-doubles-merge merge-form__modal modal-leads-merge',

				 // метод, отрабатывающий при
				 // готовности модального окна
				 // получает в параметр jQuery-объект $modal_body
				 // тела модального окна, все внутренности
				 // окна будут в нем
				 init: function($modal_body) {

				 	var loading_data ='<div class="modal-body__inner  modal-body_doubles-merge " id="tagosago_dk_pop__modal"></div>';
				 	var lang = self.i18n('userLang'), settings = self.get_settings();
				 	settings_names = self.i18n('settings');

					$modal_body
						.html(loading_data);
						// .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span>');

					card_data = $('#card_' + e.target.attributes[1].nodeValue );

					var childs = $(card_data).children(),
						fieldset = [],
						mergeresult = '',
						print_data = '';


					// Проходимся по полям, пришедшим с сайта
					for (var i = 1; i < childs.length - 1; i++)
					{
						field_id = $(childs[i]).attr('id');
						fieldset[ i ] = [];
						fieldset[ i ]['i'] = i;
						fieldset[ i ]['id'] = $(childs[i]).attr('id');
						fieldset[ i ]['lang'] = settings_names[fieldset[ i ]['id']];
						fieldset[ i ]['remote'] = $(childs[i]).text();
						fieldset[ i ]['local'] = self.get_settings_field_id( field_id );
						fieldset[ i ]['is_different'] = ( fieldset[ i ]['remote'] == fieldset[ i ]['local'] ? false : true );

						window.tagosagoru.mergeresult[ 'result_element_'+fieldset[ i ]['id'] ] = fieldset[ i ]['remote'];
					}

					// console.log('generated fieldset');
					// console.log(fieldset);

					self.getTemplate('diag_card_transfer',
						function (template) {
							$('#tagosago_dk_pop__modal').append(
								template.render({
									'lang':lang,
									'fieldset':fieldset
								})
							);							
						}
					);
					$('.tagosago_dk_pop__modal .modal-body').addClass('merge-modal__body').addClass('modal-body-relative');
					$modal_body
						.trigger('modal:loaded')
						.trigger('modal:centrify')
					

				 },

				 // кастомный `destroy`, может вернуть `false`,
				 // тогда закрытия окна не произойдет
				 destroy: _.noop,

				 // контейнер, куда попадет
				 // модальное окно и относительно
				 // какого элемента будет центрироваться
				 container: document.body,

				 // если нужно запретить закрытие модального окна
				 // по клику на оверлэе, просто передаем в options
				 // `disable_overlay_click`
				 disable_overlay_click: false,

				 // если нужно запретить закрытие модального окна
				 // по нажатию на escape
				 disable_escape_keydown: false,

				 // если нужно запретить дефолтную обработку enter
				 disable_enter_keydown: false,

				 // параметр отвечает за анимацию всплывания
				 // модального окна, если передать `true`,
				 // то оно запустится с анимацией увеличения и появления
				 init_animation: false,

				 // по умолчанию оверлей у модалок белый,
				 // изменить если нужен темный оверлей
				 default_overlay: false,

				 // элемент, который получает фокус,
				 // по умолчанию это кнопка акцепта. нужен для того,
				 // чтобы снимать фокус с кнопки вызвавшей событие
				 focus_element: '.js-modal-accept',
			});
			
		});

		$(document).on('change', '#diag_transfer_form .merge-form__radio-control input:checked', function(e) {
			var field_id = $(this).attr('name');
			var field_val = $(this).val();
			// console.log('id:'+field_id+' val:'+field_val);
			window.tagosagoru.mergeresult[field_id] = field_val;
			$('#'+field_id+' .form-result__text').text(field_val);
		});

		$(document).on('click', '#tagosago_dk_pop__modal .modal-body__actions__save', function(e) {
			console.log('save');
			// res_data = self.object2array( window.tagosagoru.mergeresult );
			res_data = window.tagosagoru.mergeresult;
			for (const [key, value] of Object.entries(res_data)) {
				field_name =  key.substring(15,key.length);
				console.log(field_name+`: ${value}`);
				self.set_settings_field_id(field_name,value);
			}
			$('.modal').remove();
			// res_data.forEach((v,i) =>{
			// 	field_name =  res_data[i].substring(14,res_data[i].length);
			// 	console.log(field_name+':'+field_name);
			// 	self.set_settings_field_id(field_name,v);
			// });
		})

		$(document).off('click', '.tagosago_get_diagbtn').on('click', '.tagosago_get_diagbtn', function(){
			$(this).attr('disabled');
			self.getTemplate('loading', function(template) {
				$('.to_loading').remove();
				$('#to_list').append(
					template.render({
							// id: 'to_loading',
							classname: 'to_loading'
						}
					)
				)
			});
			if ($(this).attr('id') == 'tagosago_get_diagbtn_vin') {
				dataarr = {
					'_element': 'data',
					'_action': 'tosearch',
					'json' : 'true',
					'car_vin': self.get_settings_field_id("to_car_vin", self)
				};
			}
			if ($(this).attr('id') == 'tagosago_get_diagbtn_plate') {
				dataarr = {
					'_element': 'data',
					'_action': 'tosearch',
					'json' : 'true',
					'car_plate': self.get_settings_field_id("to_car_plate", self)
				};
			}
			if (dataarr) {

				self.crm_post(
					'https://tag-osago.ru/to/search',
					dataarr,
					function (msg) {
						console.log(msg);
						$('#to_list').html('');

						if ( !msg.error ) {

							self.getTemplate('tagosago_diags', function(template) {
								$('#to_list').append(
									template.render({
											id: 'tagosago_diags',
											items: msg
										}
									)
								)
							});
							// self.set_settings_field_id('to_car_vin',msg[0]['car_vin'],self);
						} else {

							self.getTemplate('tagosago_diags_404', function(template) {
								$('#to_list').append(
									template.render({
											id: 'tagosago_diags'
										}
									)
								)
							});
						}



						$('.to_loading').remove();
					},
					'json',
					function () {
						$('#to_list').html('');
						$('.to_loading').remove();
						$(this).removeAttr('disabled');
						console.log('Error');
					}
				);
			} else {
				
			}
		});



		return true;
	}
);