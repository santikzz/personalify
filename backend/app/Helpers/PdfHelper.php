<?php

namespace App\Helpers;

require '../vendor/autoload.php';

use Dompdf\Dompdf;

class PdfHelper
{

    public static function generatePdfInvoice($invoice, $attendances)
    {
        $filename = "factura_" . $invoice['employee_name'] . "_" . $invoice['invoice_date'] . ".pdf";
        $dompdf = new Dompdf();
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->getOptions()->setDefaultFont('arial');

        $html = "
        <html>
<style>
    * {
        font-family: Arial;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body {
        padding: 2rem;
    }
    .header {
        border: 2px solid black;
        padding: 1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
    }
    table {
        border-collapse: collapse;
        border: 2px solid black;
        font-size: 0.8rem;
        letter-spacing: 1px;
        width: 100%;
    }
    caption {
        caption-side: bottom;
        padding: 10px;
        font-weight: bold;
    }
    thead,
    tfoot {
        background-color: #e5e5e5;
    }
    th,
    td {
        border: 1px solid rgb(160 160 160);
        padding: 6px;
    }
    tbody>tr:nth-of-type(even) {
        background-color: rgb(237 238 242);
    }
    tfoot th {
        text-align: right;
    }
    tfoot td {
        font-weight: bold;
    }
    .text-right{
        text-align: right;
    }
</style>
<body>
    <div class='header'>
        <div>
            <h3>" . $invoice['employee_name'] . "</h3>
            <label>DNI: " . $invoice['employee_dni'] . "</label>
        </div>
        <div>
            <label>" . $invoice['invoice_date'] . "</label>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th scope='col'>Fecha</th>
                <th scope='col'>Entrada</th>
                <th scope='col'>Salida</th>
                <th scope='col'>Horas</th>
                <th scope='col'>Lugar</th>
            </tr>
        </thead>
        <tbody>";
        foreach ($attendances as $attendance) {
            $html .= "<tr>
                <td>" . $attendance['date'] . "</td>
                <td>" . date('H:i', strtotime($attendance['check_in_time'])) . " hs</td>
                <td>" . date('H:i', strtotime($attendance['check_out_time'])) . " hs</td>
                <td>" . round($attendance['worked_minutes'] / 60, 2) . " hs</td>
                <td>" . $attendance['client_name'] . "</td>
            </tr>";
        }
        $html .= "</tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <th scope='row' colspan='3'>" . $invoice['total_hours'] . " hs</th>
                <td class='text-right'>$ " . $invoice['total'] . "</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
";

        $dompdf->loadHtml($html);       // Load HTML content
        $dompdf->render();              // Render the HTML as PDF
        $dompdf->stream($filename);     // Output the generated PDF to Browser
    }
}
