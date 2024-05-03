import React from "react";
import Text from "../Typography/Typography";
import Switch from "../forms/switch";

const NotificationSettingItem = ({ title, subTitle, check, onChange }) => {
  return (
    <div className="flex item-center justify-between">
      <div>
        <Text color="font-medium mb-2" variant="body">
          {title}
        </Text>
        <Text color="font-normal not-italic text-NEUTRAL-_500" variant="small">
          {subTitle}
        </Text>
      </div>
      <Switch check={check || false} onChange={onChange}/>
    </div>
  );
};

export default NotificationSettingItem;
