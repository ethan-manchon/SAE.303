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
    palette: 'mutedRainbow',
    defaultBox_boxVisible: false,
    defaultPoint: ({ tooltip: '%name: <b>%value</b> en stock', label_text: '<b>%name</b>'}),
    legend_visible: false,
    title_label_text: 'Produits avec le moins de stock',
    series: series
  }); 
};

export { StockView };
