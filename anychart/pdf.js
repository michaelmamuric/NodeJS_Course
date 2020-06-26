const PDFDocument = require('pdfkit')
//const ImageCharts = require('image-charts')
const { CanvasRenderService } = require('chartjs-node-canvas')

// function drawChart() {
//     return ImageCharts()
//     .cht('bvg')
//     .chd('a:0,0,178,236,265,206,306,286,345,265,184,249')
//     .chco('06974f')
//     .chs('480x200')
//     .chtt('Estimated Energy Usage: Previous 12 months')
//     .chm('N,000000,0,,10')
//     .chxt('x,y')
//     .chxl('0:|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec')
//     .toBuffer();
// }

function drawChartUsingChartJS() {
    const width = 480; 
    const height = 200; 
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => { });
    const configuration = {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                    label: 'Estimated Energy Usage: Previous 12 months',
                    data: [0,0,178,236,265,206,306,286,345,265,184,249]
                }]
            }
        };
    return canvasRenderService.renderToBuffer(configuration);
}

async function generatePDF(req, res) {
   const doc = new PDFDocument
   doc.pipe(res)
   doc.image(await drawChartUsingChartJS())
   doc.end()
}

module.exports = generatePDF