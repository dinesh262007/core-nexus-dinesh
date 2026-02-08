import orb1 from "@/assets/3d-orb-1.png";
import { useNavigate } from "react-router-dom";

const inputStyle = `
  bg-[#161616]
  border-[#0F0F0F]
  text-[#efefef]
  w-full
  focus:outline-none
  focus:ring-0
  focus:border-[#484848]
`;

const GoToAudition = () => {
  const navigate = useNavigate();
  const handleApplyRedirect = () => {
    navigate("/apply");
  };
  return (
    <section id="auditions" className="py-24 bg-[#0F0F0F] relative">
  <img
    src={orb1}
    alt=""
    className="absolute inset-0 m-auto w-[600px] h-[600px] blur-2xl opacity-20"
  />

  <div className="relative z-10 text-center">
    <h2 className="text-4xl font-semibold text-white mb-6">
      CCA Auditions 2026
    </h2>

    <button
      onClick={handleApplyRedirect}
      className="
        px-8 py-3
        rounded-xl
        transition-all duration-300
        font-medium
      "
    >
      Apply Now
    </button>
  </div>
</section>

  );
};

export default GoToAudition;
