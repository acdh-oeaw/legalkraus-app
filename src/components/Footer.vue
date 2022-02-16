<template>
  <main>
    <div class="text">
<!--    <span class="contact">
      <svg id="contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-globe2"
           viewBox="0 0 16 16">
    <path
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
  </svg>
      <p class="contact-text">Kontakt</p>
    </span>
      <hr class="horizontal">-->
      <div class="left">
        <p>Rechtsakten Karl Kraus</p>
        <p>Online Edition</p>
      </div>
      <div class="middle">
        <p>Katharina Prager</p>
        <p>Ludwig Boltzmann-Institut für Digital History </p>
        <p>Hofburg <br>
          1010 Wien </p>
        <p>TelNr: 1234/1234567890 <br>
          Email: kraus@stan.com</p>
      </div>
      <div class="right">
        <p>HELPDESK</p>
        <p>ACDH runs a helpdesk offering
          advice for questions related to
          various digital humanities topics.</p>
        <button type="button">ASK US!</button>
      </div>
    </div>
    <div class="logos">
      <img class="logo" src=".././assets/acdh-ch-logo96.png" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/wien_biblio.png" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/fwf.png" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/LBIDH-Logo.jpg" width="auto" height="70px" alt="acdh-logo">
    </div>
  </main>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

main {
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  justify-content: space-between;
  grid-column-gap: 1rem;
  height: min-content;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-top: 5rem;
  bottom: 0;
}

.text {
  grid-row: 1/2;
  display: grid;
  grid-template-columns: repeat(3,auto);
  background-color: var(--secondary-gray-dark);
  padding: 2rem;
  align-items: baseline;
}

.logos {
  grid-row: 2/3;
  grid-column: 1/4;
  background-color: var(--secondary-gray);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  padding-left: 6rem;
  padding-right: 4rem;
}

.contact {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-flex;
  align-self: flex-start;
  margin-left: 1rem;
  margin-right: 1rem;
  grid-column: 1 / 3;
  grid-row: 1/2;
}

.contact-text {
  font-size: 16px;
  padding-left: 1rem;
  padding-top: 0;
  margin: 0;
}

.horizontal {
  width: 100%;
  margin: 0;
  padding: 0;
  grid-column-start: 1;
  grid-column-end: 4;
}

.logo {
  grid-column: 1 / 2;
  margin-left: 1rem;
  margin-top: 1rem;
}

.middle{
  text-align: left;
  grid-column: 2/3;
}

.left {
  margin-top: 1rem;
  text-align: left;
  grid-column: 1/2;
  margin-left: 4rem;
}

.right {
  margin-top: 1rem;
  width: 95%;
  text-align: right;
  grid-column: 3/4;
  margin-right: 4rem;
}

</style>
