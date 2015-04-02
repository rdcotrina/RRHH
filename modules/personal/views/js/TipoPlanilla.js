/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 02-04-2015 21:04:20 
* Descripcion : TipoPlanilla.js
* ---------------------------------------
*/
var TipoPlanilla_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        personal: "TipoPlanillaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idTipoPlanilla = 0;
    
    _private.config = {
        modulo: "personal/TipoPlanilla/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : TipoPlanilla*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.TPLL,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                TipoPlanilla.getIndex();
            }
        });
    };
    
    /*index del tab: TipoPlanilla*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.TPLL+"_CONTAINER").html(data);
                TipoPlanilla.getGridTipoPlanilla(true);
            }
        });
    };
    
    _public.getGridTipoPlanilla = function (reload){
        var pEdit   = simpleScript.getPermiso("TPLLED");
        var pDelete = simpleScript.getPermiso("TPLLDE");

        $("#"+tabs.TPLL+"gridTipoPlanilla").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.TipoPlanilla.TIPOP, campo: "tipoplanilla", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "TipoPlanilla.getFormEditTipoPlanilla",
                    serverParams: "id_tipoplanilla"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "TipoPlanilla.postDeleteTipoPlanilla",
                    serverParams: "id_tipoplanilla"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridTipoPlanilla",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewTipoPlanilla = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewTipoPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TPLL+"formNewTipoPlanilla").modal("show");
            }
        });
    };
    
    _public.getFormEditTipoPlanilla = function(btn,id){
        _private.idTipoPlanilla = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditTipoPlanilla",
            fnServerParams: function(sData){
                sData.push({name: "_idTipoPlanilla", value: _private.idTipoPlanilla});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.TPLL+"formEditTipoPlanilla").modal("show");
            }
        });
    };
    
    _public.postNewTipoPlanilla = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.TPLL+"btnGrTipoPlanilla",
            root: _private.config.modulo + "newTipoPlanilla",
            form: "#"+tabs.TPLL+"formNewTipoPlanilla",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            TipoPlanilla.getGridTipoPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "TipoPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postEditTipoPlanilla = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.TPLL+"btnEdTipoPlanilla",
            root: _private.config.modulo + "editTipoPlanilla",
            form: "#"+tabs.TPLL+"formEditTipoPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTipoPlanilla", value: _private.idTipoPlanilla});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idTipoPlanilla = 0;
                            simpleScript.closeModal("#"+tabs.TPLL+"formEditTipoPlanilla");
                            TipoPlanilla.getGridTipoPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "TipoPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postDeleteTipoPlanilla = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteTipoPlanilla",
                    fnServerParams: function(sData){
                        sData.push({name: "_idTipoPlanilla", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    TipoPlanilla.getGridTipoPlanilla(false);
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
var TipoPlanilla = new TipoPlanilla_();

TipoPlanilla.main(); 