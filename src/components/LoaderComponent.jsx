import "../css/toast.css";
function LoaderComponent() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <span className="spinner"></span>
    </div>
  );
}

export default LoaderComponent;
