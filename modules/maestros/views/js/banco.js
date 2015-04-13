/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 27-02-2015 09:02:37 
* Descripcion : banco.js
* ---------------------------------------
*/
var banco_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        banco: "bancoScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idBanco = 0;
    
    _private.config = {
        modulo: "maestros/banco/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Banco*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.BANK,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                banco.getIndex();
            }
        });
    };
    
    /*index del tab: Banco*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.BANK+"_CONTAINER").html(data);
                banco.getGridBanco(true);
            }
        });
    };
    
    _public.getGridBanco = function (reload){
        var pEdit   = simpleScript.getPermiso("BANKED");
        var pDelete = simpleScript.getPermiso("BANKDE");

        $("#"+tabs.BANK+"gridBanco").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.banco.BANCO,campo: "banco",width: "370",sortable: true,search: {operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "70", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "banco.getFormEditBanco",
                    serverParams: "id_banco"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "banco.postDeleteBanco",
                    serverParams: "id_banco"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridBanco",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewBanco = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewBanco",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.BANK+"formNewBanco").modal("show");
            }
        });
    };
    
    _public.getFormEditBanco = function(btn,id){
        _private.idBanco = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditBanco",
            fnServerParams: function(sData){
                sData.push({name: "_idBanco", value: _private.idBanco});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.BANK+"formEditBanco").modal("show");
            }
        });
    };
    
    _public.postNewBanco = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.BANK+"btnGrBanco",
            root: _private.config.modulo + "newBanco",
            form: "#"+tabs.BANK+"formNewBanco",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            banco.getGridBanco(false);                            
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.banco.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditBanco = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.BANK+"btnEdBanco",
            root: _private.config.modulo + "editBanco",
            form: "#"+tabs.BANK+"formEditBanco",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idBanco", value: _private.idBanco});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idBanco = 0;
                            simpleScript.closeModal("#"+tabs.BANK+"formEditBanco");
                            banco.getGridBanco(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.banco.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteBanco = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteBanco",
                    fnServerParams: function(sData){
                        sData.push({name: "_idBanco", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    banco.getGridBanco(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteBancoAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.BANK+"gridBanco",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.BANK+"formGridBanco",
                            root: _private.config.modulo + "deleteBancoAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            banco.getGridBanco(false);
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
var banco = new banco_();

banco.main(); 