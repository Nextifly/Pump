import { WINCC_API } from "@/app/utils/api";

const bakeAllApi = async () => {
    const response = await Promise.all([
      await WINCC_API.post("/values", {
        variableNames: [
          "Zmeevik1_1",
          "Zmeevik1_2",
          "OilPressureOnComINDB_OutV_111",
          "MainOB_GasVihlop111", // сменить
          "AirPressureDB_OutV",
          "MB_READ_Flow_Rate_111",
          "MainOB_RTDOilComIn_111",
        ],
      }),
      await WINCC_API.post("/values", {
        variableNames: [
          "Zmeevik2_1",
          "Zmeevik2_2",
          "OilPressureOnComINDB_OutV_1",
          "MainOB_GasVihlop111", // сменить
          "AirPressureDB_OutV_1",
          "MB_READ_Flow_Rate_1",
          "MainOB_RTDOilComIn_1",
        ],
      }),
      await WINCC_API.post("/values", {
        variableNames: [
          "Zmeevik3_1",
          "Zmeevik3_2",
          "OilPressureOnComINDB_OutV_3",
          "MainOB_GasVihlop111", // сменить
          "AirPressureDB_OutV_3",
          "MB_READ_Flow_Rate_3",
          "MainOB_RTDOilComIn_3",
        ],
      }),
    ]);
    return [
      {
        name: "PTB-10A-1",
        temp1: Number(Number(response[0].data[0].value).toFixed(2)),
        temp2: Number(Number(response[0].data[1].value).toFixed(2)),
        pressure_oil: Number(Number(response[0].data[2].value).toFixed(2)),
        temp_oil: Number(Number(response[0].data[3].value).toFixed(2)),
        pressure_void: Number(Number(response[0].data[4].value).toFixed(2)),
        expenditure_oil: Number(Number(response[0].data[5].value).toFixed(2)),
        temp_exit_oil: Number(Number(response[0].data[6].value).toFixed(2)),
      },
      {
        name: "PTB-10A-2",
        temp1: Number(Number(response[1].data[0].value).toFixed(2)),
        temp2: Number(Number(response[1].data[1].value).toFixed(2)),
        pressure_oil: Number(Number(response[1].data[2].value).toFixed(2)),
        temp_oil: Number(Number(response[1].data[3].value).toFixed(2)),
        pressure_void: Number(Number(response[1].data[4].value).toFixed(2)),
        expenditure_oil: Number(Number(response[1].data[5].value).toFixed(2)),
        temp_exit_oil: Number(Number(response[1].data[6].value).toFixed(2)),
      },
      {
        name: "PTB-10A-3",
        temp1: Number(Number(response[2].data[0].value).toFixed(2)),
        temp2: Number(Number(response[2].data[1].value).toFixed(2)),
        pressure_oil: Number(Number(response[2].data[2].value).toFixed(2)),
        temp_oil: Number(Number(response[2].data[3].value).toFixed(2)),
        pressure_void: Number(Number(response[2].data[4].value).toFixed(2)),
        expenditure_oil: Number(Number(response[2].data[5].value).toFixed(2)),
        temp_exit_oil: Number(Number(response[2].data[6].value).toFixed(2)),
      },
    ];
};

export default bakeAllApi
