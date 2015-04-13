/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 12-03-2015 16:03:52 
* Descripcion : Actividad.js
* ---------------------------------------
*/
var Actividad_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        Actividad: "ActividadScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idActividad = 0;
    
    _private.config = {
        modulo: "maestros/Actividad/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Actividad*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.HACT,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Actividad.getIndex();
            }
        });
    };
    
    /*index del tab: Actividad*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.HACT+"_CONTAINER").html(data);
                Actividad.getGridActividad(true);
            }
        });
    };
    
    _public.getGridActividad = function (reload){
        var pEdit   = simpleScript.getPermiso("HACTED");
        var pDelete = simpleScript.getPermiso("HACTDE");

        $("#"+tabs.HACT+"gridActividad").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Actividad.ACT,campo: "actividad",width: "370",sortable: true,search: {operator:"LIKE"}},
                {title: lang.clasificador.CODIGO, campo: "codigo", width: "80", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Actividad.CLAS, campo: "clasificadorderivado", width: "300", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadoact", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Actividad.getFormEditActividad",
                    serverParams: "id_actividad"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Actividad.postDeleteActividad",
                    serverParams: "id_actividad"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridActividad",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewActividad = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewActividad",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.HACT+"formNewActividad").modal("show");
            }
        });
    };
    
    _public.getFormEditActividad = function(btn,id){
        _private.idActividad = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditActividad",
            fnServerParams: function(sData){
                sData.push({name: "_idActividad", value: _private.idActividad});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.HACT+"formEditActividad").modal("show");
            }
        });
    };
    
    _public.postNewActividad = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.HACT+"btnGrActividad",
            root: _private.config.modulo + "newActividad",
            form: "#"+tabs.HACT+"formNewActividad",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            simpleScript.updateChosen({element:'#'+tabs.HACT+'lst_clasificador'});
                            Actividad.getGridActividad(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Actividad.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditActividad = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.HACT+"btnEdActividad",
            root: _private.config.modulo + "editActividad",
            form: "#"+tabs.HACT+"formEditActividad",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idActividad", value: _private.idActividad});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idActividad = 0;
                            simpleScript.closeModal("#"+tabs.HACT+"formEditActividad");
                            Actividad.getGridActividad(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Actividad.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteActividad = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteActividad",
                    fnServerParams: function(sData){
                        sData.push({name: "_idActividad", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Actividad.getGridActividad(false);
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
var Actividad = new Actividad_();

Actividad.main(); 