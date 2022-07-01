function NavBar(props) {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" >
            <a class="navbar-brand px-5">Sock Wars</a>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link px-3 active" href="#">Home</a>
                    <a class="nav-item nav-link px-3" href="#">Features</a>
                    <a class="nav-item nav-link px-3" href="#">Pricing</a>
                    <a class="nav-item nav-link px-3 disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;