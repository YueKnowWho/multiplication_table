/*
File: mult_table.js
GUI Assignment: Multiplication Table
Jonathan Yue, UMass Lowell Computer Science, jonathan_yue@student.uml.edu
Copyright (c) 2025 by Jonathan Yue All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
updated by JY on June 14, 2025 at 8 PM
*/
class MultiplicationTable{
    constructor(col_min, col_max, row_min, row_max){
        this.col_min = col_min;
        this.col_max = col_max;
        this.row_min = row_min;
        this.row_max = row_max;
    }
    printNumbers(){
        console.log(this.col_min, this.col_max, this.row_min, this.row_max);
    }
    generate(){
        const table = document.createElement('table');
        table.className = 'table table-light table-bordered';

        // Header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th')); // empty corner
        for(let col = this.col_min; col <= this.col_max; col++) {
            //adds col min and max headers
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        }
        //adds header row to thead and thead to table
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body rows
        const tbody = document.createElement('tbody');
        for(let row = this.row_min; row <= this.row_max; row++) {
            //adds row min and max headers
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = row;
            tr.appendChild(th);
            //adds products
            for(let col = this.col_min; col <= this.col_max; col++) {
                const td = document.createElement('td');
                td.textContent = row * col;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        return table;
    }
}
//create initial table
const form = document.querySelector('form')
const tableContainer = document.querySelector('.table-container')
window.addEventListener('DOMContentLoaded', function() {
    // Only add if there isn't already a table
    if (!document.getElementById('mult-table')) {
        const initialTable = new MultiplicationTable(1, 10, 1, 10);
        const tableElement = initialTable.generate();
        tableElement.id = 'mult-table';
        tableContainer.appendChild(tableElement);
    }
});
//When Generate Table button is clicked
form.addEventListener('submit', function(event){
    event.preventDefault(); // prevents page from resetting
    //get form inputs
    const colMin = parseInt(document.getElementById('col_min').value, 10);
    const colMax = parseInt(document.getElementById('col_max').value, 10);
    const rowMin = parseInt(document.getElementById('row_min').value, 10);
    const rowMax = parseInt(document.getElementById('row_max').value, 10);
    //check for invalid non integer
    if(!Number.isInteger(colMin) || !Number.isInteger(colMax)||!Number.isInteger(rowMin) || !Number.isInteger(rowMin)){
        if(!Number.isInteger(colMin)){
            document.querySelector('.col_min .invalid-feedback').textContent = "Must be integer input"
            document.getElementById('col_min').classList.add('is-invalid')
        }
        if(!Number.isInteger(colMax)){
            document.querySelector('.col_max .invalid-feedback').textContent = "Must be integer input"
            document.getElementById('col_max').classList.add('is-invalid')
        }
        if(!Number.isInteger(rowMin)){
            document.querySelector('.row_min .invalid-feedback').textContent = "Must be integer input"
            document.getElementById('row_min').classList.add('is-invalid')
        }
        if(!Number.isInteger(rowMax)){
            document.querySelector('.row_max .invalid-feedback').textContent = "Must be integer input"
            document.getElementById('row_max').classList.add('is-invalid')
        }
    }
    //check for valid input min>max
    else if(colMin > colMax || rowMin > rowMax){
        if(colMin > colMax){
            document.querySelector('.col_min .invalid-feedback').textContent = "Minimum column must be less than or equal to maximum column."
            document.querySelector('.col_max .invalid-feedback').textContent = "Minimum column must be less than or equal to maximum column.t"
            document.getElementById('col_min').classList.add('is-invalid')
            document.getElementById('col_max').classList.add('is-invalid')

        }
        if(rowMin > rowMax){
            document.querySelector('.row_min .invalid-feedback').textContent = "Minimum row must be less than or equal to maximum row."
            document.querySelector('.row_max .invalid-feedback').textContent = "Minimum row must be less than or equal to maximum row."
            document.getElementById('row_min').classList.add('is-invalid')
            document.getElementById('row_max').classList.add('is-invalid')
        }
    }
    //valid input
    else{
        // remove table before adding a new one
        const oldTable = document.getElementById('mult-table');
        if (oldTable) {
            oldTable.remove();
        }
        // add table to page
        const table = new MultiplicationTable(colMin, colMax, rowMin, rowMax)
        table.printNumbers();
        const tableElement = table.generate();
        tableElement.id = 'mult-table';
        tableContainer.appendChild(tableElement);
        //remove invalid error message
        document.getElementById('col_min').classList.remove('is-invalid')
        document.getElementById('col_max').classList.remove('is-invalid')
        document.getElementById('row_min').classList.remove('is-invalid')
        document.getElementById('row_max').classList.remove('is-invalid')
    }
});