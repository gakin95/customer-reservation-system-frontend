const CustomSelect = ({
  values,
  onValueChange,
  selectedValue,
  className,
  labelName,
  ...rest
}) => {
  return (
    <div
      className="relative top-0 left-0 w-full flex justify-center items-center border border-NEUTRAL-_500 rounded bg-UPLOAD_COLOR"
      style={{ height: "52px" }}
    >
      <select className="pl-4 outline-none w-full bg-UPLOAD_COLOR" {...rest}>
        <option
          value=""
          // defaultValue
          disabled
          className="font-normal text-sm pl-4 text-red-600"
        >
          {labelName}
        </option>
        {values.map((name, id) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
