<template>
  <b-container class="mt-3">
    <h1 class="font-weight-bold text-left mb-3">Impressum</h1>
    <b-row>
      <b-col cols="7">
        <div class="text-left">
          <p>
            Das FWF-Projekt
            <i
              >Karl Kraus: Rechtsakten der Kanzlei Oskar Samek.
              Wissenschaftliche Edition</i
            >
            baut auf das vorangegangene Projekt
            <i>Karl Kraus Online – Die Rechtsperson</i> (Ludwig Boltzmann
            Institut für Geschichte und Theorie der Biographie) auf. Katharina
            Prager hat von 2012 bis 2018 Bestände des Karl Kraus-Archivs in der
            Wienbibliothek im Rathaus neu geordnet und digitalisiert. Das
            Resultat war bis April 2022 auf der Plattform
            <i>Karl Kraus Online</i> zugänglich. Seit Mai 2022 löst die hier
            vorliegende Edition der Rechtsakten die alte Darstellung ab.
          </p>
          <p>
            <i>Rechtsakten Karl Kraus</i> ist ein Projekt des Ludwig Boltzmann
            Institut for Digital History in Kooperation mit der Wienbibliothek
            im Rathaus und dem Austrian Centre for Digital Humanities and
            Cultural Heritage.
          </p>
          <p>
            Alle Inhalte dieser Website stehen unter der Creative Commons Lizenz
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              >Namensnennung – nicht-kommerziell – Weitergabe unter gleichen
              Bedingungen 4.0 International</a
            >.*
          </p>
          <p>
            [* Diese Lizenz gilt nicht für das aus der <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.mediathek.at"
              >Österreichischen
            Mediathek</a> stammende Foto- und Audiomaterial, da dieses Material
            wegen aufrechter Leistungsschutzrechte, im Falle der Fotos und Scans
            auch Urheberrechte, der Österreichischen Mediathek nicht gemeinfrei
            ist.]
          </p>
          <p>Offenlegung gemäß § 25 Mediengesetz und § 5 E-Commerce-Gesetz</p>
          <p>
            Medieninhaberin, Herausgeberin, inhaltliche und redaktionelle
            Verantwortung, Dienstanbieter:<br />
            Wienbibliothek im Rathaus<br />
            Magistrat der Stadt Wien – MA 9<br />
            Leitung: Dr.in Anita Eichinger<br />
            Rathaus, Stiege 6, 1. Stock, 1082 Wien<br /><br/>
            Umsatzsteuer-Identifikationsnummer: ATU 36801500<br/><br/>
            Übergeordnete Dienststelle: Geschäftsgruppe für Kultur und
            Wissenschaft
          </p>
          <p>
            Technische Umsetzung: <a target="_blank" rel="noopener noreferrer" href="https://www.oeaw.ac.at/acdh/acdh-ch-home">ACDH-CH</a> (Andrea Ortner, Barbara Krautgartner,
            Peter Andorfer)
          </p>
          <p>
            Grafik: <a target="_blank" rel="noopener noreferrer" href="https://k-lab.net">k-lab media design GmbH</a>, Schottenfeldgasse 85/7, 1070 Wien
          </p>
        </div>
      </b-col>
      <b-col cols="5">
        <Zitierempfehlung />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Zitierempfehlung from "./Zitierempfehlung";

export default {
  name: "Editionsrichtlinien",
  components: { Zitierempfehlung },
};
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: auto auto;
  margin: auto;
  grid-column-gap: 10rem;
  margin-left: 5rem;
  margin-right: 5rem;
}

.card {
  font-size: smaller;
}

.container {
  grid-template-columns: unset;
}

.left {
  grid-column: 1/2;
}

.right {
  grid-column: 2/3;
}
.text {
  text-align: left;
}

h2 {
  text-align: left;
}

a {
  color: var(--primary-red);
}
</style>