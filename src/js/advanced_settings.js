window.tagosagoru.settings.push(
	function(self){
	// 	var lang = self.i18n('userLang');
	// 	var widget = self.i18n('widget');
	// 	var $work_area = $('#work-area-' + self.get_settings().widget_code),
	// 		$save_button = $(
	// 			Twig({ref: '/tmpl/controls/button.twig'}).render({
	// 			  text: 'Сохранить',
	// 			  class_name: 'button-input_blue button-input-disabled js-button-save-' + self.get_settings().widget_code,
	// 			  additional_data: ''
	// 			})
	// 		),
	// 		$cancel_button = $(
	// 			Twig({ref: '/tmpl/controls/cancel_button.twig'}).render({
	// 			  text: 'Отмена',
	// 			  class_name: 'button-input-disabled js-button-cancel-' + self.get_settings().widget_code,
	// 			  additional_data: ''
	// 			})
	// 		);

 //        	console.log('advancedSettings');

 //        $save_button.prop('disabled', true);
 //        $('.content__top__preset').css({float: 'left'});

 //        $('.list__body-right__top').css({display: 'block'})
 //          .append('<div class="list__body-right__top__buttons"></div>');
 //        $('.list__body-right__top__buttons').css({float: 'right'})
 //          .append($cancel_button)
 //          .append($save_button);

 //        self.getTemplate('advanced_settings', {}, function (template) {
 //          var $page = $(
 //            template.render({title: self.i18n('advanced').title, widget_code: self.get_settings().widget_code})
 //          );

 //          $work_area.append($page);
 //        });





		return true;
	}
);