Template.reporteCialcos.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.cialcosData = new ReactiveVar();
  self.autorun(function () {
    let handleCialcos = SubsManagerCialcos.subscribe('reporteCialcos');
    self.ready.set(handleCialcos.ready());
    if (handleCialcos.ready()) {
      self.cialcosData.set({
        totalCialcos: Cialcos.find({}).count(),
        feria: Cialcos.find({modalidad: 'Feria'}).count(),
        canasta: Cialcos.find({modalidad: 'Canasta'}).count(),
        pieDeFinca: Cialcos.find({modalidad: 'Pie de finca'}).count(),
        tienda: Cialcos.find({modalidad: 'Tienda'}).count(),
        compraPublica: Cialcos.find({modalidad: 'Compra pública'}).count(),
        exportacionCampesina: Cialcos.find({modalidad: 'Exportación campesina'}).count(),
        abastecimientoPequenasIndustrias: Cialcos.find({modalidad: 'Abastecimiento a pequeñas industrias'}).count(),
        cateringRestaurantes: Cialcos.find({modalidad: 'Catering/restaurantes'}).count(),
        otro: Cialcos.find({modalidad: 'Otro'}).count()
      });
    }
  });
});

Template.reporteCialcos.helpers({
  tablaReporteCialcos: function () {
    return Template.instance().cialcosData.get();
  },
  reporteCialcos: function () {
    let cialcosData = Template.instance().cialcosData.get();
    if (cialcosData !== undefined) {
      let totalCialcos = cialcosData.totalCialcos;

      let seriesCialcosData = [{
        name: 'Feria',
        y: cialcosData.feria * 100 / totalCialcos
      }, {
        name: 'Canasta',
        y: cialcosData.canasta * 100 / totalCialcos
      }, {
        name: 'Pie de finca',
        y: cialcosData.pieDeFinca * 100 / totalCialcos
      }, {
        name: 'Tienda',
        y: cialcosData.tienda * 100 / totalCialcos
      }, {
        name: 'Compra pública',
        y: cialcosData.compraPublica * 100 / totalCialcos
      }, {
        name: 'Exportación campesina',
        y: cialcosData.exportacionCampesina * 100 / totalCialcos
      }, {
        name: 'Abastecimiento a pequeñas industrias',
        y: cialcosData.abastecimientoPequenasIndustrias * 100 / totalCialcos
      }, {
        name: 'Catering/restaurantes',
        y: cialcosData.cateringRestaurantes * 100 / totalCialcos
      }, {
        name: 'Otro',
        y: cialcosData.otro * 100 / totalCialcos
      }];

      // Use Meteor.defer() to craete chart after DOM is ready:
      Meteor.defer(function () {
        // Create standard Highcharts chart with options:
        Highcharts.chart('reporte-cialcos', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: false
          },
          tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'CIALCOs',
            colorByPoint: true,
            data: seriesCialcosData
          }],
          credits: {
            enabled: false
          }
        });
      });
    }
  }
});