import { Card } from "@mui/material";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";
import SuiTypography from "components/SuiTypography";

import LivestreamApi from "apis/Livestream";

const LivesteamCard = ({ data, fetchData }) => {

  const endLiveStream = () => {
    LivestreamApi.end().then(() => fetchData());
  };

  return (
    <SuiBox mt={4} pb={2} display="flex" justifyContent="start" alignItems="center">
      <Card sx={{ height: "100%", minWidth: "100%", paddingX: 4, paddingY: 2 }}>
        <SuiBox>
          <SuiBox pt={2}>
            <SuiTypography variant="h5" fontWeight="medium" textTransform="capitalize">
              Live Stream
            </SuiTypography>
          </SuiBox>
          <SuiBox display="flex" alignItems="center" py={1} mb={1}>
            <SuiBox mr={2}>
              <SuiAvatar src={data?.thumbnail ?? "https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg"} size="xl" variant="rounded" style={{ objectFit: 'cover' }} alt="something here" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
              <SuiTypography variant="button" fontWeight="medium">
                {data?.title ?? ""}
              </SuiTypography>
              <SuiTypography variant="overline" color="text">
                {data?.url ?? ""}
              </SuiTypography>
              <SuiTypography variant="caption" color="text">
                {data?.description ?? ""}
              </SuiTypography>
            </SuiBox>

            <SuiBox ml="auto" />
          </SuiBox>
        </SuiBox>
        <SuiBox display="flex" justifyContent="flex-end" mt={2}>
          <SuiButton
            ml={1}
            size="small"
            color="error"
            onClick={() => endLiveStream()}
          >
            End Stream
          </SuiButton>
        </SuiBox>
      </Card>
    </SuiBox >
  );
};

export default LivesteamCard;