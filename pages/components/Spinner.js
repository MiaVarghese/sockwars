export default function Spinner() {
    return (
      <div className="mt-5" style={{margin: "auto", width: "fit-content"}}>
        <div className="spinner-border text-warning text-center" style={{margin: "auto"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
}