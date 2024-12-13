let SalesView = {};

SalesView.render = function(data) {

  var series = JSC.nest()
    .key(function(d) {
      let date = new Date(d.month);
      let month = date.toLocaleString('default', { month: 'short' });
      let year = date.getFullYear();
      return `${month} ${year}`;
    })
    .rollup('total_sales')
    .series(data);


  JSC.chart('sales', {
    palette: 'mutedRainbow',
    defaultBox_boxVisible: true,
    legend_visible: false,
    debug: false,
    title_label_text: "Évolution du chiffre d'affaire sur 6 mois",
    defaultPoint: ({ tooltip: '%value €', label_text: '<b>%name</b>'}),
    yAxis: {
      label_text: 'Total des ventes',
      scale: {
        type: 'linear',
        range: { min: 2 }
      },
      defaultTick: {
        label: {
          text: '%value' + ' €'
        }
      }
    },
    xAxis: {
      crosshair_enabled: true,
    },
    series: series
  });
};

export { SalesView };
