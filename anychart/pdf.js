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
    const width = 1280; 
    const height = 720; 
    const canvasRenderService = new CanvasRenderService(width, height, (ChartJS) => {
        ChartJS.defaults.global.defaultFontSize = 24;
        ChartJS.defaults.global.defaultFontColor = 'black';
        ChartJS.defaults.global.defaultFontStyle = 'bold';
    });
    const configuration = {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Estimated Energy Usage: Previous 12 months',
                backgroundColor: '#06974f',
                data: [0,0,178,236,265,206,306,286,345,265,184,249],
            }]
        },
        options: {
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'kW'
                  }
                }]
            }
        }
    };
    return canvasRenderService.renderToBuffer(configuration);
}

async function generatePDF(req, res) {
   const doc = new PDFDocument({layout: 'landscape'})
   doc.pipe(res)
    doc.image(await drawChartUsingChartJS(), {
        width:640,
        height:400
    })
   doc.end()
}

module.exports = generatePDF