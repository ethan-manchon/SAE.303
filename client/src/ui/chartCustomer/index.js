let ChartCustomerView = {};

ChartCustomerView.render = function(data) {

  if (ChartCustomerView.chart) {
    ChartCustomerView.chart.destroy();
  }

  var series = JSC.nest()
    .key('category')
    .rollup('quantity')
    .series(data);

  ChartCustomerView.chart = renderChart(makeSeries(data));
      
  function renderChart(series) {
    return JSC.chart('chartcustomer', {
      debug: false,
      defaultSeries_type: 'column',
      palette: 'midTones',
      height: 200,
      title_label_text: "Achat d'un client par catégorie",
      defaultAxis_defaultTick_gridLine_visible: false,
      defaultPoint: ({ tooltip: '%name: <b>%value</b> achats', label_text: ''}),
      legend_visible: false,
      series: series,
      yAxis: {
      label_text: 'Achats',
      scale: { range: { max: 16 }, type: 'linear', interval: 2 }
      },
      xAxis: {
      defaultTick_label_text: ''  
      }
    });
  }

  function makeSeries(data) {
    data.reverse();
    var colors = JSC.getPalette('default');
    var colorIndex = 0;
    var categoryColors = {};

    var columnSeries = JSC.nest()
      .key('product_name')   
      .pointRollup(function(key, val) {
        var category = val[0].category;
        
        if (!categoryColors[category]) {
          categoryColors[category] = colors[colorIndex % colors.length];
          colorIndex++;
        }
        return { x: key, y: val[0].quantity, color: categoryColors[category] }; 
      })
      .series(data);

    var pieSeries = [
      {
        type: 'pie donut',
        shape: {
          center: '75%, 30%', 
          size: '40%',
          innerSize: '50%',
          label: { verticalAlign: 'middle', text: '<b>%name</b>' }
        },
        defaultPoint: {
          tooltip: '%name: <b>%value</b>',
          label_text: '%name {%percentOfSeries:n0}%'
        },
        points: JSC.nest()
          .key('category')
          .pointRollup(function(key, val) {
            return { x: key, y: JSC.sum(val, 'quantity'), color: categoryColors[key] };
          })
          .points(data)
      }
    ];
    return columnSeries.concat(pieSeries);
  }
};

export { ChartCustomerView };
