<template>
  <div class="text-left w-75 mx-auto my-2">
    <h1 class="mb-3">Beiträge</h1>
    <p>
      Jochen Barte,
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}jochen_barte_beitrag.pdf`"
        >„Der größte Schuft im ganzen Land“ – Karl Kraus’ juristischer und
        publizistischer Kampf gegen Alfred Kerr</a
      >
    </p>
    <p>
      Gerald Kohl, <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}gerhard_kohl_beitrag.pdf`"
        >Erwartungen der (österreichischen) rechtshistorischen
      Forschung an das Projekt „Intertextualität in den Rechtsakten von Karl
      Kraus“</a>
    </p>
    <p>
      Martin Anton Müller, <a
        target="_blank"
        rel="noopener noreferrer"
       :href="`${publicPath}martin_anton_mueller_beitrag.pdf`"
        >Ein wild gewordenes Telefonbuch im digitalen
      Zeitalter</a>
    </p>
    <p>
      Bernhard Oberreither, <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}bernhard_oberreither_beitrag.pdf`"
        >‚Ungesetz‘ und ‚primum vivere‘: Der Fall des
      Rechtsstaats in der Dritten Walpurgisnacht</a>
    </p>
    <p>
      Sigurd Paul Scheichl, <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}sigurd_paul_scheichl_beitrag.pdf`"
        >Prozesse als Bestandteile des Werks von Karl Kraus –
      Prozessakten als Quelle zu seinem Wirken. Am Beispiel des Prozesses Pisk
      gegen Kraus (1929–1931)</a>
    </p>
    <p>
      Bernhard Sebl, <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}bernhard_sebl_beitrag.pdf`"
        >Begriffs- und Quelleneinordnung der Handakten von Oskar
      Samek</a>
    </p>
    <p>
      Frühe Prozesse: <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}fruehe_prozesse.pdf`"
        >Übersicht zu den frühen Prozessen von Karl Kraus
      (1899–1921), erstellt für Karl Kraus Online von Katharina Prager</a>
    </p>
    <h1 class="mb-3">Interviews</h1>
    <p>
      Gerald Krieghofer,
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}interview_krieghofer_final.m4a`"
        >Die Rechtsakten im Kontext des Karl Kraus-Archivs</a
      > <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}gerald_krieghofer_transkription.pdf`"
        >(Transkription)</a
      >
    </p>
    <p>
      Roland Reuß,
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}interview_reuss_final.m4a`"
        >Karl Kraus’ Fackel und die Rechtsakten in den Jahren 1933/1934</a
      > <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}roland_reuss_transkription.pdf`"
        >(Transkription)</a
      >
    </p>
    <p>
      Harald Stockhammer,
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}interview_stockhammer_final.mp3`"
        >Die Rechtsakten aus juristischer Perspektive</a
      > <a
        target="_blank"
        rel="noopener noreferrer"
        :href="`${publicPath}harald_stockhammer_transkription.pdf`"
        >(Transkription)</a
      >
    </p>
  </div>
</template>
<style scoped>
a {
  color: var(--primary-red);
}
</style>
<script>
export default {
  name: "Beitraege",
  data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
};
</script>