const SalesByCategView = {};

SalesByCategView.render = (data) => {
  const chartDiv = document.getElementById('salesbycateg');
  const palette = ['#3F51B5', '#00BCD4', '#FF5722', '#8BC34A', '#FFC107', '#E91E63'];

  JSC.chart('salesbycateg', {
    type: 'radar area',
    legend_visible: true,
    legend: { template: '%icon %name', position: 'inside right', layout: 'vertical' },
    animation_duration: 500,
    title_label: {
      text: 'Répartition des ventes en fonction des catégories (6 derniers mois)',
    },
    defaultPoint: ({ tooltip: '%name: %yValue €' }),  
    palette: palette,
    debug: false,

    yAxis: {
      alternateGridFill: 'none',
      defaultTick_label_visible: false
    },
    xAxis_defaultTick: { line_visible: false, label_width: 180 },
    defaultSeries_mouseTracking_enabled: true,
    defaultPoint_marker: { type: 'circle', outline_width: 0 },
    defaultSeries: {
      opacity: 0.8,
      line_visible: true      
    },
    series: makeSeries(data),
    toolbar_defaultItem_position: 'inside top',
  });

  function makeSeries(data) {
    const months = [...new Set(data.map(item => item.month))];
    const categories = [...new Set(data.map(item => item.category))];
    return months.map(month => {
      const monthData = data.filter(item => item.month === month);
      const sortedMonthData = categories.map(category => {
        const item = monthData.find(item => item.category === category);
        return {
          name: category,
          y: item ? item.total_sales : 0
        };
      });
      return {
        name: month,
        points: sortedMonthData
      };
    });
  }
};

export { SalesByCategView };
