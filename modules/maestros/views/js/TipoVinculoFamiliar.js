/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 16-03-2015 22:03:56 
* Descripcion : TipoVinculoFamiliar.js
* ---------------------------------------
*/
var TipoVinculoFamiliar_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        TipoVinculoFamiliar: "TipoVinculoFamiliarScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoVinculoFamiliar = 0;
    
    _private.config = {
        modulo: "maestros/TipoVinculoFamiliar/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoVinculoFamiliar*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.VNFA,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoVinculoFamiliar.getIndex();
            }
        });
    };
    
    /*index del tab: TipoVinculoFamiliar*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.VNFA+"_CONTAINER").html(data);
                TipoVinculoFamiliar.getGridTipoVinculoFamiliar(true);
            }
        });
    };
    
    _public.getGridTipoVinculoFamiliar = function (reload){
        var pEdit   = simpleScript.getPermiso("VNFAED");
        var pDelete = simpleScript.getPermiso("VNFADE");

        $("#"+tabs.VNFA+"gridTipoVinculoFamiliar").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoVinculoFamiliar.VICNULO, campo: "vinculofamiliar", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoVinculoFamiliar.getFormEditTipoVinculoFamiliar",
                    serverParams: "id_tipovinculofamiliar"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoVinculoFamiliar.postDeleteTipoVinculoFamiliar",
                    serverParams: "id_tipovinculofamiliar"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoVinculoFamiliar",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoVinculoFamiliar = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoVinculoFamiliar",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.VNFA+"formNewTipoVinculoFamiliar").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoVinculoFamiliar = function(btn,id){
        _private.idTipoVinculoFamiliar = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoVinculoFamiliar",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoVinculoFamiliar", value: _private.idTipoVinculoFamiliar});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.VNFA+"formEditTipoVinculoFamiliar").modal("show");
            }
        });
    };
    
    _public.postNewTipoVinculoFamiliar = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.VNFA+"btnGrTipoVinculoFamiliar",
            root: _private.config.modulo + "newTipoVinculoFamiliar",
            form: "#"+tabs.VNFA+"formNewTipoVinculoFamiliar",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoVinculoFamiliar.getGridTipoVinculoFamiliar(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoVinculoFamiliar.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoVinculoFamiliar = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.VNFA+"btnEdTipoVinculoFamiliar",
            root: _private.config.modulo + "editTipoVinculoFamiliar",
            form: "#"+tabs.VNFA+"formEditTipoVinculoFamiliar",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoVinculoFamiliar", value: _private.idTipoVinculoFamiliar});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoVinculoFamiliar = 0;
                            simpleScript.closeModal("#"+tabs.VNFA+"formEditTipoVinculoFamiliar");
                            TipoVinculoFamiliar.getGridTipoVinculoFamiliar(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoVinculoFamiliar.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoVinculoFamiliar = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoVinculoFamiliar",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoVinculoFamiliar", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoVinculoFamiliar.getGridTipoVinculoFamiliar(false);
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
var TipoVinculoFamiliar = new TipoVinculoFamiliar_();

TipoVinculoFamiliar.main(); 