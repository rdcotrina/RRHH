/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-01-2015 12:01:46 
* Descripcion : Especifica.js
* ---------------------------------------
*/
var Especifica_ = function(){
    
    /*metodos privados*/
    var _private = {};
    
    _private.idEspecifica = 0;
    
    _private.config = {
        modulo: "maestros/Especifica/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Especifica*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.ESPE,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Especifica.getIndex();
            }
        });
    };
    
    /*index del tab: Especifica*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.ESPE+"_CONTAINER").html(data);
                Especifica.getGridEspecifica(true);
            }
        });
    };
    
    _public.getGridEspecifica = function (reload){
        var pEdit   = simpleScript.getPermiso("ESPEED");
        var pDelete = simpleScript.getPermiso("ESPEDE");

        $("#"+tabs.ESPE+"gridEspecifica").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigoespe",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Especifica.ESPECIFICA, campo: "especifica", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.SubClasificadorDetalle.SUBCLASDET, campo: "subclasificadordetalle", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificadorDetalle.CLASIFICADORDET, campo: "clasificadordetalle", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.subClasificador.SUBCLASI, campo: "subclasificador", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: "clasificador", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadoespe", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Especifica.getFormEditEspecifica",
                    serverParams: "id_especifica"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Especifica.postDeleteEspecifica",
                    serverParams: "id_especifica"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridEspecifica",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewEspecifica = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewEspecifica",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ESPE+"formNewEspecifica").modal("show");
            }
        });
    };
    
    _public.getFormEditEspecifica = function(btn,id){
        _private.idEspecifica = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditEspecifica",
            fnServerParams: function(sData){
                sData.push({name: "_idEspecifica", value: _private.idEspecifica});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.ESPE+"formEditEspecifica").modal("show");
            }
        });
    };
    
    _public.getSubClasificador = function(id){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getSubClasificador",
            fnServerParams: function(sData){
                sData.push({name: "_idClasificador", value: id});
            },
            fnCallback: function(data) {
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: 'cont_subclasificador',
                    required: true,
                    attr:{
                        id: tabs.ESPE+'lst_subclasificador',
                        name: tabs.ESPE+'lst_subclasificador',
                        onchange: 'Especifica.getClasificadorDetalle(this.value);'
                    },
                    dataView:{
                        etiqueta: ['codigo','subclasificador'],
                        value: ['id_subclasificador']
                    }
                });
            }
        });
    };
    
    _public.getClasificadorDetalle = function(subCla){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getClasificadorDetalle",
            fnServerParams: function(sData) {
                sData.push({name: '_idSubClasificador', value: subCla});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: 'cont_clasificador_detalle',
                    required: true,
                    attr:{
                        id: tabs.ESPE+'lst_clasificadordetalle',
                        name: tabs.ESPE+'lst_clasificadordetalle',
                        onchange: 'Especifica.getSubClasificadorDetalle(this.value);'
                    },
                    dataView:{
                        etiqueta: ['codigo','clasificadordetalle'],
                        value: ['id_clasificadordetalle']
                    }
                });
            }
        });
    };
    
    _public.getSubClasificadorDetalle = function(subCla){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getSubClasificadorDetalle",
            fnServerParams: function(sData) {
                sData.push({name: '_idClasificadorDetalle', value: subCla});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: 'cont_subclasificador_detalle',
                    required: true,
                    attr:{
                        id: tabs.ESPE+'lst_subclasificadordetalle',
                        name: tabs.ESPE+'lst_subclasificadordetalle'
                    },
                    dataView:{
                        etiqueta: ['codigo','subclasificadordetalle'],
                        value: ['id_subclasificadordetalle']
                    }
                });
            }
        });
    };
    
    _public.postNewEspecifica = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.ESPE+"btnGrEspecifica",
            root: _private.config.modulo + "newEspecifica",
            form: "#"+tabs.ESPE+"formNewEspecifica",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Especifica.getGridEspecifica(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Especifica.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditEspecifica = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.ESPE+"btnEdEspecifica",
            root: _private.config.modulo + "editEspecifica",
            form: "#"+tabs.ESPE+"formEditEspecifica",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEspecifica", value: _private.idEspecifica});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idEspecifica = 0;
                            simpleScript.closeModal("#"+tabs.ESPE+"formEditEspecifica");
                            Especifica.getGridEspecifica(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Especifica.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteEspecifica = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteEspecifica",
                    fnServerParams: function(sData){
                        sData.push({name: "_idEspecifica", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Especifica.getGridEspecifica(false);
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
var Especifica = new Especifica_();

Especifica.main(); 