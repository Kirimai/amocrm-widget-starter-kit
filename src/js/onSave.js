window.tagosagoru.onSave.push(
    function(self){
        var lang = self.i18n('settings');
        var settings = self.get_settings();
        var api_key = $("input[name='api_key']").val();
        $.ajax({
            type: 'GET',
            url: 'https://sms.ru/my/balance?api_id='+api_key+'&json=1',
            success: function (data) {
                if(data.status === "OK" && data.balance){
                    $('#tagosagoru_err_con').attr('style', 'color: green');
                    $('#tagosagoru_err_con').text(lang.success);
                } else {
                    $('#tagosagoru_err_con').attr('style', 'color: red');
                    $('#tagosagoru_err_con').text(lang.fail);
                }
            }
        });
        return true;
    }
);