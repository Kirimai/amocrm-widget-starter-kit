window.tagosagoru.customers.push(
	function(self){
		$('#tag_osago__multiple-select').empty();
		$('#tagosagoru_err').empty();
		var c_data = self.list_selected().selected;

		self.set_settings({c_data: c_data});
		self.get_customers_phones(c_data);
		return true;
	}
);