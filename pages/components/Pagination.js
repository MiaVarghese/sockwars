import Link from "next/link";

export default function Pagination(props) {

    function getPages() {
        var pages = [];
        var totPages = Math.ceil(props.numNotifs/props.perPage);
        for (var i=1; i<=totPages; i++) {
            pages.push(<li key={i} className={"page-item" + (props.page==i ? " active" : "") }>
                        <Link href={{ pathname: '/notifications', query: { page: i } }}>
                            <a className="page-link" href="#">{i}</a>
                        </Link></li>);
        }
        return pages;
    }

    return (
        <nav>
            {Math.ceil(props.numNotifs/props.perPage) <= 1 ?
            ""
            :
            <ul className="pagination">
                <li className="page-item">
                    <Link href={{pathname: "/notifications", query: {page: props.page-1}}}>
                        <button className="page-link" disabled={props.page==1}>&laquo;</button>
                    </Link>
                </li>

                {getPages()}

                <li className="page-item">
                    <Link href={{pathname: "/notifications", query: {page: parseInt(props.page)+1}}}>
                        <button className="page-link" disabled={props.page==Math.ceil(props.numNotifs/props.perPage)}>&raquo;</button>
                    </Link>
                </li>
            </ul>
            }
        </nav>
    )
}