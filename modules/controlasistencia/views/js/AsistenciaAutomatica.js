/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-06-2015 19:06:09 
* Descripcion : AsistenciaAutomatica.js
* ---------------------------------------
*/
var AsistenciaAutomatica_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        controlasistencia: "AsistenciaAutomaticaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idAsistenciaAutomatica = 0;
    
    _private.config = {
        modulo: "controlasistencia/AsistenciaAutomatica/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : AsistenciaAutomatica*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.ASAUT,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                AsistenciaAutomatica.getIndex();
            }
        });
    };
    
    /*index del tab: AsistenciaAutomatica*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.ASAUT+"_CONTAINER").html(data);
               // AsistenciaAutomatica.getGridAsistenciaAutomatica(true);
            }
        });
    };
 
    _public.postNewAsistenciaAutomatica = function(){
        
        simpleAjax.send({
            flag: 1,
            //element: "#"+tabs.ASAUT+"btnGrAsistenciaAutomatica",
            root: _private.config.modulo + "newAsistenciaAutomatica",
            form: "#"+tabs.ASAUT+"formNewAsistenciaAutomatica",
            clear: true,
            fnCallback: function(data) {
                if($('#'+tabs.ASAUT+'txt_codDetectado').val()=='' || $('#'+tabs.ASAUT+'txt_codDetectado').val()==0){
                    return false;
                }
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                        /*,
                        callback: function(){
                            AsistenciaAutomatica.getGridAsistenciaAutomatica(false);
                        }
                        */
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.AsistenciaAutomatica.EXIST
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 3){
                    simpleScript.notify.error({
                        content: lang.AsistenciaAutomatica.TNIDENT
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 4){
                    simpleScript.notify.error({
                        content: lang.AsistenciaAutomatica.HORAIC
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 5){
                    simpleScript.notify.error({
                        content: lang.AsistenciaAutomatica.FHORA
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 6){
                    simpleScript.notify.error({
                        content: lang.AsistenciaAutomatica.DNLBRL
                    });
                }
            }
        });
    };
    

    return _public;
    
};
var AsistenciaAutomatica = new AsistenciaAutomatica_();

AsistenciaAutomatica.main(); 