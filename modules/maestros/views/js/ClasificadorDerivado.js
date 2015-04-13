/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 13-03-2015 18:03:31 
* Descripcion : ClasificadorDerivado.js
* ---------------------------------------
*/
var ClasificadorDerivado_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        ClasificadorDerivado: "ClasificadorDerivadoScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idClasificadorDerivado = 0;
    
    _private.config = {
        modulo: "maestros/ClasificadorDerivado/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : ClasificadorDerivado*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.DVCL,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                ClasificadorDerivado.getIndex();
            }
        });
    };
    
    /*index del tab: ClasificadorDerivado*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.DVCL+"_CONTAINER").html(data);
                ClasificadorDerivado.getGridClasificadorDerivado(true);
            }
        });
    };
    
    _public.getGridClasificadorDerivado = function (reload){
        var pEdit   = simpleScript.getPermiso("DVCLED");
        var pDelete = simpleScript.getPermiso("DVCLDE");

        $("#"+tabs.DVCL+"gridClasificadorDerivado").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.clasificador.CODIGO,campo: "codigocl",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.clasificador.CLASIFICADOR, campo: "clasificadorderivado", width: "300", sortable: true,search:{operator:"LIKE"}},
                {title: lang.clasificador.CODIGO,campo: "codigoespe",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Especifica.ESPECIFICA, campo: "especifica", width: "300", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadocl", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "ClasificadorDerivado.getFormEditClasificadorDerivado",
                    serverParams: "id_clasificadorderivado"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "ClasificadorDerivado.postDeleteClasificadorDerivado",
                    serverParams: "id_clasificadorderivado"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridClasificadorDerivado",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewClasificadorDerivado = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewClasificadorDerivado",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.DVCL+"formNewClasificadorDerivado").modal("show");
            }
        });
    };
    
    _public.getFormEditClasificadorDerivado = function(btn,id){
        _private.idClasificadorDerivado = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditClasificadorDerivado",
            fnServerParams: function(sData){
                sData.push({name: "_idClasificadorDerivado", value: _private.idClasificadorDerivado});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.DVCL+"formEditClasificadorDerivado").modal("show");
            }
        });
    };
    
    _public.postNewClasificadorDerivado = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.DVCL+"btnGrClasificadorDerivado",
            root: _private.config.modulo + "newClasificadorDerivado",
            form: "#"+tabs.DVCL+"formNewClasificadorDerivado",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            simpleScript.updateChosen({element:'#'+tabs.DVCL+'lst_especifica'});
                            ClasificadorDerivado.getGridClasificadorDerivado(false);
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
    
    _public.postEditClasificadorDerivado = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.DVCL+"btnEdClasificadorDerivado",
            root: _private.config.modulo + "editClasificadorDerivado",
            form: "#"+tabs.DVCL+"formEditClasificadorDerivado",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idClasificadorDerivado", value: _private.idClasificadorDerivado});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idClasificadorDerivado = 0;
                            simpleScript.closeModal("#"+tabs.DVCL+"formEditClasificadorDerivado");
                            ClasificadorDerivado.getGridClasificadorDerivado(false);
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
    
    _public.postDeleteClasificadorDerivado = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteClasificadorDerivado",
                    fnServerParams: function(sData){
                        sData.push({name: "_idClasificadorDerivado", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    ClasificadorDerivado.getGridClasificadorDerivado(false);
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
var ClasificadorDerivado = new ClasificadorDerivado_();

ClasificadorDerivado.main(); 