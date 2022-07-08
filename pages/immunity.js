import styles from '../styles/App.module.css'

export default function Home() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand">Sock Wars</a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Immunities</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/target">Target</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/elimpage">Report Elimination</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Leaderboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rules">Rules</a>
                        </li>
                    </ul>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                </div>
            </nav>
            
            <h1 className={styles.h1}>SOCK WARS</h1>

            <h2 className={styles.h2}>Today's Immunity: <br /> Wear 2 Different Color Socks!</h2>
            <table className={styles.table2}>
                <tr className={styles.trh2}>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Past Immunity</th>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>03/19/2022</td>
                    <td className={styles.td}>Wear a green shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/14/2022</td>
                    <td className={styles.td}>Wear a bagel around your neck on a string!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/09/2022</td>
                    <td className={styles.td}>Wear a pink shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>02/01/2022</td>
                    <td className={styles.td}>Wear a yellow shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>01/19/2022</td>
                    <td className={styles.td}>Wear a blue shirt!</td>
                </tr>
                <tr className={styles.tr2}>
                    <td className={styles.td}>01/08/2022</td>
                    <td className={styles.td}>Wear a red shirt!</td>
                </tr>
            </table>
        </div>
    )
}