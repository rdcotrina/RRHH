/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 06-04-2015 23:04:06 
* Descripcion : MotivoBaja.js
* ---------------------------------------
*/
var MotivoBaja_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        personal: "MotivoBajaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idMotivoBaja = 0;
    
    _private.config = {
        modulo: "personal/MotivoBaja/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : MotivoBaja*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.MTBA,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                MotivoBaja.getIndex();
            }
        });
    };
    
    /*index del tab: MotivoBaja*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.MTBA+"_CONTAINER").html(data);
                MotivoBaja.getGridMotivoBaja(true);
            }
        });
    };
    
    _public.getGridMotivoBaja = function (reload){
        var pEdit   = simpleScript.getPermiso("MTBAED");
        var pDelete = simpleScript.getPermiso("MTBADE");

        $("#"+tabs.MTBA+"gridMotivoBaja").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.MotivoBaja.MTBJ, campo: "motivobaja", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "MotivoBaja.getFormEditMotivoBaja",
                    serverParams: "id_motivobaja"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "MotivoBaja.postDeleteMotivoBaja",
                    serverParams: "id_motivobaja"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridMotivoBaja",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewMotivoBaja = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewMotivoBaja",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.MTBA+"formNewMotivoBaja").modal("show");
            }
        });
    };
    
    _public.getFormEditMotivoBaja = function(btn,id){
        _private.idMotivoBaja = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditMotivoBaja",
            fnServerParams: function(sData){
                sData.push({name: "_idMotivoBaja", value: _private.idMotivoBaja});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.MTBA+"formEditMotivoBaja").modal("show");
            }
        });
    };
    
    _public.postNewMotivoBaja = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.MTBA+"btnGrMotivoBaja",
            root: _private.config.modulo + "newMotivoBaja",
            form: "#"+tabs.MTBA+"formNewMotivoBaja",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            MotivoBaja.getGridMotivoBaja(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.MotivoBaja.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditMotivoBaja = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.MTBA+"btnEdMotivoBaja",
            root: _private.config.modulo + "editMotivoBaja",
            form: "#"+tabs.MTBA+"formEditMotivoBaja",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idMotivoBaja", value: _private.idMotivoBaja});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idMotivoBaja = 0;
                            simpleScript.closeModal("#"+tabs.MTBA+"formEditMotivoBaja");
                            MotivoBaja.getGridMotivoBaja(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.MotivoBaja.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteMotivoBaja = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteMotivoBaja",
                    fnServerParams: function(sData){
                        sData.push({name: "_idMotivoBaja", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    MotivoBaja.getGridMotivoBaja(false);
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
var MotivoBaja = new MotivoBaja_();

MotivoBaja.main(); 