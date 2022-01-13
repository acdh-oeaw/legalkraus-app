<template>
  <main>
    <div class="grid-item-1"></div>
    <div class="grid-item-2">
      <img class="slider" src="../assets/slider1.png" alt="slider-1">
    </div>
    <div class="grid-item-3"></div>
    <div class="grid-item-4">Text</div>
    <div class="grid-item-5"></div>
    <div class="grid-item-6">Text</div>
    <div class="grid-item-7">Mögliche Einstiege</div>
    <div class="grid-item-8">
      <figure>
        <figcaption>Titel</figcaption>
        <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
        <figcaption>Text Text Text</figcaption>
      </figure>
      <figure>
        <figcaption>Titel</figcaption>
        <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
        <figcaption>Text Text Text</figcaption>
      </figure>
      <figure>
        <figcaption>Titel</figcaption>
        <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
        <figcaption>Text Text Text</figcaption>
      </figure>
      <figure>
        <figcaption>Titel</figcaption>
        <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
        <figcaption>Text Text Text</figcaption>
      </figure>
      <figure>
        <figcaption>Titel</figcaption>
        <img class="einstieg" src="../assets/einstieg1.png" alt="slider-1">
        <figcaption>Text Text Text</figcaption>
      </figure>
      <hr class="horizontal">
    </div>
    <div class="grid-item-9">
      <div class="vo-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--primary-red)"
             class="bi bi-arrow-right"
             viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
        <p>700 Vorlesungen von Karl Kraus</p>
      </div>
      <p>Text</p>
      <div class="vo-url">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--primary-red)" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        <a class="url" href="https://www.kraus.wienbibliothek.at/der-vorleser" target="_blank">https://www.kraus.wienbibliothek.at/der-vorleser</a>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 7rem auto auto auto auto auto;
  font-family: "Open Sans", sans-serif !important;
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
  margin: 0.5rem;
  width: 8rem;
  border: solid var(--primary-red) 0.5rem;
}

.grid-item-9 {
  grid-column: 2/4;
  grid-row: 6/7;
  text-align: left;
  padding-top: 1rem;
}

.vo-title, .vo-url {
  display: inline-flex;
}

.bi-arrow-right, .bi-box-arrow-right {
  margin-right: 0.7rem;
}

.url{
  color: var(--primary-red)
}
</style>