const HeroRecicler = ({title="",subtitle=""}) => {
  return (
    <div className="flex justify-center items-center w-full h-[200px] bg-[#1E0437] rounded-bl-[40px] rounded-br-[40px]">
      <div className="flex flex-col items-center gap-1">
        <h3 className="bg-gradient-to-r font-bold font-inter text-3xl bg-clip-text from-[#B80AB5] to-[#E18708] text-transparent">
          {title}
        </h3>
        <h2 className="text-white font-bold font-inter text-[18px]">
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

export default HeroRecicler;
