import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailsFixedFraction from "./DetailsFixedFraction";
import DetailsAuctionFraction from "./DetailsAuctionFraction";
import { ofcDesk } from "../utils/images.util";
import { useTranslation } from "react-i18next";

const DetailsFraction = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  function fetchItem() {
    axios
      .get(`/api/fraction-detail/${id}`)
      .then((res) => {
        setItem(res.data.fraction);
      })
      .catch((err) => {
        setItem(null);
      });
  }
  useEffect(() => {
    if (!item) {
      fetchItem();
    }
  }, [item]);

  return (
    <>
      {!item && (
        <section className="mt-4 mb-4">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8 text-center">
              <img src={ofcDesk} className="img-fluid" alt="" />
              <div className="content">
                <h5 className="mb-4">No Item</h5>
                <p className="text-muted">
                  Occurs when there is nothing to show. This can happen if
                  someone performs a search and the query is empty or there
                  isn’t data available to show (when filtering for a date-range
                  that has no data for example)
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {item && item.flag && <DetailsAuctionFraction item={item} />}
      {item && !item.flag && <DetailsFixedFraction item={item} />}
    </>
  );
};

export default DetailsFraction;
