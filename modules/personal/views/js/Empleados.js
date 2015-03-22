/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-03-2015 23:03:01 
* Descripcion : Empleados.js
* ---------------------------------------
*/
var Empleados_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        Empleados: "EmpleadosScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idEmpleados = 0;
    
    _private.config = {
        modulo: "personal/Empleados/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Empleados*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.EMPL,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Empleados.getIndex();
            }
        });
    };
    
    /*index del tab: Empleados*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.EMPL+"_CONTAINER").html(data);
                Empleados.getGridEmpleados(true);
            }
        });
    };
    
    _public.getGridEmpleados = function (reload){
        var pEdit   = simpleScript.getPermiso("EMPLED");
        var pDelete = simpleScript.getPermiso("EMPLDE");

        $("#"+tabs.EMPL+"gridEmpleados").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Empleados.CAMPO1,campo: "CAMPO",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Empleados.CAMPO2, campo: "CAMPO", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "CAMPO", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Empleados.getFormEditEmpleados",
                    serverParams: "id_Empleados"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Empleados.postDeleteEmpleados",
                    serverParams: "id_Empleados"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridEmpleados",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewEmpleados = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewEmpleados",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formNewEmpleados").modal("show");
            }
        });
    };
    
    _public.getFormEditEmpleados = function(btn,id){
        _private.idEmpleados = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditEmpleados",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formEditEmpleados").modal("show");
            }
        });
    };
    
    _public.postNewEmpleados = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.EMPL+"btnGrEmpleados",
            root: _private.config.modulo + "newEmpleados",
            form: "#"+tabs.EMPL+"formNewEmpleados",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Empleados.getGridEmpleados(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "Empleados ya existe."
                    });
                }
            }
        });
    };
    
    _public.postEditEmpleados = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.EMPL+"btnEdEmpleados",
            root: _private.config.modulo + "editEmpleados",
            form: "#"+tabs.EMPL+"formEditEmpleados",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idEmpleados = 0;
                            simpleScript.closeModal("#"+tabs.EMPL+"formEditEmpleados");
                            Empleados.getGridEmpleados(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "Empleados ya existe."
                    });
                }
            }
        });
    };
    
    _public.postDeleteEmpleados = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteEmpleados",
                    fnServerParams: function(sData){
                        sData.push({name: "_idEmpleados", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Empleados.getGridEmpleados(false);
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
var Empleados = new Empleados_();

Empleados.main(); 