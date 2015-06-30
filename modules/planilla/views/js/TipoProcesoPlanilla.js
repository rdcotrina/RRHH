/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 15-06-2015 20:06:41 
* Descripcion : TipoProcesoPlanilla.js
* ---------------------------------------
*/
var TipoProcesoPlanilla_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        planilla: "TipoProcesoPlanillaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoProcesoPlanilla = 0;
    
    _private.config = {
        modulo: "planilla/TipoProcesoPlanilla/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoProcesoPlanilla*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.GTPP,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoProcesoPlanilla.getIndex();
            }
        });
    };
    
    /*index del tab: TipoProcesoPlanilla*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.GTPP+"_CONTAINER").html(data);
                TipoProcesoPlanilla.getGridTipoProcesoPlanilla(true);
            }
        });
    };
    
    _public.getGridTipoProcesoPlanilla = function (reload){
        var pEdit   = simpleScript.getPermiso("GTPPED");
        var pDelete = simpleScript.getPermiso("GTPPDE");

        $("#"+tabs.GTPP+"gridTipoProcesoPlanilla").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoProcesoPlanilla.TPLANILLA,campo: "id_tipo_proceso_planilla",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.TipoProcesoPlanilla.TPROCESO, campo: "tipo_proceso_planilla", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "CAMPO", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoProcesoPlanilla.getFormEditTipoProcesoPlanilla",
                    serverParams: "id_tipo_proceso_planilla"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoProcesoPlanilla.postDeleteTipoProcesoPlanilla",
                    serverParams: "id_tipo_proceso_planilla"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoProcesoPlanilla",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoProcesoPlanilla = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoProcesoPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.GTPP+"formNewTipoProcesoPlanilla").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoProcesoPlanilla = function(btn,id){
        _private.idTipoProcesoPlanilla = id;
          //  alert(id);
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoProcesoPlanilla",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoProcesoPlanilla", value: _private.idTipoProcesoPlanilla});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.GTPP+"formEditTipoProcesoPlanilla").modal("show");
            }
        });
    };
    
    _public.postNewTipoProcesoPlanilla = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.GTPP+"btnGrTipoProcesoPlanilla",
            root: _private.config.modulo + "newTipoProcesoPlanilla",
            form: "#"+tabs.GTPP+"formNewTipoProcesoPlanilla",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoProcesoPlanilla.getGridTipoProcesoPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoProcesoPlanilla.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoProcesoPlanilla = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.GTPP+"btnEdTipoProcesoPlanilla",
            root: _private.config.modulo + "editTipoProcesoPlanilla",
            form: "#"+tabs.GTPP+"formEditTipoProcesoPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoProcesoPlanilla", value: _private.idTipoProcesoPlanilla});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoProcesoPlanilla = 0;
                            simpleScript.closeModal("#"+tabs.GTPP+"formEditTipoProcesoPlanilla");
                            TipoProcesoPlanilla.getGridTipoProcesoPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoProcesoPlanilla.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoProcesoPlanilla = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoProcesoPlanilla",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoProcesoPlanilla", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoProcesoPlanilla.getGridTipoProcesoPlanilla(false);
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
var TipoProcesoPlanilla = new TipoProcesoPlanilla_();

TipoProcesoPlanilla.main(); 