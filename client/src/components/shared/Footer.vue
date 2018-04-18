<template>
  <div class="footer">
    <div class="footer-row">
      <div class="column links-column">
        <div class="links">
          <a href="/">
            <p>Home</p>
          </a>
          <a href="/about-us">
            <p>About Us</p>
          </a>
          <a href="/contact">
            <p>Contact Us</p>
          </a>
          <a href="/terms-of-service">
            <p>Terms of Service</p>
          </a>
        </div>
      </div>
      <div class="column">
        <img src="../../assets/icons/logo4.png">
      </div>
      <div class="column">
        <div class="contacts">
          <p>(452) 305 3129</p>
          <p>joel@finnishboy.com</p>
          <div class="icons">
            <a href="#">
              <i class="fab fa-facebook-square"></i>
            </a>
            <a href="#">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/nghitrum/reeny">
              <i class="fab fa-github-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <p>&copy; 2018 Reeny</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
  margin: 0 0 0.9em 0;
}

p {
  margin: 0 0 0.9em 0;
}

.links p {
  margin: 0 0 0.5em 0;
}

.icons a {
  display: inline-block;
  padding-top: 1%;
  color: white;
  font-size: 2em;
}

.links-column {
  text-align: center;
}

img {
  margin-top: 5%;
  height: 2.8em;
  width: auto;
}

.contacts {
  margin-top: 3%;
}

.links {
  margin-top: 3%;
  display: inline-block;
  text-align: left;
}

.links a {
  color: white;
}

a:hover {
  color: rgb(221, 221, 221);
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  width: 33.33%;
  padding: 0.5%;
}

/* Clear floats after the columns */
.footer-row:after {
  content: '';
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
  .links {
    text-align: center;
  }
}
</style>
