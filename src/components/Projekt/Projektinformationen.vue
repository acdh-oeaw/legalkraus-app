<template>
  <b-container class="mt-3 no-grid-col-container">
    <h1 class="font-weight-bold text-left mb-3">Projektinformation</h1>
    <b-row>
      <b-col cols="7">
        <div class="text-left">
        <p>
          Karl Kraus (1874–1936) war eine zentrale Persönlichkeit der Wiener Moderne und als Schriftsteller sowie Publizist ungeheuer produktiv. Obwohl das Rechtssystem für ihn von zentraler Bedeutung war, sind seine umfangreichen Rechtsakten nahezu unerforscht. Sie stammen aus der Kanzlei seines langjährigen Anwaltes Oskar Samek, dokumentieren über 200 Fälle aus 17 Jahren (1922–1938) und befinden sich im Karl Kraus-Archiv der Wienbibliothek im Rathaus.
        </p>
        <p>
          Das FWF-Projekt der <i>Rechtsakten Karl Kraus</i> baut auf das vorangegangene
          Projekt <i>Karl Kraus Online – Die Rechtsperson</i> (Ludwig Boltzmann
          Institut für Geschichte und Theorie der Biographie) auf. Katharina
          Prager hat von 2012 bis 2018 Bestände des Karl Kraus-Archivs in der
          Wienbibliothek im Rathaus neu geordnet und digitalisiert. Das Resultat
          war bis April 2022 auf der Plattform <i>Karl Kraus Online</i> zugänglich.
          Seit Mai 2022 löst die hier vorliegende Edition der Rechtsakten die
          alte Darstellung ab. Die unter dem Punkt <i>Der Vorleser</i> erstmals
          vollständig publizierten Vorlesungsprogramme Karl Kraus’ sind aber
          weiterhin unter folgender Adresse abrufbar:
          <a
            href="https://www.kraus.wienbibliothek.at/der-vorleser"
            target="_blank"
            rel="noopener noreferrer"
            >https://www.kraus.wienbibliothek.at/der-vorleser</a
          >.
        </p>
        <p>
          Die Digitalisate der Rechtsakten aus der Kanzlei Oskar Samek wurden in
          dem im September 2018 begonnenen Forschungsprojekt im Volltext
          erschlossen, ediert und zum Teil auch schon ausgewertet. Die
          Ergebnisse liegen nun in Form dieser wissenschaftlichen Edition vor.
        </p>
        <p>
          Die Digitalisate sind einer Transkription synoptisch gegenübergestellt. Der von der Text Encoding Initiative vorgegebene Standard zur Auszeichnung von XML-Dokumenten wurde für das Projekt und das zu edierende Material angepasst und optimiert. So ist die Auszeichnung der Texte und in der Folge die Herstellung von Bezügen zwischen den einzelnen Dokumenten und darüber hinaus ermöglicht.

        </p>
        <p>
          Den Nutzerinnen und Nutzern wird der Zugang zu dem umfangreichen und
          komplexen Material in mehrerer Hinsicht erleichtert:
        <br/>
          Über eine Auswahl verschiedener Themen (Kultur, Recht, Politik) kommen
          die Benutzerinnen und Benutzer zu bestimmten Vorauswahlen von Akten,
          die jeweils mit einem erläuternden Text der Herausgeber:innen versehen
          sind.
        <br/>
          Zusätzlich gibt es die Möglichkeit, sich Dokumente nach
          handschriftlichen Kriterien gefiltert anzeigen zu lassen, da
          nachträgliche handschriftliche Überarbeitungen von besonderer Relevanz
          sein können. So kann unter anderem die Zusammenarbeit zwischen dem
          Anwalt Oskar Samek und seinem Mandanten Karl Kraus studiert werden.<br/>
        </p>
        <p>Daneben lässt sich auch eine Liste aller Akten aufrufen.<br/>
        <p>
          Darüber hinaus können die Nutzerinnen und Nutzer über einen
          Handapparat auf mehrere Materialien zugreifen, welche die
          Beschäftigung mit den Akten zusätzlich unterstützen. Beiträge zu
          unterschiedlichen Aspekten der Edition und ihres Inhalts von Forschern
          unterschiedlicher Disziplinen bilden einen Teil. Ein anderer Teil ist
          Oskar Samek gewidmet und enthält einen biographischen Aufsatz sowie
          ein Interviewtranskript. Und im dritten Teil wird die durch Hermann
          Böhm verantwortete Print-Ausgabe der Rechtsakten aus den 1990er Jahren
          für die Forschung bereitgestellt.<br/>
          Daneben erhalten die Nutzerinnen und Nutzer aber auch die Möglichkeit,
          über von <i>Karl Kraus Online</i> adaptierte, aktualisierte Statistiken eine
          quantitative Auswertung zu den juristischen Delikten, Verfahren und
          Prozessen zu erhalten. Ein Zeitstrahl bietet einen Überblick über die
          gesamten 215 Akten.
        </p>
        <p>
          Für das Projekt stand die Forschungsfrage im Zentrum, wie Karl Kraus’
          Zitatverfahren und -strategien konkret aussahen. Wer spricht in den
          Dokumenten, wer wird auf welche Weise zum Zeugen aufgerufen, und in
          welchem Kontext stehen die Zitate? Wie verhalten sie sich zu Zitaten
          in den anderen Texten von Kraus, welche Akten nahm Kraus später in
          seine Zeitschrift <i>Die Fackel</i> auf und sind im Laufe der für Österreich
          politisch bewegten 15 Jahre, über die sich die Rechtsakten erstrecken,
          Veränderungen bemerkbar?<br/>
          Die zahlreichen Auszeichnungen der edierten Dokumente (s.
          Editionsrichtlinien) geben auf viele dieser Fragen konkrete Antworten
          und legen gleichzeitig die Grundlage für weitergehende Forschungen.
        </p>

        <p>
          Das Konzept der <i>Rechtsakten Karl Kraus</i> wurde am Ludwig Boltzmann
          Institut for Digital History entwickelt und ausgeführt. Die technische
          Umsetzung (Programmierung Backend/Frontend) ist am Austrian Centre for
          Digital Humanities and Cultural Heritage erfolgt, die Digitalisierung
          und Bereitstellung der Rechtsakten ermöglichte die Wienbibliothek im
          Rathaus.
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
  name: "Projektinformationen",
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