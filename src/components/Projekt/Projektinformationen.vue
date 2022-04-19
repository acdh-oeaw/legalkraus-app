<template>
<main>
  <div class="left">
    <h2>Projektinformation lang</h2>
    <p class="text">
      Hammock stumptown locavore literally esse brunch twee cardigan, salvia brooklyn organic nisi. Knausgaard commodo schlitz aute marfa austin. Hoodie celiac fixie laborum you probably haven't heard of them coloring book distillery. Mixtape id twee wolf farm-to-table, etsy truffaut seitan neutra. Magna cillum street art church-key cronut sed, pug tbh. Cloud bread squid ut XOXO, fashion axe drinking vinegar aesthetic organic af typewriter vaporware bespoke locavore you probably haven't heard of them. Kickstarter officia enim, incididunt VHS authentic schlitz meditation tote bag cupidatat bespoke.
      Retro affogato kickstarter, post-ironic copper mug adaptogen thundercats fanny pack 90's kinfolk. Culpa non ut intelligentsia leggings artisan pork belly gluten-free vinyl qui. Try-hard enim pork belly locavore single-origin coffee. Typewriter vape cardigan sint chia veniam cred tempor dolore. Velit vexillologist fanny pack fam.
    </p>
  </div>
  <div class="right">
    <div class="card text">
      <h2>Projektübersicht</h2>
      Hammock stumptown locavore literally esse brunch twee cardigan, salvia brooklyn organic nisi. Knausgaard commodo schlitz aute marfa austin. Hoodie celiac fixie laborum you probably haven't heard of them coloring book distillery. Mixtape id twee wolf farm-to-table, etsy truffaut seitan neutra. Magna cillum street art church-key cronut sed,
    </div>
  </div>
</main>
</template>

<script>
export default {
  name: "Projektinformationen"
}
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: auto auto;
  margin:auto;
  grid-column-gap: 10rem;
  margin-left: 5rem;
  margin-right: 5rem;
}

.left{
  grid-column: 1/2;
}

.right{
  grid-column: 2/3;
}

.card{
  width:35rem;
}

.text{
  text-align: left;
}

h2{
  text-align: left;
}
</style>