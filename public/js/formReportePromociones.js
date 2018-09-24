//addProduct boton
//reporte boton
//articulosSeleccionados table
//articuloSelect list
//"datepickerFrom"
//"datepickerTo"
let articulosSeleccionados = [];

function deleteRow(rowid){
	let row = document.getElementById(rowid);
  row.parentNode.removeChild(row);
	articulosSeleccionados.splice(articulosSeleccionados.indexOf(rowid),1);
}

function validateForm(){
	optionList = document.getElementById("articulos").children;
	let articuloSeleccionado = document.getElementById("articuloSelect").value;
	if(articuloSeleccionado === ""){
		alert("debe seleccionar un producto");
		return;
	}
	let exists = false;
	for(i = 0; i < optionList.length; i++){
		if(optionList[i].value === articuloSeleccionado){
			exists = true;
			break;
		}
	}
	if(!exists) {
		alert("debe de seleccionar un producto de la lista o escribir su nombre como aparece");
		return;
	}

	let cantidad = document.getElementById("number").value;
	let isnum = /^\d+$/.test(cantidad);
	if(cantidad === ""){
		alert("debe de poner un numero en cantidad");
		return;
	}

	if(articulosSeleccionados.includes(articuloSeleccionado.replace(/\s/g,''))){
		alert("no puede agregar el mismo producto a la lista. \nSi quiere cambiar la cantidad elimine primero el producto de la lista.");
		return;
	}

	let table = document.getElementById("articulosSeleccionados");
	let numRows = table.getElementsByTagName("tr").length;
	let row = table.insertRow(numRows);
	row.id = articuloSeleccionado.replace(/\s/g,'');

	let product = row.insertCell(0);
	product.innerHTML = articuloSeleccionado;
	let number = row.insertCell(1);
	number.innerHTML = cantidad;

	row.ondblclick = () => {
		deleteRow(articuloSeleccionado.replace(/\s/g,''));
	};

	articulosSeleccionados.push(articuloSeleccionado.replace(/\s/g,''));
}

function submitForm(){
	let articulosJSON = [];
	let table = document.getElementById("articulosSeleccionados");
	let rows = table.rows;
	let cols;

	for(let i = 1; i < rows.length; i++){
		cols = rows[i].cells;
		articulosJSON.push({producto: cols[0].innerHTML, number: cols[1].innerHTML});
	}
	articulosJSON.push({"dateFROM": document.getElementById("datepickerFrom").value, "dateTO": document.getElementById("datepickerTo").value});
	document.getElementById("articulosJSON").value = JSON.stringify(articulosJSON);
	document.getElementById("reportePromocionesForm").submit();
}

function compareDates(dateFrom, dateTo){
	if(dateFrom[0] > dateTo[0]){
		return -1;
	}else if(dateFrom[0] < dateTo[0]){
		return 1;
	}else{
		if(dateFrom[1] > dateTo[1]){
			return -1;
		}else if(dateFrom[1] < dateTo[1]){
			return 1;
		}else{
			if(dateFrom[2] > dateTo[2]){
				return -1;
			}else if(dateFrom[2] < dateTo[2]){
				return 1;
			}else{
				return 0;
			}
		}
	}
}

function validateDates(){
	if(document.getElementById("datepickerFrom").value === ""){
		alert("escoja las fechas del reporte");
		return false;
	}
	if(document.getElementById("datepickerTo").value === ""){
		alert("escoja las fechas del reporte");
		return false;
	}
	if(articulosSeleccionados.length === 0){
		alert("escoja al menos un producto");
		return false;
	}
	return true;
}

$("document").ready(function () {
	$('#datepickerFrom').datepicker({format:"yyyy-mm-dd"});
	$('#datepickerTo').datepicker({format:"yyyy-mm-dd"}).on("changeDate", (ev) => {
		$("#datepickerTo").change();
	});

	$('#datepickerTo').change( () => {
		let datePickerFrom = document.getElementById("datepickerFrom").value;

		if(datePickerFrom === ""){
			alert("primero escoja fecha de inicio");
			document.getElementById("datepickerTo").value ="";
			return;
		}
		let datePickerTo = document.getElementById("datepickerTo").value;
		let dateFrom = datePickerFrom.split("-");
		let dateTo = datePickerTo.split("-");
		if(compareDates(dateFrom, dateTo) <= 0){
			alert("la fecha final debe de ser despues de la fecha de inicio");
			document.getElementById("datepickerTo").value ="";
			return;
		}

	});

	$("#addProduct").on("click", () => {
		validateForm();
	});
	$("#reporte").on("click", () => {
		if(validateDates()){
			submitForm();
		}

	});

	if(doReport){
		document.getElementById("reportePromocionesTable").style.display ="block";
	}


});
