window.tagosagoru.contacts.push(
	function(self){
		$('#tag_osago__multiple-select').empty();
		$('#tagosago_err').empty();
		var phones = [];
		var c_data = self.list_selected().selected;

		self.set_settings({c_data: c_data});
		$('#js-sub-lists-container').children().remove();
		var length = c_data.length;

		for (var i = 0; i < c_data.length; i++) {
			for (var j = 0; j < c_data[i].phones.length; j++) {
				ph = c_data[i].phones[j].trim().match(/^\+?(?:[- ()]*\d[- ()]*){10,15}$/);
				if (ph) {
					phones.push({
						id: ph[0],
						text: ph[0]
					});
				}
			}
		}

		$('#tagosago-multiple-select').select2({
			placeholder: "Список получателей",
			data: phones,
			tags: true,
			width: '100%',
		});

		$("#tagosago-multiple-select").val(self.selectAllContacts()).trigger("change");
		$('#tagosago-multiple-select').parent().find('.select2-selection__rendered').addClass('custom-scroll');

		$('.select2-selection__rendered').addClass('custom-scroll');
		$('.multiple-select').on('select2:open', function () {
			$('.select2-selection__rendered, .select2-results__options').addClass('custom-scroll');
		});
		return true;
	}
);