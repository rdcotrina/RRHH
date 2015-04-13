var GenerarContratoScript_ = function(){
    
    var _public = {};
    
    _public.addInputDate = function(oSettings){
        oSettings.fnUpdate({
            3: '<div class="smart-form"><div style="width:100%"><label class="input"><i class="icon-append fa fa-calendar"></i><input class="feini" type="text" name="'+tabs.GNCTR+'txt_fechacontratoini[]" disabled></label></div></div>',
            4: '<div class="smart-form"><div style="width:100%"><label class="input"><i class="icon-append fa fa-calendar"></i><input class="fefin" type="text" name="'+tabs.GNCTR+'txt_fechacontratofin[]" disabled></label></div></div>'
        });
        
        /*activar datepicker*/
        simpleScript.setEvent.dateRange({
            ini: '.feini',
            fin: '.fefin',
            opt: 'minDate'
        });
        simpleScript.setEvent.dateRange({
            ini: '.fefin',
            fin: '.feini',
            opt: 'maxDate'
        });
    };
    
    _public.addEvents = function(oSettings){
        /*eventos en cada check*/
        $('#'+oSettings.tObjectTable).find('tbody').find('tr').each(function(){
            var tr = $(this);
            var chk = tr.find('td:eq(0)').find('input:checkbox');
            $(chk).click(function(){
                if($(this).is(':checked')){
                    tr.find('td:eq(3)').find('input:text').prop('disabled',false);
                    tr.find('td:eq(4)').find('input:text').prop('disabled',false);
                }else{
                    tr.find('td:eq(3)').find('input:text').prop('disabled',true).val('');
                    tr.find('td:eq(4)').find('input:text').prop('disabled',true).val('');
                }
            });
        });
        /*evento en chek all*/
        $('#'+oSettings.tObjectTable+'_chkall_0').find('input:checkbox').off('click');
        $('#'+oSettings.tObjectTable+'_chkall_0').find('input:checkbox').click(function(){
            var d = $('#'+oSettings.tObjectTable).find('tbody tr');
            if ($(this).is(':checked')) {
                d.each(function() {
                    $(this).find(':checkbox').prop('checked', 'checked');
                    $(this).find('td:eq(3)').find('input:text').prop('disabled',false);
                    $(this).find('td:eq(4)').find('input:text').prop('disabled',false);
                });
            } else {
                d.each(function() {
                    $(this).find(':checkbox').prop('checked', '');
                    $(this).find('td:eq(3)').find('input:text').prop('disabled',true).val('');
                    $(this).find('td:eq(4)').find('input:text').prop('disabled',true).val('');
                });
            }
        });
    };
    
    _public.validateGrid = function(){
        var ok = [], marca = 0;
        
        $("#"+tabs.GNCTR+"gridSinContrato").find('tbody').find('tr').each(function(){
            var tr = $(this);
            var chk = tr.find('td:eq(0)').find('input:checkbox');
            var feini = tr.find('td:eq(3)').find('input:text');
            var fefin = tr.find('td:eq(4)').find('input:text');
                 
            feini.css('border','1px solid #cccccc');
            fefin.css('border','1px solid #cccccc');
                    
            if(chk.is(':checked')){
                marca = 1;
                ok.push(true);
                if(feini.val().length === 0){alert(18)
                    feini.css('border','1px solid #990000');
                    ok.push(false);
                }
                if(fefin.val().length === 0){alert(28)
                    fefin.css('border','1px solid #990000');
                    ok.push(false);
                }
            }
            
        });
        
        var error = true;
        for(var i in ok){
            if(ok[i] === false){
                error = false;
            }
        }
        
        if(marca === 0){
            error = false;
        }

        return error;
    };
    
    return _public;
};

var GenerarContratoScript = new GenerarContratoScript_();