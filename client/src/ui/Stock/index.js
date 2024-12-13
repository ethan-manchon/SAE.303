let StockView = {};

StockView.render = function(data) {

  var series = JSC.nest()
    .key('product_name') 
    .rollup('stock')
    .series(data);

  series.forEach(function(serie) {
    serie.points.forEach(function(point) {
      if (point.y === 0) {
        point.color = 'red'; 
        point.tooltip = '%name <b>(Rupture de stock)</b>';
      }
    });
  });


  JSC.chart('stock', {
    type: 'column',
    debug: false,
    palette: 'mutedRainbow',
    defaultBox_boxVisible: false,
    defaultPoint: ({ tooltip: '%name: <b>%value</b> en stock'}),
    legend_visible: false,
    yAxis: {
      scale: { range: { max: 12 }, type: 'linear', interval: 4 },
      innerHeight: 0.5
      },
    title_label_text: 'Produits avec le moins de stock',
    series: series
  }); 
};

export { StockView };
