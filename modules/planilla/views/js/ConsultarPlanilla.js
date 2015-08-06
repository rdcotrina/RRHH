/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 25-06-2015 01:06:47 
* Descripcion : ConsultarPlanilla.js
* ---------------------------------------
*/
var ConsultarPlanilla_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        planilla: "ConsultarPlanillaScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.generateHtmlExport = function(data){
        var caption = $("#"+tabs.CONPL+"lst_tipoplanilla option:selected").text();
   
        var tableEx = '<table border="1">';
        tableEx += '<thead>';
        tableEx += '<tr><td></td></tr><tr><td colspan="10" style="text-align:center">'+caption+'</td></tr><tr><td></td></tr>';
        tableEx += '<tr>';

        tableEx += '<th>Nro.</th>';
        /*recorrido de columnas*/
        for(var i in data){
            if(i == 0){
                for(var j in data[i]){
                    var title = (j !== undefined) ? j : '';
                    tableEx += '<th>'+title+'</th>';
                }
            }
        }
        
        /*================================*/
        var lll = data.length,
            n = 0;
        if (data.length) {
            /*recorrido de los registros del server*/
            for (var ii in data) {
                if(ii < lll){
                    n++;
                    tableEx += '<tr>';
                    tableEx += '<td>'+n+'</td>';
                    
                    /*recorrido de columnas configuradas en js*/
                    for(var jj in data[ii]){
                        var zell = (data[ii][jj] == null)? '': data[ii][jj];
                        tableEx += '<td>'+zell+'</td>';
                    }
                    tableEx += '</tr>';
                }
            }
        }
        /*=================================*/
        tableEx += '<tr>';
        tableEx += '</thead>';
        tableEx += '</table>';
        return tableEx;
    };
    
    _private.idConsultarPlanilla = 0;
    
    _private.config = {
        modulo: "planilla/ConsultarPlanilla/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : ConsultarPlanilla*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.CONPL,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                ConsultarPlanilla.getIndex();
            }
        });
    };
    
    /*index del tab: ConsultarPlanilla*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.CONPL+"_CONTAINER").html(data);
                ConsultarPlanilla.getGridConsultarPlanilla(true);
            }
        });
    };
    
    _public.getGridConsultarPlanilla = function (reload){
        var pEdit   = simpleScript.getPermiso("CONPLED");
        var pDelete = simpleScript.getPermiso("CONPLDE");

        $("#"+tabs.CONPL+"gridConsultarPlanilla").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.ConsultarPlanilla.APATERNO,campo: "apellidopaterno",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.ConsultarPlanilla.AMATERNO,campo: "apellidomaterno",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.ConsultarPlanilla.PNOMBRE,campo: "primernombre",width: "200",sortable: true,search: {operator:"LIKE"}},
                {title: lang.ConsultarPlanilla.SNOMBRE, campo: "segundonombre", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "ConsultarPlanilla.getFormEditConsultarPlanilla",
                    serverParams: "id_trabajador"
                }
            }
            ],
            ajaxSource: _private.config.modulo+"getGridConsultarPlanilla",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewConsultarPlanilla = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewConsultarPlanilla",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CONPL+"formNewConsultarPlanilla").modal("show");
            }
        });
    };
    
    _public.getExcel = function(btn){
        if ($("#"+tabs.CONPL+"lst_tipoplanilla").val() == '')  {
            simpleScript.notify.error({
                        content: 'Seleccione Tipo de planilla a exportar'
                        
                    });
                    return false;
        }
        simpleAjax.send({
            element: btn,
            root: _private.config.modulo + "getExcel",
            fnServerParams: function(sData){
                sData.push({name: "_idProcesoPlanilla", value: $("#"+tabs.CONPL+"lst_tipoplanilla").val()});
            },
            fnCallback: function(data){
                if(data.length > 0){
                    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(_private.generateHtmlExport(data)));
                }else{
                    simpleScript.notify.ok({
                        content: 'No se encontraron registros.'
                        
                    });
                }
                
            }
        });
    };
    
    _public.getFormEditConsultarPlanilla = function(btn,id){
        _private.idConsultarPlanilla = id;
      //  alert($("#"+tabs.CONPL+"lst_tipoplanilla").val());
        if ($("#"+tabs.CONPL+"lst_tipoplanilla").val() == '')  {
            simpleScript.notify.error({
                        content: 'Seleccione Tipo de planilla a consultar'
                        
                    });
                    return false;
        }
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditConsultarPlanilla",
            fnServerParams: function(sData){
                sData.push({name: "_idConsultarPlanilla", value: _private.idConsultarPlanilla});
                sData.push({name: "_idProcesoPlanilla", value: $("#"+tabs.CONPL+"lst_tipoplanilla").val()});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.CONPL+"formEditConsultarPlanilla").modal("show");
            }
        });
    };
    
    _public.postNewConsultarPlanilla = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.CONPL+"btnGrConsultarPlanilla",
            root: _private.config.modulo + "newConsultarPlanilla",
            form: "#"+tabs.CONPL+"formNewConsultarPlanilla",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            ConsultarPlanilla.getGridConsultarPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "ConsultarPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postEditConsultarPlanilla = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.CONPL+"btnEdConsultarPlanilla",
            root: _private.config.modulo + "editConsultarPlanilla",
            form: "#"+tabs.CONPL+"formEditConsultarPlanilla",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idConsultarPlanilla", value: _private.idConsultarPlanilla});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idConsultarPlanilla = 0;
                            simpleScript.closeModal("#"+tabs.CONPL+"formEditConsultarPlanilla");
                            ConsultarPlanilla.getGridConsultarPlanilla(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: "ConsultarPlanilla ya existe."
                    });
                }
            }
        });
    };
    
    _public.postDeleteConsultarPlanilla = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteConsultarPlanilla",
                    fnServerParams: function(sData){
                        sData.push({name: "_idConsultarPlanilla", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    ConsultarPlanilla.getGridConsultarPlanilla(false);
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
var ConsultarPlanilla = new ConsultarPlanilla_();

ConsultarPlanilla.main(); 