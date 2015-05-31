/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-05-2015 07:05:13 
* Descripcion : AsistenciaManual.js
* ---------------------------------------
*/
var AsistenciaManual_ = function(){
    
    /*cargar requires*/
    //descomentar de ser necesario
    simpleObject.require({
        controlasistencia: "AsistenciaManualScript"
    });
    
    
    /*metodos privados*/
    var _private = {};
    
    _private.idAsistenciaManual = 0;
    _private.idAsistManTrab = 0;
    
    _private.config = {
        modulo: "controlasistencia/AsistenciaManual/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : AsistenciaManual*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.ASMN,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                AsistenciaManual.getIndex();
            }
        });
    };
    
    /*index del tab: AsistenciaManual*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.ASMN+"_CONTAINER").html(data);
                //AsistenciaManual.getGridAsistenciaManual(true);
            }
        });
    };
    
    _public.getCargaAsistenciaManualGrid = function (id){
        var btn=simpleScript.getPermiso("ASMNNEW");
        _private.idAsistManTrab=id;
        var verifica=AsistenciaManualScript.verificaSeleccionTrabajador(_private.idAsistManTrab);
        if(!verifica){
            simpleScript.notify.info({
                content: lang.AsistenciaManual.VERITRAB
            });
            return false;
        }
        $("#"+tabs.ASMN+"gridAsistenciaManual_btns").removeClass('hide');
        
        $("#"+tabs.ASMN+"contTable").html('<div id="'+tabs.ASMN+'gridAsistenciaManual_btns" class="hide">'+
        '<button id="'+tabs.ASMN+'btnNewAsistenciaManual" type="button" onclick="AsistenciaManual.getFormNewAsistenciaManual(this);" class="'+btn.theme+'">'+
            '<i class="'+btn.icono+'"></i>'+btn.accion+''+
        '</button>'+
    '</div>'+
    '<table id="'+tabs.ASMN+'gridAsistenciaManual" class="table table-striped table-hover table-condensed dataTable table-bordered" ></table>');
        AsistenciaManual.getGridAsistenciaManual(true);
    };
    
    
    _public.getGridAsistenciaManual = function (reload){
        var pEdit   = simpleScript.getPermiso("ASMNED");
        var pDelete = simpleScript.getPermiso("ASMNDE");

        $("#"+tabs.ASMN+"gridAsistenciaManual").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.AsistenciaManual.ORIGEN,campo: "origen",width: "70",sortable: true,},
                {title: lang.AsistenciaManual.FECHA, campo: "fecha", width: "180", sortable: true,search:{operator:"LIKE"},class: "center"},
                {title: lang.AsistenciaManual.HINGM, campo: "hora_ingreso_m", width: "180", sortable: true,class: "center"},
                {title: lang.AsistenciaManual.HSALM, campo: "hora_salida_m", width: "180", sortable: true,class: "center"},
                {title: lang.AsistenciaManual.HINGT, campo: "hora_ingreso_t", width: "180", sortable: true,class: "center"},
                {title: lang.AsistenciaManual.HSALT, campo: "hora_salida_t", width: "180", sortable: true,class: "center"},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "AsistenciaManual.getFormEditAsistenciaManual",
                    serverParams: "id_asistenciatrabajador"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "AsistenciaManual.postDeleteAsistenciaManual",
                    serverParams: "id_asistenciatrabajador"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridAsistenciaManual",
            fnServerParams: function(sData) {
                sData.push({name: "id_trabajador", value: _private.idAsistManTrab});
            },
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewAsistenciaManual = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewAsistenciaManual",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ASMN+"formNewAsistenciaManual").modal("show");
            }
        });
    };
    
    _public.getFormEditAsistenciaManual = function(btn,id){
        _private.idAsistenciaManual = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditAsistenciaManual",
            fnServerParams: function(sData){
                sData.push({name: "_idAsistenciaManual", value: _private.idAsistenciaManual});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ASMN+"formEditAsistenciaManual").modal("show");
            }
        });
    };
    
    _public.postNewAsistenciaManual = function(){
        var IngresoM=$("#"+tabs.ASMN+"txt_maniana_in").val();
        var SalidadM=$("#"+tabs.ASMN+"txt_maniana_sal").val();
        var IngresoT=$("#"+tabs.ASMN+"txt_tarde_in").val();
        var SalidadT=$("#"+tabs.ASMN+"txt_tarde_sal").val(); 
        var validaHora=AsistenciaManualScript.validaHorasIngreso(IngresoM,SalidadM,IngresoT,SalidadT);
        
        if(validaHora>1){
            switch (validaHora){
                case 2:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALMAN
                    });
                    break;
                case 3:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALMAN
                    });
                case 4:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTAR
                    });
                    break;
                case 5:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTAR
                    });
                case 6:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTARMAN
                    });
                    break;
                case 7:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTARMAN
                    });
                    break;
            }
            return false;
        }           
        
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.ASMN+"btnGrAsistenciaManual",
            root: _private.config.modulo + "newAsistenciaManual",
            form: "#"+tabs.ASMN+"formNewAsistenciaManual",
            clear: false,
            
            fnServerParams: function(sData) {
                sData.push({name: "id_trabajador", value: _private.idAsistManTrab});
            },
            //clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            AsistenciaManual.getGridAsistenciaManual(false);
                            simpleScript.closeModal("#" + tabs.ASMN + "formNewAsistenciaManual");                            
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.AsistenciaManual.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditAsistenciaManual = function(){
        var IngresoM=$("#"+tabs.ASMN+"txt_maniana_in").val();
        var SalidadM=$("#"+tabs.ASMN+"txt_maniana_sal").val();
        var IngresoT=$("#"+tabs.ASMN+"txt_tarde_in").val();
        var SalidadT=$("#"+tabs.ASMN+"txt_tarde_sal").val(); 
        var validaHora=AsistenciaManualScript.validaHorasIngreso(IngresoM,SalidadM,IngresoT,SalidadT);
        
        if(validaHora>1){
            switch (validaHora){
                case 2:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALMAN
                    });
                    break;
                case 3:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALMAN
                    });
                case 4:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTAR
                    });
                    break;
                case 5:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTAR
                    });
                case 6:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTARMAN
                    });
                    break;
                case 7:
                    simpleScript.notify.info({
                        content: lang.AsistenciaManual.VALTARMAN
                    });
                    break;
            }
            return false;
        }
        
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.ASMN+"btnEdAsistenciaManual",
            root: _private.config.modulo + "editAsistenciaManual",
            form: "#"+tabs.ASMN+"formEditAsistenciaManual",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idAsistenciaManual", value: _private.idAsistenciaManual});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idAsistenciaManual = 0;
                            simpleScript.closeModal("#"+tabs.ASMN+"formEditAsistenciaManual");
                            AsistenciaManual.getGridAsistenciaManual(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.AsistenciaManual.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteAsistenciaManual = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteAsistenciaManual",
                    fnServerParams: function(sData){
                        sData.push({name: "_idAsistenciaManual", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    AsistenciaManual.getGridAsistenciaManual(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    return _public;
    
};
var AsistenciaManual = new AsistenciaManual_();

AsistenciaManual.main(); 