import Vehicle from "../../models/vehicle";
import VehicleRepository from "../../repositories/vehicle/vehicle.repository";

export default function arrangeTestContext() {
  const wrongChassisVehicle = new Vehicle(
    "1",
    "BMW",
    "white sedan",
    "blue",
    "di139s9a83j2fdsHONDA",
    "EST4440",
    1231
  );

  const correctDataVehicle = new Vehicle(
    "1",
    "BMW",
    "white sedan",
    "blue",
    "di139s9a83j2fds",
    "EST6600",
    1231
  );

  const vehicleRepository = new VehicleRepository();

  return {
    wrongChassisVehicle,
    correctDataVehicle,
    vehicleRepository,
  };
}
