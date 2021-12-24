/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

const SProtBuilder = require("../classes/SProtBuilder");

const testData1 = [
    {
        "type": "",
        "elements": [
            [
                "< token > ",
                140737567227979
            ]
        ]
    }
];

const testData2 = [
    {
        "type": "periods",
        "path": [
            "data",
            "Leave of Absence"
        ],
        "elements": {
            "2": {
                "id": 5000000243,
                "name": "Leave of Absence",
                "period_values": [
                    {
                        "from_day": 0,
                        "from_one_day": 1431896400000,
                        "from_time": 1622109600032,
                        "id": 5000000245,
                        "id_periods": 5000000243,
                        "state": 1,
                        "to_day": 0,
                        "to_one_day": 1432846800000,
                        "to_time": 82800000,
                        "value_type": 1
                    }
                ],
                "state": 1
            }
        }
    },
    {
        "type": "periods",
        "path": [
            "data",
            "Closing Day"
        ],
        "elements": {
            "2": {
                "id": 5000000244,
                "name": "Closing Day",
                "period_values": [
                    {
                        "from_day": 1,
                        "from_one_day": 0,
                        "from_time": 28800000,
                        "id": 5000000246,
                        "id_periods": 5000000244,
                        "state": 1,
                        "to_day": 1,
                        "to_one_day": 0,
                        "to_time": 86340000,
                        "value_type": 0
                    }
                ],
                "state": 1
            }
        }
    },
    {
        "type": "",
        "path": [
            "meta"
        ],
        "elements": {
            "total": 2
        }
    }
];


test('test #1', () => {
    let builder = new SProtBuilder();
    let res = builder.build(testData1);

    expect(res["result"]);
    expect(res["result"].length == 2);
});

test('test #2', () => {
    let builder = new SProtBuilder();
    let res = builder.build(testData2);

    expect(res['data'] && typeof res['data'] === "object"); 
    expect(res['meta'] && typeof res['meta'] === "object");
});