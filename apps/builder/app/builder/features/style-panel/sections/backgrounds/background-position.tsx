import { keywordValues, propertyDescriptions } from "@webstudio-is/css-data";
import { Flex, Grid, PositionGrid } from "@webstudio-is/design-system";
import {
  getStyleSource,
  type StyleInfo,
  type StyleValueInfo,
} from "../../shared/style-info";
import { CssValueInputContainer } from "../../shared/css-value-input";
import type { DeleteProperty, SetProperty } from "../../shared/use-style-data";
import { useMemo } from "react";
import { PropertyInlineLabel } from "../../property-label";

const keyworkToValue: Record<string, number> = {
  left: 0,
  right: 100,
  center: 50,
  top: 0,
  bottom: 100,
};

const calculateBackgroundPosition = (info: StyleValueInfo | undefined) => {
  if (info?.value.type === "unit") {
    return info.value.value;
  }

  if (info?.value.type === "keyword") {
    return keyworkToValue[info.value.value];
  }

  return 0;
};

export const BackgroundPosition = ({
  currentStyle,
  setProperty,
  deleteProperty,
}: {
  currentStyle: StyleInfo;
  setProperty: SetProperty;
  deleteProperty: DeleteProperty;
}) => {
  const xInfo = currentStyle.backgroundPositionX;
  const yInfo = currentStyle.backgroundPositionY;
  const x = useMemo(() => calculateBackgroundPosition(xInfo), [xInfo]);
  const y = useMemo(() => calculateBackgroundPosition(yInfo), [yInfo]);

  return (
    <Flex direction="column" gap="1">
      <PropertyInlineLabel
        label="Position"
        description={propertyDescriptions.backgroundPosition}
        properties={["backgroundPositionX", "backgroundPositionY"]}
      />
      <Flex gap="6">
        <PositionGrid
          selectedPosition={{ x, y }}
          onSelect={({ x, y }) => {
            setProperty("backgroundPositionX")({
              type: "unit",
              value: x,
              unit: "%",
            });
            setProperty("backgroundPositionY")({
              type: "unit",
              value: y,
              unit: "%",
            });
          }}
        />
        <Grid
          css={{ gridTemplateColumns: "max-content 1fr" }}
          align="center"
          gapX="2"
        >
          <PropertyInlineLabel
            label="Left"
            description="Left position offset"
            properties={["backgroundPositionX"]}
          />
          <CssValueInputContainer
            property="backgroundPositionX"
            styleSource={getStyleSource(xInfo)}
            keywords={keywordValues.backgroundPositionX.map((value) => ({
              type: "keyword",
              value,
            }))}
            value={xInfo?.value}
            setValue={setProperty("backgroundPositionX")}
            deleteProperty={deleteProperty}
          />
          <PropertyInlineLabel
            label="Top"
            description="Top position offset"
            properties={["backgroundPositionY"]}
          />
          <CssValueInputContainer
            property="backgroundPositionY"
            styleSource={getStyleSource(yInfo)}
            keywords={keywordValues.backgroundPositionY.map((value) => ({
              type: "keyword",
              value,
            }))}
            value={yInfo?.value}
            setValue={setProperty("backgroundPositionY")}
            deleteProperty={deleteProperty}
          />
        </Grid>
      </Flex>
    </Flex>
  );
};
