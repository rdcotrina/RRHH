/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 30-03-2015 01:03:44 
* Descripcion : SistemaPension.js
* ---------------------------------------
*/
var SistemaPension_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        personal: "SistemaPensionScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idSistemaPension = 0;
    
    _private.config = {
        modulo: "personal/SistemaPension/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : SistemaPension*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.SISPE,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                SistemaPension.getIndex();
            }
        });
    };
    
    /*index del tab: SistemaPension*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.SISPE+"_CONTAINER").html(data);
                SistemaPension.getGridSistemaPension(true);
            }
        });
    };
    
    _public.getGridSistemaPension = function (reload){
        var pEdit   = simpleScript.getPermiso("SISPEED");
        var pDelete = simpleScript.getPermiso("SISPEDE");

        $("#"+tabs.SISPE+"gridSistemaPension").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.SistemaPension.RUC,campo: "ruc",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.SistemaPension.SISPE, campo: "sistemapension", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "SistemaPension.getFormEditSistemaPension",
                    serverParams: "id_sistemapension"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "SistemaPension.postDeleteSistemaPension",
                    serverParams: "id_sistemapension"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridSistemaPension",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewSistemaPension = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewSistemaPension",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SISPE+"formNewSistemaPension").modal("show");
            }
        });
    };
    
    _public.getFormEditSistemaPension = function(btn,id){
        _private.idSistemaPension = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditSistemaPension",
            fnServerParams: function(sData){
                sData.push({name: "_idSistemaPension", value: _private.idSistemaPension});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.SISPE+"formEditSistemaPension").modal("show");
            }
        });
    };
    
    _public.postNewSistemaPension = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.SISPE+"btnGrSistemaPension",
            root: _private.config.modulo + "newSistemaPension",
            form: "#"+tabs.SISPE+"formNewSistemaPension",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            SistemaPension.getGridSistemaPension(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.SistemaPension.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditSistemaPension = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.SISPE+"btnEdSistemaPension",
            root: _private.config.modulo + "editSistemaPension",
            form: "#"+tabs.SISPE+"formEditSistemaPension",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idSistemaPension", value: _private.idSistemaPension});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idSistemaPension = 0;
                            simpleScript.closeModal("#"+tabs.SISPE+"formEditSistemaPension");
                            SistemaPension.getGridSistemaPension(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.SistemaPension.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteSistemaPension = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteSistemaPension",
                    fnServerParams: function(sData){
                        sData.push({name: "_idSistemaPension", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    SistemaPension.getGridSistemaPension(false);
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
var SistemaPension = new SistemaPension_();

SistemaPension.main(); 