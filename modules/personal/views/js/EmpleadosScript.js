var EmpleadosScript_ = function(){
    
    var _public = {};
    
    _public.setDerechohabiente = function(data){
        $('#'+tabs.EMPL+'lst_tiovinculofamiliar').val(data.id_tipovinculofamiliar);
        $('#'+tabs.EMPL+'lst_tipodoc').val(data.id_tipodocumentoidentidad);
        $('#'+tabs.EMPL+'txt_numdocumento').val(data.numerodocumento);
        $('#'+tabs.EMPL+'txt_nombres').val(data.nombres);
        $('#'+tabs.EMPL+'txt_apellidos').val(data.apellidos);
        $('#'+tabs.EMPL+'chk_sexo'+data.sexo).attr('checked',true);
        $('#'+tabs.EMPL+'txt_email').val(data.email);
        $('#'+tabs.EMPL+'txt_telefono').val(data.telefonos);
        $('#'+tabs.EMPL+'lst_departamentodh').val(data.id_ubigeodireccion.substring(0,2));
        $('#'+tabs.EMPL+'txt_direccion').val(data.direccion);
        $('#'+tabs.EMPL+'dp a').tab('show');
    };
    
    return _public;
    
};
var EmpleadosScript = new EmpleadosScript_();