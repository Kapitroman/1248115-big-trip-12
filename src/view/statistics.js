import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {uniqTypesTrip, sortTrip} from "../utils/statistics.js";
import {TimeInMs} from "./../const.js";

const renderMoneyChart = (moneyCtx, events) => {

  const result = (eventsTrip) => {
    const moneyTrip = [];
    const uniqTypes = uniqTypesTrip(eventsTrip);
    for (let i = 0; i < uniqTypes.length; i++) {
      let total = 0;
      for (let y = 0; y < eventsTrip.length; y++) {
        if (eventsTrip[y][`type`] === uniqTypes[i]) {
          total += eventsTrip[y][`price`];
        }
      }
      moneyTrip.push([uniqTypes[i], total]);
    }

    return moneyTrip.sort(sortTrip);
  };

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: result(events).map((item) => item[0].toUpperCase()),
      datasets: [{
        data: result(events).map((item) => item[1]),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {

  const result = (eventsTrip) => {
    let transportTrip = [];
    const uniqTypes = uniqTypesTrip(eventsTrip);
    for (let i = 0; i < uniqTypes.length; i++) {
      let count = 0;
      for (let y = 0; y < eventsTrip.length; y++) {
        if (eventsTrip[y][`type`] === uniqTypes[i]) {
          count++;
        }
      }
      transportTrip.push([uniqTypes[i], count]);
    }

    return transportTrip.sort(sortTrip);
  };

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: result(events).map((item) => item[0].toUpperCase()),
      datasets: [{
        data: result(events).map((item) => item[1]),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, events) => {

  const result = (eventsTrip) => {
    let timeTrip = [];
    const uniqTypes = uniqTypesTrip(eventsTrip);
    for (let i = 0; i < uniqTypes.length; i++) {
      let time = 0;
      for (let y = 0; y < eventsTrip.length; y++) {
        if (eventsTrip[y][`type`] === uniqTypes[i]) {
          time += (eventsTrip[y][`endDate`] - eventsTrip[y][`startDate`]);
        }
      }
      timeTrip.push([uniqTypes[i], Math.round(time / TimeInMs.HOUR_IN_MS)]);
    }

    return timeTrip.sort(sortTrip);
  };

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: result(events).map((item) => item[0].toUpperCase()),
      datasets: [{
        data: result(events).map((item) => item[1]),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {

  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends SmartView {
  constructor(events) {
    super();
    this._data = events;

    this._moneyCart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyCart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyCart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyCart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyCart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data);

  }
}
