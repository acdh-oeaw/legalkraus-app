<template>
  <main>
    <div v-if="category==='p'" class="detail">
      <div><b>Person:</b></div>
      <div>Vorname: <b>{{ this.item.forename }}</b></div>
      <div>Nachname: <b>{{ this.item.surname }}</b></div>
      <div>Geschlecht: <b> {{ this.item.sex }}</b></div>
      <div>Geboren: <b>{{ this.item.birthDate }}, {{ this.item.birthPlace }}</b></div>
      <div>Gestorben: <b>{{ this.item.deathDate }}, {{ this.item.deathPlace }}</b></div>
      <div>Beruf: <b>{{this.item.occupation}}</b></div>
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{this.item.surname}}</a></div>
      <div>coming soon: Verweise/Erwähnungen Dokumente</div>
    </div>
    <div v-if="category==='o'" class="detail">
      <div>Ort:</div>
      <div>Name: <b>{{this.item.placeName}}</b></div>
      <div>Lage: <b>{{this.item.location}}</b></div>
      <div>Verweise: {{this.item.eventCount}}</div>
      <div>PMB:  <a v-bind:href="item.pmbURL" target="_blank">{{this.item.placeName}}</a></div>
      <div>coming soon: Verweise/Erwähnungen Dokumente</div>
    </div>
    <div v-if="category==='w'" class="detail">
      <div>Werk:</div>
      <div>Titel: <b>{{this.item.title}}</b></div>
      <div>Autor: <b>{{this.item.author}}</b></div>
      <div>Datum:<b>{{this.item.date}}</b></div>
      <div>PMB: <a v-bind:href="item.pmbURL" target="_blank">{{this.item.title}}</a></div>
    </div>
    <div v-if="category==='i'" class="detail">
      <div>Institution:</div>
      <div>Name: <b>{{this.item.orgName}}</b></div>
      <div>Lage: <b>{{this.item.location}}</b></div>
      <div>Verweise: {{this.item.eventCount}}</div>
      <div>PMB:  <a v-bind:href="item.pmbURL" target="_blank">{{this.item.orgName}}</a></div>
      <div>coming soon: Verweise/Erwähnungen Dokumente</div>
    </div>

  </main>
</template>

<script>
export default {
  name: "RegisterDetail",
  props: {
    item: null,
    category: null
  }
}
</script>

<style scoped>
.detail {
  text-align: left;
}

</style>