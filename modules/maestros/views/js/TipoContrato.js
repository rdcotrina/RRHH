/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 23:02:52 
* Descripcion : TipoContrato.js
* ---------------------------------------
*/
var TipoContrato_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        TipoContrato: "TipoContratoScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoContrato = 0;
    
    _private.config = {
        modulo: "maestros/TipoContrato/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoContrato*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.CTPCT,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoContrato.getIndex();
            }
        });
    };
    
    /*index del tab: TipoContrato*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.CTPCT+"_CONTAINER").html(data);
                TipoContrato.getGridTipoContrato(true);
            }
        });
    };
    
    _public.getGridTipoContrato = function (reload){
        var pEdit   = simpleScript.getPermiso("CTPCTED");
        var pDelete = simpleScript.getPermiso("CTPCTDE");

        $("#"+tabs.CTPCT+"gridTipoContrato").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoContrato.TIPOCON, campo: "contrato", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoContrato.getFormEditTipoContrato",
                    serverParams: "id_tipocontrato"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoContrato.postDeleteTipoContrato",
                    serverParams: "id_tipocontrato"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoContrato",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoContrato = function(btn){
        simpleScript.addTab({
            id : tabs.CTPCT+'new',
            label: lang.TipoContrato.NEW,
            fnCallback: function(){
                simpleAjax.send({
                    dataType: 'html',
                    root: _private.config.modulo+'formNewTipoContrato',
                    fnCallback: function(data){
                        $('#'+tabs.CTPCT+'new_CONTAINER').html(data);
                    }
                });
            }
        });   
    };
    
    _public.getFormEditTipoContrato = function(btn,id){
        _private.idTipoContrato = id;
            
        simpleScript.addTab({
            id : tabs.CTPCT+'edit',
            label: lang.TipoContrato.EDIT,
            fnCallback: function(){
                simpleAjax.send({
                    dataType: 'html',
                    root: _private.config.modulo+'formEditTipoContrato',
                     data: '&_idTipoContrato='+_private.idTipoContrato,
                    fnCallback: function(data){
                        $('#'+tabs.CTPCT+'edit_CONTAINER').html(data);
                    }
                });
            }
        });    
    };
    
    _public.postNewTipoContrato = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.CTPCT+"btnGrTipoContrato",
            root: _private.config.modulo + "newTipoContrato",
            form: "#"+tabs.CTPCT+"formNewTipoContrato",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            simpleScript.closeTab(tabs.CTPCT+'new'); 
                            TipoContrato.getGridTipoContrato(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoContrato.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoContrato = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.CTPCT+"btnEdTipoContrato",
            root: _private.config.modulo + "editTipoContrato",
            form: "#"+tabs.CTPCT+"formEditTipoContrato",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoContrato", value: _private.idTipoContrato});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoContrato = 0;
                            simpleScript.closeTab(tabs.CTPCT+'edit'); 
                            TipoContrato.getGridTipoContrato(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoContrato.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoContrato = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoContrato",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoContrato", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoContrato.getGridTipoContrato(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteTipoContratoAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.CTPCT+"gridTipoContrato",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.CTPCT+"formGridTipoContrato",
                            root: _private.config.modulo + "deleteTipoContratoAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            TipoContrato.getGridTipoContrato(false);
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    };
    
    return _public;
    
};
var TipoContrato = new TipoContrato_();

TipoContrato.main(); 