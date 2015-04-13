/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-01-2015 15:01:09 
* Descripcion : subClasificador.js
* ---------------------------------------
*/
var subClasificador_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        subClasificador: "subClasificadorScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idSubClasificador = 0;
    
    _private.config = {
        modulo: "maestros/subClasificador/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : SubClasificador*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.SBCLF,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                subClasificador.getIndex();
            }
        });
    };
    
    /*index del tab: SubClasificador*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.SBCLF+"_CONTAINER").html(data);
                subClasificador.getGridSubClasificador(true);
            }
        });
    };
    
    _public.getGridSubClasificador = function (reload){
        var pEdit   = simpleScript.getPermiso("SBCLFED");
        var pDelete = simpleScript.getPermiso("SBCLFDE");

        $("#"+tabs.SBCLF+"gridSubClasificador").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigosc",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.subClasificador.SUBCLASI, campo: "subclasificador", width: "230", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: "clasificador", width: "230", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadosc", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "subClasificador.getFormEditSubClasificador",
                    serverParams: "id_subclasificador"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "subClasificador.postDeleteSubClasificador",
                    serverParams: "id_subclasificador"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridSubClasificador",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewSubClasificador = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewSubClasificador",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SBCLF+"formNewSubClasificador").modal("show");
            }
        });
    };
    
    _public.getFormEditSubClasificador = function(btn,id){
        _private.idSubClasificador = id;
          
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditSubClasificador",
            fnServerParams: function(sData){
                sData.push({name: "_idSubClasificador", value: _private.idSubClasificador});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SBCLF+"formEditSubClasificador").modal("show");
            }
        });
    };
    
    _public.postNewSubClasificador = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.SBCLF+"btnGrSubClasificador",
            root: _private.config.modulo + "newSubClasificador",
            form: "#"+tabs.SBCLF+"formNewSubClasificador",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            subClasificador.getGridSubClasificador(false);
                            simpleScript.updateChosen({element: '#'+tabs.SBCLF+'lst_clasificador'});
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.subClasificador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditSubClasificador = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.SBCLF+"btnEdSubClasificador",
            root: _private.config.modulo + "editSubClasificador",
            form: "#"+tabs.SBCLF+"formEditSubClasificador",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idSubClasificador", value: _private.idSubClasificador});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idSubClasificador = 0;
                            simpleScript.closeModal("#"+tabs.SBCLF+"formEditSubClasificador");
                            subClasificador.getGridSubClasificador(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.subClasificador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteSubClasificador = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteSubClasificador",
                    fnServerParams: function(sData){
                        sData.push({name: "_idSubClasificador", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    subClasificador.getGridSubClasificador(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteSubClasificadorAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.SBCLF+"gridSubClasificador",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.SBCLF+"formGridSubClasificador",
                            root: _private.config.modulo + "deleteSubClasificadorAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            subClasificador.getGridSubClasificador(false);
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
var subClasificador = new subClasificador_();

subClasificador.main(); 