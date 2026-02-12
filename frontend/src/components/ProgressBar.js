const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden rounded-full mb-6">
      <div
        className="h-full bg-[#E11D48] transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;