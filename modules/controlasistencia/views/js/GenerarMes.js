/*
* ---------------------------------------
* --------- CREATED BY CREATOR ----------
* fecha: 18-04-2015 22:04:14 
* Descripcion : GenerarMes.js
* ---------------------------------------
*/
var GenerarMes_ = function(){
    
    /*cargar requires*/
    /*descomentar de ser necesario
    simpleObject.require({
        controlasistencia: "GenerarMesScript"
    });
    */
    
    /*metodos privados*/
    var _private = {};
    
    _private.idGenerarMes = 0;
    
    _private.config = {
        modulo: "controlasistencia/GenerarMes/"
    };

    /*metodos publicos*/
    var _public = {};
    
    /*crea tab : GenerarMes*/
    _public.main = function(){
        simpleScript.addTab({
            id : tabs.MSGN,
            label: simpleObject.getTitle(),
            fnCallback: function(){
                GenerarMes.getIndex();
            }
        });
    };
    
    /*index del tab: GenerarMes*/
    _public.getIndex = function(){
        simpleAjax.send({
            dataType: "html",
            root: _private.config.modulo,
            fnCallback: function(data){
                $("#"+tabs.MSGN+"_CONTAINER").html(data);
                GenerarMes.getGridGenerarMes(true);
            }
        });
    };
    
    _public.getGridGenerarMes = function (reload){
        var pGest   = simpleScript.getPermiso("MSGNGST");

        $("#"+tabs.MSGN+"gridGenerarMes").simpleGrid({
            tWidthFormat: "px",
            tScrollY: "200px",
            tReload: reload,
            pItemPaginas: 2,
            tColumns: [
                {title: lang.GenerarMes.ANIO,campo: "anio",width: "70"},
                {title: lang.GenerarMes.MES, campo: "mes", width: "100"}
            ],
            pPaginate: true,
            sAxions: [{
                access: pGest.permiso,
                icono: pGest.icono,
                titulo: pGest.accion,
                class: pGest.theme,
                ajax: {
                    fn: "GenerarMes.getFormMeses",
                    serverParams: "id_asistenciames"
                }
            }],
            ajaxSource: _private.config.modulo+"getGridGenerarMes",
            fnCallback: function(oSettings) {
                simpleScript.removeAttr.click({
                    container: "#"+oSettings.tObjectTable,
                    typeElement: "button"
                }); 
            }
        });
        setup_widgets_desktop();
    };
    
    _public.getFormNewGenerarMes = function(btn){
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formNewGenerarMes",
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.MSGN+"formNewGenerarMes").modal("show");
            }
        });
    };
    
    _public.getFormMeses = function(btn,id){
        _private.idGenerarMes = id;
            
        simpleAjax.send({
            element: btn,
            dataType: "html",
            root: _private.config.modulo + "formMeses",
            fnServerParams: function(sData){
                sData.push({name: "_idGenerarMes", value: _private.idGenerarMes});
            },
            fnCallback: function(data){
                $("#cont-modal").append(data);  /*los formularios con append*/
                $("#"+tabs.MSGN+"formEditGenerarMes").modal("show");
            }
        });
    };
    
    _public.postNewGenerarMes = function(){
        simpleAjax.send({
            flag: 1,
            element: "#"+tabs.MSGN+"btnGrGenerarMes",
            root: _private.config.modulo + "newGenerarMes",
            form: "#"+tabs.MSGN+"formNewGenerarMes",
            clear: true,
            fnCallback: function(data) {
                if(!isNaN(data.result) && parseInt(data.result) === 1){
                    simpleScript.notify.ok({
                        content: lang.mensajes.MSG_3,
                        callback: function(){
                            simpleScript.closeModal("#"+tabs.MSGN+"formNewGenerarMes");
                            GenerarMes.getGridGenerarMes(false);
                        }
                    });
                }else if(!isNaN(data.result) && parseInt(data.result) === 2){
                    simpleScript.notify.error({
                        content: lang.GenerarMes.EXIST
                    });
                }
            }
        });
    };
    
    _public.postDeleteGenerarMes = function(btn,id){
        simpleScript.notify.confirm({
            content: lang.mensajes.MSG_5,
            callbackSI: function(){
                simpleAjax.send({
                    flag: 3,
                    element: btn,
                    gifProcess: true,
                    root: _private.config.modulo + "deleteGenerarMes",
                    fnServerParams: function(sData){
                        sData.push({name: "_idGenerarMes", value: id});
                    },
                    fnCallback: function(data) {
                        if(!isNaN(data.result) && parseInt(data.result) === 1){
                            simpleScript.notify.ok({
                                content: lang.mensajes.MSG_6,
                                callback: function(){
                                    GenerarMes.getGridGenerarMes(false);
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
var GenerarMes = new GenerarMes_();

GenerarMes.main(); 