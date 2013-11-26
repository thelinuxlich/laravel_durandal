define(['durandal/app','plugins/dialog'],function(app,dialog){
    var ctor = function(obj,fields,actions,options) {
        this.obj = obj;
        this.fields = fields;
        this.html = "<table cellpadding='0' cellspacing='0' border='0' "+(typeof options !== "undefined" && options["export_tools"] == false ? "data-tools='false'" : "")+" "+(typeof options !== "undefined" && options["click_to_show"] == false ? "data-show='false'" : "")+" style='display:none' class='table table-hover table-striped table-bordered'><thead>";
        this.custom_tfoot = (typeof options !== "undefined" && options["custom_tfoot"] != "" ? options["custom_tfoot"] : "");
        for(var k in fields) {
            this.html += "<th>"+k+"</th>";
        }
        if(actions.length > 0) {
            this.html += "<th>Ações</th>";
        }
        this.html += "</thead><tbody>";
        this.generate_actions = function(id){
            return {
                "Excluir": "<a class='btn btn-sm btn-default remove_item link_row' data-id='"+id+"'><i class='icon-trash'></i> Excluir</a>"
            };
        };
        for(i = 0;i < obj.length;i++) {
            var item = obj[i];
            this.html += "<tr data-id='"+item["id"]+"'>";
            var _actions = this.generate_actions(item["id"]);
            for(var k in fields) {
                field = fields[k];
                if(field == "status") {
                    this.html += "<td><a data-id="+item["id"]+" class='change_status btn btn-sm "+(item["status"] == "0" ? "btn-warning": "btn-success")+"'>"+(item["status"] == "0" ? "Inativo" : "Ativo")+"</a></td>";
                } else {
                    this.html += "<td>"+(item[field] ? item[field] : "")+"</td>";
                }
            }
            if(actions.length > 0) {
                this.html += "<td>";
                for(j = 0; j < actions.length; j++) {
                    this.html += _actions[actions[j]];
                }
                this.html += "</td>";
            }
            this.html += "</tr>";
        }
        if(obj.length > 1) {
            this.html += "</tbody><tfoot><tr>";
            for(var k in fields) {
                var field = fields[k];
                if(field != "status") {
                    this.html += "<td><input type='text' class='form-control'></td>";
                } else {
                    this.html += "<td></td>";
                }
            }
            if(actions.length > 0) {
                this.html += "<td></td>";
            }
            this.html += "</tr>";
            if(!!this.custom_tfoot) {
                this.html += this.custom_tfoot+"</tfoot>";
            }
        }
        this.html += "</table>";
    };

    ctor.initializeTable = function(container_id,extra_options) {
        var asInitVals = [];

        $.extend($.fn.dataTableExt.oStdClasses, {
            "sSortAsc": "header headerSortDown",
            "sSortDesc": "header headerSortUp",
            "sSortable": "header"
        });

        $.extend( true, $.fn.DataTable.TableTools.classes, {
            "container": "btn-group",
            "buttons": {
                "normal": "btn btn-default",
                "disabled": "btn disabled"
            },
            "collection": {
                "container": "DTTT_dropdown dropdown-menu",
                "buttons": {
                    "normal": "",
                    "disabled": "disabled"
                }
            }
        });

        // Have the collection use a bootstrap compatible dropdown
        $.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
            "collection": {
                "container": "ul",
                "button": "li",
                "liner": "a"
            }
        });

        var table_options = {
            "bPaginate": true,
            "bLengthChange": true,
            "bFilter": true,
            "bSort": true,
            "bInfo": false,
            "bAutoWidth": true,
            //"sDom": "<'row'<'col-6'f><'col-6'l>r>t<'row'<'col-6'i><'col-6'p>>",
            //"sDom": "<'row'<'pull-right'f><'pull-left'l>r<'clearfix'>>t<'row'<'pull-left'i><'pull-right'p><'clearfix'>>",
            //"sDom": "<'row'<'pull-right'f><'pull-left'l>r<'clearfix'>>t<'row'<'pull-left'i><'pull-right'p><'clearfix'>>",
            //"sDom": "<'row'<'col-md-6'l><'col-md-6'f>r><'row'<'col-md-12't>><'row'<'col-md-6'i><'col-md-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sProcessing":   "A processar...",
                "sLengthMenu":   "_MENU_ registros",
                "sZeroRecords":  "Não foram encontrados resultados",
                "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registros",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix":  "",
                "sSearch":       "Procurar:",
                "sUrl":          "",
                "oPaginate": {
                    "sFirst":    "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext":     "Seguinte",
                    "sLast":     "Último"
                }
            }
        };

        if(typeof extra_options !== "undefined") {
            table_options = $.extend(true,table_options,extra_options);
        }

        if($("#"+container_id).find(".table").attr("data-tools") !== "false") {
            table_options["sDom"] = "<'row'<'col-xs-4'l><'col-xs-4'T><'col-xs-4'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>";
            //table_options["sDom"] = "<'row'<'col-xs-4'f><'col-6'l>r>t<'row'<'col-6'i><'col-6'p>>";
            //table_options["sDom"] = "<'row'<'pull-right'f><'pull-left'l>r<'clearfix'>>t<'row'<'pull-left'i><'pull-right'p><'clearfix'>>";
            table_options["oTableTools"] = {
                "sSwfPath": "lib/tabletools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "print",
                        "sButtonText": "Imprimir",
                        "sInfo": "<h6>Visualização para Impressão</h6><p>Pressione ESC quando terminar.</p>"
                    },
                    {
                        "sExtends": "csv",
                        "sButtonText": "XLS"
                    }
                ]
            };
        }

        var oTable = $("#"+container_id).find('.table').dataTable(table_options);

        $("#"+container_id).find('.table').show();

        $("tfoot input").keyup( function () {
            /* Filter on the column (the index) of this element */
            oTable.fnFilter( this.value, $("tfoot input").index(this) );
        });

        $("tfoot input").each( function (i) {
            asInitVals[i] = this.value;
        });

        $("tfoot input").focus( function () {
            if ( this.className == "search_init" )
            {
                this.className = "";
                this.value = "";
            }
        });

        $("tfoot input").blur( function (i) {
            if ( this.value == "" )
            {
                this.className = "search_init";
                this.value = asInitVals[$("tfoot input").index(this)];
            }
        });

        if($("#"+container_id).find(".table").attr("data-show") !== "false") {
            $("#"+container_id).on("click",'.table tbody tr',function(){
                window.location.href = "#"+container_id+"/edit/"+$(this).attr("data-id");
            });
        }

        $("#"+container_id).on("click",'.link_row',function(e){
            e.stopPropagation();
        });

        $("#"+container_id).on("click",'.change_status',function(){
            var self = $(this);
            self.attr("disabled",true);
            $.post(container_id+"/update-status/"+self.attr("data-id"), function(r) {
                if(r.status) {
                    if(self.hasClass("btn-warning")) {
                        self.removeClass("btn-warning");
                        self.addClass("btn-success");
                        if(self.text() == "Inativo") {
                            self.text("Ativo");
                        } else if(self.text() == "Pendente") {
                            self.text("Confirmado");
                        } else if(self.text() == "Ausente") {
                            self.text("Presente");
                        }
                    } else {
                        self.removeClass("btn-success");
                        self.addClass("btn-warning");
                        if(self.text() == "Ativo") {
                            self.text("Inativo");
                        } else if(self.text() == "Confirmado") {
                            self.text("Pendente");
                        } else if(self.text() == "Presente") {
                            self.text("Ausente");
                        }
                    }
                } else {
                    dialog.showMessage(html_decode(r.msg));
                }
                self.attr("disabled",false);
            });
            return false;
        });

        $("#"+container_id).on("click",'.remove_item',function(){
            var self = $(this);
            self.attr("disabled",true);
            dialog.showMessage("O item será excluído. Continuar?", "Atenção!",["Ok","Cancelar"]).then(
                function(response) {
                    if(response == "Ok") {
                        self.parent().parent().remove();
                        $.post(window.location.href.replace("#","")+"/destroy/"+self.attr("data-id"), function(r){
                            if(r.status != true) {
                                dialog.showMessage(html_decode(r.msg));
                            }
                        });
                    } else {
                        self.attr("disabled",false);
                    }
                }
            );
            return false;
        });


        var label = $(".dataTables_filter").find("label");
        var input = label.find("input");
        $(".dataTables_length").find("select").addClass("form-control").css("display","inline");
        input.addClass("form-control").attr("placeholder","Procurar").css("float","right");
        $(".dataTables_filter").html(input[0]);
        //label.remove();
    }

    return ctor;
});
