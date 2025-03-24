import PendingTrips from "./PendingTrips";
import ConfirmedTrips from "./ConfirmedTrips";
import DeclinedTrips from "./DeclinedTrips";
import CancelledTrips from "./CancelledTrips";
import PastTrips from "./PastTrips";

const Trips = () => {
  return (
    <>
      <PendingTrips />
      <ConfirmedTrips />
      <DeclinedTrips />
      <CancelledTrips />
      <PastTrips />
    </>
  );
};

export default Trips;
