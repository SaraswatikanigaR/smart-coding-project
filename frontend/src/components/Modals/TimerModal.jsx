import React, { useState, useEffect } from "react";

function TimerModal({ onClose }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (!running && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>⏱ Practice Timer</h2>
        <p>Time spent: {formatTime(seconds)}</p>
        <div style={styles.controls}>
          <button onClick={() => setRunning(!running)} style={styles.button}>
            {running ? "Pause" : "Resume"}
          </button>
          <button onClick={onClose} style={styles.button}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    minWidth: "300px",
    textAlign: "center",
  },
  controls: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
  },
};

export default TimerModal;