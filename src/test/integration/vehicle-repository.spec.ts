import Vehicle from "../../models/vehicle";
import VehicleChassisInvalid from "../../repositories/vehicle/exceptions/vehicle-chassis-invalid.error";
import arrangeTestContext from "./arrange-test-context";

describe("VehicleRepository", () => {
  describe(".create", () => {
    const { wrongChassisVehicle, correctDataVehicle, vehicleRepository } =
      arrangeTestContext();

    describe("GIVEN a vehicle with correct data ", () => {
      it("SHOULD create and return a vehicle", async () => {
        expect(
          typeof (await vehicleRepository.create(correctDataVehicle))
        ).toBe(Vehicle);
      });
    });

    describe("GIVEN a vehicle with a wrong chassis ", () => {
      it("SHOULD NOT pass through creation and throw VehicleChassisInvalid error", () => {
        expect(async () => {
          await vehicleRepository.create(wrongChassisVehicle);
        }).toThrow(VehicleChassisInvalid);
      });
    });
  });
});
