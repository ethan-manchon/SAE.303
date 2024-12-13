let ChartProductView = {};

ChartProductView.render = function(data) {
  if (ChartProductView.chart) {
    ChartProductView.chart.destroy();
  }

  var series = JSC.nest()
    .key('month') 
    .rollup('sales_count') 
    .series(data); 


  ChartProductView.chart = JSC.chart('chartproduct', {
    debug: true,
    type: 'area',
    height: 200,
    title_label_text: 'Évolution du nombre de vente par mois',
    legend_visible: false,
    defaultSeries: {
      shape_opacity: 0.7,
      color: '#f7315e',
      defaultPoint_marker: {
        size: 10,
        outline: { color: 'white', width: 2 }
      },
    defaultPoint: { tooltip: function(point) {
      const date = new Date(point.x);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return point.y == 1 ? ` ${point.y} vente en ${month} ${year}` : ` ${point.y} ventes en ${month} ${year}`;
    }}

    },
  
    yAxis: {       crosshair_enabled: true, },


    xAxis: { scale_type: 'time' },
    series: series
  });
};

export { ChartProductView };


