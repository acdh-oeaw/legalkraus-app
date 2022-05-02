<template>
  <main>
    <b-container class="no-grid-col-container">
      
           <b-jumbotron class="p-0">
          <b-carousel
            id="carousel"
            :interval="4000"
            controls
            img-width="1024"
            img-height="380"
            style="text-shadow: 1px 1px 2px #333;"
          >
             <!-- Text slides with image -->
            <b-carousel-slide
              caption=""
              text=""
            ><template #img>
              
              
                <img 
                
                  class="d-block  img-fluid w-75 mx-auto"
                  width="1024"
                  height="380"
                  :src="`${publicPath}slider1.png`"
                  alt="image slot"
                >
              </template></b-carousel-slide>
              <b-carousel-slide
              caption=""
              text=""
            ><template #img>
              
              
                <img 
                
                  class="d-block  img-fluid w-75 mx-auto"
                  width="1024"
                  height="380"
                  :src="`${publicPath}slider2.PNG`"
                  alt="image slot"
                >
              </template></b-carousel-slide>
              <b-carousel-slide
              caption=""
              text=""
            ><template #img>
              
              
                <img 
                
                  class="d-block  img-fluid w-75 mx-auto"
                  width="1024"
                  height="380"
                  :src="`${publicPath}slider3.PNG`"
                  alt="image slot"
                >
              </template></b-carousel-slide>
<!--
            <!- - Slides with custom text - ->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
              <h1>Hello world!</h1>
            </b-carousel-slide>

            <!- - Slides with image only - ->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

            <!- - Slides with img slot - ->
            <!- - Note the classes .d-block and .img-fluid to prevent browser default image alignment - ->
            <b-carousel-slide>
              <template #img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="https://picsum.photos/1024/480/?image=55"
                  alt="image slot"
                >
              </template>
            </b-carousel-slide>

            <!- - Slide with blank fluid image to maintain slide aspect ratio - ->
            <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
              </p>
            </b-carousel-slide> -->
          </b-carousel>
          <b-row class="mx-0"><div class="primary-dark text-right jumbotron-text-left semibold pt-3 pb-2 pr-2">Oskar Samek</div><div class="jumbotron-right-left pt-3 pb-2 pl-2"> <small>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</small></div></b-row>
           </b-jumbotron>
           <b-row class="mx-0 my-5">
             <h4 class="font-weight-bold">Mögliche Einstiege</h4>
             </b-row>
      <b-row class="justify-content-between">
        <b-col>
            <router-link to="/handapparat/oskar-samek">
              <figure class="mx-auto">
                <figcaption class="semibold text-left mb-1">Oskar Samek</figcaption>
                <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
                <figcaption></figcaption>
              </figure>
            </router-link>
        </b-col>
        <b-col>
            <router-link to="/visualisierungen/fallstatistik">
              <figure class="mx-auto">
                <figcaption class="semibold text-left mb-1">Fallstatistik</figcaption>
                <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
                <figcaption></figcaption>
              </figure>
            </router-link>
        </b-col>
            <b-col>
            <router-link to="/handapparat/beitraege">
              <figure class="mx-auto">
                <figcaption class="semibold text-left mb-1">Beiträge</figcaption>
                <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
                <figcaption></figcaption>
              </figure>
            </router-link>
        </b-col>
        <b-col>
            <router-link to="/akten-edition/kultur/verlage/collections">
              <figure class="mx-auto">
                <figcaption class="semibold text-left mb-1">Verlage</figcaption>
                <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
                <figcaption></figcaption>
              </figure>
            </router-link>
        </b-col>
        <b-col>
            <router-link to="/akten-edition/politik/sozialdemokratie/collections">
              <figure class="mx-auto">
                <figcaption class="semibold text-left mb-1">Sozialdemokratie</figcaption>
                <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
                <figcaption></figcaption>
              </figure>
            </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr class="horizontal mt-5 mb-3"/>
          <div>
            <div class="mt-3 text-left">
              <p class="semibold"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--primary-red)"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg><span class="align-bottom">700 Vorlesungen von Karl Kraus</span></p>
              <p>Text</p>
              <p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--primary-red)" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              <a class="url" href="https://www.kraus.wienbibliothek.at/der-vorleser" target="_blank">https://www.kraus.wienbibliothek.at/der-vorleser</a></p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  name: "Main",
  data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
};
</script>

<style scoped>

.jumbotron {
  background: var(--primary-red);
  border-radius: 0;
  position: relative;
  color:white;
}

.jumbotron-text-left {
  width:40.3% !important;
}

.jumbotron-right-left {
  width:47% !important;
}

.jumbotron::before {
  top:0;
  right:0;
  content: "";
  background: var(--primary-red-dark);
  position:absolute;
  width:20rem;
  height:5rem;
}



#carousel, .carousel-item {
  background:transparent !important;
}

.primary-dark {
  background: var(--primary-red-dark);
}


/*main {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 7rem auto auto auto auto auto;
  font-family: "Open Sans", sans-serif !important;
}*/

.slidergrid {
   display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 7rem auto auto auto auto auto;
}

.grid-item-1 {
  grid-column: 1/2;
  grid-row: 1/3;
  background-color: var(--primary-red);
}

.grid-item-2 {
  grid-column: 2/4;
  grid-row: 1/3;
}

.slider {
  width: -moz-available;
  border-top: 5px solid var(--primary-red);
}

.grid-item-3 {
  grid-column: 4/5;
  grid-row: 1/2;
  background-color: var(--primary-red-dark);
}

.grid-item-4 {
  grid-column: 1/3;
  grid-row: 3/4;
  background-color: var(--primary-red-dark);
  color: var(--text-white);
}

.grid-item-5 {
  grid-column: 4/5;
  grid-row: 2/4;
  background-color: var(--primary-red);
}

.grid-item-6 {
  grid-column: 3/4;
  grid-row: 3/4;
  background-color: var(--primary-red);
  color: var(--text-white);
}

.grid-item-7 {
  grid-column: 2/4;
  grid-row: 4/5;
  font-weight: 800;
  padding-top: 2rem;
}

.grid-item-8 {
  grid-column: 2/4;
  grid-row: 5/6;
  padding-top: 2rem;
  display: inline flex;
  justify-content: space-between;
  border-bottom: 0.2rem solid var(--primary-red);
}

.einstieg {
  width: 8rem;
  border: solid var(--primary-red) 0.8rem;
}

.einstieg:hover {
  border: solid var(--primary-red-dark) 0.8rem;
}

.grid-item-9 {
  grid-column: 2/4;
  grid-row: 6/7;
  text-align: left;
  padding-top: 1rem;
}

.vo-title,
.vo-url {
  display: inline-flex;
}

.bi-arrow-right,
.bi-box-arrow-right {
  margin-right: 0.7rem;
}

.url {
  color: var(--primary-red);
}

figure {
  max-width: fit-content;
}

.horizontal {
  color: var(--primary-dark-red);
  background-color: var(--primary-dark-red);
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 6px solid var(--primary-red-dark);
}

a:hover {
  text-decoration:none;
  color: var(--primary-red-dark);
}

</style>