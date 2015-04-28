/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 05-04-2015 19:04:19 
* Descripcion : Vacaciones.js
* ---------------------------------------
*/
var Vacaciones_ = function(){
    
    /*cargar requires*/
    simpleObject.require({
        personal: "VacacionesScript"
    });
    
    /*metodos privados*/
    var _private = {};
    
    _private.idVacaciones = 0;
    
    _private.idTrabajador = 0;
    
    _private.idMovimiento = 0;
    
    _private.accion = 'G';
    
    _private.config = {
        modulo: "personal/Vacaciones/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : Vacaciones*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.VACA,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                Vacaciones.getIndex();
            }
        });
    };
    
    /*index del tab: Vacaciones*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.VACA+"_CONTAINER").html(data);
                Vacaciones.getGridVacaciones(true);
            }
        });
    };
    
    _public.getGridVacaciones = function (reload){
        var pGestionar   = simpleScript.getPermiso("VACAGST");

        $("#"+tabs.VACA+"gridVacaciones").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.Vacaciones.APATERNO,campo: "apellidopaterno",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Vacaciones.AMATERNO,campo: "apellidomaterno",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Vacaciones.PNOMBRE,campo: "primernombre",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Vacaciones.SNOMBRE, campo: "segundonombre", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pGestionar.permiso,
                icono: pGestionar.icono,
                titulo: pGestionar.accion,
                class: pGestionar.theme,
                ajax: {
                    fn: "Vacaciones.getTabGestionarVac",
                    serverParams: "id_trabajador"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridVacaciones",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    //gridGestionVacaciones
    _public.getGridGestionar = function (reload){
        $("#"+tabs.VACA+"gridGestionVacaciones").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            dPrimaryKey: 'id_ausencias_trabajador',
            //id_vac_movimiento
            tColumns: [
                {title: lang.Vacaciones.TIPOVAC,campo: "tipo_ausencia",width: "300",sortable: true},
                {title: lang.Vacaciones.FECHAI,campo: "fecha_inicio",width: "100",sortable: true,class:"center"},
                {title: lang.Vacaciones.FECHAF,campo: "fecha_fin",width: "100",sortable: true,class:"center"},
                {title: lang.Vacaciones.DIAS,campo: "dias_ausencia",width: "80",sortable: true,class:"right"}
                //dias_vac
            ],
            pPaginate: true,
            ajaxSource: _private.config.modulo+"getGridGestionar",
            fnServerParams: function(sData){
                sData.push({name: "_idTrabajador", value: _private.idTrabajador});
            },
            fnCallback: function(oSettings) {
                oSettings.fnClickRow(function(fData,i,key){
                    _private.idMovimiento = key;
                    _private.accion = 'E';
                    VacacionesScript.setData(fData,i);
                    $('#'+tabs.VACA+'btnNEWVacaciones').attr('disabled',false);
                    $('#'+tabs.VACA+'btnELIVacaciones').attr('disabled',false);
                });
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getTabGestionarVac = function(btn,id){
        simpleScript.addTab({
            id : tabs.VACA+'_GESTIONAR',
            label: lang.Vacaciones.GST,
            reload: true,
            fnCallback: function(){
                Vacaciones.getIndexGesionar(btn,id);
            }
        });
    };
    
    _public.getIndexGesionar = function(btn,id){
        _private.accion = 'G';
        _private.idTrabajador = id;
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo+'IndexGestionar',
            fnServerParams: function(sData){
                sData.push({name: "_idTrabajador", value: _private.idTrabajador});
            },
            fnCallback: function(data){
                $("#"+tabs.VACA+"_GESTIONAR_CONTAINER").html(data);
                Vacaciones.getGridGestionar(true);
            }
        });
    };
    
    _public.postGestionar = function(){
        switch (_private.accion){
            case 'G':
                Vacaciones.postNewMovimiento();
                break;
            case 'E':
              //  alert(1);
                Vacaciones.postEditMovimiento();
                break;
        }
        
    };
    
    _public.postNewMovimiento = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.VACA+"btnGRAVacaciones",
            root: _private.config.modulo + "newMovimiento",
            form: "#"+tabs.VACA+"formGestionar",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idTrabajador", value: _private.idTrabajador});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            Vacaciones.getGridGestionar(false);
                            simpleScript.updateChosen({element: '#'+tabs.VACA+'lst_tipovac'});
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Vacaciones.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditMovimiento = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.VACA+"btnGRAVacaciones",
            root: _private.config.modulo + "editMovimiento",
            form: "#"+tabs.VACA+"formGestionar",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idMovimiento", value: _private.idMovimiento});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            Vacaciones.getGridGestionar(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.Vacaciones.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteMovimiento = function(){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: "#"+tabs.VACA+"btnELIVacaciones",
                    gifProcess: true,
                    root: _private.config.modulo + "deleteMovimiento",
                    fnServerParams: function(sData){
                        sData.push({name: "_idMovimiento", value: _private.idMovimiento});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    Vacaciones.getGridGestionar(false);
                                    $('#'+tabs.VACA+'btnELIVacaciones').attr("disabled",true);
                                    $('#'+tabs.VACA+'btnNEWVacaciones').click().attr("disabled",true);
                                    _private.idMovimiento = 0;
                                    _private.accion = 'G';
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


var Vacaciones = new Vacaciones_();

Vacaciones.main(); 