<template>
  <div class="footer">
    <div class="row">
      <div class="column links-column">
        <div class="links">
          <a href="#">
            <p>Home</p>
          </a>
          <a href="#">
            <p>About Us</p>
          </a>
          <a href="#">
            <p>Contact Us</p>
          </a>
          <a href="#">
            <p>Terms of Service</p>
          </a>
        </div>
      </div>
      <div class="column">
        <img src="../../assets/logo4.png">
      </div>
      <div class="column">
        <div class="contacts">
          <p>(452) 305 3129</p>
          <p>joel@finnishboy.com</p>
          <div class="icons">
            <a href="#">
              <i class="big facebook square icon"></i>
            </a>
            <a href="#">
              <i class="big linkedin icon"></i>
            </a>
            <a href="https://github.com/nghitrum/reeny">
              <i class="big github square icon"></i>
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
  margin: 0 0 20px 0;
}

p {
  margin: 0 0 20px 0;
}

.links p {
  margin: 0 0 10px 0;
}

.icons a {
  display: inline-block;
  padding-top: 1%;
  color: white;
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
.row:after {
  content: '';
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
