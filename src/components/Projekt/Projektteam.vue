<template>
  <b-container class="mt-3">
    <h2>Projektteam</h2>
    <b-row>
      <b-col cols="7">
        <div class="text-left">
          <p>Herausgeber:innen: Johannes Knüchel, Isabel Langkabel</p>
          <p>Projektleitung: Katharina Prager</p>
          <p>Nationale Forschungspartnerin: Vanessa Hannesschläger</p>
          <p>Programmierung Backend: Laura Untner, Ingo Börner</p>
          <p>Programmierung Frontend: Andrea Ortner, Barbara Krautgartner</p>
          <p>Implementierung ARCHE: Peter Andorfer</p>
          <p>
            Studentische Mitarbeit: Alexandra Rausch, Pia Ebner, Lena Kovačić,
            Susanna Hufsky, Gregor Pirgie, Daniel Gonaus, Theresa Schmidt
          </p>
          <p>Entzifferung stenographischer Passagen: Dietlind Pichler</p>
          <p>
            Praktikantinnen: Gregor Kodym, Katharina Mayer, Juliane Meyer,
            Mercedes Zach
          </p>
          <p>Webdesign: Eduard Mang, k-lab</p>
          <p>
            Institutionen: Ludwig Boltzmann Institut for Digital History,
            Wienbibliothek im Rathaus, Austrian Centre for Digital Humanities
            and Cultural Heritage
          </p>
          <p>
            Beirat: Reinhard Merkel, Sigurd Paul Scheichl, Bernhard Sebl, Edward
            Timms (†)
          </p>
          <p>
            Rechtshistorische Beratung: Harald Stockhammer, Gerald Kohl,
            Albrecht Götz von Olenhusen
          </p>
          <p>Finanzielle Förderung: FWF – Der Wissenschaftsfonds</p>
          <p>Dank</p>
          <p>
            Die Herausgeber:innen und die Projektleitung danken neben den oben
            aufgeführten Mitarbeiterinnen und Mitarbeitern darüber hinaus:
          </p>
          <p>
            für die editorische Vorarbeit und die Erlaubnis zur Digitalisierung
            seiner Edition Hermann Böhm,<br />
            für die technische Beratung am ACDH-CH Matej Ďurčo und Daniel
            Schopper,<br />
            für die Unterstützung bei der Bearbeitung der digitalisierten Akten
            Alexandra Egger, Christiane Fritze und Nicole Hebenstreit
            (Wienbibliothek im Rathaus),<br />
            für einfachen und schnellen Zugriff auf die digitalisierten und
            analogen Materialien der Wienbibliothek im Rathaus Anita Eichinger
            (Wienbibliothek im Rathaus),<br />
            für administrativen und konzeptionellen Rat Ingo Zechner (Ludwig
            Boltzmann Institut for Digital History),<br />
            für die Beratung in rechtshistorischen Fragen ausdrücklich Bernhard
            Sebl, Harald Stockhammer, der dem Projektteam dauernd mit Rat und
            Tat zur Seite stand, sowie Albrecht Götz von Olenhusen,<br />
            für die Interviews Gerald Krieghofer, Roland Reuß und Harald
            Stockhammer,<br />
            für die schriftlichen Beiträge Jochen Barte, Gerlinde Kainz, Gerald
            Kohl, Martin Anton Müller, Bernhard Oberreither, Sigurd Paul
            Scheichl und Bernhard Sebl,<br />
            für weitere technische Unterstützung Carl Friedrich Haak, Martina
            Trognitz, Ulrike Czeitschner, Martin Anton Müller, Andreas Basch und
            Daniel Stoxreiter,<br />
            für die Hilfe bei der Identifizierung historischer Personen Andrea
            Zierer (Staats-und Universitätsbibliothek Hamburg).
          </p>
        </div>
      </b-col>
      <b-col cols="5">
        <b-card>
          <b-card-text class="text-left">
            <b
              >Karl Kraus: Rechtsakten der Kanzlei Oskar Samek.
              Wissenschaftliche Edition</b
            >
            <p>
              Zitierempfehlung:
              <i
                >Karl Kraus: Rechtsakten der Kanzlei Oskar Samek.
                Wissenschaftliche Edition,</i
              >
              hg. v. Johannes Knüchel und Isabel Langkabel unter Mitarbeit von
              Laura Untner, Andrea Ortner, Ingo Börner und Vanessa
              Hannesschläger (Wien 2022),<br /><a
                href="https://www.kraus.wienbibliothek.at"
                target="_blank"
                rel="noopener noreferrer"
                >https://www.kraus.wienbibliothek.at</a
              >.
            </p>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Projektinformationen",
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
</style>