import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/App.module.css";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function App() {
  const [APIdata, setAPIdata] = useState([]);
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
              

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/fe557b31-4e38-489c-81db-d048fb75d6d8")
      .then((incomingData) => {
        setAPIdata(incomingData.data);
      });
  }, []);

  return (
    <><>
      <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Sock Wars</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor'
            aria-controls='navbarColor'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColorSecond} navbar id='navbarColor'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' disabled href='#'>
                Leaderboard
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/target'>Target</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/confirmelim'>Confirm Elimination</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/immunity'>Immunity</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/rules'>Rules</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/registrationpage'>Register</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link'>
                    User
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBDropdownLink href='/profile'>Profile</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBDropdownLink href='/settings'>Settings</MDBDropdownLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </><div>
        <h1 className={styles.h1}>SOCK WARS</h1>
        <h3 className={styles.h3}>
          Today's Immunity: Wear 2 Different Color Socks!
        </h3>
        <h2 className={styles.h2}>LEADERBOARD</h2>

        <table className={styles.table}>
          <tr className={styles.trh}>
            <th className={styles.th}>Rank</th>
            <th className={styles.th}>Player</th>
            <th className={styles.th}>Number Eliminated</th>
          </tr>

          {APIdata.map((data) => {
            return (
              <tr className={styles.tr}>
                <td className={styles.td}>{data.Rank}</td>
                <td className={styles.td}>{data.Player}</td>
                <td className={styles.td}>{data.NumberEliminated}</td>
              </tr>
            );
          })}
        </table>

        <table className={styles.table2}>
          <tr className={styles.trh2}>
            <th className={styles.th}>Eliminated Players</th>
            <th className={styles.th}>Date Eliminated</th>
          </tr>
          {APIdata.map((data) => {
            return (
              <tr className={styles.tr2}>
                <td className={styles.td}>{data.EliminatedPlayer}</td>
                <td className={styles.td}>{data.EliminationDate}</td>
              </tr>
            );
          })}
        </table>
      </div></>
  );
}
