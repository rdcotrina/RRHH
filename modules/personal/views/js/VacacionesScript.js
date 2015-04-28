var VacacionesScript_ = function(){
    
    var _public = {};
    
    _public.setData = function(data,i){
       // $('#'+tabs.VACA+'txt_tipovacaciones').val(data[i].tipo_ausencia);
      // alert(data[i].id_tipo_ausencia)
        $('#'+tabs.VACA+'txt_fechainicio').val(data[i].fecha_inicio);
        $('#'+tabs.VACA+'txt_fechafin').val(data[i].fecha_fin);
        $('#'+tabs.VACA+'txt_dias').val(data[i].dias_ausencia);
        $('#'+tabs.VACA+'txt_fechaproceso').val(data[i].fec_proc_planilla);
        $('#'+tabs.VACA+'txt_comentario').val(data[i].comentario);
        $('#'+tabs.VACA+'lst_tipovac').attr('disabled',true);
        simpleScript.updateChosen({element:'#'+tabs.VACA+'lst_tipovac',value: data[i].id_tipo_ausencia });       
    };
    
    return _public;
    
};


   
var VacacionesScript = new VacacionesScript_();

