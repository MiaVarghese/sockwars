import Link from "next/link";

export default function Pagination(props) {

    const { numItems, perPage, getItems } = props;

    function getPages() {
        var pages = [];
        var totPages = Math.ceil(numItems/perPage);
        for (var i=1; i<=totPages; i++) {
            if (props.type=="modal") {
                pages.push(<li key={i} className={"page-item" + (props.page==i ? " active" : "") }>
                    <button onClick={()=>getItems(i)} className="page-link" disabled={props.page==i}>{i}</button>
                </li>);
            } else {
                pages.push(<li key={i} className={"page-item" + (props.page==i ? " active" : "") }>
                <Link href={{ pathname: '/notifications', query: { page: i } }}>
                    <a className="page-link" href="#">{i}</a>
                </Link></li>);
            }
        }
        return pages;
    }

    return (
        <nav>
            {Math.ceil(numItems/perPage) <= 1 ?
            ""
            :
            <ul className="pagination">

                <li className="page-item">
                    {props.type!=="modal" ?
                        <Link href={{pathname: "/notifications", query: {page: props.page-1}}}>
                            <button className="page-link" disabled={props.page==1}>&laquo;</button>
                        </Link>
                    :
                        <button className="page-link" onClick={()=>getItems(props.page-1)} disabled={props.page==1}>&laquo;</button>
                    }
                </li>

                {getPages()}

                <li className="page-item">
                    {props.type!=="modal" ?
                        <Link href={{pathname: "/notifications", query: {page: parseInt(props.page)+1}}}>
                            <button className="page-link" disabled={props.page==Math.ceil(numItems/perPage)}>&raquo;</button>
                        </Link>
                    :
                        <button className="page-link" onClick={()=>getItems(props.page+1)} disabled={props.page==Math.ceil(numItems/perPage)}>&raquo;</button>
                    }
                </li>
            </ul>
            }
        </nav>
    )
}