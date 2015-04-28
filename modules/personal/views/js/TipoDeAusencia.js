var TipoDeAusencia_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        TipoDeAusencia: "TipoDeAusenciaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoDeAusencia = 0;
    
    _private.config = {
        modulo: "personal/TipoDeAusencia/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoDeAusencia*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.TAUS,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoDeAusencia.getIndex();
            }
        });
    };
    
    /*index del tab: TipoDeAusencia*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.TAUS+"_CONTAINER").html(data);
                TipoDeAusencia.getGridTipoDeAusencia(true);
            }
        });
    };
    
    _public.getGridTipoDeAusencia = function (reload){
        var pEdit   = simpleScript.getPermiso("TAUSED");
        var pDelete = simpleScript.getPermiso("TAUSDE");

        $("#"+tabs.TAUS+"gridTipoDeAusencia").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoDeAusencia.TIPOAUSENCIA, campo: "tipo_ausencia", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.TipoDeAusencia.GRUPO,campo: "grupo_ausencia",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoDeAusencia.getFormEditTipoDeAusencia",
                    serverParams: "id_tipo_ausencia"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoDeAusencia.postDeleteTipoDeAusencia",
                    serverParams: "id_tipo_ausencia"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoDeAusencia",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoDeAusencia = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoDeAusencia",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TAUS+"formNewTipoDeAusencia").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoDeAusencia = function(btn,id){
        _private.idTipoDeAusencia = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoDeAusencia",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoDeAusencia", value: _private.idTipoDeAusencia});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TAUS+"formEditTipoDeAusencia").modal("show");
            }
        });
    };
    
    _public.postNewTipoDeAusencia = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.TAUS+"btnGrTipoDeAusencia",
            root: _private.config.modulo + "newTipoDeAusencia",
            form: "#"+tabs.TAUS+"formNewTipoDeAusencia",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoDeAusencia.getGridTipoDeAusencia(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoDeAusencia.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditTipoDeAusencia = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.TAUS+"btnEdTipoDeAusencia",
            root: _private.config.modulo + "editTipoDeAusencia",
            form: "#"+tabs.TAUS+"formEditTipoDeAusencia",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoDeAusencia", value: _private.idTipoDeAusencia});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoDeAusencia = 0;
                            simpleScript.closeModal("#"+tabs.TAUS+"formEditTipoDeAusencia");
                            TipoDeAusencia.getGridTipoDeAusencia(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.TipoDeAusencia.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoDeAusencia = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoDeAusencia",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoDeAusencia", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoDeAusencia.getGridTipoDeAusencia(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteTipoDeAusenciaAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.TAUS+"gridTipoDeAusencia",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.TAUS+"formGridTipoDeAusencia",
                            root: _private.config.modulo + "deleteTipoDeAusenciaAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            TipoDeAusencia.getGridTipoDeAusencia(false);
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
var TipoDeAusencia = new TipoDeAusencia_();

TipoDeAusencia.main(); 