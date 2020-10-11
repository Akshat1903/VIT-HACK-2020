document.getElementById("from_date").min = "2020-01-30";
document.getElementById("to_date").min = "2020-01-30";

async function getUsers() {
    let url = 'http://127.0.0.1:8000/api/charts_api';
    let state = $("#state").val();
    let gender = $("#gender").val();
    let age = $("#age").val();
    let from_date = $("#from_date").val();
    let to_date = $("#to_date").val();
    let options = {
        method: "POST",
        body: JSON.stringify({
            "state": state,
            "age": age,
            "gender": gender,
            "from_date": from_date,
            "to_date": to_date
        }),
        headers: {
            "Content-type": "application/json"
        }
    };
    try {
        let res = await fetch(url,options);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

var lineChartData = {
    labels: [],
    datasets: [{
        fillColor: "rgba(220,220,220,0)",
        strokeColor: "rgba(220,180,0,1)",
        pointColor: "rgba(220,180,0,1)",
        data: []
    }]
}

async function renderUsers() {
    let users = await getUsers();
    console.log(users);
    let x = users;
    lineChartData.labels = [];
    lineChartData.datasets[0].data = [];
    x.forEach(data => {
        lineChartData.labels.push(data.date);
        lineChartData.datasets[0].data.push(data.count);
    });
}

renderUsers();

$("#state").on('change',function() {
    renderUsers();
    lineChartDemo.destroy();
    window.setTimeout(showGraph, 2000);
});
$("#gender").on('change',function() {
    renderUsers();
    lineChartDemo.destroy();
    window.setTimeout(showGraph, 2000);
});
$("#age").on('change',function() {
    renderUsers();
    lineChartDemo.destroy();
    window.setTimeout(showGraph, 2000);
});
$("#from_date").on('change',function() {
    renderUsers();
    lineChartDemo.destroy();
    window.setTimeout(showGraph, 2000);
});
$("#to_date").on('change',function() {
    renderUsers();
    lineChartDemo.destroy();
    window.setTimeout(showGraph, 2000);
});

console.log(lineChartData);


Chart.defaults.global.animationSteps = 50;
Chart.defaults.global.tooltipYPadding = 10;
Chart.defaults.global.tooltipCornerRadius = 0;
Chart.defaults.global.tooltipTitleFontStyle = "normal";
Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.responsive = true;
Chart.defaults.global.scaleLineColor = "black";
Chart.defaults.global.scaleFontSize = 10;

var lineChartDemo;

function showGraph() {
    var canvas = document.getElementById("canvas").getContext("2d");
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    lineChartDemo = new Chart(canvas).Line(lineChartData, {
        pointDotRadius: 5,
        bezierCurve: false,
        scaleShowVerticalLines: false,
    });
};

window.setTimeout(showGraph, 2000);

$('#downloadPdf').click(function(event) {
    // get size of report page
    var reportPageHeight = $('.container').innerHeight();
    var reportPageWidth = $('.container').innerWidth();

    var pdfCanvas = $('<canvas />').attr({
        id: "canvaspdf",
        width: reportPageWidth,
        height: reportPageHeight
    });

    var pdfctx = $(pdfCanvas)[0].getContext('2d');
    var pdfctxX = 0;
    var pdfctxY = 0;
    var buffer = 100;

    var canvasHeight = $("canvas").innerHeight();
    var canvasWidth = $("canvas").innerWidth();

    pdfctx.drawImage($("canvas")[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
    pdfctxX += canvasWidth + buffer;

    var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
    pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

    pdf.save('charts.pdf');
});
