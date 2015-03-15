/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 18:02:03 
* Descripcion : TipoDocId.js
* ---------------------------------------
*/
var TipoDocId_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        TipoDocId: "TipoDocIdScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoDocId = 0;
    
    _private.config = {
        modulo: "maestros/TipoDocId/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoDocId*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.TDCID,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoDocId.getIndex();
            }
        });
    };
    
    /*index del tab: TipoDocId*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.TDCID+"_CONTAINER").html(data);
                TipoDocId.getGridTipoDocId(true);
            }
        });
    };
    
    _public.getGridTipoDocId = function (reload){
        var pEdit   = simpleScript.getPermiso("TDCIDED");
        var pDelete = simpleScript.getPermiso("TDCIDDE");

        $("#"+tabs.TDCID+"gridTipoDocId").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoDocId.TIPODOC,campo: "tipodocumentoidentidad",width: "370",sortable: true,search: {operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoDocId.getFormEditTipoDocId",
                    serverParams: "id_tipodocumentoidentidad"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoDocId.postDeleteTipoDocId",
                    serverParams: "id_tipodocumentoidentidad"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoDocId",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoDocId = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoDocId",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TDCID+"formNewTipoDocId").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoDocId = function(btn,id){
        _private.idTipoDocId = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoDocId",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoDocId", value: _private.idTipoDocId});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TDCID+"formEditTipoDocId").modal("show");
            }
        });
    };
    
    _public.postNewTipoDocId = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.TDCID+"btnGrTipoDocId",
            root: _private.config.modulo + "newTipoDocId",
            form: "#"+tabs.TDCID+"formNewTipoDocId",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoDocId.getGridTipoDocId(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoDocId.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoDocId = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.TDCID+"btnEdTipoDocId",
            root: _private.config.modulo + "editTipoDocId",
            form: "#"+tabs.TDCID+"formEditTipoDocId",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoDocId", value: _private.idTipoDocId});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoDocId = 0;
                            simpleScript.closeModal("#"+tabs.TDCID+"formEditTipoDocId");
                            TipoDocId.getGridTipoDocId(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoDocId.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoDocId = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoDocId",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoDocId", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoDocId.getGridTipoDocId(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteTipoDocIdAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.TDCID+"gridTipoDocId",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.TDCID+"formGridTipoDocId",
                            root: _private.config.modulo + "deleteTipoDocIdAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            TipoDocId.getGridTipoDocId(false);
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
var TipoDocId = new TipoDocId_();

TipoDocId.main(); 