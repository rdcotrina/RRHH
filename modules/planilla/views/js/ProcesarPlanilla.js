/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-06-2015 16:06:47 
* Descripcion : ProcesarPlanilla.js
* ---------------------------------------
*/
var ProcesarPlanilla_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        planilla: "ProcesarPlanillaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idProcesarPlanilla = 0;
    
    _private.config = {
        modulo: "planilla/ProcesarPlanilla/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : ProcesarPlanilla*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.PRPLL,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                ProcesarPlanilla.getIndex();
            }
        });
    };
    
    /*index del tab: ProcesarPlanilla*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.PRPLL+"_CONTAINER").html(data);
                ProcesarPlanilla.getGridProcesarPlanilla(true);
            }
        });
    };
    
    _public.getGridProcesarPlanilla = function (reload){
        var pDelete = simpleScript.getPermiso("PRPLLGST");

        $("#"+tabs.PRPLL+"gridProcesarPlanilla").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.ProcesarPlanilla.TPLANILLA,campo: "id_tipo_proceso_planilla",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.ProcesarPlanilla.TPROCESO, campo: "tipo_proceso_planilla", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "CAMPO", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [ {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "ProcesarPlanilla.postDeleteProcesarPlanilla",
                    serverParams: "id_tipo_proceso_planilla"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridProcesarPlanilla",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewProcesarPlanilla = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewProcesarPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PRPLL+"formNewProcesarPlanilla").modal("show");
            }
        });
    };
    
    _public.getFormEditProcesarPlanilla = function(btn,id){
        _private.idProcesarPlanilla = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditProcesarPlanilla",
            fnServerParams: function(sData){
                sData.push({name: "_idProcesarPlanilla", value: _private.idProcesarPlanilla});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PRPLL+"formEditProcesarPlanilla").modal("show");
            }
        });
    };
    
    _public.postNewProcesarPlanilla = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.PRPLL+"btnGrProcesarPlanilla",
            root: _private.config.modulo + "newProcesarPlanilla",
            form: "#"+tabs.PRPLL+"formNewProcesarPlanilla",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            ProcesarPlanilla.getGridProcesarPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "ProcesarPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postEditProcesarPlanilla = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.PRPLL+"btnEdProcesarPlanilla",
            root: _private.config.modulo + "editProcesarPlanilla",
            form: "#"+tabs.PRPLL+"formEditProcesarPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idProcesarPlanilla", value: _private.idProcesarPlanilla});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idProcesarPlanilla = 0;
                            simpleScript.closeModal("#"+tabs.PRPLL+"formEditProcesarPlanilla");
                            ProcesarPlanilla.getGridProcesarPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "ProcesarPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postDeleteProcesarPlanilla = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.ProcesarPlanilla.MESS1,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteProcesarPlanilla",
                    fnServerParams: function(sData){
                        sData.push({name: "_idProcesarPlanilla", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: 'Planilla se proceso correctamente'
                            });
                        }
                    }
                });
            }
        });
    };
    
    return _public;
    
};
var ProcesarPlanilla = new ProcesarPlanilla_();

ProcesarPlanilla.main(); 