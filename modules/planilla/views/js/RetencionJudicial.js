/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 24-05-2015 01:05:46 
* Descripcion : RetencionJudicial.js
* ---------------------------------------
*/
var RetencionJudicial_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        planilla: "RetencionJudicialScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idRetencionJudicial = 0;
    
    _private.config = {
        modulo: "planilla/RetencionJudicial/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : RetencionJudicial*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.RTJD,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                RetencionJudicial.getIndex();
            }
        });
    };
    
    /*index del tab: RetencionJudicial*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.RTJD+"_CONTAINER").html(data);
                RetencionJudicial.getGridRetencionJudicial(true);
            }
        });
    };
    
    _public.getGridRetencionJudicial = function (reload){
        
        var pEdit   = simpleScript.getPermiso("RTJDED");
        var pDelete = simpleScript.getPermiso("RTJDDE");
        
        $("#"+tabs.RTJD+"gridRetencionJudicial").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            tColumns: [
                {title: lang.RetencionJudicial.DNI,campo: "dni",width: "50",sortable: true,search: {operator:"LIKE"}},
                {title: lang.RetencionJudicial.NOMBCOMP, campo: "nombrecompleto", width: "200", sortable: true,search:{operator:"LIKE"}},
                {title: lang.RetencionJudicial.CONCEPTO, campo: "conceptoplanilla", width: "100", sortable: true, class: "left"},
                {title: lang.RetencionJudicial.BENEF, campo: "beneficiario", width: "100", sortable: true, class: "left"},
                {title: lang.RetencionJudicial.TIPAPL, campo: "tipoaplicacion", width: "100", sortable: true, class: "left"},
                {title: lang.RetencionJudicial.FECHAI, campo: "fecha_inicio", width: "100", sortable: true, class: "center"},
                {title: lang.RetencionJudicial.FECHAF, campo: "fecha_fin", width: "100", sortable: true, class: "center"},
                {title: lang.RetencionJudicial.MONTO, campo: "monto", width: "100", sortable: true, class: "right"},
                {title: lang.generic.EST, campo: "estado", width: "50", sortable: true, class: "center"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pEdit.permiso,
                icono: pEdit.icono,
                titulo: pEdit.accion,
                class: pEdit.theme,
                ajax: {
                    fn: "RetencionJudicial.getFormEditRetencionJudicial",
                    serverParams: "id_retencionjudicial"
                }
            }, {
                access: pDelete.permiso,
                icono: pDelete.icono,
                titulo: pDelete.accion,
                class: pDelete.theme,
                ajax: {
                    fn: "RetencionJudicial.postDeleteRetencionJudicial",
                    serverParams: "id_retencionjudicial"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridRetencionJudicial",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewRetencionJudicial = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewRetencionJudicial",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.RTJD+"formNewRetencionJudicial").modal("show");
            }
        });
    };
    
    _public.getFormEditRetencionJudicial = function(btn,id){
        _private.idRetencionJudicial = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formEditRetencionJudicial",
            fnServerParams: function(sData){
                sData.push({name: "_idRetencionJudicial", value: _private.idRetencionJudicial});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.RTJD+"formEditRetencionJudicial").modal("show");
            }
        });
    };
    
    _public.getBeneficiario = function(obj){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + 'getBeneficiario',
            //data: '&_idCriterio='+obj.idTrabajador,
            fnServerParams: function(sData){
                sData.push({name: "_idCriterio", value: obj.idTrabajador});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    content: obj.content,
                    required: true,
                    attr:{
                        id: obj.idElement,
                        name: obj.nameElement,
                        'class':'form-control'
                    },
                    dataView:{
                        etiqueta: 'nombres', // nombre de los campos de la bd
                        value: 'id_derechohabiente'
                    }                  
                });
            }
        });
    };
    
    _public.getCuentaCorriente = function(obj){
        simpleAjax.send({
            gifProcess: true,
            root: _private.config.modulo + 'getCuentaCorriente',
            fnServerParams: function(sData){
                sData.push({name: "_idCriterio", value: obj.idBanco});
            },
            fnCallback: function(data){
                simpleScript.listBox({
                    data: data,
                    content: obj.content,
                    required: true,
                    attr:{
                        id: obj.idElement,
                        name: obj.nameElement,
                        'class':'form-control'
                    },
                    dataView:{
                        etiqueta: 'cuentacorriente', // nombre de los campos de la bd
                        value: 'id_cuentacorriente'
                    }                  
                });
            }
        });
    };
    
    _public.postNewRetencionJudicial = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.RTJD+"btnGrRetencionJudicial",
            root: _private.config.modulo + "newRetencionJudicial",
            form: "#"+tabs.RTJD+"formNewRetencionJudicial",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            RetencionJudicial.getGridRetencionJudicial(false);
                            simpleScript.closeModal("#"+tabs.RTJD+"formNewRetencionJudicial");
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.RetencionJudicial.EXIST
                    });
                }
            }
        });
    };
    
    _public.postEditRetencionJudicial = function(){
        simpleAjax.send({
            flag: 2,
            element: "#"+tabs.RTJD+"btnEdRetencionJudicial",
            root: _private.config.modulo + "editRetencionJudicial",
            form: "#"+tabs.RTJD+"formEditRetencionJudicial",
            clear: true,
            fnServerParams: function(sData){
                sData.push({name: "_idRetencionJudicial", value: _private.idRetencionJudicial});
            },
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_10,
                        callback: function(){
                            _private.idRetencionJudicial = 0;
                            simpleScript.closeModal("#"+tabs.RTJD+"formEditRetencionJudicial");
                            RetencionJudicial.getGridRetencionJudicial(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.RetencionJudicial.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteRetencionJudicial = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteRetencionJudicial",
                    fnServerParams: function(sData){
                        sData.push({name: "_idRetencionJudicial", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    RetencionJudicial.getGridRetencionJudicial(false);
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
var RetencionJudicial = new RetencionJudicial_();

RetencionJudicial.main(); 