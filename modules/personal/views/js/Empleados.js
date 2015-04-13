/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-03-2015 23:03:01 
* Descripcion : Empleados.js
* ---------------------------------------
*/
var Empleados_ = function(){
    
    /*cargar requires*/
    simpleObject.require({
        personal: "EmpleadosScript"
    });
    
    /*metodos privados*/
    var _private = {};
    
    _private.idEmpleados = 0;
    
    _private.idDerechoHabiente = 0;
    
    _private.idCargoTrabajador = 0;
    
    _private.config = {
        modulo: "personal/Empleados/",
        moduloDH: "personal/DerechoHabientes/",
        moduloC: "personal/Cargos/"
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
        var pDatLab = simpleScript.getPermiso("EMPLDL");
        var pEdit   = simpleScript.getPermiso("EMPLED");
        var pDelete = simpleScript.getPermiso("EMPLDE");
        var pDerHab = simpleScript.getPermiso("EMPLDH");

        $("#"+tabs.EMPL+"gridEmpleados").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Empleados.NRODOC,campo: "numerodocumento",width: "70",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Empleados.APENOM, campo: "nombrecompleto", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Empleados.EMAIL, campo: "email", width: "400", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadot", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pDatLab.permiso,
                icono: pDatLab.icono,
                titulo: pDatLab.accion,
                class: pDatLab.theme,
                ajax: {
                    fn: "Empleados.formDatosLaborales",
                    serverParams: ["id_trabajador","nombrecompleto"]
                }
            },{
                access: pDerHab.permiso,
                icono: pDerHab.icono,
                titulo: pDerHab.accion,
                class: pDerHab.theme,
                ajax: {
                    fn: "Empleados.formNewDerechoHabientes",
                    serverParams: ["id_trabajador","nombrecompleto"]
                }
            },{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Empleados.getFormEditEmpleados",
                    serverParams: "id_persona"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Empleados.postDeleteEmpleados",
                    serverParams: "id_persona"
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
    
    _public.getGridDerechohabientes = function (reload){
        if(reload){
            $('#'+tabs.EMPL+'dh2').html('<table id="'+tabs.EMPL+'gridDerechoHabientes" class="table table-striped table-hover table-condensed dataTable table-bordered" ></table>');
        }
        var pEdit   = simpleScript.getPermiso("EMPLED");
        var pDelete = simpleScript.getPermiso("EMPLDE");

        $("#"+tabs.EMPL+"gridDerechoHabientes").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Empleados.NRODOC,campo: "numerodocumento",width: "80",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Empleados.APENOM, campo: "nombres", width: "250", sortable: true,search:{operator:"LIKE"}},
                {title: lang.TipoVinculoFamiliar.VICNULO, campo: "vinculofamiliar", width: "110", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Empleados.EMAIL, campo: "email", width: "250", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Empleados.TELS, campo: "telefonos", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadod", width: "80", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Empleados.getDerechoHabiente",
                    serverParams: "id_derechohabiente"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Empleados.postDeleteDerechoHabiente",
                    serverParams: "id_derechohabiente"
                }
            }],
            ajaxSource: _private.config.moduloDH+"getGridDerechoHabientes",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
                /*bloquear submit en input de datagrid*/
                $("#"+tabs.EMPL+"formNewDerechoHabientes").find("#"+tabs.EMPL+"dh2").off("keyup keypress");
                $("#"+tabs.EMPL+"formNewDerechoHabientes").find("#"+tabs.EMPL+"dh2").on("keyup keypress", function(e) {
                    var code = e.keyCode || e.which; 
                    if (code  === 13) {               
                      e.preventDefault();
                      return false;
                    }
                });
            }
        });
    };
    
    _public.getGridCargos = function (reload){
        var pEdit   = simpleScript.getPermiso("EMPLED");
        var pDelete = simpleScript.getPermiso("EMPLDE");

        $("#"+tabs.EMPL+"gridCargos").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Area.Area,campo: "area",width: "250",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Cargo.KARGO, campo: "cargo", width: "250", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Empleados.PRIN, campo: "principal", width: "80", sortable: true, class: "center"},
                {title: lang.generic.EST, campo: "estadoct", width: "80", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "Empleados.getFormEditCargo",
                    serverParams: "id_cargotrabajador"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Empleados.postDeleteCargo",
                    serverParams: "id_cargotrabajador"
                }
            }],
            ajaxSource: _private.config.moduloC+"getGridCargos",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
                /*bloquear submit en input de datagrid*/
                $("#"+tabs.EMPL+"formNewDerechoHabientes").find("#"+tabs.EMPL+"dh2").off("keyup keypress");
                $("#"+tabs.EMPL+"formNewDerechoHabientes").find("#"+tabs.EMPL+"dh2").on("keyup keypress", function(e) {
                    var code = e.keyCode || e.which; 
                    if (code  === 13) {               
                      e.preventDefault();
                      return false;
                    }
                });
            }
        });
    };
    
    _public.getGridConceptos = function (reload){
        if(reload){
//            $('#'+tabs.EMPL+'contGridCargo').html('<table id="'+tabs.EMPL+'gridCargos" class="table table-striped table-hover table-condensed dataTable table-bordered" ></table>');
        }
        var pEdit   = simpleScript.getPermiso("EMPLED");
        var pDelete = simpleScript.getPermiso("EMPLDE");

        $("#"+tabs.EMPL+"gridConceptos").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tAxion: 'Acc.',
            tColumns: [
                {title: lang.ConceptoPlanilla.CONC,campo: "conceptoplanilla",width: "250",sortable: true},
                {title: lang.Empleados.TTAP, campo: "tipo_aplicacion", width: "70", sortable: true,class: "center"},
                {title: lang.Empleados.PRM, campo: "permanente", width: "70", sortable: true, class: "center"},
//                {title: lang.Empleados.FEINI, campo: "fecha_inicio", width: "90", sortable: true, class: "center"},
//                {title: lang.Empleados.FEFIN, campo: "fecha_fin", width: "90", sortable: true, class: "center"},
                {title: lang.Empleados.MTO , campo: "monto", width: "80", sortable: true, class: "right"},
                {title: lang.generic.EST, campo: "estadocp", width: "80", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "Empleados.postDeleteConceptoPlanilla",
                    serverParams: "id_conceptosplanillatrabajador"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridConceptos",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
                /*bloquear submit en input de datagrid*/
                $("#"+tabs.EMPL+"dh4").off("keyup keypress");
                $("#"+tabs.EMPL+"dh4").on("keyup keypress", function(e) {
                    var code = e.keyCode || e.which; 
                    if (code  === 13) {               
                      e.preventDefault();
                      return false;
                    }
                });
            }
        });
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
    
    _public.formNewDerechoHabientes = function(btn,id,name){
        _private.idEmpleados = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewDerechoHabientes",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formNewDerechoHabientes").modal("show");
                $("#name-empelado").html(name);
            }
        });
    };
    
    _public.getFormNewConcepto = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewConceptoPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formNewConceptoPlanilla").modal("show");
            }
        });
    };
    
    _public.getDerechoHabiente = function(btn,id){
        _private.idDerechoHabiente = id;
            
        simpleAjax.send({
            element: btn,
            root: _private.config.moduloDH + "getDerechoHabiente",
            fnServerParams: function(sData){
                sData.push({name: "_idDerechoHabiente", value: _private.idDerechoHabiente});
            },
            fnCallback: function(data){
                EmpleadosScript.setDerechohabiente(data);
                Empleados.getProvincia(data.id_ubigeodireccion.substring(0,2),'dh',data.id_ubigeodireccion.substring(0,4));
                Empleados.getDistrito(data.id_ubigeodireccion.substring(0,4),'dh',data.id_ubigeodireccion);
            }
        });
    };
    
    _public.formDatosLaborales = function(btn,id,name){
        _private.idEmpleados = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formDatosLaborales",
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formDatosLaborales").modal("show");
                $("#name-empelado").html(name);
                Empleados.getGridCargos(true);
                Empleados.getGridConceptos(true);
            }
        });
    };
    
    _public.getFormNewCargo = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewCargo",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formNewCargo").modal("show");
            }
        });
    };
    
    _public.getFormEditCargo = function(btn,id){
        _private.idCargoTrabajador = id;
        
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditCargo",
            fnServerParams: function(sData){
                sData.push({name: "_idCargoTrabajador", value: _private.idCargoTrabajador});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.EMPL+"formEditCargo").modal("show");
            }
        });
    };
    
    _public.getProvincia = function(depa,pre,defa){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getProvincia",
            fnServerParams: function(sData){
                sData.push({name: "_idDepartamento", value: depa});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: '#'+tabs.EMPL+'d_provincia'+pre,
                    required: true,
                    deffault: defa,
                    attr:{
                        id: tabs.EMPL+'lst_provincia'+pre,
                        name: tabs.EMPL+'lst_provincia'+pre,
                        onchange: 'Empleados.getDistrito(this.value,\''+pre+'\');'
                    },
                    dataView:{
                        etiqueta: 'provincia',
                        value: 'id_provincia'
                    }
                });
            }
        });
    };
    
    _public.getDistrito = function(pro,pre,def){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getDistrito",
            fnServerParams: function(sData){
                sData.push({name: "_idProvincia", value: pro});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: '#'+tabs.EMPL+'d_ubigeo'+pre,
                    required: true,
                    deffault: def,
                    attr:{
                        id: tabs.EMPL+'lst_ubigeo'+pre,
                        name: tabs.EMPL+'lst_ubigeo'+pre
                    },
                    dataView:{
                        etiqueta: 'distrito',
                        value: 'id_ubigeo'
                    }
                });
            }
        });
    };
    
    _public.getCuentaCorriente = function(ban,pre,def){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + "getCuentaCorriente",
            fnServerParams: function(sData){
                sData.push({name: "_idCtaCte", value: ban});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    optionSelec: true,
                    content: '#'+tabs.EMPL+'d_ctacte'+pre,
                    required: true,
                    deffault: def,
                    attr:{
                        id: tabs.EMPL+'lst_ctacte'+pre,
                        name: tabs.EMPL+'lst_ctacte'+pre
                    },
                    dataView:{
                        etiqueta: 'cuentacorriente',
                        value: 'id_cuentacorriente'
                    }
                });
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
                        content: lang.Empleados.EXIST
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
                        content: lang.Empleados.EXIST
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
    
    _public.postNewDerechoHabiente = function(){
        var flag = 1;
        if(_private.idDerechoHabiente != 0){
            flag = 2;
        }
        simpleAjax.send({
            flag: flag,
            element: "#"+tabs.EMPL+"btnGrDH",
            root: _private.config.moduloDH + "newDerechoHabientes",
            form: "#"+tabs.EMPL+"formNewDerechoHabientes",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
                sData.push({name: "_idDerechoHabiente", value: _private.idDerechoHabiente});
                
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Empleados.getGridDerechohabientes(false);
                            //al editar resetear id
                            _private.idDerechoHabiente = 0;
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Empleados.EXISTDH
                    });
                }
            }
        });
    };
    
    _public.postNewCargo = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.EMPL+"btnGrCT",
            root: _private.config.moduloC + "newCargo",
            form: "#"+tabs.EMPL+"formNewCargo",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Empleados.getGridCargos(false);
                            EmpleadosScript.resetCargo();
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Cargo.EXIST2
                    });
                }
            }
        });
    };
    
    _public.postEditCargo = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.EMPL+"btnGrCT",
            root: _private.config.moduloC + "editCargo",
            form: "#"+tabs.EMPL+"formEditCargo",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
                sData.push({name: "_idCargoTrabajador", value: _private.idCargoTrabajador});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Empleados.getGridCargos(false);
                            _private.idCargoTrabajador = 0;
                            simpleScript.closeModal("#"+tabs.EMPL+"formEditCargo");
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Cargo.EXIST2
                    });
                }
            }
        });
    };
    
    _public.postDeleteDerechoHabiente = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.moduloDH + "deleteDerechohabiente",
                    fnServerParams: function(sData){
                        sData.push({name: "_idDerechoHabiente", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Empleados.getGridDerechohabientes(false);
                                }
                            });
                        }
                    }
                });
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
                    root: _private.config.moduloC + "deleteCargo",
                    fnServerParams: function(sData){
                        sData.push({name: "_idCargoTrabajador", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Empleados.getGridCargos(false);
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.postDatos = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.EMPL+"btnGrDatos",
            root: _private.config.modulo + "postDatos",
            form: "#"+tabs.EMPL+"formDatos",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                }
            }
        });
    };
    
    _public.postDatosBancarios = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.EMPL+"btnGrBanco",
            root: _private.config.modulo + "postDatos",
            form: "#"+tabs.EMPL+"formDatosBancarios",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                }
            }
        });
    };
    
    _public.formPensiones = function(){
        simpleAjax.send({
            flag: 3,
            element: "#"+tabs.EMPL+"btnGrSP",
            root: _private.config.modulo + "postDatos",
            form: "#"+tabs.EMPL+"formPensiones",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                }
            }
        });
    };
    
    _public.postAlta = function(){
        simpleAjax.send({
            flag: 4,
            element: "#"+tabs.EMPL+"btnGrAlta",
            root: _private.config.modulo + "postDatos",
            form: "#"+tabs.EMPL+"formAlta",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                }
            }
        });
    };
    
    _public.postBaja = function(){
        simpleAjax.send({
            flag: 5,
            element: "#"+tabs.EMPL+"btnGrBaja",
            root: _private.config.modulo + "postDatos",
            form: "#"+tabs.EMPL+"formBaja",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                }
            }
        });
    };
    
    _public.postNewConcepto = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.EMPL+"btnGrCPLL",
            root: _private.config.modulo + "postNewConcepto",
            form: "#"+tabs.EMPL+"formNewConceptoPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idEmpleados", value: _private.idEmpleados});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3
                    });
                    Empleados.getGridConceptos(false);
                    simpleScript.updateChosen({element:'#'+tabs.EMPL+'lst_concepto'});
                    simpleScript.updateChosen({element:'#'+tabs.EMPL+'lst_tipoaplicacion'});
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
                                    Empleados.getGridConceptos(false);
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