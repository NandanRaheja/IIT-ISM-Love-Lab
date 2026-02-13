const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#57534E]">Question {current} of {total}</span>
        <span className="text-xs font-bold text-[#E11D48]">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-[#FFE4E6] overflow-hidden rounded-full shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#E11D48] to-[#BE123C] transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;