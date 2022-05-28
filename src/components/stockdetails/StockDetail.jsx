import React, { useEffect, useState } from "react";
import { getStockDetails } from "../../api/ApiRequest";
import DetailTable from "../detailtable/DetailTable";

const StockDetail = (props) => {
  const { selectedStock } = props;

  const [selectedStockDetails, setSelectedStockDetails] = useState(null);

  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        setApiError("");
        const resp = await getStockDetails(selectedStock);
        if (resp?.["Error Message"] || resp?.["Note"]) {
          const errorMessage = resp?.["Error Message"] || resp?.["Note"];
          // clear old search and throw the error..
          setSelectedStockDetails(null);
          throw new Error(errorMessage);
        }
        setSelectedStockDetails(resp);
      } catch (e) {
        setApiError(e.message);
        console.error("Something went wrong", e);
      } finally {
        setLoading(false);
      }
    };

    selectedStock && getDetail();
  }, [selectedStock]);

  return (
    <div>
      {apiError && <div className="error">{apiError}</div>}
      {loading ? (
        <div className="loader"> Loading Stock Detail...</div>
      ) : (
        <>
          {/**<div>{JSON.stringify(selectedStockDetails)}</div> */}

          {selectedStockDetails && (
            <DetailTable stockDetail={selectedStockDetails} />
          )}
        </>
      )}
    </div>
  );
};
export default StockDetail;
