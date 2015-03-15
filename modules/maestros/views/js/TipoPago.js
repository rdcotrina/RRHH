/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 19:02:59 
* Descripcion : TipoPago.js
* ---------------------------------------
*/
var TipoPago_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        TipoPago: "TipoPagoScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoPago = 0;
    
    _private.config = {
        modulo: "maestros/TipoPago/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoPago*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.PTPG,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoPago.getIndex();
            }
        });
    };
    
    /*index del tab: TipoPago*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.PTPG+"_CONTAINER").html(data);
                TipoPago.getGridTipoPago(true);
            }
        });
    };
    
    _public.getGridTipoPago = function (reload){
        var pEdit   = simpleScript.getPermiso("PTPGED");
        var pDelete = simpleScript.getPermiso("PTPGDE");

        $("#"+tabs.PTPG+"gridTipoPago").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoPago.TIPOPAGO,campo: "tipopago",width: "370",sortable: true,search: {operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoPago.getFormEditTipoPago",
                    serverParams: "id_tipopago"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoPago.postDeleteTipoPago",
                    serverParams: "id_tipopago"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoPago",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoPago = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoPago",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PTPG+"formNewTipoPago").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoPago = function(btn,id){
        _private.idTipoPago = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoPago",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoPago", value: _private.idTipoPago});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PTPG+"formEditTipoPago").modal("show");
            }
        });
    };
    
    _public.postNewTipoPago = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.PTPG+"btnGrTipoPago",
            root: _private.config.modulo + "newTipoPago",
            form: "#"+tabs.PTPG+"formNewTipoPago",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoPago.getGridTipoPago(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoPago.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoPago = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.PTPG+"btnEdTipoPago",
            root: _private.config.modulo + "editTipoPago",
            form: "#"+tabs.PTPG+"formEditTipoPago",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoPago", value: _private.idTipoPago});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoPago = 0;
                            simpleScript.closeModal("#"+tabs.PTPG+"formEditTipoPago");
                            TipoPago.getGridTipoPago(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoPago.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoPago = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoPago",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoPago", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoPago.getGridTipoPago(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteTipoPagoAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.PTPG+"gridTipoPago",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.PTPG+"formGridTipoPago",
                            root: _private.config.modulo + "deleteTipoPagoAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            TipoPago.getGridTipoPago(false);
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
var TipoPago = new TipoPago_();

TipoPago.main(); 