/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 22-01-2015 13:01:45 
* Descripcion : clasificador.js
* ---------------------------------------
*/
var clasificador_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        clasificador: "clasificadorScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idClasificador = 0;
    
    _private.config = {
        modulo: "maestros/clasificador/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Clasificador*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.CLSF,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                clasificador.getIndex();
            }
        });
    };
    
    /*index del tab: Clasificador*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.CLSF+"_CONTAINER").html(data);
                clasificador.getGridClasificador(true);
            }
        });
    };
    
    _public.getGridClasificador = function (reload){
        var pEdit   = simpleScript.getPermiso('CLSFED');
        var pDelete = simpleScript.getPermiso('CLSFDE');
        
        $("#"+tabs.CLSF+"gridClasificador").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigo",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: 'clasificador', width: "400", sortable: true,search:{operator:'LIKE'}},
                {title: lang.generic.EST, campo: 'estado', width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: 'clasificador.getFormEditClasificador',
                    serverParams: 'id_clasificador'
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: 'clasificador.postDeleteClasificador',
                    serverParams: 'id_clasificador'
                }
            }],
            ajaxSource: _private.config.modulo+"getGridClasificador",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: '#'+oSettings.tObjectTable,
                    typeElement: 'button'
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewClasificador = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewClasificador",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CLSF+"formNewClasificador").modal("show");
            }
        });
    };
    
    _public.getFormEditClasificador = function(btn,id){
        _private.idClasificador = id;
            
        simpleAjax.send({
            flag : 1,
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditClasificador",
            fnServerParams: function(sData){
                sData.push({name: "_idClasificador", value: _private.idClasificador});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CLSF+"formEditClasificador").modal("show");
            }
        });
    };
    
    _public.postNewClasificador = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.CLSF+"btnGrClasificador",
            root: _private.config.modulo + "newClasificador",
            form: "#"+tabs.CLSF+"formNewClasificador",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            clasificador.getGridClasificador(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.clasificador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditClasificador = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.CLSF+"btnEdClasificador",
            root: _private.config.modulo + "editClasificador",
            form: "#"+tabs.CLSF+"formEditClasificador",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idClasificador", value: _private.idClasificador});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idClasificador = 0;
                            simpleScript.closeModal("#"+tabs.CLSF+"formEditClasificador");
                            clasificador.getGridClasificador(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.clasificador.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteClasificador = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteClasificador",
                    fnServerParams: function(sData){
                        sData.push({name: "_idClasificador", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    clasificador.getGridClasificador(false);
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
var clasificador = new clasificador_();

clasificador.main(); 