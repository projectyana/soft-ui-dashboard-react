/* eslint-disable */
import { Card } from "@mui/material";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiAvatar from "components/SuiAvatar";
import SuiTypography from "components/SuiTypography";

import LivestreamApi from "apis/Livestream";
import getRolePermissions from "utils/getRolePermissions";

const LivesteamCard = ({ data, setData, fetchData, fetchHistory }) => {
  const { isAllowWrite } = getRolePermissions();

  const endLiveStream = () => {
    LivestreamApi.end()
      .then(() => setData({}))
      .then(() => fetchData())
      .then(() => fetchHistory());
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
          <SuiBox alignItems="center" py={1} mb={1}>
            <SuiBox mb={2} mr={2}>
              {data?.embed_html
                ? <div dangerouslySetInnerHTML={{ __html: data?.embed_html }} />
                : <SuiAvatar src={data?.thumbnail ?? "https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg"} size="xl" shadow="sm" variant="circle" style={{ objectFit: 'cover' }} alt="livestream" />
              }
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
          {isAllowWrite && (
            <SuiButton
              ml={1}
              size="small"
              color="error"
              onClick={() => endLiveStream()}
            >
              End Stream
            </SuiButton>
          )}
        </SuiBox>
      </Card>
    </SuiBox >
  );
};

export default LivesteamCard;