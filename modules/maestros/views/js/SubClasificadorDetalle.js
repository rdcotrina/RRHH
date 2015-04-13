/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 28-01-2015 00:01:08 
* Descripcion : SubClasificadorDetalle.js
* ---------------------------------------
*/
var SubClasificadorDetalle_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        SubClasificadorDetalle: "SubClasificadorDetalleScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idSubClasificadorDetalle = 0;
    
    _private.config = {
        modulo: "maestros/SubClasificadorDetalle/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : SubClasificadorDetalle*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.SBCLD,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                SubClasificadorDetalle.getIndex();
            }
        });
    };
    
    /*index del tab: SubClasificadorDetalle*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.SBCLD+"_CONTAINER").html(data);
                SubClasificadorDetalle.getGridSubClasificadorDetalle(true);
            }
        });
    };
    
    _public.getGridSubClasificadorDetalle = function (reload){
        var pEdit   = simpleScript.getPermiso("SBCLDED");
        var pDelete = simpleScript.getPermiso("SBCLDDE");

        $("#"+tabs.SBCLD+"gridSubClasificadorDetalle").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigoscd",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.SubClasificadorDetalle.SUBCLASDET, campo: "subclasificadordetalle", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificadorDetalle.CLASIFICADORDET , campo: "clasificadordetalle", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.subClasificador.SUBCLASI, campo: "subclasificador", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: "clasificador", width: "150", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadoscd", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "SubClasificadorDetalle.getFormEditSubClasificadorDetalle",
                    serverParams: "id_subclasificadordetalle"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "SubClasificadorDetalle.postDeleteSubClasificadorDetalle",
                    serverParams: "id_subclasificadordetalle"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridSubClasificadorDetalle",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getClasificadorDetalle = function(subCla){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getClasificadorDetalle",
            fnServerParams: function(sData) {
                sData.push({name: tabs.SBCLD+'lst_subclasificador', value: subCla});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: '#cont_lst_clasificador_detalle',
                    required: true,
                    attr:{
                        id: tabs.SBCLD+'lst_clasificadordetalle',
                        name: tabs.SBCLD+'lst_clasificadordetalle'
                    },
                    dataView:{
                        etiqueta: ['codigo','clasificadordetalle'],
                        value: ['id_clasificadordetalle']
                    }
                });
            }
        });
    };
    
    _public.getFormNewSubClasificadorDetalle = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewSubClasificadorDetalle",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SBCLD+"formNewSubClasificadorDetalle").modal("show");
            }
        });
    };
    
    _public.getFormEditSubClasificadorDetalle = function(btn,id){
        _private.idSubClasificadorDetalle = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditSubClasificadorDetalle",
            fnServerParams: function(sData){
                sData.push({name: "_idSubClasificadorDetalle", value: _private.idSubClasificadorDetalle});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SBCLD+"formEditSubClasificadorDetalle").modal("show");
            }
        });
    };
    
    _public.postNewSubClasificadorDetalle = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.SBCLD+"btnGrSubClasificadorDetalle",
            root: _private.config.modulo + "newSubClasificadorDetalle",
            form: "#"+tabs.SBCLD+"formNewSubClasificadorDetalle",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            SubClasificadorDetalle.getGridSubClasificadorDetalle(false);
                            simpleScript.updateChosen({element: '#'+tabs.SBCLD+'lst_subclasificador'});
                            simpleScript.updateChosen({element: '#'+tabs.SBCLD+'lst_clasificadordetalle'});
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.SubClasificadorDetalle.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditSubClasificadorDetalle = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.SBCLD+"btnEdSubClasificadorDetalle",
            root: _private.config.modulo + "editSubClasificadorDetalle",
            form: "#"+tabs.SBCLD+"formEditSubClasificadorDetalle",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idSubClasificadorDetalle", value: _private.idSubClasificadorDetalle});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idSubClasificadorDetalle = 0;
                            simpleScript.closeModal("#"+tabs.SBCLD+"formEditSubClasificadorDetalle");
                            SubClasificadorDetalle.getGridSubClasificadorDetalle(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.SubClasificadorDetalle.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteSubClasificadorDetalle = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteSubClasificadorDetalle",
                    fnServerParams: function(sData){
                        sData.push({name: "_idSubClasificadorDetalle", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    SubClasificadorDetalle.getGridSubClasificadorDetalle(false);
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
var SubClasificadorDetalle = new SubClasificadorDetalle_();

SubClasificadorDetalle.main(); 