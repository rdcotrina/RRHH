/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 10-04-2015 17:04:02 
* Descripcion : GenerarContrato.js
* ---------------------------------------
*/
var GenerarContrato_ = function(){
    
    /*cargar requires*/
    simpleObject.require({
        personal: "GenerarContratoScript"
    });
    
    /*metodos privados*/
    var _private = {};
    
    _private.idGenerarContrato = 0;
    
    _private.idTrabajdor = 0;
    
    _private.config = {
        modulo: "personal/GenerarContrato/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : GenerarContrato*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.GNCTR,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                GenerarContrato.getIndex();
            }
        });
    };
    
    /*index del tab: GenerarContrato*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.GNCTR+"_CONTAINER").html(data);
                GenerarContrato.getGridGenerarContrato(true);
            }
        });
    };
    
    _public.getGridGenerarContrato = function (reload){
        var pHistoria   = simpleScript.getPermiso("GNCTRHIS");
        var pBPDF   = simpleScript.getPermiso("GNCTRPDF");

        $("#"+tabs.GNCTR+"gridGenerarContrato").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tAxion: lang.generic.AXC,
            tColumns: [
                {title: lang.Empleados.NRODOC,campo: "numerodocumento",width: "70", class: "center",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Empleados.APENOM, campo: "nombrecompleto", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Area.Area, campo: "area", width: "120", sortable: true,search:{operator:"LIKE"}},
                {title: lang.Cargo.KARGO, campo: "cargo", width: "130", sortable: true,search:{operator:"LIKE"}},
                {title: lang.GenerarContrato.FEINI,campo: "fe_ini",width: "80", class: "center",sortable: true,search: {operator:"LIKE"}},
                {title: lang.GenerarContrato.FEFIN,campo: "fe_fin",width: "80", class: "center",sortable: true,search: {operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estadoct", width: "50", sortable: true, class: "center",search:{type: 'select',dataClient:[{etiqueta:lang.generic.ACTI,value:'A'},{etiqueta:lang.generic.VEN,value:'V'},{etiqueta:lang.generic.PEN,value:'P'}]}}
            ],
            pPaginate: true,
            sAxions: [{
                access: pHistoria.permiso,
                icono: pHistoria.icono,
                titulo: pHistoria.accion,
                class: pHistoria.theme,
                ajax: {
                    fn: "GenerarContrato.getFormHistorial",
                    serverParams: ["id_trabajador","nombrecompleto"]
                }
            },{
                access: pBPDF.permiso,
                icono: pBPDF.icono,
                titulo: pBPDF.accion,
                class: pBPDF.theme,
                ajax: {
                    fn: "GenerarContrato.getContratoPDF",
                    serverParams: "id_trabajador"
                },
                callback: function(i,data,oSettings){
                    var btn = $('<button></button>');
                    btn.attr('type', 'button');
                    btn.attr('id', oSettings.tObjectTable + '_btn' + i);
                    btn.attr('title', oSettings.sAxions[i].titulo);
                    btn.attr('onclick','GenerarContrato.getContratoPDF(this,\''+data.id_trabajador+'\');');
                    btn.attr('class', oSettings.sAxions[i].class);
                    btn.html('<i class="' + oSettings.sAxions[i].icono + '"></i>');
                    
                    if(data.id_tipocontrato < 2){
                        btn.attr('disabled',true);
                    }
                    if(oSettings.sAxions[i].access){
                        return btn;
                    }
                }
            }],
            ajaxSource: _private.config.modulo+"getGridGenerarContrato",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getGridSinContrato = function (reload){
        $("#"+tabs.GNCTR+"gridSinContrato").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tAxion: lang.generic.AXC,
            tColumns: [
                {title: lang.Empleados.NRODOC,campo: "numerodocumento",width: "70", class: "center",sortable: true,search: {operator:"LIKE"}},
                {title: lang.Empleados.APENOM, campo: "nombrecompleto", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.GenerarContrato.FEINI,campo: "fe_ini",width: "80", class: "center"},
                {title: lang.GenerarContrato.FEFIN,campo: "fe_fin",width: "80", class: "center"},
                {title: lang.generic.EST, campo: "estadoct", width: "50", class: "center"}
            ],
            pPaginate: true,
            ajaxSource: _private.config.modulo+"getGridSinContrato",
            sCheckbox: {
                start: true,
                serverValues: 'id_trabajador'
            },
            fnCallback: function(oSettings) {
                /*evitar submit en filtros de grid*/
                simpleScript.noSubmit("#"+oSettings.tObjectTable+"_head");
                
                GenerarContratoScript.addInputDate(oSettings);
                
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button, input"
                }); 
                
                GenerarContratoScript.addEvents(oSettings);
            }
        });
    };
    
    _public.getGridHistorial = function (reload){
        var pDel   = simpleScript.getPermiso("GNCTRDE");        

        $("#"+tabs.GNCTR+"gridHistorial").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.GenerarContrato.FEINI,campo: "fecha_inicio",width: "80", class: "center",sortable: true,search: {operator:"LIKE"}},
                {title: lang.GenerarContrato.FEFIN,campo: "fecha_fin",width: "80", class: "center",sortable: true,search: {operator:"LIKE"}}
            ],
            pPaginate: true,
            sAxions: [{
                access: pDel.permiso,
                icono: pDel.icono,
                titulo: pDel.accion,
                class: pDel.theme,
                ajax: {
                    fn: "GenerarContrato.postDeleteContrato",
                    serverParams: "id_contrato"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridHistorial",
            fnServerParams: function(sData){
                sData.push({name: "_idTrabajador", value: _private.idTrabajdor});
            },
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
                
                simpleScript.noSubmit("#"+oSettings.tObjectTable+"_head");
            }
        });
    };
    
    _public.getFormNewGenerarContrato = function(btn){        
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewGenerarContrato",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.GNCTR+"formNewGenerarContrato").modal("show");
                GenerarContrato.getGridSinContrato(true);
            }
        });
    };
    
    _public.getFormHistorial = function(btn,id,name){
        _private.idTrabajdor = id;
        
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formHistorial",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.GNCTR+"formHistorial").modal("show");
                GenerarContrato.getGridHistorial(true);
                $("#"+tabs.GNCTR+"name-empl").html(name);
            }
        });
    };
    
    _public.getContratoPDF = function(btn,idtrabajador){
        simpleAjax.send({
            element: btn,
            root: _private.config.modulo + 'getContratoPDF',
            fnServerParams: function(sData){
                sData.push({name: "_idTrabajador", value: idtrabajador});
            },
            fnCallback: function(data) {
                if(parseInt(data.result) === 1 && parseInt(data.contrato) > 1){
                    $('#'+tabs.GNCTR+'btnDowPDF').attr("onclick","window.open('public/files/"+data.archivo+"','_blank');GenerarContrato.deleteArchivo('"+data.archivo+"');");
                    $('#'+tabs.GNCTR+'btnDowPDF').click();
                }else if(parseInt(data.contrato) < 2){
                    simpleScript.notify.error({
                        content: lang.GenerarContrato.NOCT
                    });
                }
            }
        });
    };
    
    _public.postGenerarContrato = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.GNCTR+"btnGrGenerarContrato",
            root: _private.config.modulo + "generarContrato",
            form: "#"+tabs.GNCTR+"formNewGenerarContrato",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            GenerarContrato.getGridGenerarContrato(false);
                            simpleScript.closeModal("#"+tabs.GNCTR+"formNewGenerarContrato");
                        }
                    });
                }
            }
        });
    };
    
    _public.postDeleteContrato = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "postDeleteContrato",
                    fnServerParams: function(sData){
                        sData.push({name: "_idGenerarContrato", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    GenerarContrato.getGridHistorial(false);
                                    GenerarContrato.getGridGenerarContrato(false)
                                }
                            });
                        }
                    }
                });
            }
        });
    };
    
    _public.deleteArchivo = function(archivo){
        setTimeout(function(){
            simpleAjax.send({
                root: _private.config.modulo + 'deleteArchivo',
                fnServerParams: function(sData){
                    sData.push({name: "_archivo", value: archivo});
                }
            });
        },7000);
    };
    
    return _public;
    
};
var GenerarContrato = new GenerarContrato_();

GenerarContrato.main(); 