import { WINCC_API } from "@/app/utils/api";

const bakeApi = async (name: string) => {
  if (name === "PTB-10A-1") {
    const data = await WINCC_API.post("/values", {
      variableNames: [
        "Zmeevik1_1",
        "Zmeevik1_2",
        "OilPressureOnComINDB_OutV_111",
        "MainOB_RTDOilComIn_111",
        "AirPressureDB_OutV",
        "MainOB_GasVihlop111",
        "MainOB_GasVihlop222",
        "MainOB_RTDOilOutHeater111",
        "MainOB_RTDOilOutHeater222",
        "OilPressureOnComOUTDB_OutV_111",
        "MainOB_RTDOilComOut111",
        "MainOB_FlowPereshet_111",
        "MainOB_FlowPereshet_111", // Заменить
        "AirPressureAftMainValveDB_OutV",
        "AirPressureB4MainValveDB_OutV",
      ],
    });
    return {
      temp_zmeevik_1: data.data[0].value,
      temp_zmeevik_2: data.data[1].value,
      press_oil_in: data.data[2].value,
      temp_oil_in: data.data[3].value,
      press_air: data.data[4].value,
      temp_gas_1: data.data[5].value,
      temp_gas_2: data.data[6].value,
      temp_flow_1: data.data[7].value,
      temp_flow_2: data.data[8].value,
      press_oil_out: data.data[9].value,
      temp_oil_out: data.data[10].value,
      flow_oil: data.data[11].value,
      flow_gas: 0,
      press_gas_after: data.data[13].value,
      press_gas_before: data.data[14].value,
    };
  }
  if (name === "PTB-10A-2") {
    const data = await WINCC_API.post("/values", {
      variableNames: [
        "Zmeevik2_1",
        "Zmeevik2_2",
        "OilPressureOnComINDB_OutV_1",
        "MainOB_RTDOilComIn_1",
        "AirPressureDB_OutV_1",
        "MainOB_GasVihlop3",
        "MainOB_GasVihlop4",
        "MainOB_RTDOilOutHeater3",
        "MainOB_RTDOilOutHeater4",
        "OilPressureOnComOUTDB_OutV_1",
        "MainOB_RTDOilComOut4",
        "MainOB_FlowPereshet_1",
        "MainOB_FlowPereshet_1", // Заменить
        "AirPressureAftMainValveDB_OutV_1",
        "AirPressureB4MainValveDB_OutV_1",
      ],
    });
    return {
      temp_zmeevik_1: data.data[0].value,
      temp_zmeevik_2: data.data[1].value,
      press_oil_in: data.data[2].value,
      temp_oil_in: data.data[3].value,
      press_air: data.data[4].value,
      temp_gas_1: data.data[5].value,
      temp_gas_2: data.data[6].value,
      temp_flow_1: data.data[7].value,
      temp_flow_2: data.data[8].value,
      press_oil_out: data.data[9].value,
      temp_oil_out: data.data[10].value,
      flow_oil: data.data[11].value,
      flow_gas: 0,
      press_gas_after: data.data[13].value,
      press_gas_before: data.data[14].value,
    };
  }
  if (name === "PTB-10A-3") {
    const data = await WINCC_API.post("/values", {
      variableNames: [
        "Zmeevik3_1",
        "Zmeevik3_2",
        "OilPressureOnComINDB_OutV_3",
        "MainOB_RTDOilComIn_3",
        "AirPressureDB_OutV_3",
        "MainOB_GasVihlop53",
        "MainOB_GasVihlop63",
        "MainOB_RTDOilOutHeater53",
        "MainOB_RTDOilOutHeater63",
        "OilPressureOnComOUTDB_OutV_3",
        "MainOB_RTDOilComOut53",
        "MainOB_FlowPereshet_3",
        "MainOB_FlowPereshet_3", // Заменить
        "AirPressureAftMainValveDB_OutV_3",
        "AirPressureB4MainValveDB_OutV_3",
      ],
    });
    return {
      temp_zmeevik_1: data.data[0].value,
      temp_zmeevik_2: data.data[1].value,
      press_oil_in: data.data[2].value,
      temp_oil_in: data.data[3].value,
      press_air: data.data[4].value,
      temp_gas_1: data.data[5].value,
      temp_gas_2: data.data[6].value,
      temp_flow_1: data.data[7].value,
      temp_flow_2: data.data[8].value,
      press_oil_out: data.data[9].value,
      temp_oil_out: data.data[10].value,
      flow_oil: data.data[11].value,
      flow_gas: 0,
      press_gas_after: data.data[13].value,
      press_gas_before: data.data[14].value,
    };
  }
};

export default bakeApi
