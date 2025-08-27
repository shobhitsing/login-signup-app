import React, { useState } from "react";
import {
  Search,
  Train,
  Plane,
  User,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import pnrService, { type PNRResponse } from "../services/pnrService";
import "./PNRChecker.css";

const PNRChecker: React.FC = () => {
  const [pnr, setPnr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pnrData, setPnrData] = useState<PNRResponse | null>(null);
  const [transportType, setTransportType] = useState<"train" | "flight">(
    "train"
  );

  const checkPNRStatus = async (pnrNumber: string) => {
    setLoading(true);
    setError("");

    try {
      const data = await pnrService.checkPNRStatus(pnrNumber, transportType);
      setPnrData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch PNR status"
      );
      setPnrData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnr.trim()) {
      checkPNRStatus(pnr.trim());
    }
  };

  const resetForm = () => {
    setPnr("");
    setPnrData(null);
    setError("");
  };

  return (
    <div className="pnr-checker">
      <div className="container">
        <div className="header-section">
          <h1 className="title">
            {transportType === "train" ? (
              <Train className="title-icon" />
            ) : (
              <Plane className="title-icon" />
            )}
            PNR Status Checker
          </h1>
          <p className="subtitle">
            Check your {transportType} ticket status and passenger details
          </p>
        </div>

        <div className="transport-selector">
          <button
            className={`selector-btn ${
              transportType === "train" ? "active" : ""
            }`}
            onClick={() => setTransportType("train")}
          >
            <Train size={20} />
            Train
          </button>
          <button
            className={`selector-btn ${
              transportType === "flight" ? "active" : ""
            }`}
            onClick={() => setTransportType("flight")}
          >
            <Plane size={20} />
            Flight
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pnr-form">
          <div className="input-group">
            <label htmlFor="pnr-input">Enter PNR Number</label>
            <div className="input-wrapper">
              <input
                id="pnr-input"
                type="text"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                placeholder="Enter 10-digit PNR number"
                maxLength={10}
                pattern="[0-9]{10}"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="search-btn"
                disabled={loading || !pnr.trim()}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <Search size={20} />
                )}
                {loading ? "Checking..." : "Check Status"}
              </button>
            </div>
            <small className="input-hint">
              PNR number is a 10-digit unique identifier printed on your ticket
            </small>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {pnrData && (
          <div className="pnr-results">
            <div className="results-header">
              <h2>PNR Status Results</h2>
              <button onClick={resetForm} className="reset-btn">
                Check Another PNR
              </button>
            </div>

            <div className="journey-card">
              <h3>Journey Details</h3>
              <div className="journey-info">
                <div className="route-info">
                  <div className="station">
                    <MapPin size={20} />
                    <div>
                      <span className="label">From</span>
                      <span className="value">{pnrData.journey.from}</span>
                    </div>
                  </div>
                  <div className="route-line">
                    <div className="line"></div>
                    <div className="transport-icon">
                      {transportType === "train" ? (
                        <Train size={16} />
                      ) : (
                        <Plane size={16} />
                      )}
                    </div>
                  </div>
                  {(pnrData.journey.trainName || pnrData.journey.airline) && (
                    <div className="transport-name">
                      {pnrData.journey.trainName || pnrData.journey.airline}
                    </div>
                  )}
                  <div className="station">
                    <MapPin size={20} />
                    <div>
                      <span className="label">To</span>
                      <span className="value">{pnrData.journey.to}</span>
                    </div>
                  </div>
                </div>

                <div className="journey-details">
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(pnrData.journey.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span className="label">Departure:</span>
                    <span className="value">
                      {pnrData.journey.departureTime}
                    </span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span className="label">Arrival:</span>
                    <span className="value">{pnrData.journey.arrivalTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Class:</span>
                    <span className="value">{pnrData.journey.class}</span>
                  </div>
                  {pnrData.journey.trainNumber && (
                    <div className="detail-item">
                      <span className="label">Train No:</span>
                      <span className="value">
                        {pnrData.journey.trainNumber}
                      </span>
                    </div>
                  )}
                  {pnrData.journey.flightNumber && (
                    <div className="detail-item">
                      <span className="label">Flight No:</span>
                      <span className="value">
                        {pnrData.journey.flightNumber}
                      </span>
                    </div>
                  )}
                  {pnrData.journey.airline && (
                    <div className="detail-item">
                      <span className="label">Airline:</span>
                      <span className="value">{pnrData.journey.airline}</span>
                    </div>
                  )}
                  {pnrData.journey.quota && (
                    <div className="detail-item">
                      <span className="label">Quota:</span>
                      <span className="value">{pnrData.journey.quota}</span>
                    </div>
                  )}
                  {pnrData.journey.seatNumber && (
                    <div className="detail-item">
                      <span className="label">Seat:</span>
                      <span className="value">
                        {pnrData.journey.seatNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="passengers-card">
              <h3>Passenger Details</h3>
              <div className="passengers-list">
                {pnrData.passengers.map((passenger, index) => (
                  <div key={index} className="passenger-item">
                    <div className="passenger-header">
                      <User size={16} />
                      <span className="passenger-number">
                        Passenger {passenger.number}
                      </span>
                    </div>
                    <div className="passenger-status">
                      <div className="status-item">
                        <span className="label">Current Status:</span>
                        <span
                          className={`status ${
                            passenger.currentStatus.includes("CNF")
                              ? "confirmed"
                              : "waiting"
                          }`}
                        >
                          {passenger.currentStatus}
                        </span>
                      </div>
                      <div className="status-item">
                        <span className="label">Booking Status:</span>
                        <span
                          className={`status ${
                            passenger.bookingStatus === "Confirmed"
                              ? "confirmed"
                              : "waiting"
                          }`}
                        >
                          {passenger.bookingStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-status">
              <div className="status-indicator">
                <span className="label">Chart Status:</span>
                <span
                  className={`status ${
                    pnrData.chartPrepared ? "prepared" : "not-prepared"
                  }`}
                >
                  {pnrData.chartPrepared
                    ? "Chart Prepared"
                    : "Chart Not Prepared"}
                </span>
              </div>
              <small className="chart-hint">
                {pnrData.chartPrepared
                  ? "Final seat allocation has been done"
                  : "Seat allocation may change until chart preparation"}
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PNRChecker;
