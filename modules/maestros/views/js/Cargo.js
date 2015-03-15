/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 07-03-2015 16:03:00 
* Descripcion : Cargo.js
* ---------------------------------------
*/
var Cargo_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        Cargo: "CargoScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idCargo = 0;
    
    _private.config = {
        modulo: "maestros/Cargo/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Cargo*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.KRGO,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Cargo.getIndex();
            }
        });
    };
    
    /*index del tab: Cargo*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.KRGO+"_CONTAINER").html(data);
                Cargo.getGridCargo(true);
            }
        });
    };
    
    _public.getGridCargo = function (reload){
        var pEdit   = simpleScript.getPermiso("KRGOED");
        var pDelete = simpleScript.getPermiso("KRGODE");

        $("#"+tabs.KRGO+"gridCargo").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Cargo.KARGO, campo: "cargo", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Cargo.getFormEditCargo",
                    serverParams: "id_cargo"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Cargo.postDeleteCargo",
                    serverParams: "id_cargo"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridCargo",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewCargo = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewCargo",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.KRGO+"formNewCargo").modal("show");
            }
        });
    };
    
    _public.getFormEditCargo = function(btn,id){
        _private.idCargo = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditCargo",
            fnServerParams: function(sData){
                sData.push({name: "_idCargo", value: _private.idCargo});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.KRGO+"formEditCargo").modal("show");
            }
        });
    };
    
    _public.postNewCargo = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.KRGO+"btnGrCargo",
            root: _private.config.modulo + "newCargo",
            form: "#"+tabs.KRGO+"formNewCargo",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Cargo.getGridCargo(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Cargo.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditCargo = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.KRGO+"btnEdCargo",
            root: _private.config.modulo + "editCargo",
            form: "#"+tabs.KRGO+"formEditCargo",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idCargo", value: _private.idCargo});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idCargo = 0;
                            simpleScript.closeModal("#"+tabs.KRGO+"formEditCargo");
                            Cargo.getGridCargo(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Cargo.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteCargo = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteCargo",
                    fnServerParams: function(sData){
                        sData.push({name: "_idCargo", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Cargo.getGridCargo(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteCargoAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.KRGO+"gridCargo",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.KRGO+"formGridCargo",
                            root: _private.config.modulo + "deleteCargoAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            Cargo.getGridCargo(false);
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
var Cargo = new Cargo_();

Cargo.main(); 