import React from 'react';
import Text from "../../../../components/Typography/Typography";

const AssetSummary = ({value,label}) => {
    return (
        <div className="flex items-center justify-between">
            <Text variant="h4" color="font-normal text-TITLE">
              {label}
            </Text>
            <Text variant="h4" color="font-normal">
              {value}
            </Text>
        </div>
    )
}

export default AssetSummary
