﻿/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
 (function($,sr){
 	var debounce = function (func, threshold, execAsap) {
 		var timeout;

 		return function debounced () {
 			var obj = this, args = arguments;
 			function delayed () {
 				if (!execAsap)
 					func.apply(obj, args); 
 				timeout = null; 
 			}

 			if (timeout)
 				clearTimeout(timeout);
 			else if (execAsap)
 				func.apply(obj, args);

 			timeout = setTimeout(delayed, threshold || 100); 
 		};
 	};

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
$BODY = $('body'),
$MENU_TOGGLE = $('#menu_toggle'),
$SIDEBAR_MENU = $('#sidebar-menu'),
$SIDEBAR_FOOTER = $('.sidebar-footer'),
$LEFT_COL = $('.left_col'),
$RIGHT_COL = $('.right_col'),
$NAV_MENU = $('.nav_menu'),
$FOOTER = $('footer');

var url = "http://localhost:8888/sonar/scripts/";	
var barGraph=null, barGraph1;
var id;


// Sidebar
function init_sidebar() {
	var setContentHeight = function () {
	// reset height
	$RIGHT_COL.css('min-height', $(window).height());

	var bodyHeight = $BODY.outerHeight(),
	footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
	leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
	contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

	// normalize content
	contentHeight -= $NAV_MENU.height() + footerHeight;

	$RIGHT_COL.css('min-height', contentHeight);
};

$SIDEBAR_MENU.find('a').on('click', function(ev) {
	console.log('clicked - sidebar_menu');
	var $li = $(this).parent();

	if ($li.is('.active')) {
		$li.removeClass('active active-sm');
		$('ul:first', $li).slideUp(function() {
			setContentHeight();
		});
	} else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
            	$SIDEBAR_MENU.find('li').removeClass('active active-sm');
            	$SIDEBAR_MENU.find('li ul').slideUp();
            }else
            {
            	if ( $BODY.is( ".nav-sm" ) )
            	{
            		$SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
            		$SIDEBAR_MENU.find( "li ul" ).slideUp();
            	}
            }
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
            	setContentHeight();
            });
        }
    });

// toggle small or large menu 
$MENU_TOGGLE.on('click', function() {
	console.log('clicked - menu toggle');

	if ($BODY.hasClass('nav-md')) {
		$SIDEBAR_MENU.find('li.active ul').hide();
		$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
	} else {
		$SIDEBAR_MENU.find('li.active-sm ul').show();
		$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
	}

	$BODY.toggleClass('nav-md nav-sm');

	setContentHeight();
});

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

	$SIDEBAR_MENU.find('a').filter(function () {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		setContentHeight();
	}).parent().addClass('active');

	// recompute content when resizing
	$(window).smartresize(function(){  
		setContentHeight();
	});

	setContentHeight();

	// fixed sidebar
	if ($.fn.mCustomScrollbar) {
		$('.menu_fixed').mCustomScrollbar({
			autoHideScrollbar: true,
			theme: 'minimal',
			mouseWheel:{ preventDefault: true }
		});
	}
};
// /Sidebar

var randNum = function() {
	return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
};


// Panel toolbox
$(document).ready(function() {
	$('.collapse-link').on('click', function() {
		var $BOX_PANEL = $(this).closest('.x_panel'),
		$ICON = $(this).find('i'),
		$BOX_CONTENT = $BOX_PANEL.find('.x_content');

		if ($BOX_PANEL.attr('style')) {
			$BOX_CONTENT.slideToggle(200, function(){
				$BOX_PANEL.removeAttr('style');
			});
		} else {
			$BOX_CONTENT.slideToggle(200); 
			$BOX_PANEL.css('height', 'auto');  
		}

		$ICON.toggleClass('fa-chevron-up fa-chevron-down');
	});

	$('.close-link').click(function () {
		var $BOX_PANEL = $(this).closest('.x_panel');

		$BOX_PANEL.remove();
	});
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});
// /Tooltip

// Progressbar
if ($(".progress .progress-bar")[0]) {
	$('.progress .progress-bar').progressbar();
}
// /Progressbar

// Switchery
$(document).ready(function() {
	if ($(".js-switch")[0]) {
		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		elems.forEach(function (html) {
			var switchery = new Switchery(html, {
				color: '#26B99A'
			});
		});
	}
});
// /Switchery


// iCheck
$(document).ready(function() {
	if ($("input.flat")[0]) {
		$(document).ready(function () {
			$('input.flat').iCheck({
				checkboxClass: 'icheckbox_flat-green',
				radioClass: 'iradio_flat-green'
			});
		});
	}
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
	checkState = '';
	$(this).parent().parent().parent().addClass('selected');
	countChecked();
});
$('table input').on('ifUnchecked', function () {
	checkState = '';
	$(this).parent().parent().parent().removeClass('selected');
	countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
	checkState = '';
	$(this).parent().parent().parent().addClass('selected');
	countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
	checkState = '';
	$(this).parent().parent().parent().removeClass('selected');
	countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
	checkState = 'all';
	countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
	checkState = 'none';
	countChecked();
});

function countChecked() {
	if (checkState === 'all') {
		$(".bulk_action input[name='table_records']").iCheck('check');
	}
	if (checkState === 'none') {
		$(".bulk_action input[name='table_records']").iCheck('uncheck');
	}

	var checkCount = $(".bulk_action input[name='table_records']:checked").length;

	if (checkCount) {
		$('.column-title').hide();
		$('.bulk-actions').show();
		$('.action-cnt').html(checkCount + ' Records Selected');
	} else {
		$('.column-title').show();
		$('.bulk-actions').hide();
	}
}



// Accordion
$(document).ready(function() {
	$(".expand").on("click", function () {
		$(this).next().slideToggle(200);
		$expand = $(this).find(">:first-child");

		if ($expand.text() == "+") {
			$expand.text("-");
		} else {
			$expand.text("+");
		}
	});
});

// NProgress
if (typeof NProgress != 'undefined') {
	$(document).ready(function () {
		NProgress.start();
	});

	$(window).load(function () {
		NProgress.done();
	});
}


	  //hover and retain popover when on popover content
	  var originalLeave = $.fn.popover.Constructor.prototype.leave;
	  $.fn.popover.Constructor.prototype.leave = function(obj) {
	  	var self = obj instanceof this.constructor ?
	  	obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
	  	var container, timeout;

	  	originalLeave.call(this, obj);

	  	if (obj.currentTarget) {
	  		container = $(obj.currentTarget).siblings('.popover');
	  		timeout = self.timeout;
	  		container.one('mouseenter', function() {
	  			clearTimeout(timeout);
	  			container.one('mouseleave', function() {
	  				$.fn.popover.Constructor.prototype.leave.call(self, self);
	  			});
	  		});
	  	}
	  };

	  $('body').popover({
	  	selector: '[data-popover]',
	  	trigger: 'click hover',
	  	delay: {
	  		show: 50,
	  		hide: 400
	  	}
	  });


	  function gd(year, month, day) {
	  	return new Date(year, month - 1, day).getTime();
	  }


	  /* AUTOSIZE */

	  function init_autosize() {

	  	if(typeof $.fn.autosize !== 'undefined'){

	  		autosize($('.resizable_textarea'));

	  	}

	  };  

	  /* PARSLEY */

	  function init_parsley() {

	  	if( typeof (parsley) === 'undefined'){ return; }
	  	console.log('init_parsley');

	  	$/*.listen*/('parsley:field:validate', function() {
	  		validateFront();
	  	});
	  	$('#demo-form .btn').on('click', function() {
	  		$('#demo-form').parsley().validate();
	  		validateFront();
	  	});
	  	var validateFront = function() {
	  		if (true === $('#demo-form').parsley().isValid()) {
	  			$('.bs-callout-info').removeClass('hidden');
	  			$('.bs-callout-warning').addClass('hidden');
	  		} else {
	  			$('.bs-callout-info').addClass('hidden');
	  			$('.bs-callout-warning').removeClass('hidden');
	  		}
	  	};

	  	$/*.listen*/('parsley:field:validate', function() {
	  		validateFront();
	  	});
	  	$('#demo-form2 .btn').on('click', function() {
	  		$('#demo-form2').parsley().validate();
	  		validateFront();
	  	});
	  	var validateFront = function() {
	  		if (true === $('#demo-form2').parsley().isValid()) {
	  			$('.bs-callout-info').removeClass('hidden');
	  			$('.bs-callout-warning').addClass('hidden');
	  		} else {
	  			$('.bs-callout-info').addClass('hidden');
	  			$('.bs-callout-warning').removeClass('hidden');
	  		}
	  	};

	  	try {
	  		hljs.initHighlightingOnLoad();
	  	} catch (err) {}

	  };


	  /* INPUTS */

	  function onAddTag(tag) {
	  	alert("Added a tag: " + tag);
	  }

	  function onRemoveTag(tag) {
	  	alert("Removed a tag: " + tag);
	  }

	  function onChangeTag(input, tag) {
	  	alert("Changed a tag: " + tag);
	  }

			  //tags input
			  function init_TagsInput() {

			  	if(typeof $.fn.tagsInput !== 'undefined'){	

			  		$('#tags_1').tagsInput({
			  			width: 'auto'
			  		});

			  	}

			  };






			  /* INPUT MASK */

			  function init_InputMask() {

			  	if( typeof ($.fn.inputmask) === 'undefined'){ return; }
			  	console.log('init_InputMask');

			  	$(":input").inputmask();

			  };







			  /* SMART WIZARD */

			  function init_SmartWizard() {

			  	if( typeof ($.fn.smartWizard) === 'undefined'){ return; }
			  	console.log('init_SmartWizard');

			  	$('#wizard').smartWizard();

			  	$('#wizard_verticle').smartWizard({
			  		transitionEffect: 'slide'
			  	});

			  	$('.buttonNext').addClass('btn btn-success');
			  	$('.buttonPrevious').addClass('btn btn-primary');
			  	$('.buttonFinish').addClass('btn btn-default');

			  };


			  /* PNotify */

			  function init_PNotify() {

			  	if( typeof (PNotify) === 'undefined'){ return; }
			  	console.log('init_PNotify');

			  	new PNotify({
			  		title: "PNotify",
			  		type: "info",
			  		text: "Welcome. Try hovering over me. You can click things behind me, because I'm non-blocking.",
			  		nonblock: {
			  			nonblock: true
			  		},
			  		addclass: 'dark',
			  		styling: 'bootstrap3',
			  		hide: false,
			  		before_close: function(PNotify) {
			  			PNotify.update({
			  				title: PNotify.options.title + " - Enjoy your Stay",
			  				before_close: null
			  			});

			  			PNotify.queueRemove();

			  			return false;
			  		}
			  	});

			  }; 


			  /* CUSTOM NOTIFICATION */

			  function init_CustomNotification() {

			  	console.log('run_customtabs');

			  	if( typeof (CustomTabs) === 'undefined'){ return; }
			  	console.log('init_CustomTabs');

			  	var cnt = 10;

			  	TabbedNotification = function(options) {
			  		var message = "<div id='ntf" + cnt + "' class='text alert-" + options.type + "' style='display:none'><h2><i class='fa fa-bell'></i> " + options.title +
			  		"</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" + options.text + "</p></div>";

			  		if (!document.getElementById('custom_notifications')) {
			  			alert('doesnt exists');
			  		} else {
			  			$('#custom_notifications ul.notifications').append("<li><a id='ntlink" + cnt + "' class='alert-" + options.type + "' href='#ntf" + cnt + "'><i class='fa fa-bell animated shake'></i></a></li>");
			  			$('#custom_notifications #notif-group').append(message);
			  			cnt++;
			  			CustomTabs(options);
			  		}
			  	};

			  	CustomTabs = function(options) {
			  		$('.tabbed_notifications > div').hide();
			  		$('.tabbed_notifications > div:first-of-type').show();
			  		$('#custom_notifications').removeClass('dsp_none');
			  		$('.notifications a').click(function(e) {
			  			e.preventDefault();
			  			var $this = $(this),
			  			tabbed_notifications = '#' + $this.parents('.notifications').data('tabbed_notifications'),
			  			others = $this.closest('li').siblings().children('a'),
			  			target = $this.attr('href');
			  			others.removeClass('active');
			  			$this.addClass('active');
			  			$(tabbed_notifications).children('div').hide();
			  			$(target).show();
			  		});
			  	};

			  	CustomTabs();

			  	var tabid = idname = '';

			  	$(document).on('click', '.notification_close', function(e) {
			  		idname = $(this).parent().parent().attr("id");
			  		tabid = idname.substr(-2);
			  		$('#ntf' + tabid).remove();
			  		$('#ntlink' + tabid).parent().remove();
			  		$('.notifications a').first().addClass('active');
			  		$('#notif-group div').first().css('display', 'block');
			  	});

			  };



			  /* DATA TABLES */

			  function init_DataTables() {

			  	console.log('run_datatables');

			  	if( typeof ($.fn.DataTable) === 'undefined'){ return; }
			  	console.log('init_DataTables');

			  	var handleDataTableButtons = function() {
			  		if ($("#datatable-buttons").length) {
			  			$("#datatable-buttons").DataTable({
			  				dom: "Bfrtip",
			  				buttons: [
			  				{
			  					extend: "copy",
			  					className: "btn-sm"
			  				},
			  				{
			  					extend: "csv",
			  					className: "btn-sm"
			  				},
			  				{
			  					extend: "excel",
			  					className: "btn-sm"
			  				},
			  				{
			  					extend: "pdfHtml5",
			  					className: "btn-sm"
			  				},
			  				{
			  					extend: "print",
			  					className: "btn-sm"
			  				},
			  				],
			  				responsive: true
			  			});
			  		}
			  	};

			  	TableManageButtons = function() {
			  		"use strict";
			  		return {
			  			init: function() {
			  				handleDataTableButtons();
			  			}
			  		};
			  	}();

			  	$('#datatable').dataTable();

			  	$('#datatable-keytable').DataTable({
			  		keys: true
			  	});

			  	$('#datatable-responsive').DataTable();

			  	$('#datatable-scroller').DataTable({
			  		ajax: "js/datatables/json/scroller-demo.json",
			  		deferRender: true,
			  		scrollY: 380,
			  		scrollCollapse: true,
			  		scroller: true
			  	});

			  	$('#datatable-fixed-header').DataTable({
			  		fixedHeader: true
			  	});

			  	var $datatable = $('#datatable-checkbox');

			  	$datatable.dataTable({
			  		'order': [[ 1, 'asc' ]],
			  		'columnDefs': [
			  		{ orderable: false, targets: [0] }
			  		]
			  	});
			  	$datatable.on('draw.dt', function() {
			  		$('checkbox input').iCheck({
			  			checkboxClass: 'icheckbox_flat-green'
			  		});
			  	});

			  	TableManageButtons.init();

			  };



			  function init_valoresLidos(){
			  	id =1;
			  	if($('#tabela').length){
			  		
			  		$.ajax({
			  			url : url + "tabelaValores.php",
			  			type : 'GET',
			  			data: {id : id},
			  			success : function(data) {
			  				for(var i in data){
			  					$('#tabela tbody').append("<tr><td>" + data[i].valor + "</td><td>" + data[i].data + "</td><td>" + data[i].horas +
			  						"</td></tr>" );							}	
			  				},
			  				error : function() {
			  					console.log('error');
			  				}
			  			});
			  	}

			  	if($('#valoresLinhas').length){
			  		$.ajax({
	                    type: 'GET',
	            		url: url + "valoresLinha.php",
	                    data: {id : id}, 
	            		success: function(data) {
	            			var valores = [];
   							var labels = [];

   							for(var i in data){
   								valores.push(parseInt(data[i].valor));
   								labels.push(data[i].data);
   							}

	            			var chartdata = {
	            				labels:  labels,
	            				datasets : [
	            					{
	            						label: "Valor leitura",
	            						backgroundColor: "rgba(38, 185, 154, 0.31)",
	            						borderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBorderColor: "rgba(38, 185, 154, 0.7)",
	            						pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
	            						pointHoverBackgroundColor: "#fff",
	            						pointHoverBorderColor: "rgba(220,220,220,1)",
	            						pointBorderWidth: 1,
	            						data: valores
	            					}
	            				]
	            			 }
	            	var ctx = $("#valoresLinhas");

	            			barGraph = new Chart(ctx, {
	            				type: 'line',
	            				data: chartdata,
	                            options: {
	                                scales: {
	                                    yAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: 'Valores lidos'
										    },
	                                        ticks: {
	                                            beginAtZero: true,

	                                        }
	                                    }],
	                                    xAxes: [{
	                                    	scaleLabel: {
										        display: true,
										        labelString: "Data"
										    }
	                                    }]
	                                }
	                            }

	            			});
	            		document.getElementById('js-legend3').innerHTML = barGraph.generateLegend();

	            	}
				});	
			  	
			  }

			  if ($('#valoresLimite').length ){
					
					$.ajax({
							url: url + "tipoLeituras.php",
							method: "GET",
							data: {id : id},
							success: function(data){
								var valores = [];
								var label = [];
								var sup = 0;
								var inf = 0;
								var normal = 0;

								label.push("Valores superiores");
								label.push("Valores inferiores");
								label.push("Valores normais");

								for(var i in data){
									if (parseInt(data[i].li) <= parseInt(data[i].valor) && parseInt(data[i].ls) >= parseInt(data[i].valor) ){
										normal++;
									}
									else if(parseInt(data[i].li) > parseInt(data[i].valor))
										inf++;
									else sup++;
								}

								valores.push(sup);
								valores.push(inf);
								valores.push(normal);



								var colors = [
												"#336600", "#990000", "#003366"
											];
								
								var chartdata = {
									labels:  label,
									datasets : [
										{
											label: "Total de Acessos Negados",
											backgroundColor: colors,
											data: valores,
										}
									]
								};

								var ctx = $('#valoresLimite');

								pieChart = new Chart(ctx, {
									data: chartdata,
									type: 'pie'
									
								});
								document.getElementById('js-legend1').innerHTML = pieChart.generateLegend();

							},
							error: function(data) {
								console.log(data);
							}
						});
					  
				  }

				  if ($('#nome').length ){
				  	
				  	 $.ajax({

						url: url + "caractUser.php",
						method: "GET",
						data: {id : id},
						success: function(data) {
							var nome = "";
							var li = 0;
							var ls = 0;
								
							for(var i in data) {
								nome = data[i].nome;
								li =data[i].li;
								ls = data[i].ls;
							}

			  				document.getElementById('nome').innerHTML ="Nome: " + nome;
			  				document.getElementById('ls').innerHTML ="Limite Superior: " + li;
			  				document.getElementById('li').innerHTML ="Limite Inferior: "+ ls;
			  				
				  		}
				  	})

				   }
			}



			  $(document).ready(function() {
			  	init_valoresLidos();
			  	init_sidebar();
			  	init_InputMask();
			  	init_TagsInput();
			  	init_parsley();
			  	init_SmartWizard();
			  	init_DataTables();
			  	init_PNotify();
			  	init_CustomNotification();
			  	init_autosize();			
			  });	


