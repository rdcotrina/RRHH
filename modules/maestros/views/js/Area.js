/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-03-2015 18:03:04 
* Descripcion : Area.js
* ---------------------------------------
*/
var Area_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        Area: "AreaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idArea = 0;
    
    _private.config = {
        modulo: "maestros/Area/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Area*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.AARA,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Area.getIndex();
            }
        });
    };
    
    /*index del tab: Area*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.AARA+"_CONTAINER").html(data);
                Area.getGridArea(true);
            }
        });
    };
    
    _public.getGridArea = function (reload){
        var pEdit   = simpleScript.getPermiso("AARAED");
        var pDelete = simpleScript.getPermiso("AARADE");

        $("#"+tabs.AARA+"gridArea").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Area.Area, campo: "area", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Area.getFormEditArea",
                    serverParams: "id_area"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Area.postDeleteArea",
                    serverParams: "id_area"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridArea",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewArea = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewArea",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.AARA+"formNewArea").modal("show");
            }
        });
    };
    
    _public.getFormEditArea = function(btn,id){
        _private.idArea = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditArea",
            fnServerParams: function(sData){
                sData.push({name: "_idArea", value: _private.idArea});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.AARA+"formEditArea").modal("show");
            }
        });
    };
    
    _public.postNewArea = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.AARA+"btnGrArea",
            root: _private.config.modulo + "newArea",
            form: "#"+tabs.AARA+"formNewArea",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Area.getGridArea(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Area.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditArea = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.AARA+"btnEdArea",
            root: _private.config.modulo + "editArea",
            form: "#"+tabs.AARA+"formEditArea",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idArea", value: _private.idArea});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idArea = 0;
                            simpleScript.closeModal("#"+tabs.AARA+"formEditArea");
                            Area.getGridArea(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Area.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteArea = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteArea",
                    fnServerParams: function(sData){
                        sData.push({name: "_idArea", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Area.getGridArea(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteAreaAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.AARA+"gridArea",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.AARA+"formGridArea",
                            root: _private.config.modulo + "deleteAreaAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            Area.getGridArea(false);
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
var Area = new Area_();

Area.main(); 