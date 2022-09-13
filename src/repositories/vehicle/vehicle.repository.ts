import VEHICLES_DATA from "../../fixtures/vehicles-data.fixture";
import { VehicleRepositoryInterface } from "./vehicle.types";

import Vehicle from "../../models/vehicle";
import validatePlateSumUsecase from "../../usecase/validate-plate-sum.usecase";
import validatePlateStructureUsecase from "../../usecase/validate-plate-structure.usecase";

import VehicleAlreadyExists from "./exceptions/vehicle-already-exists.error";
import VehicleChassisInvalid from "./exceptions/vehicle-chassis-invalid.error";
import VehiclePlateSumInvalid from "./exceptions/vehicle-plate-sum-invalid.error";
import VehiclePlateStructureInvalid from "./exceptions/vehicle-plate-structure-invalid.error";
import ExternalApiService from "../../services/external-api/external-api.service";

class VehicleRepository implements VehicleRepositoryInterface {
  private state: Vehicle[];

  constructor(initialState = []) {
    this.state = initialState || VEHICLES_DATA;
  }

  async validateVehicle(entity: Vehicle) {
    const hasVehicleWithSameId = this.state.find(
      (vehicle) => vehicle.id == entity.id
    );

    if (hasVehicleWithSameId) throw new VehicleAlreadyExists();

    const vehicleLicensePlate = entity.license_plate;

    const isVehiclePlateStructureValid =
      validatePlateStructureUsecase(vehicleLicensePlate);

    if (!isVehiclePlateStructureValid) {
      throw new VehiclePlateStructureInvalid();
    }

    const isVehiclePlateSumValid = validatePlateSumUsecase(vehicleLicensePlate);

    if (!isVehiclePlateSumValid) {
      throw new VehiclePlateSumInvalid();
    }

    const isVehicleChassisValid =
      await ExternalApiService.validateVehicleChassis(entity.chassis);

    if (!isVehicleChassisValid) {
      throw new VehicleChassisInvalid();
    }

    return true;
  }

  async create(entity: Vehicle) {
    const isVehicleValid = await this.validateVehicle(entity);

    if (isVehicleValid) {
      this.state.push(entity);
    }

    return entity;
  }

  findById(id: string): Vehicle | null {
    return this.state.find((vehicle) => vehicle.id == id) || null;
  }

  update(entity: Vehicle): Vehicle | null {
    this.state = this.state.map((vehicle) => {
      if (vehicle.id == entity.id) {
        return entity;
      }
      return vehicle;
    });

    return this.state.find((vehicle) => vehicle.id == entity.id) || null;
  }
}

export default VehicleRepository;
