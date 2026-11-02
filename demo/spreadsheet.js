(function () {
    "use strict";

    var LayoutManager = function () {
		var defaultRowCount = 50;
		var defaultColumnCount = 50;
		
		var currentRowCount = defaultRowCount;
		var currentColumnCount = defaultColumnCount;
		
		var canvas = document.getElementById("container");
		
		var headerContainer = document.getElementById("header");
		var bodyContainer = document.getElementById("body");
	
		var getAvailableWidth = function () {
			var width;
			if (self.innerHeight) {
					width = self.innerWidth;
			}
			else if (document.documentElement && document.documentElement.clientHeight) {
					width = document.documentElement.clientWidth;
			}
			else if (document.body) {
					width = document.body.clientWidth;
			}
			return width;
		};
		
		var getAvaialbleHeight = function () {
		
			var height = 0;
			if (self.innerHeight) {
					height = self.innerHeight;
			}
			else if (document.documentElement && document.documentElement.clientHeight) {
					height = document.documentElement.clientHeight;
			}
			else if (document.body) {
					height = document.body.clientHeight;
			}
			return height;
		};
		
		var selectedColumn = null;
		var selectedRow = null;
		
		var unselectColumn = function (index) {
		
		    columnDo(index, function() {
				if (this === undefined)
					return;
				var sclassName = this.className;
				sclassName = sclassName.replace("selected","");
				this.className = sclassName;
			});
			
		};
		
		var unselectRow = function (index) {
		
		    rowDo(index, function() {
				if (this === undefined)
					return;
				var sclassName = this.className;
				sclassName = sclassName.replace("selected","");
				this.className = sclassName;
			});
			
		};
		
		var columnDo = function (index, callback) {
			
			for (var iter=0; iter < currentRowCount; iter++) {
				//get the appropriate row
				var row = bodyContainer.childNodes[iter];
				
				for (var subiter = 1; subiter < row.childNodes.length; subiter++) {
					var el = row.childNodes[subiter];
					var offset = parseInt(el.getAttribute("columnoffsetval"));
					if (offset == index) {
				       callback.apply(el);
					}
				}
				
			}
		}
		
		var rowDo = function (index, callback) {
			
			for (var iter=1; iter <=currentColumnCount; iter++) {
				//get the appropriate row
				var i = index;
				if (!window.attachEvent)
					i = index+1;
				var cell = bodyContainer.childNodes[i].childNodes[iter];
				callback.apply(cell);
			}
		};
		
		
		var selectColumn = function (columnIndex) {
		
			if (columnIndex === null || columnIndex === undefined) {
				return;
			}
			
			resetSelection();
			selectedColumn = columnIndex;
			columnDo(columnIndex, function () {
				if (this === undefined)
					return;
				var sClass = this.className;
				if (sClass.indexOf("selected") != -1 )
					return;
				else {
					sClass += " selected";
					this.className = sClass;
				}

			});
		
		};
		
		var resetSelection = function () {
		    if (selectedColumn !== null || selectedRow !== null) {
				unselectRow(selectedRow);
				unselectColumn(selectedColumn);
				selectedColumn = null;
				selectedRow = null;
			}
		};
		
		
		var selectRow = function (rowIndex) {
		
			if (rowIndex === null || rowIndex === undefined) {
				return;
			}
			resetSelection();
			selectedRow = rowIndex;
			rowDo(rowIndex, function () {
				var sClass = this.className;
				if (sClass.indexOf("selected") != -1 )
					return;
				else {
					sClass += " selected";
					this.className = sClass;
				}

			});
		
		};
		
		var bind = function (ele, e, callback) {
			if (ele.attachEvent) {
				ele.attachEvent("onclick", callback);
			}
			else {
				ele.addEventListener(e, callback);
			}
		};
		
		
		
		var init = function () {
			
			
			var createHeaderCell = function () {
				var headerCell = document.createElement("div");
				headerCell.setAttribute("class", "table-head");
				headerCell.setAttribute("style", "background-color: #ccc; border-bottom: 1px solid #000");
				
				return headerCell;
			};
			
			for (var iter = 0; iter < defaultColumnCount; iter++ ) {
				var headerElement = createHeaderCell();
				headerElement.setAttribute("id","col-"+iter);
				headerElement.setAttribute("columnoffsetval", iter);
				bind(headerElement, "click",  function(e) {
					var el = (e.srcElement)?e.srcElement:e.target;
					selectColumn(parseInt(el.getAttribute("columnoffsetval")));
				});
				
				headerElement.innerHTML= iter;
				
				headerContainer.appendChild(headerElement);
			}
			
			
			var createRowSelector = function () {
				var selector = document.createElement("div");
				selector.setAttribute("style","height: 30px; width: 30px; border-right: 1px solid #cdc; border-top: 1px solid #aaa; border-bottom: 1px solid #eee");
				selector.setAttribute("class", "table-row-selector");

				return selector;
			}
			
			var deleteColumn = function () {
				//remove table header
				if (selectedColumn === null)
					return
				var headercell = document.getElementById("col-"+selectedColumn);
				headercell.parentNode.removeChild(headercell);
				//remove all rows for that column
				
				columnDo(selectedColumn, function() {
					if (this === null || this === undefined)
						return;
					this.parentNode.removeChild(this);
				});
				
				dismisContext();
			
			};
			
			
			var delCol = document.getElementById("deletecol");
			
			bind(delCol, "click", deleteColumn); 
			
			var deleteRow = function() {
				if (selectedRow === null)
					return;
				var tableBody = document.getElementById("body");
				
				for (var iter=1; iter < tableBody.childNodes.length; iter++) {

					var current = tableBody.childNodes[iter];
					if (!current)
						continue;
					if (selectedRow == parseInt(current.getAttribute("row")))
						current.parentNode.removeChild(current);
				}
				
				selectedRow = null ;
					
				dismisContext();
			
			};
			
			var delrowmenu = document.getElementById("deleterow");
			
			bind(delrowmenu, "click", deleteRow);
			
			var getDefaultCell = function () {
				var cell = document.createElement("div");
				cell.setAttribute("class","table-cell");
				bind(cell, "click", function(e) {
					var el = (e.srcElement)?e.srcElement:e.target;
					el.setAttribute("contentEditable","true");
					el.focus();
				});
				
				var contentEditableDisble = function (e) {
					var el = (e.srcElement)?e.srcElement:e.target;
					el.setAttribute("contentEditable","false");
				};
				
				if (cell.attachEvent) {
					cell.attachEvent("onblur", contentEditableDisble);
				}
				else {
					cell.addEventListener("blur", contentEditableDisble);
				}
				return cell;
			};
			
			var getRow = function () {
			    var row = document.createElement("div");
				row.setAttribute("class","table-row");
				return row;
			};
			
			for (var rowIter=0; rowIter< defaultRowCount; rowIter++) {
			    var row = getRow();
				row.setAttribute("row",rowIter);
				bodyContainer.appendChild(row);
				var rowSelector = createRowSelector();
				rowSelector.setAttribute("id","row-" + rowIter);
				rowSelector.setAttribute("rowoffsetval", rowIter);
				
				bind(rowSelector, "click", function(e) {
					var el = (e.srcElement)?e.srcElement:e.target;
					 selectRow(parseInt(el.getAttribute("rowoffsetval"))	);
				});
				
				row.appendChild(rowSelector);
				
			    for (var iter = 0; iter < defaultColumnCount; iter++) {
					var cell = getDefaultCell();
					cell.setAttribute("rowoffsetval", rowIter);
					cell.setAttribute("columnoffsetval", iter);
					row.appendChild(cell);
				}
			}

		};
		
		var availableWidth = getAvailableWidth();
		var availableHeight = getAvaialbleHeight();
		init();
		
		//bind to right click;
		var menuShown = false;
		
		var dismisContext = function() {
			var menu = document.getElementById("menu-row");
			menu.style.visibility="hidden";
			menuShown = false;
			
			var menu = document.getElementById("menu-col");
			menu.style.visibility="hidden";
			menuShown = false;
			
			
		
		}
		
		var handler = function(e) {
			if (e.stopPropagation)
				e.stopPropagation();
			e.cancelBubble = true;
			e.returnValue = false;
			
			if (selectedRow !== null) {
				var menu = document.getElementById("menu-row");
				menu.style.visibility="visible";
				menu.style.zIndex = 5;
				menu.style.posLeft = e.clientX;
				menu.style.posTop = e.clientY;
				menu.style.left = e.clientX + "px";
				menu.style.top = e.clientY + "px";
				menuShown = true;
				
				bind(canvas, "click", function () {
					
				});
				
			}
			
			if (selectedColumn !== null) {
				var menu = document.getElementById("menu-col");
				menu.style.visibility="visible";
				menu.style.zIndex = 5;
				menu.style.posLeft = e.clientX;
				menu.style.posTop = e.clientY;
				menu.style.left = e.clientX + "px";
				menu.style.top = e.clientY + "px";
				menuShown = true;
				
				bind(canvas, "click", function () {
					
				});
			}
			
			
			
			return false;
		};
		
		if (document.attachEvent) {
			document.attachEvent("oncontextmenu", handler);
		}
		else {
			document.addEventListener("contextmenu", handler);
		}
	};
	
    var start = function () {
        var LayoutManger = new LayoutManager();
    };

    if (window.attachEvent) {
        window.onload = start;
    }
    else {
        window.addEventListener("load", start);
    }
	
})();  