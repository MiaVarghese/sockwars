export default function LoadButton(props) {
    const { btnLoading, children, ...rest } = props;
    
    return (
        <div className="text-center">
            <button {...rest} style={{position: "relative"}}>
                {children}
                { btnLoading ?
                    <div style={{position: "absolute", left: "30%", top: "5%"}} className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <div></div>
                }
            </button>
        </div>
    )
}