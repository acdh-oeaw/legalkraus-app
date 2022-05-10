<template>
  <main>
    <b-container class="no-grid-col-container">
      
           <b-jumbotron class="p-0">
          <b-carousel
            id="carousel"
            :interval="0"
            img-width="1024"
            img-height="380"
            style="text-shadow: 1px 1px 2px #333;"
          >
             <!-- Text slides with image -->
            <b-carousel-slide
              caption=""
              text=""
            >
            <template>
              <div class="d-flex h-100 justify-content-center align-items-center">
                <p>
                  Diese Seite befindet sich vorübergehend im Wartungsmodus.<br/>
                  Vielen Dank für ihr Verständnis!
                </p>
              </div>
            </template><template #img>
              
              
                <img 
                
                  class="d-block  img-fluid w-75 mx-auto"
                  width="1024"
                  height="380"
                  :src="`${publicPath}slider1.jpg`"
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
                  :src="`${publicPath}slider2.jpg`"
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
                  :src="`${publicPath}slider3.jpg`"
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
          <b-row class="mx-0">
            <div class="primary-dark text-right jumbotron-text-left semibold pt-3 pb-5 pr-2"></div><!--<div class="jumbotron-right-left pt-3 pb-2 pl-2"> <small>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</small></div>-->
            </b-row>
           </b-jumbotron>
    </b-container>
  </main>
</template>

<script>
export default {
  name: "Maintenance",
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

img {
   background: var(--primary-red-dark);
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

a {
  color: #000;
}

a:hover {
  text-decoration:none;
  color: var(--primary-red-dark);
}

</style>
<style>

/**style for maintence mode start **/
.carousel-caption {
  padding:0 !important;
  top:0 !important;
  left:0 !important;
  width:100% !important;
  height:100% !important;
  background:rgb(167, 61, 46,0.7)
}

.carousel-caption h1 {
  
}

/**style for maintence mode end **/
</style>