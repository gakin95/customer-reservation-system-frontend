import { Skeleton, Box } from "@mui/material";

const Loading = () => {
    return (
        <Box>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
    )
}

export default Loading
