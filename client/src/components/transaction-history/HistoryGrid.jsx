import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { createTheme, darken, lighten } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import "./HistoryGrid.scss";

const getThemePaletteMode = function (palette) {
  return palette.type || palette.mode;
};

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => {
    const getBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.6)
        : lighten(color, 0.6);

    const getHoverBackgroundColor = (color) =>
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.5)
        : lighten(color, 0.5);

    return {
      root: {
        "& .super-app-theme--Open": {
          backgroundColor: getBackgroundColor(theme.palette.info.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
          },
        },
        "& .super-app-theme--Filled": {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main
            ),
          },
        },
        "& .super-app-theme--PartiallyFilled": {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.warning.main
            ),
          },
        },
        "& .super-app-theme--Rejected": {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          "&:hover": {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    };
  },
  { defaultTheme }
);

export default function StylingRowsGrid() {
  const classes = useStyles();

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 50,
  });

  return (
    <div>
      <h1 className="history-title">Order History</h1>
      <div style={{ height: 800, width: "100%" }} className={classes.root}>
        <DataGrid
          {...data}
          getRowClassName={(params) =>
            `super-app-theme--${params.getValue(params.id, "status")}`
          }
        />
      </div>
      <footer className="history-footer">this is a footer</footer>
    </div>
  );
}
