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
                            <a class="nav-link" href="/immunity">Immunities</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/target">Target</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Report Elimination</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Leaderboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Rules</a>
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

            <h2 className={styles.h2}>RULES</h2>

            <div className={styles.rulesContainer}>
                <div className={styles.p}>
                    1. Each player has a secret “target” which they must eliminate through tagging them with a sock.<br />
                    <br />
                    2. Players cannot tag another player who is following the “immunity” for that day (can be checked through the “Immunity” tab).<br />
                    <br />
                    3. If a player eliminated their target, they inherit the eliminated player’s target.<br />
                    <br />
                    4. When a player is eliminated, both the eliminated player and the eliminator need to confirm the elimination on this website.
                </div>
            </div>

            <div className={styles.startContainer}>
                <p className={styles.a}>
                    START
                </p>
            </div>

        </div>
    )
}