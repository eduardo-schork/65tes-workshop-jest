import { ExternalAPIInterface } from "./external-api.types";
const axios = require("axios");

const BASE_URL = "http://localhost:3001";

class ExternalApiRemoteAdapter implements ExternalAPIInterface {
  async getTypeOfVehicle(vehicleWeight: number) {
    const data = await axios({
      method: "get",
      url: BASE_URL + `/${vehicleWeight}`,
    });
    console.log({ data });
    return "";
  }

  async validateVehicleChassis(chassisNumber: string) {
    const data = await axios({
      method: "get",
      url: BASE_URL + `/${chassisNumber}`,
    });
    console.log({ data });
    return true;
  }
}

export default ExternalApiRemoteAdapter;
