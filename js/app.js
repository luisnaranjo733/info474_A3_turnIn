$(function () {
    'use strict';


    d3.csv('data/un_co2_data.csv', function (error, data) {
        // manually re-mapping the data to include an identifier
        data = data.map((datum, index) => {
            return {
                "country_area": datum.country_area,
                "year": datum.year,
                "id": index
            };
        });

        let chart = bubbles()
            .width(960)
            .height(500)
            .range([10,30])
            .strength(-100)
            .columnForColors('country_area')
            .columnForRadius('value')
            .identifer('id') // typo, also what if my data has no identifier
            .title(''); // no way to customize title div so i just null'ed it

        let selection = d3.select("#vis")
            .datum([data])
            .call(chart);

    });

});