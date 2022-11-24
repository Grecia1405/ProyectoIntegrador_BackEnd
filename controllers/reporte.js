import path from 'path';
import pdf from 'html-pdf'
import { plantilla } from '../documents/plantilla.js';

export const downloadPDF = async (req, res = response) => {
    pdf.create(plantilla(req.body), {}).toFile('../ProyectoIntegrador_BackEnd/result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
}

export const fetchPDF = async (req, res = response) => {
    res.sendFile('result.pdf', { root: '../ProyectoIntegrador_BackEnd/' })
}