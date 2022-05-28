import React from "react";
import { isEmptyObject } from "../../utils/apputils";

import classes from "./detailtable.module.scss";

const DetailTable = (props) => {
  const { stockDetail } = props;

  return (
    <div className={classes.detailBox}>
      {isEmptyObject(stockDetail) ? (
        <div className="error">Oops .. No Stock detail Found</div>
      ) : (
        <>
          {stockDetail?.Symbol && (
            <div className={classes.row}>
              <div>Symbol : </div>
              <div> {stockDetail.Symbol} </div>
            </div>
          )}

          {stockDetail?.Name && (
            <div className={classes.row}>
              <div>Name : </div>
              <div> {stockDetail.Name} </div>
            </div>
          )}

          {stockDetail?.Description && (
            <div className={classes.row}>
              <div>Description : </div>
              <div> {stockDetail.Description} </div>
            </div>
          )}

          {stockDetail?.Exchange && (
            <div className={classes.row}>
              <div>Exchange : </div>
              <div> {stockDetail.Exchange} </div>
            </div>
          )}

          {stockDetail?.Industry && (
            <div className={classes.row}>
              <div>Industry : </div>
              <div> {stockDetail.Industry} </div>
            </div>
          )}

          {stockDetail?.PERatio && (
            <div className={classes.row}>
              <div>PE Ratio : </div>
              <div> {stockDetail.PERatio} </div>
            </div>
          )}

          {stockDetail?.MarketCapitalization && (
            <div className={classes.row}>
              <div>Market Capitalization : </div>
              <div> {stockDetail.MarketCapitalization} </div>
            </div>
          )}

          {stockDetail?.BookValue && (
            <div className={classes.row}>
              <div>BookValue : </div>
              <div> {stockDetail.BookValue} </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailTable;
