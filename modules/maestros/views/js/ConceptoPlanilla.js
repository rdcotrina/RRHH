/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 08:03:42 
* Descripcion : ConceptoPlanilla.js
* ---------------------------------------
*/
var ConceptoPlanilla_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        ConceptoPlanilla: "ConceptoPlanillaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idConceptoPlanilla = 0;
    
    _private.config = {
        modulo: "maestros/ConceptoPlanilla/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : ConceptoPlanilla*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.PCNCP,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                ConceptoPlanilla.getIndex();
            }
        });
    };
    
    /*index del tab: ConceptoPlanilla*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.PCNCP+"_CONTAINER").html(data);
                ConceptoPlanilla.getGridConceptoPlanilla(true);
            }
        });
    };
    
    _public.getGridConceptoPlanilla = function (reload){
        var pEdit   = simpleScript.getPermiso("PCNCPED");
        var pDelete = simpleScript.getPermiso("PCNCPDE");

        $("#"+tabs.PCNCP+"gridConceptoPlanilla").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.ConceptoPlanilla.CONC,campo: "conceptoplanilla",width: "270",sortable: true,search: {operator:"LIKE"}},
                {title: lang.ConceptoPlanilla.DESCO, campo: "descripcion_corta", width: "120", sortable: true,search:{operator:"LIKE"}},
                {title: lang.ConceptoPlanilla.CLASI, campo: 'clasificacion', width: "70", class: "center", sortable: true,search:{type: 'select',compare:'clasificacion',dataClient:[{etiqueta:'Aporte',value:'A'},{etiqueta:'Ingreso',value:'I'},{etiqueta:'Descuento',value:'D'}]}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "ConceptoPlanilla.getFormEditConceptoPlanilla",
                    serverParams: "id_conceptoplanilla"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "ConceptoPlanilla.postDeleteConceptoPlanilla",
                    serverParams: "id_conceptoplanilla"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridConceptoPlanilla",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewConceptoPlanilla = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewConceptoPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PCNCP+"formNewConceptoPlanilla").modal("show");
            }
        });
    };
    
    _public.getFormEditConceptoPlanilla = function(btn,id){
        _private.idConceptoPlanilla = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditConceptoPlanilla",
            fnServerParams: function(sData){
                sData.push({name: "_idConceptoPlanilla", value: _private.idConceptoPlanilla});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.PCNCP+"formEditConceptoPlanilla").modal("show");
            }
        });
    };
    
    _public.postNewConceptoPlanilla = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.PCNCP+"btnGrConceptoPlanilla",
            root: _private.config.modulo + "newConceptoPlanilla",
            form: "#"+tabs.PCNCP+"formNewConceptoPlanilla",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            ConceptoPlanilla.getGridConceptoPlanilla(false);
                            simpleScript.updateChosen({element: '#'+tabs.PCNCP+'lst_clasificacion'});
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.ConceptoPlanilla.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditConceptoPlanilla = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.PCNCP+"btnEdConceptoPlanilla",
            root: _private.config.modulo + "editConceptoPlanilla",
            form: "#"+tabs.PCNCP+"formEditConceptoPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idConceptoPlanilla", value: _private.idConceptoPlanilla});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idConceptoPlanilla = 0;
                            simpleScript.closeModal("#"+tabs.PCNCP+"formEditConceptoPlanilla");
                            ConceptoPlanilla.getGridConceptoPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.ConceptoPlanilla.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteConceptoPlanilla = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteConceptoPlanilla",
                    fnServerParams: function(sData){
                        sData.push({name: "_idConceptoPlanilla", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    ConceptoPlanilla.getGridConceptoPlanilla(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDeleteConceptoPlanillaAll = function(btn){
        simpleScript.validaCheckBox({
            id: "#"+tabs.PCNCP+"gridConceptoPlanilla",
            msn: lang.mensajes.MSG_9,
            fnCallback: function(){
                simpleScript.notify.confirm({
                    content: lang.mensajes.MSG_7,
                    callbackSI: function(){
                        simpleAjax.send({
                            flag: 3, //si se usa SP usar flag, sino se puede eliminar esta linea
                            element: btn,
                            form: "#"+tabs.PCNCP+"formGridConceptoPlanilla",
                            root: _private.config.modulo + "deleteConceptoPlanillaAll",
                            fnCallback: function(data) {
                                if(!isNaN(data.result) && parseInt(data.result) === 1){
                                    simpleScript.notify.ok({
                                        content: lang.mensajes.MSG_8,
                                        callback: function(){
                                            ConceptoPlanilla.getGridConceptoPlanilla(false);
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
var ConceptoPlanilla = new ConceptoPlanilla_();

ConceptoPlanilla.main(); 