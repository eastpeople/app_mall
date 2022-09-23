var UserTable = function() {
	
	var drawnTableFunc = {};
	var dataset = {};
	var pageInfo = {};
	var pageOrder = [];
	var excelForms = {};
	var excelDatas = {};
	var columns = {};
	
	return {
		init : function (uid, pageable, pagesView, pagesVal, options, pColumns) {
			//var uid = id.substring(1);
			dataset[uid] = [];
			columns[uid] = pColumns;
			var h = '<div class="dataTables_wrapper form-inline dt-bootstrap no-footer" style="height: 100%;">';
			h += '<div class="dataTables_length m-b-10" id="' + uid + '_length">';
			h += '  <div id="' + uid + '_paginate" class="m-t-10"></div>';
		
			excelForm = {};
			excelForms[uid] = [];
			// #. header settings
			var headHtml = '', style = '', headClassName = ' class="';
			var isSorting = false;
			
			pageOrder[uid] = "";
			pageInfo[uid] = {};
			pageInfo[uid].pageable = pageable;
			pageInfo[uid].pagesView = pagesView;
			pageInfo[uid].pagesVal = pagesVal;
			
			for (var c = 0; c < columns[uid].length; c++) {
				var column = columns[uid][c];
				
				style = ' style="';
				if (column.width) {
					style += ' width: ' + column.width + ';';
				}
				style += '"';
				// $('#' + uid + " table thead th").css({'white-space' : 'nowrap', 'word-break' : 'nowrap'});
				// $('#' + uid + " table thead th").addClass('text-center');
				
				headClassName = ' class="text-center';
				if (column.headClassName) {
					headClassName += ' ' + column.headClassName;
				}
				//if (column.sorting) {
				var sort = '';
				if (column.data && column.sorting != false) {
					if (pageOrder[uid].includes(column.data + ":asc")) {
						sort = 'sorting_asc';
					} else if (pageOrder[uid].includes(column.data + ":desc")) {
						sort = 'sorting_desc';
					} else {
						sort = 'sorting';
					}
				} else {
					headClassName += '"';
				}

				if ((c == 0 && column.edittype && column.edittype == 'hcheck') || (c == 0 && column.type && column.type == 'check')) {
						headHtml += '<th' + headClassName + '>'
							+ column.title
							+ '<div class="form-check checkbox checkbox-css p-5">'
							+ '<input type="checkbox" value="" id="' + uid + '_checkbox_all" name="' + uid + '_checkbox_all">'
							+ '<label for="' + uid + '_checkbox_all"></label>'
							+ '</div>'
							+ '</th>';
						
				} else if (column.type && column.type == 'hidden') {
					headHtml += '<th class="d-none">' + column.title + '</th>';
				} else {
					// #. default header
					
					headClassName += ' ' + sort + ' px-lg-4" sort="' + column.data + '"';
					isSorting = true;
					headHtml += '<th' + headClassName + '>' + column.title + '</th>';
				}
	
				if (!column.hideExcel) {
					
					excelForm[column.title] = (column.example ? column.example : '');
				}
				
			}
			
			excelForms[uid].push(excelForm);
			
			
			
			
			h += '</div>';
			h += '<div class="pagination pull-right">';
			if (pageable) {
				h += '<select id="' + uid + '_page" aria-controls="' + uid + '_ctrl" class="form-control input-sm">';
				
				if (!pagesView) pagesVal = [ 10, 50 ], pagesView = [ 10, 50 ];
				for (var p in pagesView) {
					h += '<option value="' + pagesVal[p] + '">' + pagesView[p] + '</option>';
				}
				h += '</select>'
				h += '&nbsp;';
				h += '<div class="dataTables_info pull-right" id="' + uid + '_polite" role="status" aria-live="polite"></div>';
				h += '<input type="hidden" id="' + uid + '_page_start" value="0"/>';
			}
			h += '<div id="' + uid + '_table_error" class="hide"></div> ';
			// if (options.isAddButton) {
			// 	h += '<button id="' + uid + '_add_btn" class="btn btn-save">Add</button> ';
			// }
			// if (options.isDeleteButton) {
			// 	h += '<button id="' + uid + '_del_btn" class="btn btn-save">Delete</button> ';
			// }
			// if (options.isSaveButton) {
			// 	h += '<button id="' + uid + '_save_btn" class="btn btn-save">Save</button> ';
			// }
			// if (options.isSelectedExcelDownloadButton) {
			// 	h += '<button id="' + uid + '_selected_excel_btn" class="btn btn-green">Selected Excel Download</button>';
			// }
			// if (options.isExcelDownloadButton) {
			// 	h += '<button id="' + uid + '_excel_btn" class="btn btn-green">Excel Download</button>';
			// }
			// if (options.isExcelFormButton) {
			// 	h += '<button id="' + uid + '_excelform_btn" class="btn btn-green">Excel Form</button>';
			// }
			//if (isSorting) {
			//	h += '<button id="' + uid + '_sort_btn" class="btn btn-default">reset sorting</button>';
			//}
			h += '</div>';
			h += '<div style="clear:both;"></div>';
			//h += '<div class="dataTables_scroll" style="overflow: auto; height: 100%;">';
			h += ' <form id="' + uid + '_form" data-parsley-validate="true" accept-charset="UTF-8">';
			h += '  <table id="' + uid + '_table" class="table table-bordered dataTable" style="">';
			h += '   <thead>' + headHtml + '</thead>';
			h += '   <tbody></tbody>';
			h += '  </table>';
			h += ' </form>';
			h += ' <div style="position: absolute; top: 50%; left: 50%; background-color: #555; opacity: 0.7; transform:translate(-50%, -50%); display:none;" class="text-center p-10" id="' + uid + '_loading">';
			h += '  <strong style="color: white;">Loading</strong><br/>';
			h += '  <img src="img/loading-book.gif">';
			h += ' </div>';
			//h += '</div>';
			// h += '<div class="row">';
			// h += ' <div class="col-sm-5">';
			//h += '  <div class="dataTables_info" id="' + uid + '_polite" role="status" aria-live="polite"></div>';
			// h += ' </div>';
			// h += ' <div class="col-sm-7">';
			// h += '  <div id="' + uid + '_paginate" class="m-t-10"></div>';
			// h += ' </div>';
			h += '</div>';

			h += '</div>';
			$('#' + uid).html(h);

			$("#" + uid + "_excelform_btn").click(function() {
				// step 1. workbook 생성
				var wb = XLSX.utils.book_new();
				// step 2. 시트 만들기 
				var newWorksheet = XLSX.utils.json_to_sheet(excelForms[uid]);
				// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
				XLSX.utils.book_append_sheet(wb, newWorksheet, "sheet1");
				// step 4. 엑셀 파일 만들기 
				var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
				// step 5. 엑셀 파일 내보내기 
				saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), uid + "_form.xlsx");
			});

			$("#" + uid + "_selected_excel_btn").click(function() {
				var selectedExcelDatas = [];
				for (var i = 0; i < UserTable.getCheckedRows(uid).length; i++) {
					var checkedIndex = UserTable.getCheckedRows(uid)[i].index;
					selectedExcelDatas.push(excelDatas[uid][checkedIndex]);
				}
				// step 1. workbook 생성
				var wb = XLSX.utils.book_new();
				// step 2. 시트 만들기 
				var newWorksheet = XLSX.utils.json_to_sheet(selectedExcelDatas);
				// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
				XLSX.utils.book_append_sheet(wb, newWorksheet, "sheet1");

				// #. excel cell 서식을 텍스트로 고정
				var textColumns = [];
				for (var i = 0; i < columns[uid].length; i++) {
					if (columns[uid][i].excelType == "text") {
						textColumns.push(i);
					}
				}
				for (var i = 0; i < textColumns.length; i++) {
					for (var j = 0; j < selectedExcelDatas.length + 1; j++) {
						var cellAdd = XLSX.utils.encode_cell({c:textColumns[i], r:j});
						newWorksheet[cellAdd].z = "@";
					}
				}

				// step 4. 엑셀 파일 만들기 
				var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
				// step 5. 엑셀 파일 내보내기 
				saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), uid + "_download.xlsx");
			});

			$("#" + uid + "_excel_btn").click(function() {
				// step 1. workbook 생성
				var wb = XLSX.utils.book_new();
				// step 2. 시트 만들기 
				var newWorksheet = XLSX.utils.json_to_sheet(excelDatas[uid]);
				// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
				XLSX.utils.book_append_sheet(wb, newWorksheet, "sheet1");

				// #. excel cell 서식을 텍스트로 고정
				var textColumns = [];
				for (var i = 0; i < columns[uid].length; i++) {
					if (columns[uid][i].excelType == "text") {
						textColumns.push(i);
					}
				}
				for (var i = 0; i < textColumns.length; i++) {
					for (var j = 0; j < excelDatas[uid].length + 1; j++) {
						var cellAdd = XLSX.utils.encode_cell({c:textColumns[i], r:j});
						newWorksheet[cellAdd].z = "@";
					}
				}

				// step 4. 엑셀 파일 만들기 
				var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
				// step 5. 엑셀 파일 내보내기 
				saveAs(new Blob([s2ab(wbout)], {type:"application/octet-stream"}), uid + "_download.xlsx");
			});

			$("#" + uid + "_sort_btn").click(function() {
				pageOrder[uid] = "";
				drawnTableFunc[uid]();
			});
			
			$("#" + uid + "_page").change(function() {
				$("#" + uid + "_page_start").val(0);
				drawnTableFunc[uid]();
			});
		},
		clear : function (uid) {
			$('#' + uid + "_table tbody").empty();
		},
		reload : function (uid) {
			drawnTableFunc[uid]();
		},
		getRowCount : function (uid) {
			return dataset[uid].length;
		},
		getRows : function (uid) {
			return dataset[uid];
		},
		getRowAt : function (uid, index) {
			return dataset[uid][index];
		},
		delRowAt : function (uid, index) {
			
			dataset[uid].splice(index, 1);
			$('#' + uid + "_table tbody tr")[index].remove();
		
		},
		addMarkClassRowAt : function (uid, index, className) {
			$($('#' + uid + "_table tbody tr")[index]).addClass(className);
		},
		delMarkClassRowAt : function (uid, index, className) {
			$($('#' + uid + "_table tbody tr")[index]).removeClass(className);
		},
		addMarkClassCellAt : function (uid, rowIndex, colIndex, className) {
			$('#' + uid + "_table tbody tr:eq(" + rowIndex + ")>td:eq(" + colIndex + ")").addClass(className);
		},
		delMarkClassCellAt : function (uid, rowIndex, colIndex, className) {
			$('#' + uid + "_table tbody tr:eq(" + rowIndex + ")>td:eq(" + colIndex + ")").removeClass(className);
		},
		changeDataRowAt : function (uid, index, obj) {
			for (var key in obj) {
				var val = obj[key];
				dataset[uid][index][key] = val;
			}
		},
		getRadioCheckedRow : function (uid) {
			var checkedRow = {};
			if (dataset[uid].length > 0) {
				for (var i = 0; i < dataset[uid].length; i++) {
					if ($("#" + uid + "_radio_" + i).is(":checked")) {
						dataset[uid][i]["index"] = i;
						checkedRow = dataset[uid][i];
						break;
					}
				}
			}
			
			return checkedRow;
		},
		getCheckedRows : function (uid) {
			var checkeddataset = [];
			if (dataset[uid].length > 0) {
				for (var i = 0; i < dataset[uid].length; i++) {
					if ($("#" + uid + "_checkbox_" + i).is(":checked")) {
						dataset[uid][i]["index"] = i;
						checkeddataset.push(dataset[uid][i]);
					}
				}
			}
			
			return checkeddataset;
		},
		addRows : function (uid, addedRows, columnKeyType) {
			var html = '';
			if (!dataset[uid]) {
				dataset[uid] = new Array();
			}
			var current = dataset[uid].length;
			
			for (var rw = 0; rw < addedRows.length; rw++) {
				
				dataset[uid].push({});

				html += '<tr>';
				for (var r in columns[uid]) {
			
					var colValue = "";
					var fdata = columns[uid][r].data;
					if (columnKeyType == "title") {
						var tit = columns[uid][r].title;
						if (tit != "") {
							colValue = addedRows[rw][columns[uid][r].title];
						}
						
					} else if (columnKeyType == "data" && fdata) {
						if (columns[uid][r].data != null) {
						
							// colValue = addedRows[rw][fdata];
							try {
								eval("colValue = addedRows[rw]." + fdata);
							} catch (e) {
							}
						}
					}
					
					html += addRow(uid, rw + current, columns[uid][r], colValue, true, addedRows.length, 0);
					
				}
				html += '</tr>';
			}
			
			$('#' + uid + '_table tbody').append(html);
			
			afterDatepicker(uid);
			clipboardEvent(uid);
			inputChangeEvent(uid);
			tagitEvent(uid);
			$(".default-select2").select2();
			$('#' + uid + '_table tbody input, #' + uid + '_table tbody select').trigger('change');
			// console.log(dataset[uid]);
		},
		addEmptyRows : function (uid, count) {
			if (count > 0) {
				if (dataset[uid].length < 1) {
					$('#' + uid + "_table tbody").empty();
				}

				var emptyArrays = [];
				for (var i = 0; i < count; i++) {
					emptyArrays.push({});
				}
				UserTable.addRows(uid, emptyArrays);
			}
		},
		draw : function (uid, ajax, saveAjax, custom_func) {
			//var uid = id.substring(1);
			var start = $('#' + uid + '_page_start').val();
			var page = $('#' + uid + '_page').val();
			var param;
			drawnTableFunc[uid] = function () {
				UserTable.draw(uid, ajax, saveAjax, custom_func);
			}
			
			if (!ajax) {
				$('#' + uid + '_table tbody').empty();
				saveEvent(uid, saveAjax);
				return;
			}
			
			if (!ajax.data) {
				param = {};
			} else {
				param = ajax.data();
			}

			param.pgNmb = start;
			param.pgrwc = page;
			param.order = pageOrder[uid];
			
			if (!ajax.type) {
				ajax.type = "GET";
			}
			if (!ajax.dataType) {
				ajax.dataType = "json";
			}
			if (!ajax.contentType) {
				ajax.contentType = "application/json; charset=utf-8";
			}
			if (!ajax.complete) {
				ajax.complete = function() {};
			}

			$('#' + uid + '_loading').show();
			
			
			$.ajax({
				url : ajax.url,
				type : ajax.type,
				data : param,
				dataType : ajax.dataType,
				contentType : ajax.contentType,
				beforeSend : ajax.beforeSend,
				complete : ajax.complete,
				success: function (rtn) {
					excelDatas[uid] = [];
					dataset[uid] = rtn.data;
					var rows = rtn.data;
					var html = '';
					
					if (custom_func) {
						html = custom_func(rows)
					} else {
						
						$("#" + uid + "_checkbox_all").prop("checked", false);
						
						var rowIndex = 0;
						for (var s in rows) {
							var excelData = {};
							html += '<tr>';
							for (var r in columns[uid]) {
								var val = '';
								try {
									val = eval('rows[s].' + columns[uid][r].data);
								} catch(ex) {
									val = '';
								}
								html += addRow(uid, rowIndex, columns[uid][r], val, false, rtn.recordsTotal, rtn.pageNumber);
								if (columns[uid][r].type == "code") {
									excelData[columns[uid][r].title] = (columns[uid][r].codeData[val] ? columns[uid][r].codeData[val] : '');
								} else if (columns[uid][r].type == "date") {
									val = (val ? moment(val).format('YYYY-MM-DD') : '');
									excelData[columns[uid][r].title] = val;
								} else if (columns[uid][r].type == "index") {
									excelData[columns[uid][r].title] = rowIndex + 1;
								} else {
									excelData[columns[uid][r].title] = (val ? val : '');
								}
								
								//excelData[columns[r].title] = (val ? val : '');
								

							}
							html += '</tr>';
							rowIndex++;
							excelDatas[uid].push(excelData);
						}
						
					}

					//headHtml += '</tr>';
					//$('#' + uid + '_table thead').empty();
					$('#' + uid + '_table tbody').empty();
					//if (!html || html == '') {
					//	html = '<td colspan="' + columns[uid].length + '">Empty</td>';
					//}
					// if (headHtml == '</tr>') {
					// 	headHtml = '';
					// }
					//$('#' + uid + '_table thead').html(headHtml);
					$('#' + uid + '_table tbody').html(html);
					
					if (pageInfo[uid].pageable) {
						var n = Number(rtn.pageNumber);
						var t = Number(rtn.recordsTotal);
						var p = Number(page);
						var active = '', disabled = '';
						html = '<div class="dataTables_paginate paging_simple_numbers">';
						html += '<ul class="pagination">';
						if (n == 0) disabled = ' disabled';
						html += '<li class="paginate_button previous' + disabled + '" id="' + uid + '_previous">'
							+ '<a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="' + (n - 1) + '" tabindex="0">Previous</a>'
							+ '</li>';
						var max = Math.ceil(t / p);
						
						var i = 0;
						if (n == i) active = ' active';
						html += '<li class="paginate_button ' + active + '">'
							+ '<a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="' + (i) + '" tabindex="0">' + (i + 1) + '</a>'
							+ '</li>';
						
						if (n > 3) {
							html += '<li class="paginate_button disabled"><a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="6" tabindex="0">…</a></li>';
							if (n > max - 5) {
								i = max - 5;			
							} else {
								i = n - 2;	
							}
						}
						
						for (var j = (i == 0 ? 1 : i); j < max; j++) {
							active = '';
							if (n == j) active = ' active';
							html += '<li class="paginate_button' + active + '">'
								+ '<a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="' + (j) + '" tabindex="0">' + (j + 1) + '</a>'
								+ '</li>';
							if (j == i + 4 && j < max - 2) {
								active = '';
								if (n == j) active = ' active';
								html += '<li class="paginate_button disabled"><a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="6" tabindex="0">…</a></li>';
								html += '<li class="paginate_button' + active + '">'
									+ '<a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="' + (max - 1) + '" tabindex="0">' + max + '</a>'
									+ '</li>';
								break;
							}
							
						}
						disabled = '';
						if (n == max - 1) disabled = ' disabled';
						html += '<li class="paginate_button next' + disabled + '" id="' + uid + '_next">'
							+ '<a href="#" aria-controls="' + uid + '_ctrl" data-dt-idx="' + (n + 1) + '" tabindex="0">Next</a>'
							+ '</li>';
						html += '</ul>';
						html += '</div>';
						
						$('#' + uid + '_paginate').html(html);
						$('#' + uid + '_polite').text('Showing rows ' + (n * p + 1) + ' to ' + (n * p + p) + ' of ' + t);
					}
					
					$('#' + uid + " table tbody td").css({'white-space' : 'nowrap'
						, 'word-break' : 'nowrap'
						, 'vertical-align' : 'middle !important'});
					
					$('a[aria-controls="' + uid + '_ctrl"]').click(function () {
						var nextval = $(this).attr("data-dt-idx");
						if (!$(this).parent().hasClass("disabled") && !(n == nextval)) {
							$('#' + uid + '_page_start').val(Number(nextval));
							UserTable.draw(uid, ajax, saveAjax, custom_func);
						}
					});
					
					$('a[aria-controls="' + uid + '_ctrl"]').click(function () {
						var nextval = $(this).attr("data-dt-idx");
						if (!$(this).parent().hasClass("disabled") && !(n == nextval)) {
							$('#' + uid + '_page_start').val(Number(nextval));
							UserTable.draw(uid, ajax, saveAjax, custom_func);
						}
					});
					
					// $("#" + uid + "_page").change(function() {
					// 	$("#" + uid + "_page_start").val(0);
					// 	drawnTableFunc[uid]();
					// });
					
					$("input[name=" + uid + "_checkbox]").change(function(e) {
						var rowCount = UserTable.getRowCount(uid);
						if (rowCount > 0) {
							var allCheckedValue = true;
							for (var i = 0; i < rowCount; i++) {
								if (!$("#" + uid + "_checkbox_" + i).is(":checked")) {
									allCheckedValue = false;
									break;
								}
							}
							$("#" + uid + "_checkbox_all").prop("checked", allCheckedValue);
						}
					});
					
					afterDatepicker(uid);
					clipboardEvent(uid);
					inputChangeEvent(uid);
					saveEvent(uid, saveAjax);
					tagitEvent(uid);
					afterSortAndCheck(uid);
					
					$(".default-select2").select2();
					$('#' + uid + '_loading').hide();
					
					
					if (ajax.afterDrawn) {
						ajax.afterDrawn();
					}
					
				},
				error : function(data) {
					CommonMsg.error(function() { });
					$('#' + uid + '_loading').hide();
				}
			});
		}
	}

	function addRow(uid, rowIndex, column, val, isnew, total, page) {
		
		if (!val) val = '';
		var rHtml = '', iElement = '';
		var width = '', headClassName = ' class="', bodyClassName = '';
		
		if (column.bodyClassName) {
			bodyClassName = ' class="' + column.bodyClassName + '"';
		}
		//
		
		if (column.render) {
			var renderValue = column.render(dataset[uid][rowIndex], val, rowIndex, total);
			iElement += renderValue;
	
		} else if (column.edittype) {
			var parsley = (!column.alwaysedit || column.parsley ? ' data-parsley-required="true" data-parsley-errors-container="#' + uid + '_table_error"' : '');
			var isDisabled = (isnew || column.alwaysedit ? false : true);
			var disableText = (isDisabled ? ' disabled' : '');
			var rid = getRandomString();
			
			if (column.edittype == 'hcheck') {
				iElement = '<div class="form-check checkbox checkbox-css p-5">';
				iElement += '<input type="checkbox" id="' + rid +'" name="checkbox"' + disableText + '>'
				iElement += '<label for="' + rid +'"></label>'
					+ '</div>';
				
			} else if (column.edittype == 'check') {
				var isChecked = "";
				var onchageHandler = (column.onchange ? column.onchange : "");
				
				if (val == true || val == 'Y' || val == '1') isChecked = " checked";
				iElement = '<div class="form-check checkbox checkbox-css p-5">'
					+ '<input type="checkbox" id="' + rid + '" name="' + column.data + '"' + isChecked + '' + disableText + ' onchange="' + onchageHandler + '" rowIndex="' + rowIndex + '">'
					+ '<label for="' + rid +'"></label>'
					+ '</div>';
			
			} else if (column.edittype == "radio") {
				iElement = '<div class="radio radio-css">'
					+ '<input type="radio" name="' + rid +'" data="'+ val +'">'
					+ '<label for="' + rid +'"></label>'
					+ '</div>';
			} else if (column.edittype == "combo") {
				var selectValue = val;
				var onchageHandler = (column.onchange ? column.onchange : "");

				iElement = '<select class="form-control ingrid" name="' + column.data + '"' + disableText + parsley + ' onchange="' + onchageHandler + '" rowIndex="' + rowIndex + '">';
				if (column.editblank) {
					iElement += '<option value="">선택</option>';
				}

				
				for (var key in column.editoptions) {
					var selected = "";
					if (selectValue == key || selectValue == column.editoptions[key]) {
						selected = "selected";
					}
					iElement += '<option value="' + key + '" ' + selected + '>' + column.editoptions[key] + '</option>';
				}
				iElement += '</select>';
			} else if (column.edittype == "combo2") {
				var selectValue = val;
				var onchageHandler = (column.onchange ? column.onchange : "");

				iElement = '<div class="row">';
				iElement += '<div class="col-xl-8">';
				iElement += '<select class="default-select2 width-200 form-control" name="' + column.data + '"' + disableText + parsley + ' onchange="' + onchageHandler + '" rowIndex="' + rowIndex + '">';
				if (column.editblank) {
					iElement += '<option value="">선택</option>';
				};
				for (var key in column.editoptions) {
					var selected = "";
					if (selectValue == key) {
						selected = "selected";
					}
					iElement += '<option value="' + key + '" ' + selected + '>' + column.editoptions[key] + '</option>';
				}
				iElement += '</select>'
				iElement += '</div>';
				iElement += '</div>';
			} else if (column.edittype == 'text') {
				
				if (isDisabled) {
					iElement = '<span>' + val + '</span>';
				} else {
					iElement = ''
						+ '<input type="text" class="form-control" name="'
						+ column.data + '" value="' + val + '"'
						+ parsley + '">';
				}

			} else if (column.edittype == 'number') {
				
				if (isDisabled) {
					iElement = '<span>' + val + '</span>';
				} else {
					iElement = ''
						+ '<input type="text" value="' + val + '" class="form-control text-right" name="'
						+ column.data + '" oninput="' + column.oninput + '" rowIndex="' + rowIndex + '"'
						+ ' onkeypress="validate(event)"'
						+ parsley + '">';
				}

			} else if (column.edittype == 'password') {
				
				if (isnew) {
					iElement = ''
						+ '<input type="password" value="' + val + '" class="form-control" name="'
						+ column.data + '">'
						+ '';
				} else {
					iElement = '<div class="input-group date">'
						+ '<input type="password" class="form-control" name="'
						+ column.data + '" readonly style="width: 60% !important;">'
						+ ' <span class="input-group-addon" title="초기화" onClick="$(this).prev().val(\'1111\'); $(this).prev().trigger(\'change\');">'
						+ '<i class="fa fa-edit"></i>'
						+ '</span></div>';
				}

			} else if (column.edittype == 'date') {

				if (isDisabled) {
					if (val != null) {
						iElement = '<span>' + moment(val).format('YYYY-MM-DD') + '</span>';
					} else {
						iElement = "";
					}
				} else {
					//bodyHtml += '<div class="input-group" data-provide="datepicker" style="width:150px;">';
					iElement = ''
						+ '<input type="text" class="form-control form-control-sm width-100" edittype="date" '
						+ ' name="' + column.data + '" id="' + column.data + '_' + rowIndex + '"'
						+ ' value="' + val + '">';
				}

				
			} else if (column.edittype == 'tagit') {
				if (isDisabled) {
					if (val != null) {
						iElement = val.replace(/\|/gi, ', ');
					} else {
						iElement = "";
					}
				} else {
					iElement = ''
						+ '<ul id="' + uid +'_' + column.data + 'TagIt_' + rowIndex + '" class="fake-input" edittype="tagit" singleField="' + uid +'_' + column.data + 'TagItInput_' + rowIndex + '" columnData="' + column.data + '" data="' + val + '"></ul>'
						+ '<input type="text" id="' + uid +'_' + column.data + 'TagItInput_' + rowIndex + '" name="' + column.data + '" style="display:none;"/>'
						+ '';
				}
			}
			// if (disabled) {
			// 	val = "";
			// }
			
		} else if (column.type) {
			
			if (column.type == 'index') {
				var listSize = $('#' + uid + '_page').val();
				if (!$.isNumeric(listSize)) {
					listSize = 0;
				}
				if (!$.isNumeric(page)) {
					page = 0;
				}
				//val = '<strong>' + (Number(rowIndex) + 1 + (rtn.pageNumber * page)) + '</strong>';
				iElement = '<strong class="p-5">' + (Number(rowIndex) + 1 + (page * listSize)) + '</strong>';
	
			} else if (column.type == 'rindex') {
				var listSize = $('#' + uid + '_page').val();
				if (!$.isNumeric(listSize)) {
					listSize = 0;
				}
				if (!$.isNumeric(page)) {
					page = 0;
				}
				iElement = '<strong>' + (total - (rowIndex + (page * listSize))) + '</strong>';
	
			} else if (column.type == 'date') {
				if (val != null && val.length > 0) {
					iElement = '<span class="p-5">' + moment(val).format('YYYY-MM-DD') + '</span>';
				} else {
					iElement = "";
				}
			} else if (column.type == 'check') {
				iElement = '<div class="form-check checkbox checkbox-css p-5">';
				iElement += '<input type="checkbox" id="' + uid +'_checkbox_' + rowIndex + '" name="checkbox">'
				iElement += '<label for="' + uid +'_checkbox_' + rowIndex + '"></label>'
					+ '</div>';
			} else if (column.type == 'radio') {
				iElement = '<div class="radio radio-css">';
				iElement += '<input type="radio" name="' + uid +'_radio" id="' + uid +'_radio_' + rowIndex + '" >';
				iElement += '<label for="' + uid +'_radio_' + rowIndex + '"></label>';
				iElement += '</div>';
			} else if (column.type == 'hidden') {
				iElement = '<input type="text" name="' + column.data + '" value="' + val + '">';
				bodyClassName = ' class="d-none"';
			} else if (column.type == 'code') {
				if (val != null && val.length > 0) {
					iElement = '<span>' + column.codeData[val] + '</span>';
				} else {
					iElement = "";
				}
			}
		} else {
			iElement = '<span>' + val + '</span>';
		}
		
		rHtml += '<td' + bodyClassName + '>' + (iElement ? iElement : '') + '</td>';
		return rHtml;
	}

	function clipboardEvent(uid) {
		
		$("#" + uid + " input").off('paste');
		$("#" + uid + " input").bind('paste',function(e){
			var el = $(this);
			setTimeout(function(){
				
				navigator.clipboard.readText()
				.then((text) => {
					var line = text.split("\r\n");
					var nm = $(el).attr('name');
					var etr = $(el);
					do {
						etr = etr.parent();
					} while (etr.prop("tagName") != "TR");
					
					for (var ii = 0; ii < line.length; ii++) {
						var item = line[ii].split('\t');
						
						var jj = 0;
						var same = false;
						etr.find('input,select').each(function(index) {
							if ($(this).attr('name') == nm) {
								same = true;
							}
							if (item.length > jj && same) {
								$(this).val(item[jj++]);
								$(this).trigger('change');
							}
						});
						etr = etr.next();
					}
				});
				
			}, 2);
		});
	}
	
	function afterDatepicker(uid) {
		var tempArray = new Array();
		$('#' + uid + '_table tbody').find('[edittype="date"]').each(function(){
			
			tempArray.push($(this).attr("id"));
		});

		for (var t = 0; t < tempArray.length; t++) {
			$('input[id="' + tempArray[t] + '"]').datepicker({
				autoclose: true,
				format: "yyyy-mm-dd",
				changeMonth: true,
				changeYear: true,
				language: "ko"
			});
		}
	}
	
	function afterSortAndCheck(uid) {
		$("#" + uid + " th").off('click');
		$("#" + uid + " th").click(function() {
			
			var sort = '', removeSort = '';

			if ($(this).hasClass('sorting')) {
				$(this).removeClass('sorting');
				$(this).addClass('sorting_asc');
				sort = 'asc';
				removeSort = 'desc';
			} else if ($(this).hasClass('sorting_asc')) {
				
				$(this).removeClass('sorting_asc');
				$(this).addClass('sorting_desc');
				sort = 'desc';
				removeSort = 'asc';
			} else if ($(this).hasClass('sorting_desc')) {
				
				$(this).removeClass('sorting_desc');
				$(this).addClass('sorting');
				sort = '';
				removeSort = 'desc';
			} else {
				return;
			}
			$(this).addClass('sorting_' + sort);
			var headId = $(this).attr('sort');
			if (pageOrder[uid].includes("," + headId + ":" + removeSort)) {
				pageOrder[uid] = pageOrder[uid].replace("," + headId + ":" + removeSort, "");
			}
			if (sort != '') {
				pageOrder[uid] = "," + headId + ":" + sort + pageOrder[uid];
			}
			//console.log(pageOrder[uid]);
			//drawnTableFunc[uid]();
			
			UserTable.reload(uid);
		});
		
		$("#" + uid + "_checkbox_all").change(function() {
			
			var rowCount = UserTable.getRowCount(uid);
			if (rowCount > 0) {
				var checkedValue = false;
				if ($(this).is(":checked")) {
					checkedValue = true;
				}
				
				$('#' + uid + ' input[name="checkbox"]').each(function(index) {
					if (!$(this).is(":disabled")) {
						$(this).prop("checked", checkedValue);
					}
				});
				//}
			}
		});
		
	}

	function inputChangeEvent(uid) {
		
		$("#" + uid + " input,#" + uid + " select:not(#" + uid + "_page)").off('change keyup paste');
		$("#" + uid + " input,#" + uid + " select:not(#" + uid + "_page)").on('change keyup paste', function() {	
			var val = $(this).val();
			var name = $(this).attr('name');

			var element = $(this);
			do {
				element = element.parent();
			} while (element.prop("tagName") != "TR");

			var index = element.index();
			if (name && name != 'checkbox' && dataset[uid][(index)]) {
				if ($(this).attr('type') == 'checkbox') {
					dataset[uid][index][name] = $(this).is(":checked");
					//console.log(index);
					//console.log('dataset[uid][(index)].' + name + ' = $(this).is(":checked");');
					//eval('dataset[uid][(index)].' + name + ' = $(this).is(":checked");');
				} else {
					if (name.indexOf(".") > -1) {
						var names = name.split(".");
						for (var i = 0; i < names.length - 1; i++) {
							var beforeObjName = "";
							if (i > 0) {
								for (var j = 0; j < i; j++) {
									beforeObjName += names[j] + ".";
								}
							}
							eval('dataset[uid][(index)].' + beforeObjName + names[i] + ' = {};');
						}

						eval('dataset[uid][(index)].' + name + ' = val;');
					} else {
						dataset[uid][index][name] = val;
					}
				}
			}
		});
	}

	function saveEvent(uid, ajax) {
		$("#" + uid + "_add_btn").click(function() {
			
			UserTable.addEmptyRows(uid, 1);
		});

		$("#" + uid + "_del_btn").click(function() {
			if (dataset[uid].length > 0) {
				
				var arrIndex = new Array();
				$('input[name="checkbox"]').each(function(index) {
					
					if ($(this).is(":checked")) {
						arrIndex.unshift(index);
					}
				});
				
				for (var ai = 0; ai < arrIndex.length; ai++) {
					UserTable.delRowAt(uid, arrIndex[ai]);
				}
			}
		});
		
		$("#" + uid + "_save_btn").click(function() {
			$.ajax({
				url : ajax.url,
				type : ajax.type,
				data : JSON.stringify(dataset[uid]),
				dataType : "json",
				contentType : "application/json; charset=utf-8",
				beforeSend : ajax.beforeSend,
				success: function (rtn) {
					if (rtn.result != "10") {
						if (rtn.result == "00") {
							CommonMsg.save(function() { UserTable.reload(uid) }, rtn.message);
						} else {
							CommonMsg.error(function() { }, rtn.message);
						}
					}
				},
				error : function(data) {
					CommonMsg.error(function() { });
					$('#' + uid + '_loading').hide();
				}
			});
		});
	}

	function tagitEvent(uid) {
		var tagitFields = [];
		$('#' + uid + '_table tbody').find('[edittype="tagit"]').each(function(){
			var tags = [];
			var dataName = $(this).attr("columnData");
			var val = $(this).attr("data");
			for (var r in columns[uid]) {
				if (dataName == columns[uid][r].data) {
					if (columns[uid][r].editoptions) tags = columns[uid][r].editoptions;
					break;
				}
			}

			var tagitField = {
				id : $(this).attr("id"),
				fieldId : $(this).attr("singleField"),
				value : val,
				tags : tags
			};

			tagitFields.push(tagitField);
		});

		for (var i = 0; i < tagitFields.length; i++) {
			var tagitField = tagitFields[i];
			$("#" + uid + " #" + tagitField.id).tagit({
				availableTags: tagitField.tags,
				allowSpaces: true,
				singleField: true,
				singleFieldNode: $('#' + tagitField.fieldId),
				singleFieldDelimiter: '|'
			});
			
			if (tagitField.value != null && tagitField.value.length > 0) {
				var valueArray = tagitField.value.split('|');
				for (var j = 0; j < valueArray.length; j++) {
					$("#" + tagitField.id).tagit("createTag", valueArray[j]);
				}
			}
		}
	}

	function getRandomString() {
		return Math.random().toString(36).substr(2,11);
	}
}();

toCapitalize = function(text) {
	var text = text.replace(/^./, text[0].toUpperCase());
	return text;
}

camelCaseToTitle = function(text) {
	text = text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
	return text;
}

function fillzero(obj, len) {
	obj= '000000000000000' + obj;
	return obj.substring(obj.length - len);
}

function camel2space(str){
	str = str.replace(/([A-Z])/g, function(arg){
		return " "+arg;
	});
	return capitalize(str);
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}