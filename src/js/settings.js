window.tagosagoru.settings.push(
    function(self){
        var lang = self.i18n('userLang');
        var widget = self.i18n('widget');
        var save_button = $('button.js-widget-save');
        var install_button = $('button.js-widget-install');

        var dop_field = '<div class="widget_settings_block__item_field">' +
            self.render_checkbox('tagosago_confirm_ruls', lang.confirm_ruls, true, 'tagosago_confirm_ruls', 'tagosago_confirm_ruls') +
            '</div>';
        $('#widget_settings__fields_wrapper').prepend(dop_field);

        var err_field = '<div class="widget_settings_block__item_field">' +
            '<span id="tagosago_err_con"></span>' +
            '</div>';
        $('#widget_settings__fields_wrapper').append(err_field);

        $('[name="api_key"]').parent().css('width', '100%');
        $('[name="api_key"]').css('width', '100%');

        save_button.on('click',function() {
            return $('#tagosago_confirm_ruls').prop('checked') || !!self.notifications(widget.name, lang.confirm_text);
        });
        install_button.on('click',function() {
            return $('#tagosago_confirm_ruls').prop('checked') || !!self.notifications(widget.name, lang.confirm_text);
        });

        return true;
    }
);