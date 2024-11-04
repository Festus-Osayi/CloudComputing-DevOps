import { PulseLoader } from "react-spinners";
function Spinners({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <PulseLoader color="#1E3A8A" speedMultiplier={2} />
      </div>
    );
  }
  return <PulseLoader color="#1E3A8A" speedMultiplier={2} />;
}

export default Spinners;
