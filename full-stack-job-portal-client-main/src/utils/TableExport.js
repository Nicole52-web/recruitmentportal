// TableExport.js
import jsPDF from "jspdf";
import 'jspdf-autotable';
// import htmlToDocx from 'html-docx-js/dist/html-docx';

// Function to export table data as PDF
export const exportTableToPDF = (tableId, fileName) => {
    const doc = new jsPDF();
    const table = document.getElementById(tableId);
    const { head, body } = getTableData(table);

    doc.autoTable({ head, body });
    doc.save(`${fileName}.pdf`);
};

// Function to export table data as CSV
export const exportTableToCSV = (tableId, fileName) => {
    const table = document.getElementById(tableId);
    const { head, body } = getTableData(table);
    let csvContent = "data:text/csv;charset=utf-8,";

    // Construct CSV content for the header
    csvContent += head.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    csvContent += "\n";

    // Construct CSV content for the body
    csvContent += body.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up after download
    setTimeout(() => {
        document.body.removeChild(link);
    }, 500);
};


export const exportTableToWord = (tableId, fileName) => {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error('Table element not found.');
        return;
    }

    // Convert table to Word document
    const contentDocument = document.implementation.createHTMLDocument('New Document');
    const tableClone = table.cloneNode(true);
    contentDocument.body.appendChild(tableClone);
    const docx = htmlToDocx.asBlob(contentDocument.body.innerHTML);

    // Create a download link
    const url = window.URL.createObjectURL(docx);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.docx`;
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up after download
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 500);
};
// Function to extract table data
const getTableData = (table) => {
    if (!table) {
        console.error('Table element not found.');
        return { head: [], body: [] };
    }

    const head = [];
    const body = [];

    

    // Extracting headers
    const headerRows = table.querySelectorAll("thead tr");
    headerRows.forEach((headerRow) => {
        const row = [];
        headerRow.querySelectorAll("th").forEach((headerCell) => {
            row.push(headerCell.textContent.trim());
        });
        head.push(row);
    });

    // Extracting body
    const bodyRows = table.querySelectorAll("tbody tr");
    bodyRows.forEach((bodyRow) => {
        const row = [];
        bodyRow.querySelectorAll("td").forEach((bodyCell) => {
            row.push(bodyCell.textContent.trim());
        });
        body.push(row);
    });

    return { head, body };
};
