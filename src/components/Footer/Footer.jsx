import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
export default function Footer() {
  return (
    <div>
      <footer>
        <div class="footer_container">
          {/* <Link>  */}
            <div class="footer_column">
              <Logo />
            </div>
          {/* </Link> */}
          <div class="footer_column">
            <h3>ONLINE SHOPPING</h3>

            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>

          </div>

          <div class="footer_column">
            <h3>ONLINE SHOPPING</h3>

            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>

          </div>

          <div class="footer_column">
            <h3>ONLINE SHOPPING</h3>

            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>

          </div>
        </div>
        <hr />

        <div class="copyright">
          © 2023 www.AuraMall.com. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
