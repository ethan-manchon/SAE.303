var CountriesView = {};

CountriesView.render = function(data) {

  var palette =['#ffcc99', '#cc0000'];

  var chart = JSC.chart('countries', {
    margin: [6, 6],
    box_fill: 'white', // Set the background to white
    type: 'heatmap solid',
    overlapBranding: true,
    title_label_text: 'Tableau des ventes par pays et par mois',
    palette: {
      pointValue: function(p) {
        return p.options('z');
      },
      colors: palette
    },
    height : 250,
    legend_visible: true,
    defaultAxis_defaultTick: {
      line_visible: false,
      label: { color: '#000', maxWidth: 170},
      placement: 'outside',
    },
    xAxis_defaultTick_padding: -2,
    defaultPoint: {
      outline_width: 0,
      tooltip:
        '%yValue - %xValue<br><b>%zValue produits expédiés</b>'
    },
    series: [{
      name: "Ventes par pays et par mois",
      points: data.map((item) => {
        const date = new Date(item.month);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        return {
          x: monthYear,
          y: item.country,
          z: item.total_quantity,
        };
      }),
    }]
  });

  
}

export { CountriesView };
