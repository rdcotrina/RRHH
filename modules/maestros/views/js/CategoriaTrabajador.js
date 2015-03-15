/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 11-03-2015 16:03:55 
* Descripcion : CategoriaTrabajador.js
* ---------------------------------------
*/
var CategoriaTrabajador_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        CategoriaTrabajador: "CategoriaTrabajadorScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idCategoriaTrabajador = 0;
    
    _private.config = {
        modulo: "maestros/CategoriaTrabajador/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : CategoriaTrabajador*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.KTRBA,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                CategoriaTrabajador.getIndex();
            }
        });
    };
    
    /*index del tab: CategoriaTrabajador*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.KTRBA+"_CONTAINER").html(data);
                CategoriaTrabajador.getGridCategoriaTrabajador(true);
            }
        });
    };
    
    _public.getGridCategoriaTrabajador = function (reload){
        var pEdit   = simpleScript.getPermiso("KTRBAED");
        var pDelete = simpleScript.getPermiso("KTRBADE");

        $("#"+tabs.KTRBA+"gridCategoriaTrabajador").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.CategoriaTrabajador.KAT,campo: "categoriatrabajador",width: "370",sortable: true,search: {operator:"LIKE"}},
                {title: lang.CategoriaTrabajador.SICLA, campo: "sicla", width: "80", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "CategoriaTrabajador.getFormEditCategoriaTrabajador",
                    serverParams: "id_categoriatrabajador"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "CategoriaTrabajador.postDeleteCategoriaTrabajador",
                    serverParams: "id_categoriatrabajador"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridCategoriaTrabajador",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewCategoriaTrabajador = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewCategoriaTrabajador",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.KTRBA+"formNewCategoriaTrabajador").modal("show");
            }
        });
    };
    
    _public.getFormEditCategoriaTrabajador = function(btn,id){
        _private.idCategoriaTrabajador = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditCategoriaTrabajador",
            fnServerParams: function(sData){
                sData.push({name: "_idCategoriaTrabajador", value: _private.idCategoriaTrabajador});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.KTRBA+"formEditCategoriaTrabajador").modal("show");
            }
        });
    };
    
    _public.postNewCategoriaTrabajador = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.KTRBA+"btnGrCategoriaTrabajador",
            root: _private.config.modulo + "newCategoriaTrabajador",
            form: "#"+tabs.KTRBA+"formNewCategoriaTrabajador",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            CategoriaTrabajador.getGridCategoriaTrabajador(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.CategoriaTrabajador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditCategoriaTrabajador = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.KTRBA+"btnEdCategoriaTrabajador",
            root: _private.config.modulo + "editCategoriaTrabajador",
            form: "#"+tabs.KTRBA+"formEditCategoriaTrabajador",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idCategoriaTrabajador", value: _private.idCategoriaTrabajador});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idCategoriaTrabajador = 0;
                            simpleScript.closeModal("#"+tabs.KTRBA+"formEditCategoriaTrabajador");
                            CategoriaTrabajador.getGridCategoriaTrabajador(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.CategoriaTrabajador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteCategoriaTrabajador = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteCategoriaTrabajador",
                    fnServerParams: function(sData){
                        sData.push({name: "_idCategoriaTrabajador", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    CategoriaTrabajador.getGridCategoriaTrabajador(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteCategoriaTrabajadorAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.KTRBA+"gridCategoriaTrabajador",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.KTRBA+"formGridCategoriaTrabajador",
                            root: _private.config.modulo + "deleteCategoriaTrabajadorAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            CategoriaTrabajador.getGridCategoriaTrabajador(false);
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
var CategoriaTrabajador = new CategoriaTrabajador_();

CategoriaTrabajador.main(); 