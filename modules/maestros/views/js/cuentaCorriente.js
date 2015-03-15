/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 10:02:22 
* Descripcion : cuentaCorriente.js
* ---------------------------------------
*/
var cuentaCorriente_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        cuentaCorriente: "cuentaCorrienteScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idCuentaCorriente = 0;
    
    _private.config = {
        modulo: "maestros/cuentaCorriente/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : CuentaCorriente*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.CTACT,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                cuentaCorriente.getIndex();
            }
        });
    };
    
    /*index del tab: CuentaCorriente*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.CTACT+"_CONTAINER").html(data);
                cuentaCorriente.getGridCuentaCorriente(true);
            }
        });
    };
    
    _public.getGridCuentaCorriente = function (reload){
        var pEdit   = simpleScript.getPermiso("CTACTED");
        var pDelete = simpleScript.getPermiso("CTACTDE");

        $("#"+tabs.CTACT+"gridCuentaCorriente").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.cuentaCorriente.CTACTE,campo: "cuentacorriente",width: "270",sortable: true,search: {operator:"LIKE"}},
                {title: lang.banco.BANCO, campo: "banco", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadocu", width: "70", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "cuentaCorriente.getFormEditCuentaCorriente",
                    serverParams: "id_cuentacorriente"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "cuentaCorriente.postDeleteCuentaCorriente",
                    serverParams: "id_cuentacorriente"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridCuentaCorriente",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewCuentaCorriente = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewCuentaCorriente",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CTACT+"formNewCuentaCorriente").modal("show");
            }
        });
    };
    
    _public.getFormEditCuentaCorriente = function(btn,id){
        _private.idCuentaCorriente = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditCuentaCorriente",
            fnServerParams: function(sData){
                sData.push({name: "_idCuentaCorriente", value: _private.idCuentaCorriente});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CTACT+"formEditCuentaCorriente").modal("show");
            }
        });
    };
    
    _public.postNewCuentaCorriente = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.CTACT+"btnGrCuentaCorriente",
            root: _private.config.modulo + "newCuentaCorriente",
            form: "#"+tabs.CTACT+"formNewCuentaCorriente",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            cuentaCorriente.getGridCuentaCorriente(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "CuentaCorriente ya existe."
                    });
                }
            }
        });
    };
    
    _public.postEditCuentaCorriente = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.CTACT+"btnEdCuentaCorriente",
            root: _private.config.modulo + "editCuentaCorriente",
            form: "#"+tabs.CTACT+"formEditCuentaCorriente",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idCuentaCorriente", value: _private.idCuentaCorriente});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idCuentaCorriente = 0;
                            simpleScript.closeModal("#"+tabs.CTACT+"formEditCuentaCorriente");
                            cuentaCorriente.getGridCuentaCorriente(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "CuentaCorriente ya existe."
                    });
                }
            }
        });
    };
    
    _public.postDeleteCuentaCorriente = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteCuentaCorriente",
                    fnServerParams: function(sData){
                        sData.push({name: "_idCuentaCorriente", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    cuentaCorriente.getGridCuentaCorriente(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteCuentaCorrienteAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.CTACT+"gridCuentaCorriente",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.CTACT+"formGridCuentaCorriente",
                            root: _private.config.modulo + "deleteCuentaCorrienteAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            cuentaCorriente.getGridCuentaCorriente(false);
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
var cuentaCorriente = new cuentaCorriente_();

cuentaCorriente.main(); 