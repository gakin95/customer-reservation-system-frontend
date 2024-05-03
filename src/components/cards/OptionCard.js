import Text from "../Typography/Typography";

const OptionCard = ({ method, showCheckBox, message, className, textStyle, checked, onClick}) => {
  return (
    <div className={`border border-BUTTON_FILLED p-5 rounded-md mb-4 max-w-xl ${className ? className : ''}`} onClick={onClick}>
      <div className="flex items-center">
        {showCheckBox && <input type="radio" className="mr-3" checked={checked}/>}
        <Text variant="h4" color="font-medium text-NEUTRAL-_700">
          {method}
        </Text>
      </div>
      <Text variant="body"  color={`font-normal ${showCheckBox ? 'pl-6' : ''} pt-2 text-NEUTRAL-_500 max-w-md not-italic self-stretch ${textStyle ? textStyle : ''}`}>
       {message}
      </Text>
    </div>
  );
};

export { OptionCard };
