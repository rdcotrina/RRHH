/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 26-01-2015 23:01:32 
* Descripcion : clasificadorDetalle.js
* ---------------------------------------
*/
var clasificadorDetalle_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        clasificadorDetalle: "clasificadorDetalleScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idClasificadorDetalle = 0;
    
    _private.config = {
        modulo: "maestros/clasificadorDetalle/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : ClasificadorDetalle*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.CLSFD,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                clasificadorDetalle.getIndex();
            }
        });
    };
    
    /*index del tab: ClasificadorDetalle*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.CLSFD+"_CONTAINER").html(data);
                clasificadorDetalle.getGridClasificadorDetalle(true);
            }
        });
    };
    
    _public.getGridClasificadorDetalle = function (reload){
        var pEdit   = simpleScript.getPermiso("CLSFDED");
        var pDelete = simpleScript.getPermiso("CLSFDDE");

        $("#"+tabs.CLSFD+"gridClasificadorDetalle").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigocd",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.clasificadorDetalle.CLASIFICADORDET, campo: "clasificadordetalle", width: "140", sortable: true,search:{operator:"LIKE"}},
                {title: lang.subClasificador.SUBCLASI, campo: "subclasificador", width: "140", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: "clasificador", width: "140", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadocd", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "clasificadorDetalle.getFormEditClasificadorDetalle",
                    serverParams: "id_clasificadordetalle"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "clasificadorDetalle.postDeleteClasificadorDetalle",
                    serverParams: "id_clasificadordetalle"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridClasificadorDetalle",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewClasificadorDetalle = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewClasificadorDetalle",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CLSFD+"formNewClasificadorDetalle").modal("show");
            }
        });
    };
    
    _public.getFormEditClasificadorDetalle = function(btn,id){
        _private.idClasificadorDetalle = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditClasificadorDetalle",
            fnServerParams: function(sData){
                sData.push({name: "_idClasificadorDetalle", value: _private.idClasificadorDetalle});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CLSFD+"formEditClasificadorDetalle").modal("show");
            }
        });
    };
    
    _public.postNewClasificadorDetalle = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.CLSFD+"btnGrClasificadorDetalle",
            root: _private.config.modulo + "newClasificadorDetalle",
            form: "#"+tabs.CLSFD+"formNewClasificadorDetalle",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            clasificadorDetalle.getGridClasificadorDetalle(false);
                            simpleScript.updateChosen({element: '#'+tabs.CLSFD+'lst_subclasificador'});
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.clasificadorDetalle.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditClasificadorDetalle = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.CLSFD+"btnEdClasificadorDetalle",
            root: _private.config.modulo + "editClasificadorDetalle",
            form: "#"+tabs.CLSFD+"formEditClasificadorDetalle",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idClasificadorDetalle", value: _private.idClasificadorDetalle});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idClasificadorDetalle = 0;
                            simpleScript.closeModal("#"+tabs.CLSFD+"formEditClasificadorDetalle");
                            clasificadorDetalle.getGridClasificadorDetalle(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.clasificadorDetalle.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteClasificadorDetalle = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteClasificadorDetalle",
                    fnServerParams: function(sData){
                        sData.push({name: "_idClasificadorDetalle", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    clasificadorDetalle.getGridClasificadorDetalle(false);
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
var clasificadorDetalle = new clasificadorDetalle_();

clasificadorDetalle.main(); 