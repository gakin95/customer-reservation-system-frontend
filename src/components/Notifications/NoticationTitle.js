import Text from "../Typography/Typography"

const NoticationTitle = ({NotificationIcon,title}) => {
    return (
        <div className="flex item-center">
          <img src={NotificationIcon} alt="NotificationIcon" className="mr-3"/>
          <Text variant="h3" color="font-medium">
          {title}
          </Text>
        </div>
    )
}

export default NoticationTitle
