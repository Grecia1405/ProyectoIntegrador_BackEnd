export const plantilla = (listado) => {

    const today = new Date();

    let templateHtml = "";
    let cabecera = `<html>

    <head>
        <meta charset="utf-8">
        <title>REPORTE ASISTENCIAPP</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet">
        <style>
            body {
                font-family: 'Poppins';
                font-style: normal;
                padding: 10px;
            }
    
            .container {
                width: 700px;                
                margin: auto;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px auto;
            }
    
            /* Zebra striping */
            tr:nth-of-type(odd) {
                background: #eee;
            }
    
            th {
                background: #3897d6;
                color: white;
                font-weight: bold;
            }
    
            td {
                padding: 10px;
                border: 1px solid #ccc;
                text-align: left;
                font-size: 14px;
            }
    
            th {
                padding: 10px;
                border: 1px solid #ccc;
                text-align: center;
                font-size: 14px;
            }
        </style>
    </head>
    
    
    <body>
        <div class="container">
            <div style="display: flex;">
                <img src="https://herramientaswp.com/genkor2/wp-content/uploads/2022/11/banner.jpg"
                    style="width:100%; margin: auto;">
            </div>
            <hr size="4px" color="black">
            <p style="font-size: 18px;">Lista de asistencias de empleados hasta la fecha: ${`${today.getDate()}- ${today.getMonth() + 1}- ${today.getFullYear()}.`}</p>
            <hr size="4px" color="black">
    
            <table>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>FECHA</th>
                        <th>INGRESO</th>
                        <th>SALIDA</th>
                        <th>H. INGRESO</th>                        
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                `


    listado.map(el => {
        templateHtml += `
        <tr>
        <td>${el.dni}</td>    
        <td>${el.nombre}</td>    
        <td>${el.apellido}</td>    
        <td>${el.fecha}</td>    
        <td style="text-align:center;">${el.ingreso}</td>    
        <td style="text-align:center;">${el.salida}</td>    
        <td style="text-align:center;">${el.hora_ingreso ? el.hora_ingreso : '--:--:--'}</td>  
        <td style="text-align:center;">${el.estado == 1 ? 'Normal' : el.estado == 2 ? 'Tardanza' : 'Faltó'}</td> 
        </tr>  
        `
    })

    let footer = `    
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>
        `

    let total = cabecera += templateHtml += footer;

    return total;
};