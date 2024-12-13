let topProductsView = {};

topProductsView.render = function(data) {

  var series = JSC.nest()
    .key('product_name') 
    .rollup('total_sales') 
    .series(data); 

  JSC.chart('topProduct', {
    type: 'horizontal column',
    debug: false,
    palette: 'mutedRainbow',
    yAxis: { label_text: "Nombre de vente" },
    defaultPoint: ({ tooltip: '%name: <b>%value</b> ventes', label_text: '<b>%name</b>'}),
    yAxis: {
      scale_type: 'stacked',
      scale: { range: { max: 150} }
    },
    xAxis: {
      defaultTick_label_text: ''  
      
    },

    defaultBox_boxVisible: false,
    legend_visible: false,
    title_label_text: 'Produits les plus vendus des 6 derniers mois',
    series: series
  });
};

export { topProductsView };


