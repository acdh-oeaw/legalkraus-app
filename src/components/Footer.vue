<template>
  <main>
    <div class=" text text-left">
      <div>
        <p class="b mb-0">
        Karl Kraus: Rechtsakten der Kanzlei Oskar Samek. <br/> 
        Wissenschaftliche Edition
      </p>
      <p>
        hg. v. Johannes Knüchel und Isabel Langkabel unter Mitarbeit von Laura
        Untner, Andrea Ortner, Ingo Börner und Vanessa Hannesschläger (Wien
        2022)
      </p>
      </div>
      <div class="middle">
        <p class="b">Kontakt</p>
        <p>Projektleitung: Katharina Prager<br/>
          <a class="r b" href="mailto:katharina.prager@wien.gv.at">katharina.prager@wien.gv.at</a><br/>
          Wienbibliothek im Rathaus<br/>
        1082 Wien, Rathaus, Stiege 8, Hochparterre, Zi 104W</p>

      </div>
      <div class="right">
        <div class="contact-info">
          <p class="b"><router-link class="imprint-link" to="/impressum">Impressum</router-link></p>
        </div>
        <p class="b r">HELPDESK</p>
        <p>ACDH runs a helpdesk offering
          advice for questions related to
          various digital humanities topics.</p>
        <div class="ask" >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#A73D2E" class="bi bi-headset" viewBox="0 0 16 16">
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
          </svg>
          <a class="r b" href="mailto:acdh-ch-helpdesk@oeaw.ac.at">ASK US!</a></div>
      </div>
    </div>
    <div class="logos">
      <img class="logo" src=".././assets/acdh-ch-logo96.png" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/stadtwien.svg" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/boltzmann.svg" width="auto" height="70px" alt="acdh-logo">
      <img class="logo" src=".././assets/fwf.png" width="auto" height="70px" alt="acdh-logo">
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
  width: 100%;
  grid-column-gap: 1rem;
  height: min-content;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-top: 5rem;
  bottom: 0;
}

.text {
  display: grid;
  grid-template-columns: repeat(3,auto);
  column-gap: 3rem;
  background-color: var(--secondary-gray-dark);
  padding: 2rem;
  margin: 0 !important;
  align-items: baseline;
  font-size: 0.9rem;
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

.contact-info{
  margin-bottom: 3rem;
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
  margin-right: 8rem;
}

.right {
  margin-top: 1rem;
  text-align: left;
  grid-column: 3/4;
  margin-right: 1rem;
}

.r{
  color: var(--primary-red-dark)
}

.b{
  font-weight: 600;
}

.ask{
  display: inline-flex;
}

.bi-headset{
  margin-right: 0.5rem;
}
.imprint-link {
  color: #000;
}

.imprint-link:hover {
  color:var(--primary-red-dark);
}

</style>
