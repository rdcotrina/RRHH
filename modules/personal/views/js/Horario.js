/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 29-03-2015 23:03:37 
* Descripcion : Horario.js
* ---------------------------------------
*/
var Horario_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        personal: "HorarioScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idHorario = 0;
    
    _private.config = {
        modulo: "personal/Horario/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Horario*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.HRIO,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Horario.getIndex();
            }
        });
    };
    
    /*index del tab: Horario*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.HRIO+"_CONTAINER").html(data);
                Horario.getGridHorario(true);
            }
        });
    };
    
    _public.getGridHorario = function (reload){
        var pEdit   = simpleScript.getPermiso("HRIOED");
        var pDelete = simpleScript.getPermiso("HRIODE");

        $("#"+tabs.HRIO+"gridHorario").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Horario.HORA,campo: "horario",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Horario.INMA, campo: "hora_ingreso_m", width: "90", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Horario.SALMA, campo: "hora_salida_m", width: "90", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Horario.INTA, campo: "hora_ingreso_t", width: "90", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Horario.SALTA, campo: "hora_salida_t", width: "90", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Horario.getFormEditHorario",
                    serverParams: "id_horario"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Horario.postDeleteHorario",
                    serverParams: "id_horario"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridHorario",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewHorario = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewHorario",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.HRIO+"formNewHorario").modal("show");
            }
        });
    };
    
    _public.getFormEditHorario = function(btn,id){
        _private.idHorario = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditHorario",
            fnServerParams: function(sData){
                sData.push({name: "_idHorario", value: _private.idHorario});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.HRIO+"formEditHorario").modal("show");
            }
        });
    };
    
    _public.postNewHorario = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.HRIO+"btnGrHorario",
            root: _private.config.modulo + "newHorario",
            form: "#"+tabs.HRIO+"formNewHorario",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Horario.getGridHorario(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Horario.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditHorario = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.HRIO+"btnEdHorario",
            root: _private.config.modulo + "editHorario",
            form: "#"+tabs.HRIO+"formEditHorario",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idHorario", value: _private.idHorario});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idHorario = 0;
                            simpleScript.closeModal("#"+tabs.HRIO+"formEditHorario");
                            Horario.getGridHorario(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Horario.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteHorario = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteHorario",
                    fnServerParams: function(sData){
                        sData.push({name: "_idHorario", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Horario.getGridHorario(false);
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
var Horario = new Horario_();

Horario.main(); 