import validatePlateStructure from "../../usecase/validate-plate-structure.usecase";
import arrangeTestContext from "./arrange-test-context";

describe("validatePlateStructure", () => {
  const { wrongPlateVehicle, correctPlateVehicle } = arrangeTestContext();

  describe("GIVEN a vehicle with correct plate ", () => {
    it("SHOULD pass through validator and returns true", () => {
      const isPlateValid = validatePlateStructure(
        correctPlateVehicle.license_plate
      );

      expect(isPlateValid).toBe(true);
    });
  });

  describe("GIVEN a vehicle with a wrong plate ", () => {
    it("SHOULD NOT pass through validator and returns false", () => {
      const isPlateValid = validatePlateStructure(
        wrongPlateVehicle.license_plate
      );

      expect(isPlateValid).toBe(false);
    });
  });
});
