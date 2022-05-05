<template>
  <b-container class="mt-3">
    <h1 class="font-weight-bold text-left mb-3">Publikationen</h1>
    <b-row>
      <b-col cols="7">
        <div class="text-left">
          <p>
            <b
              >Ausgewählte Publikationen des Projektteams während der
              Projektlaufzeit</b>
          </p>
          <p>
            Ingo Börner / Vanessa Hannesschläger / Isabel Langkabel / Katharina
            Prager, Intertextuality in the Legal Papers of Karl Kraus: A
            Scholarly Digital Edition, in: KONDE Weißbuch, hg. v. Helmut W. Klug
            unter Mitarbeit von Selina Galka und Elisabeth Steiner. Aufgerufen
            am: 24.4.2022, <a
              href="http://hdl.handle.net/11471/562.50.243"
              target="_blank"
              rel="noopener noreferrer"
              >hdl.handle.net/11471/562.50.243</a>. PID: o:konde.p20.
          </p>
          <p>
            Vanessa Hannesschläger / Isabel Langkabel, „Das reine
            Banditenblatt“: Die Verhandlung eines Zitats in einem juristischen
            Verfahren und in der <i>Fackel</i>, in: Beihefte zu editio, Berlin [in
            Vorbereitung].
          </p>
          <p>
            Johannes Knüchel, „Geschriebenes … verloren“. Karl Kraus’
            Gestaltungsprozeß von Seite 1 der „Fackel“ Nr. 374/375, in: Text.
            Kritische Beiträge (16/2020), 129–141.
          </p>
          <p>
            Johannes Knüchel / Gerald Krieghofer, Korrespondenzen, in: Katharina
            Prager / Simon Ganahl unter Mitarbeit von Isabel Langkabel und
            Johannes Knüchel (Hg.), Karl Kraus-Handbuch. Leben – Werk – Wirkung,
            Stuttgart 2022 [in Vorbereitung].
          </p>
          <p>
            Johannes Knüchel, Die rechtlichen Auseinandersetzungen Karl Kraus’
            mit Alfred Staackmann und Lothar Rübelt, in: Wiener Digitale Revue
            Nr. 4 [in Vorbereitung].
          </p>
          <p>
            Johannes Knüchel / Isabel Langkabel / Andrea Ortner / Laura Untner,
            Intertextualität in den Rechtsakten von Karl Kraus. Eine
            wissenschaftliche digitale Edition, in: Wiener Digitale Revue Nr. 4.
            DOI: 10.25365/wdr-04-03-01 [in Vorbereitung].
          </p>
          <p>
            Isabel Langkabel, Karl Kraus und das Berliner Tageblatt:
            „Beleidigungen dürfen auf der Stelle erwidert werden“. Ein Text aus
            dem Nachlaß, in: Text. Kritische Beiträge (16/2020), 53–127.
          </p>
          <p>
            Isabel Langkabel, Abscheu oder Lust? Karl Kraus’ spätes Schreiben,
            in: Mimeo. Blog der Doktorandinnen und Doktoranden am
            Dubnow-Institut, Leipzig 2021. Aufgerufen am: 24.4.2022,
            <a
              href="https://mimeo.dubnow.de/abscheu-oder-lust"
              target="_blank"
              rel="noopener noreferrer"
              >https://mimeo.dubnow.de/abscheu-oder-lust</a>.
          </p>
          <p>
            Isabel Langkabel, Die Sprache und der Nationalsozialismus, in: Gal
            Hertz / Ari Linden / Katharina Prager (Hg.), Karl Kraus and National
            Socialism: Citing Violence, Inciting Critique, Berlin [in
            Vorbereitung].
          </p>
          <p>
            Isabel Langkabel / Katharina Prager, Karl Kraus’ polemische
            Praktiken in der Ersten Republik, in: Musil-Forum. Studien zur
            Literatur der klassischen Moderne. Im Auftrag der Internationalen
            Robert-Musil-Gesellschaft, hg. v. Norbert Christian Wolf u. Rosmarie
            Zeller. Bd. 36, Berlin 2021, 227–242.
          </p>
          <p>
            Isabel Langkabel, Die Sprache, in: Katharina Prager / Simon Ganahl
            unter Mitarbeit von Isabel Langkabel und Johannes Knüchel (Hg.),
            Karl Kraus-Handbuch. Leben – Werk – Wirkung, Stuttgart 2022 [in
            Vorbereitung].
          </p>
          <p>
            Katharina Prager / Simon Ganahl unter Mitarbeit von Isabel Langkabel
            und Johannes Knüchel (Hg.), Karl Kraus-Handbuch. Leben – Werk –
            Wirkung, Stuttgart 2022 [in Vorbereitung].
          </p>
        </div>
      </b-col>
      <b-col cols="5">
          <Zitierempfehlung/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Zitierempfehlung from "./Zitierempfehlung";

export default {
  name: "Publikationen",
  components: {Zitierempfehlung}
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