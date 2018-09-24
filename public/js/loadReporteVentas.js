function loadRows(data, id){
    
	let rows = document.getElementById(id);
	let newRow, amecopCol, nombreCol, sectorCol, importeCol, ivaCol, descuentoCol, totalCol;
	data.forEach((row) =>{
		newRow = document.createElement("tr");
		amecopCol = document.createElement("td");
    	amecopCol.innerHTML = row["amecop"];
    	nombreCol = document.createElement("td");
    	nombreCol.innerHTML = row["nombre"];
    	sectorCol = document.createElement("td");
    	sectorCol.innerHTML = row["sector"];
    	importeCol = document.createElement("td");
    	importeCol.innerHTML = row["importe"];
    	ivaCol = document.createElement("td");
    	ivaCol.innerHTML = row["iva"];
    	descuentoCol = document.createElement("td");
    	descuentoCol.innerHTML = row["descuento"];
    	totalCol = document.createElement("td");
    	totalCol.innerHTML = row["total"];

    	newRow.appendChild(amecopCol);
    	newRow.appendChild(nombreCol);
    	newRow.appendChild(sectorCol);
    	newRow.appendChild(importeCol);
    	newRow.appendChild(ivaCol);
    	newRow.appendChild(descuentoCol);
    	newRow.appendChild(totalCol);

    	rows.appendChild(newRow);
	});
}



$("document").ready(() => {
	//loadRows(previous, "previousMonthRows");
	//loadRows(actual, "actualMonthRows");
});